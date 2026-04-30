-- ============================================================================
-- Migration 004 — Tables spécifiques assurance pro
-- 11 tables critiques pour le projet (créées de zéro)
-- ============================================================================

-- ============================================================================
-- 1. GARANTIES_ASSURANCE (10 garanties principales)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.garanties_assurance (
  code            text PRIMARY KEY,
  name            text NOT NULL,
  slug            text NOT NULL UNIQUE,
  category        text NOT NULL,                     -- 'obligatoire' | 'facultative' | 'complementaire'
  obligation_legale boolean DEFAULT false,
  reference_legale text,                              -- ex: 'art. 1792 Code civil'
  description_courte text,
  description_longue text,
  metiers_concernes text[] DEFAULT '{}',
  is_active       boolean NOT NULL DEFAULT true,
  sort_order      integer DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

INSERT INTO app.garanties_assurance (code, name, slug, category, obligation_legale, reference_legale, sort_order) VALUES
  ('decennale', 'Garantie décennale', 'garantie-decennale', 'obligatoire', true, 'Loi Spinetta + art. L. 241-1 C. assur.', 1),
  ('rc_pro', 'Responsabilité Civile Professionnelle', 'rc-pro', 'obligatoire', true, 'art. L. 121-2 C. assur.', 2),
  ('multirisque_pro', 'Multirisque Professionnelle', 'multirisque-pro', 'facultative', false, null, 3),
  ('dommages_ouvrage', 'Dommages-Ouvrage', 'dommages-ouvrage', 'obligatoire', true, 'art. L. 242-1 C. assur.', 4),
  ('trc', 'Tous Risques Chantier', 'tous-risques-chantier', 'facultative', false, null, 5),
  ('garantie_financiere', 'Garantie Financière BTP', 'garantie-financiere-btp', 'facultative', false, null, 6),
  ('flotte_auto_pro', 'Flotte Auto Pro', 'flotte-auto-pro', 'obligatoire', true, 'art. L. 211-1 C. assur.', 7),
  ('prevoyance_tns', 'Prévoyance TNS', 'prevoyance-tns', 'facultative', false, 'Loi Madelin', 8),
  ('mutuelle_pro', 'Mutuelle / Santé Pro', 'mutuelle-pro', 'facultative', false, null, 9),
  ('protection_juridique', 'Protection Juridique Pro', 'protection-juridique-pro', 'facultative', false, null, 10),
  ('cyber', 'Cyber Assurance', 'cyber-assurance', 'facultative', false, 'RGPD art. 32', 11)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 2. STATUTS_JURIDIQUES (5 statuts principaux)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.statuts_juridiques (
  code            text PRIMARY KEY,
  name            text NOT NULL,
  slug            text NOT NULL UNIQUE,
  ca_plafond_services numeric(12,2),
  ca_plafond_vente   numeric(12,2),
  multiplier_prime numeric(4,3) NOT NULL DEFAULT 1.000,
  is_tns          boolean DEFAULT false,
  description     text,
  sort_order      integer DEFAULT 0
);

INSERT INTO app.statuts_juridiques (code, name, slug, ca_plafond_services, ca_plafond_vente, multiplier_prime, is_tns, sort_order) VALUES
  ('auto_entrepreneur', 'Auto-entrepreneur / Micro', 'auto-entrepreneur', 77700, 188700, 1.000, true, 1),
  ('ei', 'Entreprise Individuelle (EI)', 'entreprise-individuelle', null, null, 1.000, true, 2),
  ('eurl', 'EURL', 'eurl', null, null, 1.050, true, 3),
  ('sarl', 'SARL', 'sarl', null, null, 1.100, false, 4),
  ('sasu', 'SASU', 'sasu', null, null, 1.080, false, 5),
  ('sas', 'SAS', 'sas', null, null, 1.150, false, 6),
  ('profession_liberale', 'Profession libérale', 'profession-liberale', null, null, 1.020, true, 7)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 3. TRANCHES_CA (5 tranches)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.tranches_ca (
  code            text PRIMARY KEY,
  label           text NOT NULL,
  ca_min          numeric(12,2) NOT NULL,
  ca_max          numeric(12,2),
  multiplier      numeric(4,3) NOT NULL DEFAULT 1.000,
  sort_order      integer DEFAULT 0
);

INSERT INTO app.tranches_ca (code, label, ca_min, ca_max, multiplier, sort_order) VALUES
  ('lt_50k',   '< 50 000 €',           0,      49999,   0.85, 1),
  ('50_100k',  '50 000 - 100 000 €',   50000,  99999,   1.00, 2),
  ('100_250k', '100 000 - 250 000 €',  100000, 249999,  1.20, 3),
  ('250_500k', '250 000 - 500 000 €',  250000, 499999,  1.50, 4),
  ('gt_500k',  '> 500 000 €',          500000, NULL,    2.00, 5)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 4. TARIFS_ASSURANCE (TON MOAT — données propriétaires)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.tarifs_assurance (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metier_code     text NOT NULL REFERENCES app.metiers(code),
  garantie_code   text NOT NULL REFERENCES app.garanties_assurance(code),
  tranche_ca_code text REFERENCES app.tranches_ca(code),
  statut_juridique text REFERENCES app.statuts_juridiques(code),
  region          text,
  departement     text,

  -- Données tarif
  prime_min_eur   numeric(10,2) NOT NULL,
  prime_med_eur   numeric(10,2) NOT NULL,
  prime_max_eur   numeric(10,2) NOT NULL,
  echantillon_size integer NOT NULL DEFAULT 0,

  -- Source
  source          text NOT NULL CHECK (source IN ('proprietary','public_aggregator','partner_api','manual')),
  internal_devis_count integer DEFAULT 0,           -- TON MOAT
  last_devis_date date,

  -- Lifecycle
  collected_at    date NOT NULL DEFAULT current_date,
  valid_until     date,
  is_active       boolean NOT NULL DEFAULT true,

  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),

  UNIQUE (metier_code, garantie_code, tranche_ca_code, statut_juridique, region, collected_at)
);

