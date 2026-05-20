-- 029_webhooks_subscriptions.sql
-- Webhooks subscriptions production-grade — partenaires + LLM stores reçoivent events temps réel.
--
-- Pattern: Stripe / GitHub webhooks.
--   - HMAC-SHA256 signature dans header X-Vivos-Signature
--   - Header X-Vivos-Event (event type), X-Vivos-Delivery (UUID delivery)
--   - Retry exponentiel (1m, 5m, 30m, 3h, 12h) + dead-letter après 5 échecs
--
-- Events supportés:
--   - agent_booking.created / .qualified / .won
--   - llm_citation.detected
--   - mcp.proof.signed
--   - test.ping (manual via /api/v1/webhooks/test)

create table if not exists public.webhook_endpoints (
  id uuid primary key default gen_random_uuid(),
  oauth_client_id text references public.oauth_clients(client_id) on delete cascade,
  url text not null,
  secret_hash text not null,
  -- SHA-256 du secret (lookup index pour révocation par hash, audit)
  secret_encrypted text not null,
  -- AES-256-GCM(WEBHOOK_ENCRYPTION_KEY, secret) — déchiffré au moment du signing
  secret_preview text not null,
  -- 8 derniers caractères pour identification
  description text,
  events text[] not null,
  active boolean not null default true,
  failure_count integer not null default 0,
  -- Compteur échecs consécutifs (>=10 = auto-disable)
  last_delivery_at timestamptz,
  last_success_at timestamptz,
  last_failure_at timestamptz,
  created_at timestamptz not null default now(),
  disabled_at timestamptz
);

create index if not exists idx_webhook_endpoints_active on public.webhook_endpoints(active) where active = true;
create index if not exists idx_webhook_endpoints_oauth on public.webhook_endpoints(oauth_client_id) where oauth_client_id is not null;
create index if not exists idx_webhook_endpoints_events on public.webhook_endpoints using gin(events);

create table if not exists public.webhook_deliveries (
  id uuid primary key default gen_random_uuid(),
  endpoint_id uuid not null references public.webhook_endpoints(id) on delete cascade,
  event_type text not null,
  payload jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'success', 'failed', 'dead_letter')),
  attempts integer not null default 0,
  response_status integer,
  response_body text,
  -- Tronqué 8 ko max
  response_headers jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  next_retry_at timestamptz,
  delivered_at timestamptz
);

create index if not exists idx_webhook_deliveries_endpoint on public.webhook_deliveries(endpoint_id, created_at desc);
create index if not exists idx_webhook_deliveries_pending on public.webhook_deliveries(next_retry_at) where status = 'pending';
create index if not exists idx_webhook_deliveries_failed on public.webhook_deliveries(status, created_at desc) where status in ('failed', 'dead_letter');

-- RLS: service_role only
alter table public.webhook_endpoints enable row level security;
alter table public.webhook_deliveries enable row level security;

drop policy if exists "webhook_endpoints_service_role_all" on public.webhook_endpoints;
create policy "webhook_endpoints_service_role_all" on public.webhook_endpoints
  for all using (auth.role() = 'service_role');

drop policy if exists "webhook_deliveries_service_role_all" on public.webhook_deliveries;
create policy "webhook_deliveries_service_role_all" on public.webhook_deliveries
  for all using (auth.role() = 'service_role');

-- Vue rollup dashboard
create or replace view public.webhook_deliveries_rollup as
select
  endpoint_id,
  date_trunc('day', created_at)::date as delivery_date,
  count(*) as total,
  count(*) filter (where status = 'success') as success,
  count(*) filter (where status = 'failed') as failed,
  count(*) filter (where status = 'dead_letter') as dead_letter,
  round(100.0 * count(*) filter (where status = 'success') / nullif(count(*), 0), 2) as success_rate_pct,
  avg(attempts) as avg_attempts
from public.webhook_deliveries
group by 1, 2
order by delivery_date desc, endpoint_id;

comment on table public.webhook_endpoints is 'Endpoints abonnés aux events Vivos — secret HMAC stocké hashé.';
comment on table public.webhook_deliveries is 'Historique deliveries avec retry exponentiel + dead-letter.';
comment on view public.webhook_deliveries_rollup is 'Dashboard fiabilité webhooks par endpoint / jour.';
