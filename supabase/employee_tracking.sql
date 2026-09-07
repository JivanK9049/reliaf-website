-- Run this once in Supabase Dashboard → SQL Editor.
-- Create employee users from Authentication → Users. Each new user receives
-- an employee profile automatically. Promote your office user with the final UPDATE.

create table if not exists public.employee_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Employee',
  phone text,
  territory text,
  role text not null default 'employee' check (role in ('employee', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_employee()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.employee_profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_employee on auth.users;
create trigger on_auth_user_created_employee after insert on auth.users
for each row execute procedure public.handle_new_employee();

-- Backfill profiles for users that existed before this tracking module was added.
insert into public.employee_profiles (id, full_name, phone)
select id, coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1)), phone
from auth.users
on conflict (id) do nothing;

create or replace function public.is_tracking_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.employee_profiles where id = auth.uid() and role = 'admin');
$$;

create table if not exists public.employee_attendance (
  id bigint generated always as identity primary key,
  employee_id uuid not null references public.employee_profiles(id) on delete cascade,
  work_date date not null default current_date,
  start_time timestamptz not null default now(),
  end_time timestamptz,
  start_latitude numeric, start_longitude numeric, end_latitude numeric, end_longitude numeric,
  created_at timestamptz not null default now(),
  unique(employee_id, work_date)
);

create table if not exists public.employee_visits (
  id bigint generated always as identity primary key,
  employee_id uuid not null references public.employee_profiles(id) on delete cascade,
  visit_type text not null check (visit_type in ('Dealer', 'Farmer')),
  customer_name text not null,
  village text,
  notes text,
  photo_url text,
  latitude numeric, longitude numeric,
  checked_in_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.employee_daily_reports (
  id bigint generated always as identity primary key,
  employee_id uuid not null references public.employee_profiles(id) on delete cascade,
  report_date date not null default current_date,
  summary text not null,
  next_plan text,
  created_at timestamptz not null default now(),
  unique(employee_id, report_date)
);

create table if not exists public.employee_transactions (
  id bigint generated always as identity primary key,
  employee_id uuid not null references public.employee_profiles(id) on delete cascade,
  transaction_type text not null check (transaction_type in ('Order', 'Collection', 'Expense')),
  party_name text not null,
  amount numeric not null default 0 check (amount >= 0),
  details text,
  latitude numeric, longitude numeric,
  created_at timestamptz not null default now()
);

alter table public.employee_profiles enable row level security;
alter table public.employee_attendance enable row level security;
alter table public.employee_visits enable row level security;
alter table public.employee_daily_reports enable row level security;
alter table public.employee_transactions enable row level security;

drop policy if exists "Profiles are readable by signed in users" on public.employee_profiles;
create policy "Profiles are readable by signed in users" on public.employee_profiles for select to authenticated using (id = auth.uid() or public.is_tracking_admin());
drop policy if exists "Admins manage profiles" on public.employee_profiles;
create policy "Admins manage profiles" on public.employee_profiles for update to authenticated using (public.is_tracking_admin()) with check (public.is_tracking_admin());

drop policy if exists "Employees manage own attendance" on public.employee_attendance;
create policy "Employees manage own attendance" on public.employee_attendance for all to authenticated using (employee_id = auth.uid() or public.is_tracking_admin()) with check (employee_id = auth.uid() or public.is_tracking_admin());
drop policy if exists "Employees manage own visits" on public.employee_visits;
create policy "Employees manage own visits" on public.employee_visits for all to authenticated using (employee_id = auth.uid() or public.is_tracking_admin()) with check (employee_id = auth.uid() or public.is_tracking_admin());
drop policy if exists "Employees manage own reports" on public.employee_daily_reports;
create policy "Employees manage own reports" on public.employee_daily_reports for all to authenticated using (employee_id = auth.uid() or public.is_tracking_admin()) with check (employee_id = auth.uid() or public.is_tracking_admin());
drop policy if exists "Employees manage own transactions" on public.employee_transactions;
create policy "Employees manage own transactions" on public.employee_transactions for all to authenticated using (employee_id = auth.uid() or public.is_tracking_admin()) with check (employee_id = auth.uid() or public.is_tracking_admin());

insert into storage.buckets (id, name, public) values ('employee-visit-photos', 'employee-visit-photos', true) on conflict (id) do nothing;
drop policy if exists "Employees upload their visit photos" on storage.objects;
create policy "Employees upload their visit photos" on storage.objects for insert to authenticated with check (bucket_id = 'employee-visit-photos');
drop policy if exists "Anyone views employee visit photos" on storage.objects;
create policy "Anyone views employee visit photos" on storage.objects for select to public using (bucket_id = 'employee-visit-photos');

-- Promote the existing office administrator (change the email only if needed).
update public.employee_profiles set role = 'admin'
where id = (select id from auth.users where email = 'reliafagrotech@gmail.com');