CREATE INDEX IF NOT EXISTS tarifs_metier_garantie_idx
  ON app.tarifs_assurance(metier_code, garantie_code) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS tarifs_region_idx
  ON app.tarifs_assurance(region) WHERE is_active = true;

CREATE TRIGGER trg_tarifs_updated
  BEFORE UPDATE ON app.tarifs_assurance
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMENT ON TABLE app.tarifs_assurance IS 'TON MOAT UNIQUE — tarifs réels propriétaires + données publiques agrégées';

-- ============================================================================
-- 5. JURISPRUDENCE_ASSURANCE (Légifrance ingéré)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.jurisprudence_assurance (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legifrance_id   text UNIQUE,
  numero_pourvoi  text,
  date_arret      date NOT NULL,
  juridiction     text NOT NULL,                   -- 'Cass. civ. 3', 'CA Paris', etc.
  metier_code     text REFERENCES app.metiers(code),
  garantie_code   text REFERENCES app.garanties_assurance(code),
  type_sinistre   text,
  resume          text NOT NULL,
  enseignements   text NOT NULL,
  url_legifrance  text,
  importance      smallint CHECK (importance BETWEEN 1 AND 5),
  tsv             tsvector GENERATED ALWAYS AS (
    to_tsvector('french', coalesce(resume,'') || ' ' || coalesce(enseignements,''))
  ) STORED,
  ingested_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS jurispru_metier_idx ON app.jurisprudence_assurance(metier_code, date_arret DESC);
CREATE INDEX IF NOT EXISTS jurispru_garantie_idx ON app.jurisprudence_assurance(garantie_code, date_arret DESC);
CREATE INDEX IF NOT EXISTS jurispru_tsv_idx ON app.jurisprudence_assurance USING gin(tsv);

-- ============================================================================
-- 6. SINISTRES_AQC (AQC SYCODÉS — sinistralité décennale)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.sinistres_aqc (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metier_code     text NOT NULL REFERENCES app.metiers(code),
  annee           smallint NOT NULL,
  type_desordre   text NOT NULL,
  frequence_pct   numeric(5,2) NOT NULL,
  cout_moyen_eur  numeric(12,2) NOT NULL,
  region          text,
  source_aqc      text DEFAULT 'SYCODÉS',
  imported_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (metier_code, annee, type_desordre, region)
);

CREATE INDEX IF NOT EXISTS sinistres_metier_idx ON app.sinistres_aqc(metier_code, annee DESC);

-- ============================================================================
-- 7. ARTISANS_COUNT_SIRENE (densité par ville × métier)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.artisans_count_sirene (
  metier_code     text NOT NULL REFERENCES app.metiers(code),
  city_id         uuid NOT NULL REFERENCES app.cities(id),
  count_actifs    integer NOT NULL,
  refreshed_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (metier_code, city_id)
);

CREATE INDEX IF NOT EXISTS sirene_count_metier_idx ON app.artisans_count_sirene(metier_code);
CREATE INDEX IF NOT EXISTS sirene_count_city_idx ON app.artisans_count_sirene(city_id);

-- ============================================================================
-- 8. ORIAS_REGISTER_CACHE (cache registre courtiers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.orias_register_cache (
  orias_number    text PRIMARY KEY,
  legal_name      text,
  siret           text,
  category        text,                              -- 'IAS', 'IOBSP', 'CIF', 'IFP'
  status          text,
  immatriculation_date date,
  address         text,
  postal_code     text,
  city            text,
  raw_data        jsonb,
  last_synced_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orias_siret_idx ON app.orias_register_cache(siret) WHERE siret IS NOT NULL;

-- ============================================================================
-- 9. INSURANCE_LEADS (adapté de leads ServicesArtisans)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.insurance_leads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contexte produit
  vertical        text NOT NULL,
  metier_code     text REFERENCES app.metiers(code),
  garantie_code   text REFERENCES app.garanties_assurance(code),
  statut_juridique text REFERENCES app.statuts_juridiques(code),
  tranche_ca_code text REFERENCES app.tranches_ca(code),

  -- Source pSEO
  source_page_id  uuid REFERENCES public.cms_pages(id),
  source_url      text,
  utm             jsonb,

  -- Géo
  postal_code     text,
  city_id         uuid REFERENCES app.cities(id),
  department      text,
  region          text,
  geo             geography(Point, 4326),

  -- Profil entreprise
  siret           text,
  company_name    text,
  ca_declared     numeric(12,2),
  anciennete_annees integer,
  sinistralite_36m integer,                          -- nb sinistres 36 derniers mois
  sous_traitance  boolean DEFAULT false,

  -- Client (PII protégé via RLS)
  prenom          text NOT NULL,
  nom             text NOT NULL,
  email           citext NOT NULL,
  telephone       text NOT NULL,
  consent_rgpd    boolean NOT NULL,
  consent_marketing boolean DEFAULT false,

  -- Scoring & routing
  score           smallint,
  segment         text CHECK (segment IN ('hot','warm','cold')),
  routing_target  text DEFAULT 'insurer' CHECK (routing_target IN ('insurer','courtier','manual')),

  -- Status
  status          text NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new','contacted','quoted','negotiating','signed','refused','lost','expired')),
  assigned_courtier_id uuid REFERENCES app.profiles(id),

  -- Audit DDA L. 521-4 (CRITIQUE)
  conseil_delivered_at timestamptz,
  conseil_method  text,                              -- 'phone','email','docusign','meeting'
  conseil_proof   jsonb,

  -- Lifecycle
  expires_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_status_idx ON app.insurance_leads(status, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_score_idx ON app.insurance_leads(score DESC) WHERE status = 'new';
CREATE INDEX IF NOT EXISTS leads_metier_idx ON app.insurance_leads(metier_code, garantie_code);
CREATE INDEX IF NOT EXISTS leads_source_page_idx ON app.insurance_leads(source_page_id);
CREATE INDEX IF NOT EXISTS leads_geo_gist ON app.insurance_leads USING gist(geo) WHERE geo IS NOT NULL;

CREATE TRIGGER trg_leads_updated
  BEFORE UPDATE ON app.insurance_leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 10. DEVIS_SIMULES (audit trail dispatch assureurs)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.devis_simules (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         uuid NOT NULL REFERENCES app.insurance_leads(id) ON DELETE CASCADE,
  partner_id      uuid NOT NULL REFERENCES app.insurance_partners(id),

  -- Demande
  payload_in      jsonb NOT NULL,
  request_signature text,                            -- HMAC pour traçabilité

  -- Réponse
  payload_out     jsonb,
  http_status     integer,
  latency_ms      integer,

  -- Tarif retourné
  prime_ht_eur    numeric(10,2),
  prime_ttc_eur   numeric(10,2),
  conditions_pdf_url text,
  ipid_pdf_url    text,                              -- IPID/DIPA conforme DDA

  -- Status
  status          text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','sent','quoted','failed','accepted','rejected','expired')),

  -- Audit DDA
  conseil_validated boolean DEFAULT false,
  conseil_validator_id uuid REFERENCES app.profiles(id),

  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS devis_lead_idx ON app.devis_simules(lead_id);
CREATE INDEX IF NOT EXISTS devis_partner_idx ON app.devis_simules(partner_id, created_at DESC);

CREATE TRIGGER trg_devis_updated
  BEFORE UPDATE ON app.devis_simules
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 11. CONSEIL_TRACEABILITY (preuve devoir conseil DDA — CRITIQUE ACPR)
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit.conseil_traceability (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         uuid NOT NULL REFERENCES app.insurance_leads(id),
  courtier_id     uuid NOT NULL REFERENCES app.profiles(id),

  -- Recueil informations client (Reco ACPR 2024-R-03)
  exigences_collectees jsonb NOT NULL,
  besoins_identifies   jsonb NOT NULL,
  questionnaire_complete jsonb,

  -- Recommandation (DDA L. 521-4)
  produit_recommande text NOT NULL,
  motivation_choix   text NOT NULL,
  alternatives_examinees jsonb,
  nombre_contrats_analyses integer,                  -- art. L. 521-4-II

  -- Preuve horodatée
  delivery_method  text NOT NULL CHECK (delivery_method IN ('phone','email','docusign','meeting','signed_pdf')),
  delivery_proof_url text,
  delivery_at      timestamptz NOT NULL,

  -- Hash immuable (intégrité)
  document_hash   text NOT NULL,
  signature_data  jsonb,

  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS conseil_lead_idx ON audit.conseil_traceability(lead_id);
CREATE INDEX IF NOT EXISTS conseil_courtier_idx ON audit.conseil_traceability(courtier_id, delivery_at DESC);

COMMENT ON TABLE audit.conseil_traceability IS 'Preuve devoir de conseil DDA art. L. 521-4 + Reco ACPR 2024-R-03 — IMMUTABLE';

-- ============================================================================
-- 12. ACPR_COMPLIANCE_LOG (logs conformité 2024-R-02)
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit.acpr_compliance_log (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type      text NOT NULL,                    -- 'reclamation_received','reclamation_acknowledged','reclamation_resolved','complaint_escalated'
  reference_id    uuid,
  reference_type  text,
  metadata        jsonb NOT NULL DEFAULT '{}'::jsonb,
  sla_deadline    timestamptz,
  sla_met         boolean,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS acpr_log_type_idx ON audit.acpr_compliance_log(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS acpr_log_ref_idx ON audit.acpr_compliance_log(reference_type, reference_id);

COMMENT ON TABLE audit.acpr_compliance_log IS 'Logs Reco ACPR 2024-R-02 (réclamations) — accusé ≤10j, réponse ≤2 mois';
