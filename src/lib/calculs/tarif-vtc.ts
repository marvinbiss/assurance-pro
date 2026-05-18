/**
 * Calcul tarif assurance VTC 2026 — Modèle data-driven
 *
 * Cible : Voiture de Transport avec Chauffeur (Loi LOTI / Loi Macron art. L. 3122-1 C. transp.)
 *
 * Sources :
 * - Barèmes 2026 nos 6 assureurs spécialisés VTC (AXA Pro, Allianz Pro, Wakam, MMA, AMV,
 *   Opteven Mobility)
 * - Sinistralité corporelle passagers (BAAC 2024 — Bilan Annuel Accidents Corporels)
 * - Code transport art. L. 3122-1 (obligation RC Pro spécifique transport personnes)
 *
 * Algorithme :
 *   Tarif = Base(profil) × Coef(âge_chauffeur) × Coef(ancienneté_permis) × Coef(zone)
 *           × Coef(antécédents) × Coef(formule) × Coef(véhicule)
 */

export type Profil =
  | 'auto-entrepreneur-solo'
  | 'eurl-solo'
  | 'sasu-solo'
  | 'sarl-flotte'
  | 'sas-flotte'

export type Zone =
  | 'paris-petite-couronne'
  | 'idf-grande-couronne'
  | 'lyon-marseille'
  | 'metropole'
  | 'station'

export type Formule = 'tiers' | 'tiers-plus' | 'tous-risques' | 'tous-risques-premium'

export type Vehicule =
  | 'berline-classique'
  | 'berline-haut-gamme'
  | 'van-7places'
  | 'electrique'
  | 'hybride'

export type Antecedents = 'aucun' | '1-corporel' | '2-materiels' | 'malus' | 'resilie'

export interface VtcInput {
  profil: Profil
  ageChauffeur: number
  ancienneteVTC: number /* années d'exercice VTC */
  ancienneteB: number /* années permis B */
  zone: Zone
  formule: Formule
  vehicule: Vehicule
  antecedents: Antecedents
  effectifChauffeurs: number /* >1 si flotte */
}

export interface VtcResultat {
  fourchetteBasse: number
  fourchetteHaute: number
  fourchetteMediane: number
  detail: {
    base: number
    coefAge: number
    coefPermis: number
    coefZone: number
    coefAntecedents: number
    coefFormule: number
    coefVehicule: number
  }
}

const TARIF_BASE_PROFIL: Record<Profil, { bas: number; haut: number }> = {
  'auto-entrepreneur-solo': { bas: 1200, haut: 2800 },
  'eurl-solo': { bas: 1340, haut: 3100 },
  'sasu-solo': { bas: 1380, haut: 3180 },
  'sarl-flotte': { bas: 1850, haut: 4200 } /* par véhicule */,
  'sas-flotte': { bas: 1920, haut: 4380 } /* par véhicule */,
}

const COEF_ZONE: Record<Zone, number> = {
  'paris-petite-couronne': 1.45 /* densité trafic + sinistralité maximale */,
  'idf-grande-couronne': 1.22,
  'lyon-marseille': 1.18,
  metropole: 1.0,
  station: 0.92 /* stations de ski ou balnéaires = saisonnier moins sinistré */,
}

const COEF_FORMULE: Record<Formule, number> = {
  tiers: 1.0,
  'tiers-plus': 1.18 /* + bris glace + vol + incendie */,
  'tous-risques': 1.42,
  'tous-risques-premium': 1.65 /* + véhicule de remplacement + assistance 24/7 */,
}

const COEF_VEHICULE: Record<Vehicule, number> = {
  'berline-classique': 1.0,
  'berline-haut-gamme': 1.32,
  'van-7places': 1.18,
  electrique: 0.92 /* bonus écologique assureurs */,
  hybride: 0.95,
}

const COEF_ANTECEDENTS: Record<Antecedents, number> = {
  aucun: 1.0,
  '2-materiels': 1.32,
  '1-corporel': 1.65,
  malus: 1.85,
  resilie: 2.4 /* assurance résiliée pour sinistralité = quasi-inassurable hors marché spécialisé */,
}

function coefAge(age: number): number {
  if (age < 25) return 1.42 /* sur-prime jeune */
  if (age < 30) return 1.18
  if (age < 35) return 1.05
  if (age < 60) return 1.0
  if (age < 65) return 1.08
  return 1.22 /* sur-prime senior */
}

