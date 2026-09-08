-- Continuous route tracking for the Reliaf Track employee app.
-- Run this in Supabase Dashboard → SQL Editor after employee_tracking.sql.

create table if not exists public.employee_route_points (
  id bigint generated always as identity primary key,
  employee_id uuid not null references public.employee_profiles(id) on delete cascade,
  attendance_id bigint not null references public.employee_attendance(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  latitude numeric not null,
  longitude numeric not null,
  accuracy_meters numeric,
  source text not null default 'tracking' check (source in ('start', 'tracking', 'end')),
  created_at timestamptz not null default now()
);

create index if not exists employee_route_points_attendance_recorded_at_idx
  on public.employee_route_points (attendance_id, recorded_at);
create index if not exists employee_route_points_employee_recorded_at_idx
  on public.employee_route_points (employee_id, recorded_at);

alter table public.employee_route_points enable row level security;

drop policy if exists "Employees record own route points" on public.employee_route_points;
create policy "Employees record own route points"
  on public.employee_route_points for insert to authenticated
  with check (employee_id = auth.uid() or public.is_tracking_admin());

drop policy if exists "Employees view own route points" on public.employee_route_points;
create policy "Employees view own route points"
  on public.employee_route_points for select to authenticated
  using (employee_id = auth.uid() or public.is_tracking_admin());

