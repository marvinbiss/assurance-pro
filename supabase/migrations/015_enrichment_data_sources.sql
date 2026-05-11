-- ============================================================================
-- Migration 015 — Enrichment Data Sources (Pappers + Trustpilot + FFA + Cache)
-- ============================================================================
-- Complète les 4 sources data manquantes pour injection programmatique
-- Couches C+D (5 820 pages). Aligne avec patterns app.* + RLS + indexes.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PAPPERS_ASSUREURS — Solidité financière assureurs partenaires
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS app.pappers_assureurs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id          uuid REFERENCES app.insurance_partners(id) ON DELETE CASCADE,
  siren               text NOT NULL,
  nom_legal           text NOT NULL,

  -- Solvabilité
  capital_social_eur  numeric(15,2),
  ca_dernier_exo_eur  numeric(15,2),
  resultat_net_eur    numeric(15,2),
  effectif            integer,
  date_creation       date,

  -- Notations externes
  note_sp             text,
  note_moodys         text,
  note_fitch          text,
  rating_compagnie    text,

  -- Score propriétaire (0-100)
  score_solidite      integer CHECK (score_solidite BETWEEN 0 AND 100),
  score_calcule_le    date,

  -- Lifecycle
  source              text NOT NULL DEFAULT 'pappers_api'
                      CHECK (source IN ('pappers_api','manual','partner_disclosure')),
  raw_data            jsonb,
  scraped_at          timestamptz NOT NULL DEFAULT now(),
  is_active           boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  UNIQUE (siren)
);

CREATE INDEX IF NOT EXISTS pappers_partner_idx ON app.pappers_assureurs(partner_id);
CREATE INDEX IF NOT EXISTS pappers_score_idx ON app.pappers_assureurs(score_solidite DESC) WHERE is_active;
CREATE INDEX IF NOT EXISTS pappers_siren_idx ON app.pappers_assureurs(siren);

COMMENT ON TABLE app.pappers_assureurs IS 'Solidité financière assureurs (Pappers API + notations). Injection programmatique pages couches C+D pour E-E-A-T + trust signals.';
COMMENT ON COLUMN app.pappers_assureurs.score_solidite IS 'Score propriétaire 0-100 calculé à partir capital + CA + résultat + notations externes';

-- ----------------------------------------------------------------------------
-- 2. TRUSTPILOT_AVIS — Avis vérifiés ISO 20488
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS app.trustpilot_avis (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id          uuid REFERENCES app.insurance_partners(id) ON DELETE CASCADE,
  partner_slug        text NOT NULL,

  -- Agrégats Trustpilot
  trustscore          numeric(3,2) CHECK (trustscore BETWEEN 0 AND 5),
  nb_avis_total       integer NOT NULL DEFAULT 0,
  nb_5_etoiles        integer NOT NULL DEFAULT 0,
  nb_4_etoiles        integer NOT NULL DEFAULT 0,
  nb_3_etoiles        integer NOT NULL DEFAULT 0,
  nb_2_etoiles        integer NOT NULL DEFAULT 0,
  nb_1_etoile         integer NOT NULL DEFAULT 0,

  -- Géolocalisation (pour pages ville-spécifiques)
  ville_slug          text,
  departement_code    text,
  region_slug         text,

  -- Échantillon top avis
  top_avis_jsonb      jsonb DEFAULT '[]'::jsonb,

  -- Conformité ISO 20488 (avis vérifiés)
  iso_20488_certified boolean NOT NULL DEFAULT true,

  -- Lifecycle
  trustpilot_url      text,
  scraped_at          timestamptz NOT NULL DEFAULT now(),
  is_active           boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  UNIQUE (partner_slug, ville_slug)
);

CREATE INDEX IF NOT EXISTS trustpilot_partner_idx ON app.trustpilot_avis(partner_id);
CREATE INDEX IF NOT EXISTS trustpilot_ville_idx ON app.trustpilot_avis(ville_slug) WHERE is_active;
CREATE INDEX IF NOT EXISTS trustpilot_score_idx ON app.trustpilot_avis(trustscore DESC) WHERE is_active;

COMMENT ON TABLE app.trustpilot_avis IS 'Avis vérifiés Trustpilot ISO 20488 par assureur × ville. Trust signal pour pages locales.';

-- ----------------------------------------------------------------------------
-- 3. STATS_SECTORIELLES — FFA/FFB/CAPEB/autres fédérations
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS app.stats_sectorielles (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source              text NOT NULL CHECK (source IN ('FFA','FFB','CAPEB','UNAPL','OPCO','MUTUALITE_FR','GEMA','APRIL_OBS','autres')),

  -- Référence statistique
  metier_code         text REFERENCES app.metiers(code),
  garantie_code       text REFERENCES app.garanties_assurance(code),
  annee               smallint NOT NULL,

  -- Indicateur
  indicateur          text NOT NULL,  -- ex: 'sinistres_degat_eaux_evolution_pct', 'prime_moyenne_eur'
  valeur_num          numeric(15,4),
  valeur_text         text,
  unite               text,  -- '%', 'EUR', 'count', 'index'

  -- Contexte
  region              text,
  departement_code    text,
  contexte_jsonb      jsonb DEFAULT '{}'::jsonb,

  -- Source citation
  source_url          text,
  source_publication  text,
  publication_date    date,

  -- Lifecycle
  imported_at         timestamptz NOT NULL DEFAULT now(),
  is_active           boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now(),

  UNIQUE (source, metier_code, garantie_code, annee, indicateur, region)
);

