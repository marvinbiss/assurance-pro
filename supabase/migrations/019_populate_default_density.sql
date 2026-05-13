-- ============================================================================
-- Migration 019 — Populate avec density fallback (artisans_count_sirene vide)
-- ============================================================================
-- Constat : app.artisans_count_sirene = 0 rows (pas de seed INSEE encore).
-- Fix : utiliser density_default = 50 si pas de données INSEE.
-- Le cron `refresh-orias` populera la table ultérieurement, on rafraîchit
-- alors via le même RPC (ON CONFLICT update yield_score).
-- ============================================================================

CREATE OR REPLACE FUNCTION public.populate_page_enrichment_cache(
  p_min_yield numeric DEFAULT 15,
  p_density_default integer DEFAULT 50
)
RETURNS TABLE (
  template text,
  rows_inserted integer,
  total_rows integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = app, public, pg_temp
AS $$
DECLARE
  v_prix integer := 0;
  v_compa integer := 0;
  v_guide integer := 0;
  v_tarif integer := 0;
BEGIN
  -- Source des KW par garantie
  CREATE TEMP TABLE _gk ON COMMIT DROP AS
  SELECT
    g.code AS garantie_code,
    g.slug AS garantie_slug,
    g.name AS garantie_name,
    kw.keyword, kw.volume, kw.difficulty, kw.cpc
  FROM app.garanties_assurance g
  CROSS JOIN LATERAL (
    SELECT keyword, volume, difficulty, cpc
    FROM public.kw_universe
    WHERE volume >= 100 AND COALESCE(difficulty, 99) <= 30
      AND (
        keyword ILIKE '%' || REPLACE(g.slug, '-', ' ') || '%'
        OR keyword ILIKE '%' || LOWER(g.name) || '%'
      )
    ORDER BY volume DESC NULLS LAST
    LIMIT 1
  ) kw;

  -- Density par métier (fallback p_density_default si pas de données)
  CREATE TEMP TABLE _md ON COMMIT DROP AS
  SELECT
    m.code AS metier_code,
    COALESCE(d.total, p_density_default) AS density
  FROM app.metiers m
  LEFT JOIN LATERAL (
    SELECT SUM(count_actifs)::integer AS total
    FROM app.artisans_count_sirene
    WHERE metier_code = m.code
  ) d ON true;

  -- Density par ville (fallback : population/1000 si pas de données sirene)
  CREATE TEMP TABLE _vd ON COMMIT DROP AS
  SELECT
    c.id AS city_id,
    c.slug AS ville_slug,
    c.name AS ville_name,
    COALESCE(d.total, GREATEST(p_density_default, c.population / 1000)) AS density
  FROM app.cities c
  LEFT JOIN LATERAL (
    SELECT SUM(count_actifs)::integer AS total
    FROM app.artisans_count_sirene
    WHERE city_id = c.id
  ) d ON true;

  -- 1) PRIX : garantie × metier × statut
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT
    'prix/' || gk.garantie_slug || '/' || md.metier_code || '/' || s.slug,
    'prix_garantie_ville_statut'::text,
    md.metier_code, gk.garantie_code, s.code,
    NULL::text, NULL::uuid,
    md.density,
    gk.keyword, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100),
    app.calc_yield_score(md.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)),
    'pending'::text
  FROM _gk gk
  CROSS JOIN _md md
  CROSS JOIN app.statuts_juridiques s
  WHERE app.calc_yield_score(md.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    kw_volume = EXCLUDED.kw_volume,
    kw_kd = EXCLUDED.kw_kd,
    kw_cpc = EXCLUDED.kw_cpc,
    density_insee = EXCLUDED.density_insee,
    yield_score = EXCLUDED.yield_score,
    enriched_at = now();
  GET DIAGNOSTICS v_prix = ROW_COUNT;

  -- 2) COMPARATEUR : garantie × ville
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT
    'comparateur/' || gk.garantie_slug || '/' || vd.ville_slug,
    'comparateur_garantie_ville'::text,
    NULL::text, gk.garantie_code, NULL::text,
    vd.ville_slug, vd.city_id,
    vd.density,
    gk.keyword, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100),
    app.calc_yield_score(vd.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)),
    'pending'::text
  FROM _gk gk
  CROSS JOIN _vd vd
  WHERE app.calc_yield_score(vd.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    kw_volume = EXCLUDED.kw_volume,
    density_insee = EXCLUDED.density_insee,
    yield_score = EXCLUDED.yield_score,
    enriched_at = now();
  GET DIAGNOSTICS v_compa = ROW_COUNT;

  -- 3) GUIDE : garantie × metier
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT
    'guide/' || gk.garantie_slug || '/' || md.metier_code,
    'guide_metier_ville'::text,
    md.metier_code, gk.garantie_code, NULL::text,
    NULL::text, NULL::uuid,
    md.density,
    gk.keyword, gk.volume, gk.difficulty, COALESCE(gk.cpc, 50),
    app.calc_yield_score(md.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 50)),
    'pending'::text
  FROM _gk gk
  CROSS JOIN _md md
  WHERE app.calc_yield_score(md.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 50)) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    density_insee = EXCLUDED.density_insee, yield_score = EXCLUDED.yield_score, enriched_at = now();
  GET DIAGNOSTICS v_guide = ROW_COUNT;

  -- 4) TARIF : garantie × metier
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT
    'tarif/' || gk.garantie_slug || '/' || md.metier_code,
    'tarif'::text,
    md.metier_code, gk.garantie_code, NULL::text,
    NULL::text, NULL::uuid,
    md.density,
    gk.keyword, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100),
    app.calc_yield_score(md.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)),
    'pending'::text
  FROM _gk gk
  CROSS JOIN _md md
  WHERE app.calc_yield_score(md.density, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    density_insee = EXCLUDED.density_insee, yield_score = EXCLUDED.yield_score, enriched_at = now();
  GET DIAGNOSTICS v_tarif = ROW_COUNT;

  RETURN QUERY VALUES
    ('prix'::text, v_prix, v_prix),
    ('comparateur'::text, v_compa, v_compa),
    ('guide'::text, v_guide, v_guide),
    ('tarif'::text, v_tarif, v_tarif);
END;
$$;

GRANT EXECUTE ON FUNCTION public.populate_page_enrichment_cache(numeric, integer) TO service_role;
