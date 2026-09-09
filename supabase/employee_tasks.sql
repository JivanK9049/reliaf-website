-- Employee task assignment for Reliaf Track.
-- Run this in Supabase Dashboard → SQL Editor after employee_tracking.sql.

create table if not exists public.employee_tasks (
  id bigint generated always as identity primary key,
  employee_id uuid not null references public.employee_profiles(id) on delete cascade,
  assigned_by uuid not null references public.employee_profiles(id) on delete restrict,
  title text not null check (char_length(title) between 3 and 160),
  details text,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date date,
  status text not null default 'assigned' check (status in ('assigned', 'in_progress', 'completed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists employee_tasks_employee_status_idx
  on public.employee_tasks (employee_id, status, due_date);

alter table public.employee_tasks enable row level security;

drop policy if exists "Admins assign employee tasks" on public.employee_tasks;
create policy "Admins assign employee tasks"
  on public.employee_tasks for insert to authenticated
  with check (public.is_tracking_admin() and assigned_by = auth.uid());

drop policy if exists "Users view relevant tasks" on public.employee_tasks;
create policy "Users view relevant tasks"
  on public.employee_tasks for select to authenticated
  using (employee_id = auth.uid() or public.is_tracking_admin());

drop policy if exists "Employees update assigned tasks" on public.employee_tasks;
create policy "Employees update assigned tasks"
  on public.employee_tasks for update to authenticated
  using (employee_id = auth.uid() or public.is_tracking_admin())
  with check (employee_id = auth.uid() or public.is_tracking_admin());

