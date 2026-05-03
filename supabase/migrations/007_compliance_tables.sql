-- ============================================================
-- 007_compliance_tables.sql
-- Tables conformité courtage : réclamations ACPR 2024-R-02,
-- leads + routing assureurs, conseil DDA L. 521-4, googlebot logs.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. RECLAMATIONS (ACPR 2024-R-02)
-- ─────────────────────────────────────────────────────────────

create table if not exists public.reclamations (
  id uuid primary key default gen_random_uuid(),
  ticket text not null unique,                 -- ex: RCL-20260430-AB12X
  civilite text,
  nom text not null,
  prenom text not null,
  email text not null,
  telephone text,
  societe text,
  contrat text,
  sinistre_ref text,
  categorie text not null check (categorie in (
    'conseil','souscription','sinistre','resiliation','facturation','rgpd','autre'
  )),
  objet text not null,
  message text not null,
  ip inet,
  user_agent text,
  status text not null default 'received' check (status in (
    'received','acknowledged','in_review','responded','closed','escalated_mediation'
  )),
  acknowledged_at timestamptz,                 -- ACPR : <= 10 jours ouvrés
  responded_at timestamptz,                    -- ACPR : <= 2 mois
  response_text text,
  closed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_reclamations_ticket on public.reclamations (ticket);
create index if not exists idx_reclamations_email on public.reclamations (email);
create index if not exists idx_reclamations_status_created on public.reclamations (status, created_at desc);

alter table public.reclamations enable row level security;

drop policy if exists "reclamations_no_public_read" on public.reclamations;
create policy "reclamations_no_public_read" on public.reclamations
  for select using (false);

drop policy if exists "reclamations_no_public_write" on public.reclamations;
create policy "reclamations_no_public_write" on public.reclamations
  for insert with check (false);

comment on table public.reclamations is
  'Registre des réclamations conforme Recommandation ACPR 2024-R-02. RLS verrouillé : accès uniquement via service_role (admin) ou rôle staff.';

-- ─────────────────────────────────────────────────────────────
-- 2. LEADS (devis assurance) + routing
-- ─────────────────────────────────────────────────────────────

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,              -- ex: LEAD-20260430-AB12X
  vertical text not null,                      -- decennale / rc-pro / mutuelle / vtc / cyber / multirisque
  metier_slug text,
  profession_slug text,
  forme_juridique text,                        -- ae / ei / sarl / sas / sci / pro_lib / autre
  ca_annuel_eur numeric(12,2),
  effectif int,
  region_slug text,
  departement_code text,
  ville text,
  ville_cp text,
  contact_civilite text,
  contact_prenom text,
  contact_nom text,
  contact_email text not null,
  contact_telephone text,
  message text,
  scoring text check (scoring in ('hot','warm','cold')),
  scoring_score int,
  routing_partners jsonb not null default '[]'::jsonb,
  utm jsonb default '{}'::jsonb,
  ip inet,
  user_agent text,
  status text not null default 'new' check (status in (
    'new','routed','contacted','quoted','won','lost','spam'
  )),
  consent_dda boolean not null default false,
  consent_marketing boolean not null default false,
  conseil_hash text,                           -- SHA-256 traçabilité conseil DDA
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_leads_reference on public.leads (reference);
create index if not exists idx_leads_email on public.leads (contact_email);
create index if not exists idx_leads_vertical_status on public.leads (vertical, status, created_at desc);
create index if not exists idx_leads_scoring on public.leads (scoring) where scoring is not null;

alter table public.leads enable row level security;

drop policy if exists "leads_no_public_read" on public.leads;
create policy "leads_no_public_read" on public.leads for select using (false);

drop policy if exists "leads_no_public_write" on public.leads;
create policy "leads_no_public_write" on public.leads for insert with check (false);

comment on table public.leads is
  'Demandes de devis assurance pro. RLS verrouillé : accès via service_role uniquement.';

-- Trigger updated_at
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists tg_leads_set_updated_at on public.leads;
create trigger tg_leads_set_updated_at before update on public.leads
  for each row execute function public.tg_set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 3. CONSEIL DDA — traçabilité art. L. 521-4 + ACPR 2024-R-03
-- ─────────────────────────────────────────────────────────────

create table if not exists public.conseil_records (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  reference text not null unique,
  besoins jsonb not null,                      -- exigences/besoins recueillis
  recommandations jsonb not null,              -- garanties recommandées + motivations
  produits_proposes jsonb not null default '[]'::jsonb,
  signature_hash text not null,                -- SHA-256 du dossier conseil (preuve immuable)
  signed_by_email text,
  signed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_conseil_lead on public.conseil_records (lead_id);
create index if not exists idx_conseil_signature on public.conseil_records (signature_hash);

alter table public.conseil_records enable row level security;

drop policy if exists "conseil_no_public" on public.conseil_records;
create policy "conseil_no_public" on public.conseil_records for select using (false);
drop policy if exists "conseil_no_public_w" on public.conseil_records;
create policy "conseil_no_public_w" on public.conseil_records for insert with check (false);

comment on table public.conseil_records is
  'Traçabilité conseil DDA art. L. 521-4 + ACPR 2024-R-03. Signature SHA-256 immuable.';

-- ─────────────────────────────────────────────────────────────
-- 4. GOOGLEBOT LOGS (référencé dans middleware.ts)
-- ─────────────────────────────────────────────────────────────

create table if not exists public.googlebot_logs (
  id bigserial primary key,
  url text not null,
  user_agent text not null,
  hit_at timestamptz not null default now()
);

create index if not exists idx_googlebot_url_hitat on public.googlebot_logs (url, hit_at desc);
create index if not exists idx_googlebot_hitat on public.googlebot_logs (hit_at desc);

alter table public.googlebot_logs enable row level security;

drop policy if exists "googlebot_no_public" on public.googlebot_logs;
create policy "googlebot_no_public" on public.googlebot_logs for select using (false);
drop policy if exists "googlebot_no_public_w" on public.googlebot_logs;
create policy "googlebot_no_public_w" on public.googlebot_logs for insert with check (false);

-- ─────────────────────────────────────────────────────────────
-- 5. NEWSLETTER OPT-IN
-- ─────────────────────────────────────────────────────────────

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  consent_at timestamptz not null default now(),
  consent_ip inet,
  status text not null default 'pending' check (status in (
    'pending','confirmed','unsubscribed'
  )),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  source text
);

create index if not exists idx_newsletter_status on public.newsletter_subscribers (status);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_no_public" on public.newsletter_subscribers;
create policy "newsletter_no_public" on public.newsletter_subscribers for select using (false);
drop policy if exists "newsletter_no_public_w" on public.newsletter_subscribers;
create policy "newsletter_no_public_w" on public.newsletter_subscribers for insert with check (false);