CREATE INDEX IF NOT EXISTS stats_metier_garantie_idx ON app.stats_sectorielles(metier_code, garantie_code, annee DESC);
CREATE INDEX IF NOT EXISTS stats_source_annee_idx ON app.stats_sectorielles(source, annee DESC);
CREATE INDEX IF NOT EXISTS stats_indicateur_idx ON app.stats_sectorielles(indicateur);

COMMENT ON TABLE app.stats_sectorielles IS 'Stats FFA/FFB/CAPEB/UNAPL/Mutualité Française. Injection pages programmatiques pour autorité chiffrée vérifiable.';

-- ----------------------------------------------------------------------------
-- 4. PAGE_ENRICHMENT_CACHE — Cache enrichissement pour optim build programmatique
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS app.page_enrichment_cache (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Clé canonique de la page
  page_slug           text NOT NULL,
  page_template       text NOT NULL CHECK (page_template IN (
    'pilier','metier_pilier','garantie_ville','garantie_metier','garantie_statut',
    'comparateur_garantie_ville','prix_garantie_ville_statut',
    'guide_metier_ville','faq_garantie_metier','attestation','tarif'
  )),

  -- Dimensions résolues
  metier_code         text REFERENCES app.metiers(code),
  garantie_code       text REFERENCES app.garanties_assurance(code),
  statut_juridique    text REFERENCES app.statuts_juridiques(code),
  ville_slug          text,
  city_id             uuid REFERENCES app.cities(id),

  -- Données injectées (snapshot)
  density_insee       integer,
  sinistralite_pct    numeric(5,2),
  prix_min_eur        numeric(10,2),
  prix_med_eur        numeric(10,2),
  prix_max_eur        numeric(10,2),
  jurisprudence_refs  jsonb DEFAULT '[]'::jsonb,
  assureurs_top3_jsonb jsonb DEFAULT '[]'::jsonb,
  avis_top_jsonb      jsonb DEFAULT '[]'::jsonb,
  stats_sectorielles_jsonb jsonb DEFAULT '[]'::jsonb,

  -- SEO meta
  kw_target           text,
  kw_volume           integer,
  kw_kd               integer,
  kw_cpc              numeric(8,2),

  -- Yield score (pour filtrage anti-thin)
  yield_score         numeric(5,2),  -- proxy pour shouldGenerate()
  generation_status   text NOT NULL DEFAULT 'pending'
                      CHECK (generation_status IN ('pending','generated','published','indexed','retired')),

  -- Lifecycle
  enriched_at         timestamptz NOT NULL DEFAULT now(),
  last_refresh_at     timestamptz,
  ttl_until           timestamptz NOT NULL DEFAULT (now() + interval '90 days'),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  UNIQUE (page_slug)
);

CREATE INDEX IF NOT EXISTS page_cache_template_idx ON app.page_enrichment_cache(page_template);
CREATE INDEX IF NOT EXISTS page_cache_metier_ville_idx ON app.page_enrichment_cache(metier_code, city_id);
CREATE INDEX IF NOT EXISTS page_cache_garantie_idx ON app.page_enrichment_cache(garantie_code);
CREATE INDEX IF NOT EXISTS page_cache_yield_pending_idx ON app.page_enrichment_cache(yield_score DESC)
  WHERE generation_status = 'pending';
CREATE INDEX IF NOT EXISTS page_cache_ttl_idx ON app.page_enrichment_cache(ttl_until)
  WHERE generation_status IN ('generated','published');

COMMENT ON TABLE app.page_enrichment_cache IS 'Cache pré-calculé enrichissement par page. Permet build programmatique 5 820 pages sans recalculer per-build. TTL 90j force refresh data sources.';
COMMENT ON COLUMN app.page_enrichment_cache.yield_score IS 'Score proxy yield estimé (density × kw_volume / kd). Filtrage shouldGenerate > 15.';

-- ----------------------------------------------------------------------------
-- 5. RLS — Read-only public, write service_role uniquement
-- ----------------------------------------------------------------------------
ALTER TABLE app.pappers_assureurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.trustpilot_avis ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.stats_sectorielles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.page_enrichment_cache ENABLE ROW LEVEL SECURITY;

-- Note : service_role bypass RLS automatiquement (Supabase default).
-- Policies déclarées explicitement pour clarté + auditabilité ACPR.

-- Public read pour data publiques (utilisable par anon/authenticated)
CREATE POLICY pappers_public_read ON app.pappers_assureurs
  FOR SELECT USING (is_active = true);

