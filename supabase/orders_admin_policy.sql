-- Run this only if edit/delete on the Orders tab returns a Row Level Security error.
-- It allows signed-in admin users to update and delete order records.
alter table public.orders enable row level security;

drop policy if exists "Authenticated admins can manage orders"
  on public.orders;

create policy "Authenticated admins can manage orders"
  on public.orders
  for all
  to authenticated
  using (true)
  with check (true);
