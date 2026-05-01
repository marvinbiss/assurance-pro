-- ============================================================
-- 012_persist_lead_atomic.sql
-- Atomicité de la persistance lead (ADR-001 — fenêtre de transition vers
-- public.leads canonique). Une RPC PL/pgSQL exécute les 3 INSERT
-- (app.insurance_leads + public.leads + public.conseil_records) dans
-- une seule transaction implicite.
--
-- Si l'une des 3 échoue, la transaction rollback en bloc — plus jamais
-- de leads orphelins entre legacy et canonique.
-- ============================================================

create or replace function public.persist_lead_atomic(
  p_legacy jsonb,
  p_canonical jsonb,
  p_conseil jsonb
)
returns table (legacy_lead_id uuid, canonical_reference text)
language plpgsql
security definer
set search_path = public, app
as $$
declare
  v_legacy_id uuid;
  v_reference text;
begin
  -- 1) Insert legacy (app.insurance_leads)
  insert into app.insurance_leads (
    vertical, metier_code, garantie_code, statut_juridique, tranche_ca_code,
    source_page_id, source_url, utm, postal_code, siret,
    anciennete_annees, sinistralite_36m, sous_traitance,
    prenom, nom, email, telephone,
    consent_rgpd, consent_marketing,
    score, segment, status
  )
  values (
    p_legacy->>'vertical',
    p_legacy->>'metier_code',
    p_legacy->>'garantie_code',
    p_legacy->>'statut_juridique',
    p_legacy->>'tranche_ca_code',
    nullif(p_legacy->>'source_page_id','')::uuid,
    p_legacy->>'source_url',
    coalesce(p_legacy->'utm','{}'::jsonb),
    p_legacy->>'postal_code',
    p_legacy->>'siret',
    coalesce((p_legacy->>'anciennete_annees')::int, 0),
    coalesce((p_legacy->>'sinistralite_36m')::int, 0),
    coalesce((p_legacy->>'sous_traitance')::boolean, false),
    p_legacy->>'prenom',
    p_legacy->>'nom',
    p_legacy->>'email',
    p_legacy->>'telephone',
    coalesce((p_legacy->>'consent_rgpd')::boolean, false),
    coalesce((p_legacy->>'consent_marketing')::boolean, false),
    coalesce((p_legacy->>'score')::int, 0),
    p_legacy->>'segment',
    'new'
  )
  returning id into v_legacy_id;

  -- 2) Insert canonical (public.leads)
  v_reference := p_canonical->>'reference';

  insert into public.leads (
    reference, vertical, metier_slug, forme_juridique,
    ville, ville_cp,
    contact_civilite, contact_prenom, contact_nom, contact_email, contact_telephone,
    scoring, scoring_score,
    utm, ip, user_agent,
    consent_dda, consent_marketing,
    conseil_hash,
    fic_acknowledged_at, fic_acknowledged_ip, fic_acknowledged_ua, fic_acknowledged_version,
    status
  )
  values (
    v_reference,
    p_canonical->>'vertical',
    p_canonical->>'metier_slug',
    p_canonical->>'forme_juridique',
    p_canonical->>'ville',
    p_canonical->>'ville_cp',
    p_canonical->>'contact_civilite',
    p_canonical->>'contact_prenom',
    p_canonical->>'contact_nom',
    p_canonical->>'contact_email',
    p_canonical->>'contact_telephone',
    p_canonical->>'scoring',
    coalesce((p_canonical->>'scoring_score')::int, 0),
    coalesce(p_canonical->'utm','{}'::jsonb),
    nullif(p_canonical->>'ip','')::inet,
    p_canonical->>'user_agent',
    coalesce((p_canonical->>'consent_dda')::boolean, false),
    coalesce((p_canonical->>'consent_marketing')::boolean, false),
    p_canonical->>'conseil_hash',
    coalesce((p_canonical->>'fic_acknowledged_at')::timestamptz, now()),
    nullif(p_canonical->>'ip','')::inet,
    p_canonical->>'user_agent',
    coalesce(p_canonical->>'fic_acknowledged_version', 'v1'),
    'new'
  );

  -- 3) Insert conseil traceability
  insert into public.conseil_records (
    lead_id, reference, besoins, recommandations, produits_proposes, signature_hash
  )
  values (
    v_legacy_id,
    v_reference,
    coalesce(p_conseil->'besoins','{}'::jsonb),
    '{"stage":"pending_courtier_analysis"}'::jsonb,
    '[]'::jsonb,
    p_conseil->>'signature_hash'
  );

  return query select v_legacy_id, v_reference;
end;
$$;

comment on function public.persist_lead_atomic(jsonb,jsonb,jsonb) is
  'ADR-001 : persistance atomique lead legacy + canonical + conseil. SECURITY DEFINER bypasses RLS. Toute erreur sur l''un des 3 INSERTs rollback les 2 autres.';

-- Permet à service_role d''appeler la RPC (bypass RLS suffit, mais explicite).
revoke all on function public.persist_lead_atomic(jsonb,jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.persist_lead_atomic(jsonb,jsonb,jsonb) to service_role;
