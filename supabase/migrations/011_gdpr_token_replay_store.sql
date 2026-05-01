-- ============================================================
-- 011_gdpr_token_replay_store.sql
-- Anti-replay store pour les tokens HMAC GDPR (delete + export).
-- Chaque token consommé est enregistré ; rejouer le même token est rejeté.
-- Auto-purge via fonction (cron quotidien à brancher).
-- ============================================================

create table if not exists public.gdpr_token_consumed (
  token_hash text primary key,
  kind text not null check (kind in ('delete', 'export')),
  email_hash text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz not null default now()
);

create index if not exists idx_gdpr_token_expires on public.gdpr_token_consumed (expires_at);
create index if not exists idx_gdpr_token_email on public.gdpr_token_consumed (email_hash);

alter table public.gdpr_token_consumed enable row level security;

drop policy if exists "gdpr_token_no_public_read" on public.gdpr_token_consumed;
create policy "gdpr_token_no_public_read" on public.gdpr_token_consumed
  for select using (false);

drop policy if exists "gdpr_token_no_public_write" on public.gdpr_token_consumed;
create policy "gdpr_token_no_public_write" on public.gdpr_token_consumed
  for all using (false) with check (false);

comment on table public.gdpr_token_consumed is
  'Anti-replay GDPR : un token HMAC GDPR (delete/export) consommé est unique. RLS verrouillé : accès via service_role uniquement.';

create or replace function public.purge_gdpr_token_consumed()
returns int language plpgsql as $$
declare
  deleted_count int;
begin
  with d as (
    delete from public.gdpr_token_consumed
     where expires_at < now() - interval '1 hour'
     returning 1
  )
  select count(*) into deleted_count from d;
  return coalesce(deleted_count, 0);
end$$;
