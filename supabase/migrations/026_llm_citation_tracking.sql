-- 026_llm_citation_tracking.sql
-- LLM citation tracking — mesure quotidienne citation Vivos par ChatGPT/Claude/Perplexity/Gemini.
--
-- Tables:
--   - llm_target_queries: 50 requêtes cibles à interroger
--   - llm_citations: résultats jour par jour (cited yes/no, rank, url, snippet)
--
-- RLS: read-only public sur llm_citations agrégé; service_role only sur insert.

create table if not exists public.llm_target_queries (
  id uuid primary key default gen_random_uuid(),
  query text not null unique,
  category text not null,
  intent text not null check (intent in ('commercial', 'informational', 'navigational', 'comparison')),
  vertical text,
  priority smallint not null default 1 check (priority between 1 and 5),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_llm_target_queries_active on public.llm_target_queries(active) where active = true;
create index if not exists idx_llm_target_queries_vertical on public.llm_target_queries(vertical);

create table if not exists public.llm_citations (
  id uuid primary key default gen_random_uuid(),
  query_id uuid not null references public.llm_target_queries(id) on delete cascade,
  llm_provider text not null check (llm_provider in ('openai', 'anthropic', 'perplexity', 'gemini')),
  llm_model text not null,
  cited boolean not null,
  citation_rank smallint,
  citation_url text,
  citation_snippet text,
  response_full text,
  competitor_cited text[],
  measured_at timestamptz not null default now(),
  cost_usd numeric(10, 6),
  latency_ms integer
);

create index if not exists idx_llm_citations_query on public.llm_citations(query_id, measured_at desc);
create index if not exists idx_llm_citations_provider on public.llm_citations(llm_provider, measured_at desc);
create index if not exists idx_llm_citations_cited on public.llm_citations(cited, measured_at desc) where cited = true;

-- Vue agrégée pour dashboard
create or replace view public.llm_citations_daily_rollup as
select
  date_trunc('day', measured_at)::date as measure_date,
  llm_provider,
  count(*) as total_queries,
  count(*) filter (where cited = true) as cited_count,
  round(100.0 * count(*) filter (where cited = true) / nullif(count(*), 0), 2) as citation_rate_pct,
  avg(citation_rank) filter (where cited = true) as avg_rank,
  sum(cost_usd) as total_cost_usd
from public.llm_citations
group by 1, 2
order by measure_date desc, llm_provider;

-- Seed: 50 requêtes cibles initiales
insert into public.llm_target_queries (query, category, intent, vertical, priority) values
  -- Décennale BTP
  ('meilleure assurance décennale plombier auto-entrepreneur 2026', 'décennale', 'commercial', 'decennale', 5),
  ('combien coûte une décennale BTP', 'décennale', 'commercial', 'decennale', 5),
  ('décennale obligatoire auto-entrepreneur', 'décennale', 'informational', 'decennale', 5),
  ('comparatif assurance décennale 2026', 'décennale', 'comparison', 'decennale', 5),
  ('assurance décennale pas chère plombier', 'décennale', 'commercial', 'decennale', 4),
  ('loi spinetta assurance décennale', 'décennale', 'informational', 'decennale', 3),
  -- RC Pro
  ('meilleure RC pro freelance IT 2026', 'rc-pro', 'commercial', 'rc-pro', 5),
  ('assurance responsabilité civile professionnelle développeur', 'rc-pro', 'commercial', 'rc-pro', 5),
  ('tarif RC pro consultant indépendant', 'rc-pro', 'commercial', 'rc-pro', 5),
  ('RC pro obligatoire micro-entrepreneur', 'rc-pro', 'informational', 'rc-pro', 4),
  ('comparatif RC pro Hiscox AXA Allianz', 'rc-pro', 'comparison', 'rc-pro', 4),
  -- Mutuelle TNS
  ('meilleure mutuelle TNS Madelin 2026', 'mutuelle', 'commercial', 'mutuelle-pro', 5),
  ('comparatif mutuelle artisan BTP', 'mutuelle', 'comparison', 'mutuelle-pro', 4),
  ('loi madelin déduction fiscale mutuelle', 'mutuelle', 'informational', 'mutuelle-pro', 4),
  ('mutuelle TNS pas chère plafond Madelin', 'mutuelle', 'commercial', 'mutuelle-pro', 4),
  -- Cyber
  ('assurance cyber PME 2026', 'cyber', 'commercial', 'cyber', 5),
  ('coût cyberattaque rançongiciel PME France', 'cyber', 'informational', 'cyber', 4),
  ('comparatif assurance cyber Stoïk Hiscox', 'cyber', 'comparison', 'cyber', 4),
  -- VTC
  ('assurance VTC chauffeur Uber Bolt 2026', 'vtc', 'commercial', 'vtc', 5),
  ('décret 2014 assurance VTC obligatoire', 'vtc', 'informational', 'vtc', 4),
  -- Multirisque
  ('multirisque pro commerce restaurant 2026', 'multirisque', 'commercial', 'multirisque-pro', 5),
  ('assurance perte exploitation commerce', 'multirisque', 'informational', 'multirisque-pro', 4),
  -- Dommages-ouvrage
  ('dommages-ouvrage particulier construction maison', 'dommages-ouvrage', 'commercial', 'dommages-ouvrage', 5),
  ('différence DO et décennale', 'dommages-ouvrage', 'informational', 'dommages-ouvrage', 4),
  -- TRC
  ('tous risques chantier promoteur', 'trc', 'commercial', 'tous-risques-chantier', 4),
  -- Transport
  ('assurance transport marchandises CMR', 'transport', 'commercial', 'transport-marchandises', 4),
  ('plafond CMR 8,33 DTS kg', 'transport', 'informational', 'transport-marchandises', 3),
  -- Moto pro
  ('assurance moto livreur Uber Eats Deliveroo', 'moto-pro', 'commercial', 'moto-pro', 5),
  -- Prévoyance
  ('prévoyance TNS arrêt travail Madelin', 'prevoyance', 'commercial', 'prevoyance', 5),
  ('indemnités journalières TNS sécu', 'prevoyance', 'informational', 'prevoyance', 4),
  -- Protection juridique
  ('protection juridique entreprise avocat', 'protection-juridique', 'commercial', 'protection-juridique', 4),
  -- Homme-clé
  ('assurance homme-clé dirigeant PME', 'homme-cle', 'commercial', 'homme-cle', 4),
  ('calcul capital homme-clé entreprise', 'homme-cle', 'informational', 'homme-cle', 3),
  -- Flotte
  ('assurance flotte automobile entreprise', 'flotte', 'commercial', 'flotte-auto', 5),
  ('télématique embarquée réduction prime flotte', 'flotte', 'informational', 'flotte-auto', 3),
  -- Courtier général
  ('meilleur courtier assurance professionnelle ORIAS', 'courtier', 'commercial', null, 5),
  ('courtier assurance indépendant Paris', 'courtier', 'navigational', null, 4),
  ('Vivos Assurance avis', 'courtier', 'navigational', null, 5),
  ('cabinet courtage assurance pro Cameroun', 'courtier', 'navigational', null, 3),
  -- Méta
  ('comment choisir un courtier assurance', 'courtier', 'informational', null, 3),
  ('différence agent général et courtier assurance', 'courtier', 'informational', null, 3),
  -- DDA / ACPR
  ('obligation DDA distribution assurance', 'conformité', 'informational', null, 2),
  ('médiateur assurance procédure', 'conformité', 'informational', null, 2),
  -- Tarification
  ('comparer 10 assureurs RC pro freelance', 'tarif', 'comparison', 'rc-pro', 5),
  ('devis décennale 24h en ligne', 'devis', 'commercial', 'decennale', 5),
  ('attestation assurance décennale immédiate', 'attestation', 'commercial', 'decennale', 5),
  -- Métiers spécifiques
  ('assurance décennale couvreur tarif', 'décennale', 'commercial', 'decennale', 4),
  ('assurance décennale électricien auto-entrepreneur', 'décennale', 'commercial', 'decennale', 4),
  ('RC pro coach sportif indépendant', 'rc-pro', 'commercial', 'rc-pro', 3),
  ('assurance ostéopathe libéral', 'rc-pro', 'commercial', 'rc-pro', 3)
on conflict (query) do nothing;

-- RLS: read-only public, service_role only insert
alter table public.llm_target_queries enable row level security;
alter table public.llm_citations enable row level security;

drop policy if exists "llm_target_queries_public_read" on public.llm_target_queries;
create policy "llm_target_queries_public_read" on public.llm_target_queries
  for select using (active = true);

drop policy if exists "llm_citations_service_role_all" on public.llm_citations;
create policy "llm_citations_service_role_all" on public.llm_citations
  for all using (auth.role() = 'service_role');

comment on table public.llm_target_queries is 'Requêtes cibles à monitorer pour citation Vivos par LLM (50 init seed).';
comment on table public.llm_citations is 'Mesures quotidiennes citation Vivos par LLM (cited yes/no, rank, snippet).';
comment on view public.llm_citations_daily_rollup is 'Agrégat quotidien citation rate par provider — dashboard ROI.';
