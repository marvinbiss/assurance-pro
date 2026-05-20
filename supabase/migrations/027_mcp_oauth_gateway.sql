-- 027_mcp_oauth_gateway.sql
-- OAuth 2.1 (PKCE) gateway pour MCP — activation stores ChatGPT Apps / Claude Apps Store.
--
-- Tables:
--   - oauth_clients: clients enregistrés (OpenAI, Anthropic, Perplexity, Gemini stores)
--   - oauth_authorization_codes: codes courts (10 min) flow PKCE
--   - oauth_tokens: access tokens (1h) + refresh tokens (30j)
--
-- Compliance: RFC 6749 + RFC 7636 (PKCE) + RFC 8252 (apps natifs).

create table if not exists public.oauth_clients (
  id uuid primary key default gen_random_uuid(),
  client_id text not null unique,
  client_secret_hash text not null,
  client_name text not null,
  redirect_uris text[] not null,
  allowed_scopes text[] not null default array['mcp:tools', 'mcp:resources'],
  active boolean not null default true,
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

create index if not exists idx_oauth_clients_client_id on public.oauth_clients(client_id) where active = true;

create table if not exists public.oauth_authorization_codes (
  code text primary key,
  client_id text not null references public.oauth_clients(client_id) on delete cascade,
  redirect_uri text not null,
  scope text not null,
  code_challenge text not null,
  code_challenge_method text not null check (code_challenge_method in ('S256')),
  user_pseudo_id text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  used boolean not null default false
);

create index if not exists idx_oauth_auth_codes_client on public.oauth_authorization_codes(client_id);
create index if not exists idx_oauth_auth_codes_expires on public.oauth_authorization_codes(expires_at) where used = false;

create table if not exists public.oauth_tokens (
  id uuid primary key default gen_random_uuid(),
  access_token_hash text not null unique,
  refresh_token_hash text unique,
  client_id text not null references public.oauth_clients(client_id) on delete cascade,
  user_pseudo_id text not null,
  scope text not null,
  issued_at timestamptz not null default now(),
  access_expires_at timestamptz not null default (now() + interval '1 hour'),
  refresh_expires_at timestamptz not null default (now() + interval '30 days'),
  revoked boolean not null default false,
  revoked_at timestamptz,
  last_used_at timestamptz
);

create index if not exists idx_oauth_tokens_access on public.oauth_tokens(access_token_hash) where revoked = false;
create index if not exists idx_oauth_tokens_refresh on public.oauth_tokens(refresh_token_hash) where revoked = false and refresh_token_hash is not null;
create index if not exists idx_oauth_tokens_client on public.oauth_tokens(client_id, issued_at desc);

-- RLS: service_role only
alter table public.oauth_clients enable row level security;
alter table public.oauth_authorization_codes enable row level security;
alter table public.oauth_tokens enable row level security;

drop policy if exists "oauth_clients_service_role_all" on public.oauth_clients;
create policy "oauth_clients_service_role_all" on public.oauth_clients
  for all using (auth.role() = 'service_role');

drop policy if exists "oauth_auth_codes_service_role_all" on public.oauth_authorization_codes;
create policy "oauth_auth_codes_service_role_all" on public.oauth_authorization_codes
  for all using (auth.role() = 'service_role');

drop policy if exists "oauth_tokens_service_role_all" on public.oauth_tokens;
create policy "oauth_tokens_service_role_all" on public.oauth_tokens
  for all using (auth.role() = 'service_role');

-- Purge automatique tokens expirés (cron daily)
create or replace function public.purge_expired_oauth_artifacts() returns void
language plpgsql security definer as $$
begin
  delete from public.oauth_authorization_codes where expires_at < now() - interval '1 day';
  delete from public.oauth_tokens
    where (access_expires_at < now() - interval '7 days' and refresh_expires_at < now())
       or (revoked = true and revoked_at < now() - interval '30 days');
end;
$$;

comment on table public.oauth_clients is 'Clients OAuth 2.1 enregistrés (OpenAI/Anthropic/Perplexity/Gemini stores).';
comment on table public.oauth_authorization_codes is 'Codes PKCE courts (10 min TTL) flow authorization_code.';
comment on table public.oauth_tokens is 'Access tokens (1h) + refresh tokens (30j) — hashés SHA-256.';
