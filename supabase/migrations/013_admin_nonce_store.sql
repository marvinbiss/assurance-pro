-- ============================================================
-- 013_admin_nonce_store.sql
-- Anti-replay des appels admin (ADMIN_API_TOKEN bearer + nonce body).
-- Chaque requête admin doit fournir un `nonce` (UUID) signé côté caller.
-- Le nonce est consommé en DB ; un rejeu renvoie 409.
-- ============================================================

create table if not exists public.admin_nonce_consumed (
  nonce text primary key,
  endpoint text not null,
  consumed_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists idx_admin_nonce_expires on public.admin_nonce_consumed (expires_at);

alter table public.admin_nonce_consumed enable row level security;

drop policy if exists "admin_nonce_no_public" on public.admin_nonce_consumed;
create policy "admin_nonce_no_public" on public.admin_nonce_consumed
  for select using (false);
drop policy if exists "admin_nonce_no_public_write" on public.admin_nonce_consumed;
create policy "admin_nonce_no_public_write" on public.admin_nonce_consumed
  for all using (false) with check (false);

comment on table public.admin_nonce_consumed is
  'Nonces admin consommés (anti-replay des appels /api/admin/*). Auto-purgé via cron purge-tokens.';

create or replace function public.purge_admin_nonce_consumed()
returns int language plpgsql as $$
declare
  deleted_count int;
begin
  with d as (
    delete from public.admin_nonce_consumed
     where expires_at < now() - interval '1 hour'
     returning 1
  )
  select count(*) into deleted_count from d;
  return coalesce(deleted_count, 0);
end$$;
