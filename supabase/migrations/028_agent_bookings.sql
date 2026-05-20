-- 028_agent_bookings.sql
-- Agentic Booking — leads créés via /api/v1/agents/booking par LLM/agents externes.
--
-- Compliance:
--   - Consent explicite obligatoire (RGPD)
--   - Source tracking (quel LLM/agent a généré le lead)
--   - Pseudonymisation possible si user_pseudo_id fourni

create table if not exists public.agent_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique,
  -- Format: 'AGT-' || timestamp_compact || '-' || random4
  user_email text not null,
  user_first_name text,
  user_last_name text,
  user_phone text,
  garantie_souhaitee text not null,
  metier text,
  statut_juridique text,
  ca_annuel numeric,
  ville text,
  message text,
  preferred_contact_window text,
  -- 'morning' | 'afternoon' | 'evening' | 'asap'
  agent_source text not null,
  -- 'openai' | 'anthropic' | 'perplexity' | 'gemini' | 'mcp' | 'other'
  agent_session_id text,
  agent_user_pseudo_id text,
  oauth_client_id text references public.oauth_clients(client_id) on delete set null,
  consent_at timestamptz not null,
  consent_text text not null,
  status text not null default 'pending' check (status in ('pending', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  marvin_notified_at timestamptz,
  contacted_at timestamptz,
  qualified_at timestamptz,
  resolved_at timestamptz,
  resolution_notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_agent_bookings_email on public.agent_bookings(user_email);
create index if not exists idx_agent_bookings_status on public.agent_bookings(status, created_at desc);
create index if not exists idx_agent_bookings_source on public.agent_bookings(agent_source, created_at desc);
create index if not exists idx_agent_bookings_oauth_client on public.agent_bookings(oauth_client_id) where oauth_client_id is not null;

-- RLS: service_role only
alter table public.agent_bookings enable row level security;

drop policy if exists "agent_bookings_service_role_all" on public.agent_bookings;
create policy "agent_bookings_service_role_all" on public.agent_bookings
  for all using (auth.role() = 'service_role');

comment on table public.agent_bookings is 'Leads générés via /api/v1/agents/booking par LLM/agents externes (ChatGPT/Claude/Perplexity/Gemini).';
