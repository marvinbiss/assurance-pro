-- ============================================================================
-- Migration 006 — Seed régions + table dédiée + sitemap helpers
-- 13 régions métropole + 5 DROM
-- ============================================================================

-- ============================================================================
-- 1. TABLE REGIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.regions (
  code            text PRIMARY KEY,                      -- code INSEE (11, 24, 27, 28, 32...)
  name            text NOT NULL,
  slug            text NOT NULL UNIQUE,
  population      integer,
  is_drom         boolean NOT NULL DEFAULT false,
  centroid        geography(Point, 4326),
  prefecture      text,
  departements    text[] DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS regions_centroid_gist ON app.regions USING gist(centroid);

-- ============================================================================
-- 2. SEED 18 RÉGIONS (13 métropole + 5 DROM)
-- ============================================================================
INSERT INTO app.regions (code, name, slug, population, is_drom, prefecture, departements) VALUES
  ('11', 'Île-de-France',              'ile-de-france',              12300000, false, 'Paris',       ARRAY['75','77','78','91','92','93','94','95']),
  ('84', 'Auvergne-Rhône-Alpes',       'auvergne-rhone-alpes',        8100000, false, 'Lyon',        ARRAY['01','03','07','15','26','38','42','43','63','69','73','74']),
  ('93', 'Provence-Alpes-Côte d''Azur','provence-alpes-cote-d-azur',  5100000, false, 'Marseille',   ARRAY['04','05','06','13','83','84']),
  ('75', 'Nouvelle-Aquitaine',         'nouvelle-aquitaine',          6000000, false, 'Bordeaux',    ARRAY['16','17','19','23','24','33','40','47','64','79','86','87']),
  ('76', 'Occitanie',                  'occitanie',                   5900000, false, 'Toulouse',    ARRAY['09','11','12','30','31','32','34','46','48','65','66','81','82']),
  ('44', 'Grand Est',                  'grand-est',                   5500000, false, 'Strasbourg',  ARRAY['08','10','51','52','54','55','57','67','68','88']),
  ('32', 'Hauts-de-France',            'hauts-de-france',             6000000, false, 'Lille',       ARRAY['02','59','60','62','80']),
  ('52', 'Pays de la Loire',           'pays-de-la-loire',            3800000, false, 'Nantes',      ARRAY['44','49','53','72','85']),
  ('28', 'Normandie',                  'normandie',                   3300000, false, 'Rouen',       ARRAY['14','27','50','61','76']),
  ('27', 'Bourgogne-Franche-Comté',    'bourgogne-franche-comte',     2800000, false, 'Dijon',       ARRAY['21','25','39','58','70','71','89','90']),
  ('53', 'Bretagne',                   'bretagne',                    3300000, false, 'Rennes',      ARRAY['22','29','35','56']),
  ('24', 'Centre-Val de Loire',        'centre-val-de-loire',         2600000, false, 'Orléans',     ARRAY['18','28','36','37','41','45']),
  ('94', 'Corse',                      'corse',                        340000, false, 'Ajaccio',     ARRAY['2A','2B']),
  -- DROM
  ('01', 'Guadeloupe',                 'guadeloupe',                   380000, true,  'Basse-Terre', ARRAY['971']),
  ('02', 'Martinique',                 'martinique',                   360000, true,  'Fort-de-France', ARRAY['972']),
  ('03', 'Guyane',                     'guyane',                       290000, true,  'Cayenne',     ARRAY['973']),
  ('04', 'La Réunion',                 'la-reunion',                   860000, true,  'Saint-Denis', ARRAY['974']),
  ('06', 'Mayotte',                    'mayotte',                      290000, true,  'Mamoudzou',   ARRAY['976'])
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 3. KW UNIVERSE TABLE (tracking Ahrefs)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.kw_universe (
  keyword         text PRIMARY KEY,
  volume          integer NOT NULL,
  kd              smallint,
  cpc             numeric(8,2),
  parent_topic    text,
  serp_features   text[],
  intents         text[],
  traffic_potential integer,
  country         text NOT NULL DEFAULT 'fr',
  refreshed_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS kw_universe_volume_idx ON app.kw_universe(volume DESC);
CREATE INDEX IF NOT EXISTS kw_universe_kd_idx ON app.kw_universe(kd) WHERE kd IS NOT NULL;

-- ============================================================================
-- 4. SITEMAP HELPER VIEWS
-- ============================================================================
CREATE OR REPLACE VIEW public.sitemap_published_pages AS
SELECT
  id, slug, page_type, page_layer, vertical,
  metier_code, garantie_code,
  meta_title, meta_description,
  intent_score, kw_volume,
  noindex, published_at, updated_at
FROM public.cms_pages
WHERE status = 'published'
  AND is_active = true
  AND noindex = false
ORDER BY intent_score DESC NULLS LAST, published_at DESC;

COMMENT ON VIEW public.sitemap_published_pages IS 'Vue pour génération sitemap.xml — exclut drafts, archived, noindex';

-- ============================================================================
-- 5. RPC pour stats dashboard pSEO
-- ============================================================================
CREATE OR REPLACE FUNCTION public.pseo_dashboard_stats()
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
  SELECT jsonb_build_object(
    'total_pages', count(*),
    'by_status', jsonb_object_agg(status, status_count),
    'by_layer', jsonb_object_agg(coalesce(page_layer, 'unknown'), layer_count),
    'by_vertical', jsonb_object_agg(coalesce(vertical, 'unknown'), vertical_count)
  )
  FROM (
    SELECT
      status, page_layer, vertical,
      count(*) OVER (PARTITION BY status) as status_count,
      count(*) OVER (PARTITION BY page_layer) as layer_count,
      count(*) OVER (PARTITION BY vertical) as vertical_count
    FROM public.cms_pages
    WHERE is_active = true
  ) sub;
$$;

GRANT EXECUTE ON FUNCTION public.pseo_dashboard_stats() TO authenticated;

-- ============================================================================
-- CHECK FINAL
-- ============================================================================
DO $$
DECLARE
  region_count integer;
BEGIN
  SELECT count(*) INTO region_count FROM app.regions;
  RAISE NOTICE 'Régions seeded: % rows', region_count;
END $$;
