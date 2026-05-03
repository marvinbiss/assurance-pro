-- =============================================================================
-- Migration 014 — Ahrefs SEO data tables (kw_universe + competitors)
-- =============================================================================
-- Source : Ahrefs API v3 Advanced (extraction 2026-04-29, 62 fichiers JSON
-- archivés dans 02-donnees-ahrefs/exports-jsons/).
--
-- Ces tables servent de référentiel data-driven pour piloter la stratégie pSEO :
-- - kw_universe : 7 595 KW uniques (vol >= 20) avec volume, KD, CPC
-- - competitor_pages : top 500 pages organiques par concurrent (6 sites suivis)
-- - competitor_metrics : metrics agrégées par concurrent (DR, ahrefs_rank,
--   org_keywords, org_traffic, etc.)
--
-- RLS : deny-all par défaut. Lecture/écriture via service role uniquement
-- (cron Ahrefs trimestriel + scripts admin). Ces données sont sensibles
-- (intelligence concurrentielle) et NE doivent JAMAIS être exposées au client.
-- =============================================================================

CREATE TABLE IF NOT EXISTS kw_universe (
  keyword       text PRIMARY KEY,
  volume        integer NOT NULL CHECK (volume >= 0),
  difficulty    integer CHECK (difficulty IS NULL OR (difficulty >= 0 AND difficulty <= 100)),
  cpc           integer CHECK (cpc IS NULL OR cpc >= 0), -- centimes (USD ou EUR selon source Ahrefs)
  source        text NOT NULL,                            -- nom du fichier source (kw-decennale-FULL.json, vert-assurance_vtc.json, etc.)
  country       text NOT NULL DEFAULT 'fr',
  refreshed_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kw_universe_volume       ON kw_universe (volume DESC);
CREATE INDEX IF NOT EXISTS idx_kw_universe_difficulty   ON kw_universe (difficulty) WHERE difficulty IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_kw_universe_refreshed_at ON kw_universe (refreshed_at DESC);

COMMENT ON TABLE kw_universe IS 'Univers KW Ahrefs France — référentiel pour scoring éditorial pSEO';
COMMENT ON COLUMN kw_universe.cpc IS 'Cost per click en centimes (devise selon source Ahrefs)';
COMMENT ON COLUMN kw_universe.source IS 'Nom du fichier JSON source (traçabilité refresh)';

-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS competitor_pages (
  id                          bigserial PRIMARY KEY,
  domain                      text NOT NULL,
  url                         text NOT NULL,
  sum_traffic                 integer NOT NULL CHECK (sum_traffic >= 0),
  value                       bigint NOT NULL CHECK (value >= 0),  -- traffic value en centimes
  keywords                    integer NOT NULL CHECK (keywords >= 0),
  top_keyword                 text,
  top_keyword_volume          integer CHECK (top_keyword_volume IS NULL OR top_keyword_volume >= 0),
  top_keyword_best_position   integer CHECK (top_keyword_best_position IS NULL OR top_keyword_best_position >= 1),
  page_type                   text,
  refreshed_at                timestamptz NOT NULL DEFAULT now(),
  UNIQUE (domain, url)
);

CREATE INDEX IF NOT EXISTS idx_compet_pages_domain  ON competitor_pages (domain);
CREATE INDEX IF NOT EXISTS idx_compet_pages_traffic ON competitor_pages (sum_traffic DESC);
CREATE INDEX IF NOT EXISTS idx_compet_pages_value   ON competitor_pages (value DESC);

COMMENT ON TABLE competitor_pages IS 'Top 500 pages organiques par concurrent — reverse engineering money pages';
COMMENT ON COLUMN competitor_pages.value IS 'Traffic value Ahrefs en centimes (proxy revenu org)';

-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS competitor_metrics (
  domain              text PRIMARY KEY,
  domain_rating       numeric(5,2) CHECK (domain_rating IS NULL OR (domain_rating >= 0 AND domain_rating <= 100)),
  ahrefs_rank         integer CHECK (ahrefs_rank IS NULL OR ahrefs_rank >= 1),
  org_keywords        integer CHECK (org_keywords IS NULL OR org_keywords >= 0),
  org_keywords_top3   integer CHECK (org_keywords_top3 IS NULL OR org_keywords_top3 >= 0),
  org_traffic         integer CHECK (org_traffic IS NULL OR org_traffic >= 0),
  org_cost            bigint CHECK (org_cost IS NULL OR org_cost >= 0),
  paid_keywords       integer CHECK (paid_keywords IS NULL OR paid_keywords >= 0),
  paid_traffic        integer CHECK (paid_traffic IS NULL OR paid_traffic >= 0),
  paid_cost           bigint CHECK (paid_cost IS NULL OR paid_cost >= 0),
  paid_pages          integer CHECK (paid_pages IS NULL OR paid_pages >= 0),
  refreshed_at        timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE competitor_metrics IS 'Metrics agrégées par concurrent (DR, traffic, KW, cost) — snapshot Ahrefs';

-- -----------------------------------------------------------------------------
-- RLS — deny-all (intelligence concurrentielle, accès via service role uniquement)
-- -----------------------------------------------------------------------------

ALTER TABLE kw_universe        ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_pages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_metrics ENABLE ROW LEVEL SECURITY;

-- Aucune policy = aucun accès via clés anon/authenticated. Le service role
-- bypass RLS de toute façon (cron + scripts admin uniquement).
