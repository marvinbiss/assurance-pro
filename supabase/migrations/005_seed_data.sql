-- ============================================================================
-- Migration 005 — Seed data (données de référence)
-- 18 méga-métiers + sous-métiers + verticaux
-- ============================================================================

-- ============================================================================
-- 1. SEED MÉTIERS — 52 métiers BTP + 32 RC Pro + 80+ niches métier
-- ============================================================================

-- BTP : Gros œuvre (6)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('macon', 'Maçon', 'macon', 'BTP', ARRAY['4399C','4120A'], 4, 2500, true),
  ('terrassier', 'Terrassier / TP', 'terrassier-tp', 'BTP', ARRAY['4312A','4312B'], 4, 2200, true),
  ('charpentier_bois', 'Charpentier bois', 'charpentier-bois', 'BTP', ARRAY['4391A'], 4, 2700, true),
  ('charpentier_metallique', 'Charpentier métallique', 'charpentier-metallique', 'BTP', ARRAY['4399B','2511Z'], 4, 2800, true),
  ('demolisseur', 'Démolisseur', 'demolisseur', 'BTP', ARRAY['4311Z'], 3, 1800, false),
  ('foreur', 'Foreur / forage géothermie', 'foreur-geothermie', 'BTP', ARRAY['4312B','4399'], 4, 3500, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : Couverture / Étanchéité (4)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('couvreur_zingueur', 'Couvreur-zingueur', 'couvreur-zingueur', 'BTP', ARRAY['4391A','4391B'], 5, 3000, true),
  ('etancheur', 'Étancheur', 'etancheur', 'BTP', ARRAY['4399A'], 5, 4000, true),
  ('bardeur', 'Bardeur (métal/bois)', 'bardeur', 'BTP', ARRAY['4391B','4329A'], 4, 2500, true),
  ('facadier_ite', 'Façadier / ITE', 'facadier-ite', 'BTP', ARRAY['4399C','4329B'], 4, 2500, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : Plomberie / CVC (5)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('plombier', 'Plombier', 'plombier', 'BTP', ARRAY['4322A'], 3, 1500, true),
  ('chauffagiste', 'Chauffagiste', 'chauffagiste', 'BTP', ARRAY['4322B'], 3, 1700, true),
  ('plombier_chauffagiste', 'Plombier-chauffagiste', 'plombier-chauffagiste', 'BTP', ARRAY['4322A','4322B'], 3, 1700, true),
  ('frigoriste', 'Frigoriste / climatisation', 'frigoriste-climaticien', 'BTP', ARRAY['4322B'], 3, 1900, true),
  ('sanitaire', 'Spécialiste sanitaire', 'specialiste-sanitaire', 'BTP', ARRAY['4322A'], 3, 1500, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : Électricité / Domotique (4)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('electricien', 'Électricien bâtiment', 'electricien', 'BTP', ARRAY['4321A'], 3, 1200, true),
  ('domoticien', 'Domoticien / courant faible', 'domoticien', 'BTP', ARRAY['4321A'], 3, 1500, true),
  ('alarme_securite', 'Alarme / sécurité', 'alarme-securite', 'BTP', ARRAY['4321A'], 3, 1300, false),
  ('installateur_fibre', 'Installateur fibre / réseau', 'installateur-fibre-reseau', 'BTP', ARRAY['4321A'], 2, 1100, false)
ON CONFLICT (code) DO NOTHING;

-- BTP : Menuiserie / Agencement (5)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('menuisier_interieur', 'Menuisier intérieur', 'menuisier-interieur', 'BTP', ARRAY['4332A'], 2, 1100, true),
  ('menuisier_exterieur', 'Menuisier extérieur', 'menuisier-exterieur', 'BTP', ARRAY['4332A'], 3, 1500, true),
  ('agenceur', 'Agenceur / cuisiniste', 'agenceur-cuisiniste', 'BTP', ARRAY['4332A','4332C'], 2, 1300, false),
  ('escalierieur', 'Escaliéreur', 'escalierieur', 'BTP', ARRAY['4332A'], 3, 1400, true),
  ('parqueteur', 'Parqueteur', 'parqueteur', 'BTP', ARRAY['4333Z'], 2, 1100, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : Finitions (6)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('peintre', 'Peintre en bâtiment', 'peintre', 'BTP', ARRAY['4334Z'], 1, 800, true),
  ('plaquiste_platrier', 'Plaquiste / plâtrier', 'plaquiste-platrier', 'BTP', ARRAY['4331Z'], 2, 1100, true),
  ('carreleur', 'Carreleur', 'carreleur', 'BTP', ARRAY['4333Z'], 2, 1200, true),
  ('solier_moquettiste', 'Solier-moquettiste', 'solier-moquettiste', 'BTP', ARRAY['4333Z'], 2, 1100, true),
  ('vitrier', 'Vitrier / miroitier', 'vitrier-miroitier', 'BTP', ARRAY['4334Z'], 2, 1200, true),
  ('serrurier_metallier', 'Serrurier-métallier', 'serrurier-metallier', 'BTP', ARRAY['4332B','4399B'], 3, 1500, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : Spécialités (9)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('pisciniste', 'Pisciniste', 'pisciniste', 'BTP', ARRAY['4399C','9311Z'], 4, 3500, true),
  ('paysagiste', 'Paysagiste', 'paysagiste', 'BTP', ARRAY['8130Z','4399'], 2, 1100, true),
  ('elagueur', 'Élagueur', 'elagueur', 'BTP', ARRAY['8130Z'], 2, 1000, false),
  ('desamianteur', 'Désamianteur SS3/SS4', 'desamianteur', 'BTP', ARRAY['3900Z','4399'], 5, 4000, true),
  ('assainisseur', 'Spécialiste assainissement', 'specialiste-assainissement', 'BTP', ARRAY['4322A','4321A'], 3, 1800, true),
  ('ascensoriste', 'Ascensoriste', 'ascensoriste', 'BTP', ARRAY['4329A','3312Z'], 3, 2500, true),
  ('cheminee_fumisterie', 'Cheminée / fumisterie', 'cheminee-fumisterie', 'BTP', ARRAY['4322B','4399'], 3, 1500, true),
  ('carrossier_batiment', 'Carrossier-tôlier bâtiment', 'carrossier-batiment', 'BTP', ARRAY['4329A'], 3, 1700, true),
  ('poseur_veranda', 'Poseur véranda / pergola', 'poseur-veranda-pergola', 'BTP', ARRAY['4332A','4399B'], 3, 2000, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : Conception / MOE (6)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('architecte_interieur', 'Architecte d''intérieur', 'architecte-interieur', 'BTP', ARRAY['7111Z','7410Z'], 3, 2500, true),
  ('architecte_dplg', 'Architecte DPLG', 'architecte-dplg', 'BTP', ARRAY['7111Z'], 4, 3500, true),
  ('maitre_oeuvre', 'Maître d''œuvre', 'maitre-oeuvre', 'BTP', ARRAY['7112B'], 4, 3500, true),
  ('bureau_etudes', 'Bureau d''études techniques (BET)', 'bureau-etudes-techniques', 'BTP', ARRAY['7112B'], 3, 2500, true),
  ('economiste_construction', 'Économiste de la construction', 'economiste-construction', 'BTP', ARRAY['7112B'], 3, 2500, true),
  ('geometre_expert', 'Géomètre-expert', 'geometre-expert', 'BTP', ARRAY['7112A','7112B'], 3, 2200, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : Promotion / Construction (3)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('cmi', 'Constructeur maisons individuelles (CMI)', 'cmi', 'BTP', ARRAY['4120A'], 5, 4500, true),
  ('promoteur', 'Promoteur immobilier', 'promoteur-immobilier', 'BTP', ARRAY['4110A','4110D'], 5, 5000, true),
  ('sous_traitant_btp', 'Sous-traitant BTP', 'sous-traitant-btp', 'BTP', ARRAY['4399'], 3, 1800, true)
ON CONFLICT (code) DO NOTHING;

-- BTP : RGE / Énergétique (5)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur, obligation_decennale) VALUES
  ('photovoltaique', 'Installateur photovoltaïque', 'installateur-photovoltaique', 'BTP', ARRAY['4321A','4329A'], 4, 2200, true),
  ('pac', 'Installateur pompe à chaleur (PAC)', 'installateur-pompe-a-chaleur', 'BTP', ARRAY['4322B'], 3, 1500, true),
  ('insert_poele', 'Insert / poêle bois', 'insert-poele-bois', 'BTP', ARRAY['4322B'], 2, 1300, false),
  ('isolation_iteiti', 'Spécialiste isolation ITE/ITI', 'isolation-ite-iti', 'BTP', ARRAY['4329A','4399'], 3, 1800, true),
  ('multi_services_btp', 'Multi-services BTP', 'multi-services-btp', 'BTP', ARRAY['4399'], 2, 1100, true)
ON CONFLICT (code) DO NOTHING;

-- VTC / TAXI (niche pépite)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, risque_niveau, panier_moyen_eur) VALUES
  ('vtc', 'VTC', 'vtc', 'VTC_TAXI', ARRAY['4932Z'], 3, 1800),
  ('taxi', 'Taxi', 'taxi', 'VTC_TAXI', ARRAY['4932Z'], 3, 1900),
  ('chauffeur_prive', 'Chauffeur privé', 'chauffeur-prive', 'VTC_TAXI', ARRAY['4932Z'], 3, 1800),
  ('lvc', 'Location avec chauffeur (LVC)', 'lvc', 'VTC_TAXI', ARRAY['4932Z'], 3, 2000)
ON CONFLICT (code) DO NOTHING;

-- AVOCATS / JURIDIQUE
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, panier_moyen_eur) VALUES
  ('avocat', 'Avocat', 'avocat', 'AVOCATS_JURIDIQUE', ARRAY['6910Z'], 1500),
  ('notaire', 'Notaire', 'notaire', 'AVOCATS_JURIDIQUE', ARRAY['6910Z'], 1800),
  ('huissier', 'Huissier de justice', 'huissier-justice', 'AVOCATS_JURIDIQUE', ARRAY['6910Z'], 1500),
  ('mandataire_judiciaire', 'Mandataire judiciaire', 'mandataire-judiciaire', 'AVOCATS_JURIDIQUE', ARRAY['6910Z'], 2000),
  ('expert_comptable', 'Expert-comptable', 'expert-comptable', 'AVOCATS_JURIDIQUE', ARRAY['6920Z'], 1800),
  ('commissaire_aux_comptes', 'Commissaire aux comptes', 'commissaire-aux-comptes', 'AVOCATS_JURIDIQUE', ARRAY['6920Z'], 2200)
ON CONFLICT (code) DO NOTHING;

-- SANTÉ / MÉDICAL (15 professions)
INSERT INTO app.metiers (code, name, slug, vertical, naf_codes, panier_moyen_eur) VALUES
  ('medecin_generaliste', 'Médecin généraliste', 'medecin-generaliste', 'SANTE_MEDICAL', ARRAY['8621Z'], 2500),
  ('medecin_specialiste', 'Médecin spécialiste', 'medecin-specialiste', 'SANTE_MEDICAL', ARRAY['8622Z'], 3500),
  ('infirmier_libéral', 'Infirmier libéral / IDEL', 'infirmier-liberal', 'SANTE_MEDICAL', ARRAY['8690D'], 800),
  ('kinesitherapeute', 'Kinésithérapeute', 'kinesitherapeute', 'SANTE_MEDICAL', ARRAY['8690E'], 1200),
  ('osteopathe', 'Ostéopathe', 'osteopathe', 'SANTE_MEDICAL', ARRAY['8690F'], 900),
  ('sage_femme', 'Sage-femme', 'sage-femme', 'SANTE_MEDICAL', ARRAY['8690A'], 1100),
  ('dentiste', 'Dentiste / chirurgien dentiste', 'dentiste', 'SANTE_MEDICAL', ARRAY['8623Z'], 2800),
  ('psychologue', 'Psychologue / psychothérapeute', 'psychologue', 'SANTE_MEDICAL', ARRAY['8690F'], 800),
  ('pharmacien', 'Pharmacien', 'pharmacien', 'SANTE_MEDICAL', ARRAY['4773Z'], 2500)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 2. SEED PARTENAIRES ASSUREURS
-- ============================================================================
INSERT INTO app.insurance_partners (code, name, slug, partner_priority, metiers_couverts, garanties_couvertes, commission_y1_pct, commission_recurring_pct) VALUES
  ('hiscox', 'Hiscox', 'hiscox', 10, ARRAY['plombier','electricien','peintre','menuisier','consultant','vtc'], ARRAY['rc_pro','decennale','multirisque_pro','cyber'], 18.00, 10.00),
  ('april_pro', 'April Pro', 'april-pro', 20, ARRAY['plombier','electricien','peintre','macon','couvreur'], ARRAY['decennale','rc_pro','multirisque_pro'], 17.00, 9.50),
  ('mma_pro', 'MMA Pro', 'mma-pro', 30, ARRAY['macon','couvreur','charpentier','plombier'], ARRAY['decennale','rc_pro','multirisque_pro'], 16.00, 9.00),
  ('generali_pro', 'Generali Pro', 'generali-pro', 40, ARRAY['macon','couvreur','charpentier','medecin_generaliste','avocat'], ARRAY['decennale','rc_pro','multirisque_pro','prevoyance_tns'], 17.00, 9.00),
  ('axa_pro', 'AXA Pro', 'axa-pro', 50, ARRAY['plombier','electricien','peintre','restaurant','medecin_generaliste'], ARRAY['rc_pro','multirisque_pro','flotte_auto_pro','prevoyance_tns'], 16.00, 8.50),
  ('allianz_pro', 'Allianz Pro', 'allianz-pro', 60, ARRAY['plombier','electricien','peintre','vtc','consultant'], ARRAY['rc_pro','decennale','multirisque_pro','flotte_auto_pro'], 16.00, 8.50),
  ('maaf_pro', 'Maaf Pro', 'maaf-pro', 70, ARRAY['plombier','electricien','peintre','vtc'], ARRAY['rc_pro','multirisque_pro'], 15.00, 8.00),
  ('smabtp', 'SMABTP', 'smabtp', 15, ARRAY['macon','couvreur','charpentier','etancheur','plombier'], ARRAY['decennale','rc_pro','multirisque_pro','garantie_financiere'], 18.00, 10.00),
  ('wakam', 'Wakam', 'wakam', 25, ARRAY['vtc','taxi','consultant','freelance'], ARRAY['rc_pro','flotte_auto_pro','cyber'], 16.00, 8.00),
  ('stello', 'Stello', 'stello', 35, ARRAY['consultant','freelance','auto_entrepreneur','medecin_generaliste'], ARRAY['rc_pro','prevoyance_tns','cyber'], 17.00, 9.00)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 3. SEED PROFILES — 5 auteurs ORIAS placeholder
-- ============================================================================
-- Note : à remplir avec les vraies données après recrutement
-- Ces lignes sont des templates à compléter

-- Marvin (lead courtier ORIAS)
-- INSERT à faire manuellement avec auth.users.id correspondant

-- ============================================================================
-- 4. SEED REGIONS (13 métropole + 5 DROM)
-- ============================================================================
-- Cette liste sera enrichie via INSEE COG en phase 1
-- Les 18 régions sont créées comme références pour les pages géo

-- ============================================================================
-- 5. CHECK FINAL
-- ============================================================================
DO $$
DECLARE
  metiers_count integer;
  partners_count integer;
  garanties_count integer;
BEGIN
  SELECT count(*) INTO metiers_count FROM app.metiers;
  SELECT count(*) INTO partners_count FROM app.insurance_partners;
  SELECT count(*) INTO garanties_count FROM app.garanties_assurance;

  RAISE NOTICE 'Seed data loaded:';
  RAISE NOTICE '  - Métiers     : % rows', metiers_count;
  RAISE NOTICE '  - Partenaires : % rows', partners_count;
  RAISE NOTICE '  - Garanties   : % rows', garanties_count;
END $$;
