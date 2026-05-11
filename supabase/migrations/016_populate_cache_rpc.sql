-- ============================================================================
-- Migration 016 — RPC public.populate_page_enrichment_cache
-- ============================================================================
-- Bypass restriction PostgREST `app` schema non-exposé. Wrappe la logique
-- populate côté serveur via fonction PL/pgSQL SECURITY DEFINER.
--
-- Permet exécution depuis Next.js / scripts via :
--   supabase.rpc('populate_page_enrichment_cache')
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
  -- 1) PRIX — /prix/[garantie]/[metier]/[statut]
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'prix/' || g.slug || '/' || m.code || '/' || s.slug AS page_slug,
    'prix_garantie_ville_statut'::text,
    m.code,
    g.code,
    s.code,
    NULL::text,
    NULL::uuid,
    COALESCE(acs.count_actifs, 0),
    kw.keyword,
    COALESCE(kw.volume, 0),
    COALESCE(kw.difficulty, 30),
    COALESCE(kw.cpc, 100),
    app.calc_yield_score(
      COALESCE(acs.count_actifs, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 100)
    ),
    'pending'::text
  FROM app.garanties_assurance g
  CROSS JOIN app.metiers m
  CROSS JOIN app.statuts_juridiques s
  LEFT JOIN LATERAL (
    SELECT count_actifs FROM app.artisans_count_sirene
    WHERE metier_code = m.code
    ORDER BY count_actifs DESC LIMIT 1
  ) acs ON true
  LEFT JOIN LATERAL (
    SELECT keyword, volume, difficulty, cpc
    FROM public.kw_universe
    WHERE keyword ILIKE 'prix ' || g.slug || '%' || m.name || '%'
       OR keyword ILIKE 'tarif ' || g.slug || '%' || m.name || '%'
       OR keyword ILIKE g.slug || ' ' || m.name || '%'
    ORDER BY volume DESC NULLS LAST LIMIT 1
  ) kw ON true
  WHERE COALESCE(acs.count_actifs, 0) >= 50
    AND kw.keyword IS NOT NULL
    AND COALESCE(kw.volume, 0) >= 30
    AND app.calc_yield_score(
      COALESCE(acs.count_actifs, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 100)
    ) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    kw_volume = EXCLUDED.kw_volume,
    kw_kd = EXCLUDED.kw_kd,
    kw_cpc = EXCLUDED.kw_cpc,
    yield_score = EXCLUDED.yield_score,
    enriched_at = now();
  GET DIAGNOSTICS v_prix_count = ROW_COUNT;

  -- ──────────────────────────────────────────────────────────────────────
  -- 2) COMPARATEUR — /comparateur/[garantie]/[ville]
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'comparateur/' || g.slug || '/' || c.slug,
    'comparateur_garantie_ville'::text,
    NULL::text,
    g.code,
    NULL::text,
    c.slug,
    c.id,
    COALESCE(dens.total, 0),
    kw.keyword,
    COALESCE(kw.volume, 0),
    COALESCE(kw.difficulty, 30),
    COALESCE(kw.cpc, 100),
    app.calc_yield_score(
      COALESCE(dens.total, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 100)
    ),
    'pending'::text
  FROM app.garanties_assurance g
  CROSS JOIN app.cities c
  LEFT JOIN LATERAL (
    SELECT SUM(count_actifs)::integer AS total
    FROM app.artisans_count_sirene
    WHERE city_id = c.id
  ) dens ON true
  LEFT JOIN LATERAL (
    SELECT keyword, volume, difficulty, cpc
    FROM public.kw_universe
    WHERE keyword ILIKE 'comparateur ' || g.slug || '%'
       OR keyword ILIKE 'meilleur ' || g.slug || '%'
       OR keyword ILIKE g.slug || '%' || c.name || '%'
    ORDER BY volume DESC NULLS LAST LIMIT 1
  ) kw ON true
  WHERE COALESCE(dens.total, 0) >= 100
    AND kw.keyword IS NOT NULL
    AND COALESCE(kw.volume, 0) >= 30
    AND app.calc_yield_score(
      COALESCE(dens.total, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 100)
    ) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    kw_volume = EXCLUDED.kw_volume,
    yield_score = EXCLUDED.yield_score,
    enriched_at = now();
  GET DIAGNOSTICS v_compa_count = ROW_COUNT;

  -- ──────────────────────────────────────────────────────────────────────
  -- 3) GUIDE — /guide/[garantie]/[metier]
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'guide/' || g.slug || '/' || m.code,
    'guide_metier_ville'::text,
    m.code,
    g.code,
    NULL::text,
    NULL::text,
    NULL::uuid,
    COALESCE(dens.total, 0),
    kw.keyword,
    COALESCE(kw.volume, 0),
    COALESCE(kw.difficulty, 30),
    COALESCE(kw.cpc, 50),
    app.calc_yield_score(
      COALESCE(dens.total, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 50)
    ),
    'pending'::text
  FROM app.garanties_assurance g
  CROSS JOIN app.metiers m
  LEFT JOIN LATERAL (
    SELECT SUM(count_actifs)::integer AS total
    FROM app.artisans_count_sirene
    WHERE metier_code = m.code
  ) dens ON true
  LEFT JOIN LATERAL (
    SELECT keyword, volume, difficulty, cpc
    FROM public.kw_universe
    WHERE keyword ILIKE 'guide ' || g.slug || '%' || m.name || '%'
       OR keyword ILIKE 'comment ' || g.slug || '%' || m.name || '%'
       OR keyword ILIKE g.slug || ' obligation ' || m.name || '%'
    ORDER BY volume DESC NULLS LAST LIMIT 1
  ) kw ON true
  WHERE COALESCE(dens.total, 0) >= 200
    AND kw.keyword IS NOT NULL
    AND COALESCE(kw.volume, 0) >= 30
    AND app.calc_yield_score(
      COALESCE(dens.total, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 50)
    ) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    yield_score = EXCLUDED.yield_score,
    enriched_at = now();
  GET DIAGNOSTICS v_guide_count = ROW_COUNT;

  -- ──────────────────────────────────────────────────────────────────────
  -- 4) TARIF — /tarif/[garantie]/[metier]
  -- ──────────────────────────────────────────────────────────────────────
  INSERT INTO app.page_enrichment_cache (
    page_slug, page_template, metier_code, garantie_code, statut_juridique,
    ville_slug, city_id, density_insee, kw_target, kw_volume, kw_kd, kw_cpc,
    yield_score, generation_status
  )
  SELECT DISTINCT
    'tarif/' || g.slug || '/' || m.code,
    'tarif'::text,
    m.code,
    g.code,
    NULL::text,
    NULL::text,
    NULL::uuid,
    COALESCE(dens.total, 0),
    kw.keyword,
    COALESCE(kw.volume, 0),
    COALESCE(kw.difficulty, 30),
    COALESCE(kw.cpc, 100),
    app.calc_yield_score(
      COALESCE(dens.total, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 100)
    ),
    'pending'::text
  FROM app.garanties_assurance g
  CROSS JOIN app.metiers m
  LEFT JOIN LATERAL (
    SELECT SUM(count_actifs)::integer AS total
    FROM app.artisans_count_sirene
    WHERE metier_code = m.code
  ) dens ON true
  LEFT JOIN LATERAL (
    SELECT keyword, volume, difficulty, cpc
    FROM public.kw_universe
    WHERE keyword ILIKE 'tarif ' || g.slug || '%' || m.name || '%'
       OR keyword ILIKE 'prix ' || g.slug || '%' || m.name || '%'
       OR keyword ILIKE 'coût ' || g.slug || '%' || m.name || '%'
    ORDER BY volume DESC NULLS LAST LIMIT 1
  ) kw ON true
  WHERE COALESCE(dens.total, 0) >= 100
    AND kw.keyword IS NOT NULL
    AND COALESCE(kw.volume, 0) >= 30
    AND app.calc_yield_score(
      COALESCE(dens.total, 0),
      COALESCE(kw.volume, 0),
      COALESCE(kw.difficulty, 30),
      COALESCE(kw.cpc, 100)
    ) >= p_min_yield
  ON CONFLICT (page_slug) DO UPDATE SET
    yield_score = EXCLUDED.yield_score,
    enriched_at = now();
  GET DIAGNOSTICS v_tarif_count = ROW_COUNT;

  -- ──────────────────────────────────────────────────────────────────────
  -- Return summary
  -- ──────────────────────────────────────────────────────────────────────
  RETURN QUERY VALUES
    ('prix'::text, v_prix_count, v_prix_count),
    ('comparateur'::text, v_compa_count, v_compa_count),
    ('guide'::text, v_guide_count, v_guide_count),
    ('tarif'::text, v_tarif_count, v_tarif_count);