CREATE POLICY trustpilot_public_read ON app.trustpilot_avis
  FOR SELECT USING (is_active = true);

CREATE POLICY stats_public_read ON app.stats_sectorielles
  FOR SELECT USING (is_active = true);

-- page_enrichment_cache = business intelligence (KW vol/KD/CPC, yield, top assureurs).
-- Accès uniquement service_role (pas de policy publique). RLS deny-by-default suffit.
-- Le runtime Next.js doit utiliser service_role pour lire ce cache.

-- ----------------------------------------------------------------------------
-- 6. Triggers updated_at
-- ----------------------------------------------------------------------------
CREATE TRIGGER pappers_updated_at_trg
  BEFORE UPDATE ON app.pappers_assureurs
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TRIGGER trustpilot_updated_at_trg
  BEFORE UPDATE ON app.trustpilot_avis
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TRIGGER page_cache_updated_at_trg
  BEFORE UPDATE ON app.page_enrichment_cache
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ----------------------------------------------------------------------------
-- 7. View aggregée pour build programmatique
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW app.v_page_enrichment_full AS
SELECT
  pec.page_slug,
  pec.page_template,
  pec.metier_code,
  pec.garantie_code,
  pec.statut_juridique,
  pec.ville_slug,
  pec.city_id,
  c.name AS ville_nom,
  c.population AS ville_population,
  m.name AS metier_nom,
  g.name AS garantie_label,
  s.name AS statut_label,

  -- Density INSEE
  acs.count_actifs AS density_insee,

  -- Sinistralité AQC
  pec.sinistralite_pct,

  -- Tarifs propriétaires
  pec.prix_min_eur,
  pec.prix_med_eur,
  pec.prix_max_eur,

  -- Trust signals
  pec.jurisprudence_refs,
  pec.assureurs_top3_jsonb,
  pec.avis_top_jsonb,
  pec.stats_sectorielles_jsonb,

  -- SEO
  pec.kw_target,
  pec.kw_volume,
  pec.kw_kd,
  pec.kw_cpc,
  pec.yield_score,
  pec.generation_status,
  pec.enriched_at,
  pec.ttl_until
FROM app.page_enrichment_cache pec
LEFT JOIN app.cities c ON c.id = pec.city_id
LEFT JOIN app.metiers m ON m.code = pec.metier_code
LEFT JOIN app.garanties_assurance g ON g.code = pec.garantie_code
LEFT JOIN app.statuts_juridiques s ON s.code = pec.statut_juridique
LEFT JOIN app.artisans_count_sirene acs
  ON acs.metier_code = pec.metier_code AND acs.city_id = pec.city_id
WHERE pec.generation_status IN ('generated','published','indexed');

COMMENT ON VIEW app.v_page_enrichment_full IS 'Vue aggregée pour SSG build. Cross-join 8 sources data en 1 query.';

-- ----------------------------------------------------------------------------
-- 8. Function : recalculer yield_score (pour priorisation build)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION app.calc_yield_score(
  p_density integer,
  p_kw_volume integer,
  p_kw_kd integer,
  p_kw_cpc numeric
) RETURNS numeric AS $$
BEGIN
  -- Formule proxy : (density × log(volume+1) × log(cpc+1)) / (kd+1)
  -- Capture intent commercial × concurrence × densité locale
  RETURN ROUND(
    (COALESCE(p_density, 0) * LN(GREATEST(p_kw_volume, 1) + 1) * LN(COALESCE(p_kw_cpc, 0) + 1))
    / (COALESCE(p_kw_kd, 50) + 1)
  , 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ----------------------------------------------------------------------------
-- 9. Function : shouldGenerate (filter anti-thin)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION app.should_generate_page(
  p_metier_code text,
  p_city_id uuid,
  p_kw_volume integer,
  p_min_density integer DEFAULT 50,
  p_min_kw_volume integer DEFAULT 30,
  p_min_yield numeric DEFAULT 15
) RETURNS boolean AS $$
DECLARE
  v_density integer;
  v_yield numeric;
BEGIN
  -- Density INSEE
  SELECT count_actifs INTO v_density
  FROM app.artisans_count_sirene
  WHERE metier_code = p_metier_code AND city_id = p_city_id;

  IF v_density IS NULL OR v_density < p_min_density THEN
    RETURN false;
  END IF;

  IF COALESCE(p_kw_volume, 0) < p_min_kw_volume THEN
    RETURN false;
  END IF;

  -- Optional : yield check (utilise function calc_yield_score)
  v_yield := app.calc_yield_score(v_density, p_kw_volume, 30, 100);
  RETURN v_yield >= p_min_yield;
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON FUNCTION app.should_generate_page IS 'Filtre anti-thin pour métier×ville programmatique. Évite pages yield <15 (référence: audit Ahrefs métier×ville pur=7.3 vis/page).';

-- ============================================================================
-- Fin migration 015
-- ============================================================================
