-- 030_rate_limits.sql
-- Rate limiting Supabase-based (token bucket simplifié)
--
-- Pattern:
--   - Composite key (route, identifier) → bucket de N tokens regenerés à T tokens/sec
--   - Identifier = OAuth client_id OU IP hash (anonymisée pour RGPD)
--   - TTL automatique 24h (purge cron)

create table if not exists public.rate_limits (
  identifier text not null,
  -- 'client:<oauth_id>' OU 'ip:<sha256(ip)>'
  route text not null,
  -- e.g. 'embeddings.post', 'oauth.token', 'agents.booking'
  window_start timestamptz not null,
  count integer not null default 1,
  updated_at timestamptz not null default now(),
  primary key (identifier, route, window_start)
);

create index if not exists idx_rate_limits_cleanup on public.rate_limits(window_start);

-- RPC: increment counter atomically + return current count
create or replace function public.check_rate_limit(
  p_identifier text,
  p_route text,
  p_window_seconds integer,
  p_max_requests integer
) returns table(allowed boolean, current_count integer, reset_at timestamptz)
language plpgsql security definer as $$
declare
  v_window_start timestamptz;
  v_count integer;
begin
  v_window_start := date_trunc('second', now()) - make_interval(secs => extract(epoch from now())::int % p_window_seconds);

  insert into public.rate_limits (identifier, route, window_start, count)
  values (p_identifier, p_route, v_window_start, 1)
  on conflict (identifier, route, window_start)
  do update set count = rate_limits.count + 1, updated_at = now()
  returning count into v_count;

  return query select
    v_count <= p_max_requests,
    v_count,
    v_window_start + make_interval(secs => p_window_seconds);
end;
$$;

-- Purge auto entrées > 24h (appelé par cron purge-tokens existant)
create or replace function public.purge_old_rate_limits() returns void
language plpgsql security definer as $$
begin
  delete from public.rate_limits where window_start < now() - interval '24 hours';
end;
$$;

alter table public.rate_limits enable row level security;
drop policy if exists "rate_limits_service_role_all" on public.rate_limits;
create policy "rate_limits_service_role_all" on public.rate_limits
  for all using (auth.role() = 'service_role');

comment on table public.rate_limits is 'Token bucket rate limiting par (route, identifier) avec window fixe.';
comment on function public.check_rate_limit is 'RPC atomic increment + return allowed/count/reset_at.';