END;
$$;

COMMENT ON FUNCTION public.populate_page_enrichment_cache IS
'Populate app.page_enrichment_cache via cross-join métiers × villes × garanties × statuts × kw_universe. Filtre yield_score >= p_min_yield. SECURITY DEFINER pour bypass restriction PostgREST app schema. Idempotent (ON CONFLICT update yield_score + enriched_at).';

GRANT EXECUTE ON FUNCTION public.populate_page_enrichment_cache(numeric) TO service_role;
GRANT EXECUTE ON FUNCTION public.populate_page_enrichment_cache(numeric) TO authenticated;

-- ============================================================================
-- Fonction helper : promote pending → published top N par yield
-- ============================================================================
CREATE OR REPLACE FUNCTION public.promote_top_yield_pages(p_limit integer DEFAULT 5820)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = app, public, pg_temp
AS $$
DECLARE
  v_promoted integer;
BEGIN
  WITH ranked AS (
    SELECT page_slug
    FROM app.page_enrichment_cache
    WHERE generation_status = 'pending'
      AND yield_score >= 15
    ORDER BY yield_score DESC
    LIMIT p_limit
  )
  UPDATE app.page_enrichment_cache pec
  SET generation_status = 'published',
      enriched_at = now()
  FROM ranked
  WHERE pec.page_slug = ranked.page_slug;
  GET DIAGNOSTICS v_promoted = ROW_COUNT;
  RETURN v_promoted;
