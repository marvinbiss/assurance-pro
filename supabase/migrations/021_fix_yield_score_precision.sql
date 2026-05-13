-- ============================================================================
-- Migration 021 — Fix yield_score precision overflow
-- ============================================================================
-- Bug : NUMERIC(5,2) plafonné à 999.99 mais yield_score peut atteindre 600k+
-- pour gros métiers × KW haut volume × CPC élevé.
-- Fix : passer en NUMERIC(12,2) (max 9 999 999 999.99).
-- ============================================================================

-- Drop dépendances + alter + recreate view
DROP VIEW IF EXISTS app.v_page_enrichment_full;

ALTER TABLE app.page_enrichment_cache
  ALTER COLUMN yield_score TYPE numeric(12, 2);

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
  acs.count_actifs AS density_insee,
  pec.sinistralite_pct,
  pec.prix_min_eur,
  pec.prix_med_eur,
  pec.prix_max_eur,
  pec.jurisprudence_refs,
  pec.assureurs_top3_jsonb,
  pec.avis_top_jsonb,
  pec.stats_sectorielles_jsonb,
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
WHERE pec.generation_status IN ('generated', 'published', 'indexed');