function coefAncienneteVTC(an: number): number {
  if (an <= 0) return 1.32 /* nouveau VTC sans historique */
  if (an < 2) return 1.15
  if (an < 5) return 1.0
  return 0.92
}

function coefAncienneteB(an: number): number {
  if (an < 3) return 1.45 /* permis < 3 ans = sur-prime majeure */
  if (an < 5) return 1.18
  return 1.0
}

export function calculerVtc(input: VtcInput): VtcResultat {
  const base = TARIF_BASE_PROFIL[input.profil]
  const baseM = (base.bas + base.haut) / 2

  const cAge = coefAge(input.ageChauffeur)
  const cVTC = coefAncienneteVTC(input.ancienneteVTC)
  const cB = coefAncienneteB(input.ancienneteB)
  const cZone = COEF_ZONE[input.zone]
  const cAnt = COEF_ANTECEDENTS[input.antecedents]
  const cForm = COEF_FORMULE[input.formule]
  const cVeh = COEF_VEHICULE[input.vehicule]

  /* Pour flotte, multiplier par le nb de chauffeurs */
  const coefFlotte = input.effectifChauffeurs > 1 ? input.effectifChauffeurs * 0.92 : 1.0

  /* Combine ancienneté VTC + permis (les 2 contribuent indépendamment) */
  const coefGlobal = cAge * cVTC * cB * cZone * cAnt * cForm * cVeh * coefFlotte

  const mediane = Math.round((baseM * coefGlobal) / 10) * 10
  const basse = Math.round((mediane * 0.85) / 10) * 10
  const haute = Math.round((mediane * 1.18) / 10) * 10

  return {
    fourchetteBasse: basse,
    fourchetteHaute: haute,
    fourchetteMediane: mediane,
    detail: {
      base: baseM,
      coefAge: cAge,
      coefPermis: cB,
      coefZone: cZone,
      coefAntecedents: cAnt,
      coefFormule: cForm,
      coefVehicule: cVeh,
    },
  }
}

export const PROFIL_LABELS: Record<Profil, string> = {
  'auto-entrepreneur-solo': 'Auto-entrepreneur (1 véhicule, 1 chauffeur)',
  'eurl-solo': 'EURL (1 véhicule, 1 chauffeur)',
  'sasu-solo': 'SASU (1 véhicule, 1 chauffeur)',
  'sarl-flotte': 'SARL (flotte plusieurs véhicules)',
  'sas-flotte': 'SAS (flotte plusieurs véhicules)',
}

export const ZONE_LABELS: Record<Zone, string> = {
  'paris-petite-couronne': 'Paris + petite couronne (75/92/93/94)',
  'idf-grande-couronne': 'Île-de-France grande couronne (77/78/91/95)',
  'lyon-marseille': 'Lyon — Marseille — autres grandes métropoles',
  metropole: 'Métropole standard (autres villes)',
  station: 'Stations de ski — balnéaires (saisonnier)',
}

export const FORMULE_LABELS: Record<Formule, string> = {
  tiers: 'Tiers obligatoire (RC seule)',
  'tiers-plus': 'Tiers + (vol, bris glace, incendie)',
  'tous-risques': 'Tous risques (recommandé)',
  'tous-risques-premium': 'Premium (véhicule remplacement + assistance 24/7)',
}

export const VEHICULE_LABELS: Record<Vehicule, string> = {
  'berline-classique': 'Berline classique (Peugeot 508, Mercedes Classe E…)',
  'berline-haut-gamme': 'Berline haut de gamme (Mercedes Classe S, BMW Série 7, Audi A8)',
  'van-7places': 'Van — minibus 7 places',
  electrique: 'Véhicule 100% électrique (Tesla, Hyundai Ioniq…)',
  hybride: 'Véhicule hybride — hybride rechargeable',
}

export const ANTECEDENTS_LABELS: Record<Antecedents, string> = {
  aucun: 'Aucun sinistre déclaré (5 dernières années)',
  '2-materiels': '2 sinistres matériels',
  '1-corporel': '1 sinistre corporel passager',
  malus: 'Coefficient malus actuel (>1.0)',
  resilie: 'Résilié pour sinistralité (assurance refusée)',
}
