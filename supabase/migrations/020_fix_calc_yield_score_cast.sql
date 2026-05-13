-- ============================================================================
-- Migration 020 — Fix calc_yield_score : cast double precision → numeric
-- ============================================================================
-- Bug : ROUND(double precision, integer) n'existe pas en PostgreSQL.
-- Fix : cast l'expression LN(...) en numeric avant ROUND.
-- ============================================================================

CREATE OR REPLACE FUNCTION app.calc_yield_score(
  p_density integer,
  p_kw_volume integer,
  p_kw_kd integer,
  p_kw_cpc numeric
) RETURNS numeric AS $$
BEGIN
  RETURN ROUND(
    (
      (COALESCE(p_density, 0)
       * LN(GREATEST(p_kw_volume, 1) + 1)
       * LN(COALESCE(p_kw_cpc, 0) + 1))
      / (COALESCE(p_kw_kd, 50) + 1)
    )::numeric
  , 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;