END;
$$;

GRANT EXECUTE ON FUNCTION public.promote_top_yield_pages(integer) TO service_role;

COMMENT ON FUNCTION public.promote_top_yield_pages IS
'Promote top N pages par yield_score : pending → published. Limite par défaut 5 820 (cible Couches C+D KPMG).';

-- ============================================================================
-- Fonction stats : audit qualité cache après populate
-- ============================================================================
CREATE OR REPLACE FUNCTION public.audit_enrichment_cache()
RETURNS TABLE (
  bucket text,
  template text,
  status text,
  page_count bigint,
  avg_yield numeric,
  total_volume bigint,
  total_cpc_value numeric
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = app, public, pg_temp
AS $$
  SELECT
    CASE
      WHEN yield_score >= 100 THEN 'A_100+'
      WHEN yield_score >= 50 THEN 'B_50-99'
      WHEN yield_score >= 25 THEN 'C_25-49'
      WHEN yield_score >= 15 THEN 'D_15-24'
      ELSE 'E_<15'
    END AS bucket,
    page_template AS template,
    generation_status AS status,
    COUNT(*) AS page_count,
    ROUND(AVG(yield_score), 2) AS avg_yield,
    SUM(COALESCE(kw_volume, 0)) AS total_volume,
    ROUND(SUM(COALESCE(kw_volume, 0) * COALESCE(kw_cpc, 0) * 0.05), 0) AS total_cpc_value
  FROM app.page_enrichment_cache
  GROUP BY 1, 2, 3
  ORDER BY 1, 2, 3;
$$;

GRANT EXECUTE ON FUNCTION public.audit_enrichment_cache() TO service_role;

COMMENT ON FUNCTION public.audit_enrichment_cache IS
'Audit qualité cache : distribution par bucket yield × template × status + volume + valeur Ads équiv (5% CTR).';

-- ============================================================================
-- Fin migration 016
-- ============================================================================
