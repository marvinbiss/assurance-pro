-- ============================================================================
-- Migration 022 — RPC wrappers pour page-enrichment lib (Next.js SSG)
-- ============================================================================
-- Le schema `app` n'est pas exposé via PostgREST. Cette migration ajoute
-- des fonctions wrappers dans `public` qui sont accessibles via supabase.rpc.
-- ============================================================================

-- Type retour pour page enrichment (jsonb pour flexibilité côté TS)
CREATE OR REPLACE FUNCTION public.get_page_enrichment(p_slug text)
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = app, public, pg_temp
AS $$
  SELECT to_jsonb(v.*)
  FROM app.v_page_enrichment_full v
  WHERE v.page_slug = p_slug
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_page_enrichment(text) TO service_role, authenticated, anon;

COMMENT ON FUNCTION public.get_page_enrichment IS
'Récupère enrichment complet (8 sources jointes) pour 1 page par slug. Wrapper RPC pour bypasser restriction PostgREST app schema.';

-- ────────────────────────────────────────────────────────────────────────────
-- Liste des slugs eligibles par template (pour generateStaticParams)
-- ────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_eligible_slugs_for_template(
  p_template text,
  p_min_yield numeric DEFAULT 15,
  p_limit integer DEFAULT 5820
)
RETURNS text[]
LANGUAGE sql
SECURITY DEFINER
SET search_path = app, public, pg_temp
AS $$
  SELECT COALESCE(array_agg(page_slug ORDER BY yield_score DESC), ARRAY[]::text[])
  FROM app.page_enrichment_cache
  WHERE page_template = p_template
    AND yield_score >= p_min_yield
    AND generation_status IN ('generated', 'published', 'indexed')
  LIMIT p_limit;
$$;

GRANT EXECUTE ON FUNCTION public.get_eligible_slugs_for_template(text, numeric, integer) TO service_role, authenticated, anon;

COMMENT ON FUNCTION public.get_eligible_slugs_for_template IS
'Retourne tableau des slugs eligibles pour un template, filtrés par yield_score. Pour generateStaticParams (SSG build).';

-- ────────────────────────────────────────────────────────────────────────────
-- Count des pages eligibles (monitoring)
-- ────────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.count_eligible_pages(p_template text DEFAULT NULL)
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
SET search_path = app, public, pg_temp
AS $$
  SELECT COUNT(*)::integer
  FROM app.page_enrichment_cache
  WHERE yield_score >= 15
    AND generation_status IN ('generated', 'published', 'indexed')
    AND (p_template IS NULL OR page_template = p_template);
$$;

GRANT EXECUTE ON FUNCTION public.count_eligible_pages(text) TO service_role, authenticated, anon;
