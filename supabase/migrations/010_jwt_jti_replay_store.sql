-- ============================================================
-- 010_jwt_jti_replay_store.sql
-- Anti-replay store pour les JWT cross-domain (lib/integration/cross-domain-jwt.ts).
-- Chaque token signé inclut un `jti` UUID. L'API verifyCrossDomainToken
-- enregistre le jti consommé ; toute tentative de réutilisation est rejetée.
-- ============================================================

create table if not exists public.jwt_jti_consumed (
  jti text primary key,
  expires_at timestamptz not null,
  consumed_at timestamptz not null default now()
);

create index if not exists idx_jwt_jti_expires on public.jwt_jti_consumed (expires_at);

alter table public.jwt_jti_consumed enable row level security;

drop policy if exists "jti_no_public_read" on public.jwt_jti_consumed;
create policy "jti_no_public_read" on public.jwt_jti_consumed for select using (false);

drop policy if exists "jti_no_public_write" on public.jwt_jti_consumed;
create policy "jti_no_public_write" on public.jwt_jti_consumed for all using (false) with check (false);

comment on table public.jwt_jti_consumed is
  'Anti-replay store pour les JWT cross-domain. Auto-purgé via cron quotidien (suppression des entrées expirées).';

-- Cron de purge (à appeler depuis /api/cron/jwt-jti-purge si on souhaite l'automatiser).
create or replace function public.purge_jwt_jti_consumed()
returns int language plpgsql as $$
declare
  deleted_count int;
begin
  with d as (
    delete from public.jwt_jti_consumed
     where expires_at < now() - interval '1 hour'
     returning 1
  )
  select count(*) into deleted_count from d;
  return coalesce(deleted_count, 0);
end$$;
