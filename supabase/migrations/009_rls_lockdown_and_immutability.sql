-- ============================================================
-- 009_rls_lockdown_and_immutability.sql
-- Audit security findings (Security Auditor + Compliance Auditor)
--
-- A) Verrouille RLS sur toutes les tables sensibles des schémas app/audit
--    qui stockent des PII (insurance_leads) ou des preuves DDA (audit.*).
-- B) Rend conseil_records immuable au niveau DB (pas d'UPDATE/DELETE)
--    pour produire une preuve opposable en audit ACPR 2024-R-03.
-- C) Calcule sla_acknowledge_deadline et sla_response_deadline
--    sur les réclamations à l'INSERT pour tracking ACPR 2024-R-02.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- A. RLS lockdown — schéma app
-- ─────────────────────────────────────────────────────────────

do $$
declare
  r record;
begin
  for r in
    select schemaname, tablename
    from pg_tables
    where schemaname in ('app', 'audit')
  loop
    execute format('alter table %I.%I enable row level security;', r.schemaname, r.tablename);
    -- Deny-by-default policies : seul service_role (qui bypass RLS) peut accéder.
    execute format(
      'drop policy if exists "%I_deny_all_select" on %I.%I;',
      r.tablename, r.schemaname, r.tablename
    );
    execute format(
      'create policy "%I_deny_all_select" on %I.%I for select using (false);',
      r.tablename, r.schemaname, r.tablename
    );
    execute format(
      'drop policy if exists "%I_deny_all_write" on %I.%I;',
      r.tablename, r.schemaname, r.tablename
    );
    execute format(
      'create policy "%I_deny_all_write" on %I.%I for all using (false) with check (false);',
      r.tablename, r.schemaname, r.tablename
    );
  end loop;
end$$;

comment on schema app is
  'Tables métier — RLS verrouillée par défaut, accès via service_role uniquement. Migration 009 sécurise toutes les tables existantes ; toute nouvelle table doit explicitement déclarer ses policies.';

-- ─────────────────────────────────────────────────────────────
-- B. Immuabilité des dossiers conseil DDA
-- ─────────────────────────────────────────────────────────────

create or replace function public.tg_conseil_records_immutable()
returns trigger language plpgsql as $$
begin
  raise exception 'conseil_records est immuable (preuve DDA art. L. 521-4 / ACPR 2024-R-03). UPDATE/DELETE interdit.'
    using errcode = 'integrity_constraint_violation';
end$$;

drop trigger if exists tg_conseil_records_no_update on public.conseil_records;
create trigger tg_conseil_records_no_update
  before update on public.conseil_records
  for each row execute function public.tg_conseil_records_immutable();

drop trigger if exists tg_conseil_records_no_delete on public.conseil_records;
create trigger tg_conseil_records_no_delete
  before delete on public.conseil_records
  for each row execute function public.tg_conseil_records_immutable();

comment on table public.conseil_records is
  'Preuve DDA art. L. 521-4 + Recommandation ACPR 2024-R-03. IMMUTABLE : trigger anti-UPDATE/DELETE actif. Conservation : 10 ans minimum (Loi 2008-561, prescription quinquennale + 5 ans).';

-- Idem pour conseil_traceability si la table existe dans audit.*
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'audit' and table_name = 'conseil_traceability'
  ) then
    execute 'drop trigger if exists tg_conseil_traceability_no_update on audit.conseil_traceability';
    execute 'create trigger tg_conseil_traceability_no_update '
            || 'before update on audit.conseil_traceability '
            || 'for each row execute function public.tg_conseil_records_immutable()';
    execute 'drop trigger if exists tg_conseil_traceability_no_delete on audit.conseil_traceability';
    execute 'create trigger tg_conseil_traceability_no_delete '
            || 'before delete on audit.conseil_traceability '
            || 'for each row execute function public.tg_conseil_records_immutable()';
  end if;
end$$;

-- ─────────────────────────────────────────────────────────────
-- C. SLA réclamations ACPR 2024-R-02 calculés à l'INSERT
-- ─────────────────────────────────────────────────────────────

alter table public.reclamations
  add column if not exists sla_acknowledge_deadline timestamptz,
  add column if not exists sla_response_deadline    timestamptz,
  add column if not exists sla_acknowledge_breached boolean not null default false,
  add column if not exists sla_response_breached    boolean not null default false;

create or replace function public.tg_reclamations_set_sla()
returns trigger language plpgsql as $$
begin
  -- Recommandation ACPR 2024-R-02 : accusé sous 10 jours ouvrés (~14 jours calendaires).
  if new.sla_acknowledge_deadline is null then
    new.sla_acknowledge_deadline = new.created_at + interval '14 days';
  end if;
  -- Réponse au fond sous 2 mois maximum.
  if new.sla_response_deadline is null then
    new.sla_response_deadline = new.created_at + interval '2 months';
  end if;
  return new;
end$$;

drop trigger if exists tg_reclamations_set_sla on public.reclamations;
create trigger tg_reclamations_set_sla
  before insert on public.reclamations
  for each row execute function public.tg_reclamations_set_sla();

-- Vue pour cron de rappel SLA (réclamations en retard).
create or replace view public.v_reclamations_sla_alerts as
select
  id,
  ticket,
  email,
  status,
  created_at,
  sla_acknowledge_deadline,
  sla_response_deadline,
  case
    when status in ('received')
         and sla_acknowledge_deadline < now()
      then true else false
  end as is_acknowledge_breach,
  case
    when status not in ('responded','closed')
         and sla_response_deadline < now()
      then true else false
  end as is_response_breach
from public.reclamations
where status not in ('closed','escalated_mediation');

comment on view public.v_reclamations_sla_alerts is
  'Réclamations à risque ACPR 2024-R-02 : SLA accusé (10j ouvrés) ou SLA réponse (2 mois) franchi. Cron à brancher pour notification interne.';

-- ─────────────────────────────────────────────────────────────
-- C-bis. FIC / IPID — accusé de prise de connaissance précontractuel
--        (art. L. 521-2 du Code des assurances).
-- ─────────────────────────────────────────────────────────────

alter table public.leads
  add column if not exists fic_acknowledged_at timestamptz,
  add column if not exists fic_acknowledged_ip inet,
  add column if not exists fic_acknowledged_ua text,
  add column if not exists fic_acknowledged_version text default 'v1';

comment on column public.leads.fic_acknowledged_at is
  'Horodatage de l''accusé de prise de connaissance FIC + IPID (art. L. 521-2 C. assur.). NOT NULL est requis avant souscription.';

-- ─────────────────────────────────────────────────────────────
-- D. Newsletter — registre de consentement RGPD art. 7
-- ─────────────────────────────────────────────────────────────

alter table public.newsletter_subscribers
  add column if not exists consent_proof_text text,
  add column if not exists consent_proof_lang text default 'fr',
  add column if not exists consent_user_agent text;

comment on column public.newsletter_subscribers.consent_proof_text is
  'Texte exact de la case à cocher au moment du consentement (preuve RGPD art. 7 : démontrabilité du consentement).';
