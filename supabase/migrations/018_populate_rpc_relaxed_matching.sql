-- ============================================================================
-- Migration 018 — Populate RPC avec matching relâché par garantie
-- ============================================================================
-- Le corpus Ahrefs (7 578 KW) n'a pas de KW métier×garantie spécifiques
-- (ex: "rc pro plombier" = 0 vol). On match donc le KW au niveau garantie
-- (ex: "rc pro" pour rc-pro), puis on calcule le yield via density métier.
--
-- Math : yield = (density × log(vol+1) × log(cpc+1)) / (kd+1)
-- Le métier impacte via density (artisans_count_sirene), pas via KW.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.populate_page_enrichment_cache(
  p_min_yield numeric DEFAULT 15
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
  v_prix_count integer := 0;
  v_compa_count integer := 0;
  v_guide_count integer := 0;
  v_tarif_count integer := 0;
BEGIN
  -- ──────────────────────────────────────────────────────────────────────
  -- CTE : Top KW par garantie (matching relâché : keyword contient garantie)
  -- ──────────────────────────────────────────────────────────────────────
  WITH garantie_kw AS (
    SELECT
      g.code AS garantie_code,
      g.slug AS garantie_slug,
      g.name AS garantie_name,
      kw.keyword,
      kw.volume,
      kw.difficulty,
      kw.cpc
    FROM app.garanties_assurance g
    CROSS JOIN LATERAL (
      SELECT keyword, volume, difficulty, cpc
      FROM public.kw_universe
      WHERE volume >= 100
        AND difficulty <= 30
        AND (
          keyword ILIKE '%' || REPLACE(g.slug, '-', ' ') || '%'
          OR keyword ILIKE '%' || LOWER(g.name) || '%'
        )
      ORDER BY volume DESC NULLS LAST
      LIMIT 1
    ) kw
  ),
  metier_density AS (
    SELECT metier_code, SUM(count_actifs)::integer AS total_density
    FROM app.artisans_count_sirene
    GROUP BY metier_code
  )

  -- 1) PRIX
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'prix/' || gk.garantie_slug || '/' || m.code || '/' || s.slug,
    'prix_garantie_ville_statut'::text,
    m.code,
    gk.garantie_code,
    s.code,
    NULL::text,
    NULL::uuid,
    COALESCE(md.total_density, 0),
    gk.keyword,
    gk.volume,
    gk.difficulty,
    gk.cpc,
    app.calc_yield_score(
      COALESCE(md.total_density, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)
    ),
    'pending'::text
  FROM garantie_kw gk
  CROSS JOIN app.metiers m
  CROSS JOIN app.statuts_juridiques s
  LEFT JOIN metier_density md ON md.metier_code = m.code
  WHERE COALESCE(md.total_density, 0) >= 50
    AND app.calc_yield_score(
      COALESCE(md.total_density, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)
    ) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    kw_volume = EXCLUDED.kw_volume,
    kw_kd = EXCLUDED.kw_kd,
    kw_cpc = EXCLUDED.kw_cpc,
    yield_score = EXCLUDED.yield_score,
    enriched_at = now();
  GET DIAGNOSTICS v_prix_count = ROW_COUNT;

  -- 2) COMPARATEUR (garantie × ville)
  WITH garantie_kw_cmp AS (
    SELECT
      g.code AS garantie_code, g.slug AS garantie_slug, g.name AS garantie_name,
      kw.keyword, kw.volume, kw.difficulty, kw.cpc
    FROM app.garanties_assurance g
    CROSS JOIN LATERAL (
      SELECT keyword, volume, difficulty, cpc
      FROM public.kw_universe
      WHERE volume >= 100 AND difficulty <= 30
        AND (keyword ILIKE '%' || REPLACE(g.slug, '-', ' ') || '%' OR keyword ILIKE '%' || LOWER(g.name) || '%')
      ORDER BY volume DESC NULLS LAST LIMIT 1
    ) kw
  ),
  ville_density AS (
    SELECT city_id, SUM(count_actifs)::integer AS total
    FROM app.artisans_count_sirene
    GROUP BY city_id
  )
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'comparateur/' || gk.garantie_slug || '/' || c.slug,
    'comparateur_garantie_ville'::text,
    NULL::text,
    gk.garantie_code,
    NULL::text,
    c.slug,
    c.id,
    COALESCE(vd.total, 0),
    gk.keyword, gk.volume, gk.difficulty, gk.cpc,
    app.calc_yield_score(COALESCE(vd.total, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)),
    'pending'::text
  FROM garantie_kw_cmp gk
  CROSS JOIN app.cities c
  LEFT JOIN ville_density vd ON vd.city_id = c.id
  WHERE COALESCE(vd.total, 0) >= 100
    AND app.calc_yield_score(COALESCE(vd.total, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    kw_volume = EXCLUDED.kw_volume, yield_score = EXCLUDED.yield_score, enriched_at = now();
  GET DIAGNOSTICS v_compa_count = ROW_COUNT;

  -- 3) GUIDE (garantie × metier)
  WITH garantie_kw_g AS (
    SELECT g.code AS garantie_code, g.slug AS garantie_slug, g.name AS garantie_name,
      kw.keyword, kw.volume, kw.difficulty, kw.cpc
    FROM app.garanties_assurance g
    CROSS JOIN LATERAL (
      SELECT keyword, volume, difficulty, cpc FROM public.kw_universe
      WHERE volume >= 100 AND difficulty <= 30
        AND (keyword ILIKE '%' || REPLACE(g.slug, '-', ' ') || '%' OR keyword ILIKE '%' || LOWER(g.name) || '%')
      ORDER BY volume DESC NULLS LAST LIMIT 1
    ) kw
  ),
  metier_density_g AS (
    SELECT metier_code, SUM(count_actifs)::integer AS total FROM app.artisans_count_sirene GROUP BY metier_code
  )
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'guide/' || gk.garantie_slug || '/' || m.code,
    'guide_metier_ville'::text,
    m.code, gk.garantie_code, NULL::text, NULL::text, NULL::uuid,
    COALESCE(md.total, 0),
    gk.keyword, gk.volume, gk.difficulty, COALESCE(gk.cpc, 50),
    app.calc_yield_score(COALESCE(md.total, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 50)),
    'pending'::text
  FROM garantie_kw_g gk
  CROSS JOIN app.metiers m
  LEFT JOIN metier_density_g md ON md.metier_code = m.code
  WHERE COALESCE(md.total, 0) >= 200
    AND app.calc_yield_score(COALESCE(md.total, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 50)) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET yield_score = EXCLUDED.yield_score, enriched_at = now();
  GET DIAGNOSTICS v_guide_count = ROW_COUNT;

  -- 4) TARIF (garantie × metier)
  WITH garantie_kw_t AS (
    SELECT g.code AS garantie_code, g.slug AS garantie_slug, g.name AS garantie_name,
      kw.keyword, kw.volume, kw.difficulty, kw.cpc
    FROM app.garanties_assurance g
    CROSS JOIN LATERAL (
      SELECT keyword, volume, difficulty, cpc FROM public.kw_universe
      WHERE volume >= 100 AND difficulty <= 30
        AND (keyword ILIKE '%' || REPLACE(g.slug, '-', ' ') || '%' OR keyword ILIKE '%' || LOWER(g.name) || '%')
      ORDER BY volume DESC NULLS LAST LIMIT 1
    ) kw
  ),
  metier_density_t AS (
    SELECT metier_code, SUM(count_actifs)::integer AS total FROM app.artisans_count_sirene GROUP BY metier_code
  )
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'tarif/' || gk.garantie_slug || '/' || m.code,
    'tarif'::text,
    m.code, gk.garantie_code, NULL::text, NULL::text, NULL::uuid,
    COALESCE(md.total, 0),
    gk.keyword, gk.volume, gk.difficulty, COALESCE(gk.cpc, 100),
    app.calc_yield_score(COALESCE(md.total, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)),
    'pending'::text
  FROM garantie_kw_t gk
  CROSS JOIN app.metiers m
  LEFT JOIN metier_density_t md ON md.metier_code = m.code
  WHERE COALESCE(md.total, 0) >= 100
    AND app.calc_yield_score(COALESCE(md.total, 0), gk.volume, gk.difficulty, COALESCE(gk.cpc, 100)) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET yield_score = EXCLUDED.yield_score, enriched_at = now();
  GET DIAGNOSTICS v_tarif_count = ROW_COUNT;

  RETURN QUERY VALUES
    ('prix'::text, v_prix_count, v_prix_count),
    ('comparateur'::text, v_compa_count, v_compa_count),
    ('guide'::text, v_guide_count, v_guide_count),
    ('tarif'::text, v_tarif_count, v_tarif_count);
END;
$$;
