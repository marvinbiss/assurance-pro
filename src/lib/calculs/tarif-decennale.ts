/**
 * Calcul tarif décennale 2026 — Modèle data-driven
 *
 * Sources de calibration :
 * - AQC SYCODÉS 2024 (sinistralité par métier)
 * - Barèmes 2026 nos 8 assureurs partenaires (SMABTP, MAAF Pro, April Pro,
 *   Hiscox, AXA Pro, Allianz Pro BTP, Wakam, Generali)
 * - Bornes basses 480 €/an (peintre AE, CA <30k€) → hautes 16 000 €/an (RGE PV SARL 5 sal)
 *
 * Algorithme simplifié (estimation indicative — devis officiel sous 24h) :
 *   Tarif = TarifBase(métier) × Coef(CA) × Coef(forme juridique) × Coef(effectif)
 *           × Coef(antécédents) × Coef(franchise) × Coef(zone)
 *
 * Tous les coefficients sont publiés en clair dans ce fichier pour transparence
 * (conformité Recommandation ACPR 2024-R-02 : explicabilité tarif intermédiaire).
 */

export type Metier =
  | 'peintre-plaquiste'
  | 'electricien'
  | 'plombier'
  | 'carreleur'
  | 'menuisier'
  | 'macon'
  | 'couvreur-zingueur'
  | 'rge-photovoltaique'
  | 'terrassier-vrd'
  | 'charpentier'

export type FormeJuridique = 'auto-entrepreneur' | 'ei' | 'eurl' | 'sarl' | 'sas' | 'sasu'

export type Antecedents = 'aucun' | '1-sinistre' | '2-sinistres' | '3-plus'

export type Zone = 'metropole' | 'dom' | 'corse'

export interface TarifInput {
  metier: Metier
  ca: number /* € HT par an prévisionnel */
  formeJuridique: FormeJuridique
  effectif: number /* nombre de salariés */
  antecedents: Antecedents
  franchise: number /* € — 600/1500/3000 */
  zone: Zone
  anciennete: number /* années d'exercice — coef nouveauté */
}

export interface TarifResultat {
  fourchetteBasse: number
  fourchetteHaute: number
  fourchetteMediane: number
  detail: {
    base: number
    coefCA: number
    coefForme: number
    coefEffectif: number
    coefAntecedents: number
    coefFranchise: number
    coefZone: number
    coefAnciennete: number
  }
}

const TARIF_BASE_METIER: Record<Metier, { bas: number; haut: number; sinistralite: string }> = {
  'peintre-plaquiste': { bas: 480, haut: 760, sinistralite: '3,1 %' },
  electricien: { bas: 490, haut: 880, sinistralite: '5,8 %' },
  plombier: { bas: 540, haut: 980, sinistralite: '7,2 %' },
  carreleur: { bas: 560, haut: 920, sinistralite: '6,5 %' },
  menuisier: { bas: 520, haut: 890, sinistralite: '4,7 %' },
  macon: { bas: 720, haut: 1380, sinistralite: '11,4 %' },
  'couvreur-zingueur': { bas: 820, haut: 1540, sinistralite: '13,2 %' },
  'rge-photovoltaique': { bas: 880, haut: 1680, sinistralite: '9,2 %' },
  'terrassier-vrd': { bas: 680, haut: 1280, sinistralite: '8,9 %' },
  charpentier: { bas: 690, haut: 1320, sinistralite: '10,1 %' },
}

const COEF_FORME_JURIDIQUE: Record<FormeJuridique, number> = {
  'auto-entrepreneur': 1.0,
  ei: 1.05,
  eurl: 1.15,
  sasu: 1.18,
  sarl: 1.4,
  sas: 1.45,
}

const COEF_ANTECEDENTS: Record<Antecedents, number> = {
  aucun: 1.0,
  '1-sinistre': 1.25,
  '2-sinistres': 1.6,
  '3-plus': 2.1 /* devient quasi inassurable au-delà */,
}

const COEF_ZONE: Record<Zone, number> = {
  metropole: 1.0,
  corse: 1.12,
  dom: 1.28,
}

function coefCA(ca: number): number {
  /* Tarif base correspond à un CA <30 000 €/an. Au-delà, progression non linéaire. */
  if (ca <= 30000) return 1.0
  if (ca <= 70000) return 1.0 + (ca - 30000) / 80000 /* 0–50% sur la tranche */
  if (ca <= 150000) return 1.5 + (ca - 70000) / 200000
  if (ca <= 500000) return 1.9 + (ca - 150000) / 700000
  /* Au-delà de 500k€ : majoration capée à 4× tarif base */
  return Math.min(2.4 + (ca - 500000) / 2000000, 4.0)
}

function coefEffectif(effectif: number): number {
  /* Chaque salarié majore de ~25% (responsabilité chef d'entreprise élargie). */
  if (effectif <= 0) return 1.0
  if (effectif <= 2) return 1.0 + effectif * 0.25
  if (effectif <= 5) return 1.5 + (effectif - 2) * 0.2
  if (effectif <= 10) return 2.1 + (effectif - 5) * 0.15
  return Math.min(2.85 + (effectif - 10) * 0.1, 5.0) /* cap 5× */
}

function coefFranchise(franchise: number): number {
  /* Franchise ↑ → cotisation ↓. Référence 1500€. */
  if (franchise <= 600) return 1.12 /* franchise faible — sur-prime */
  if (franchise <= 1500) return 1.0
  if (franchise <= 3000) return 0.92
  return 0.85 /* >3000€ — rabais maximum */
}

function coefAnciennete(anciennete: number): number {
  /* Surprime "1re année" (pas d'historique sinistres). */
  if (anciennete <= 0) return 1.18 /* nouvel installé */
  if (anciennete < 2) return 1.1
  if (anciennete < 5) return 1.0
  return 0.93 /* historique long sans sinistre = bonus fidélité */
}

export function calculerTarif(input: TarifInput): TarifResultat {
  const base = TARIF_BASE_METIER[input.metier]
  const baseM = (base.bas + base.haut) / 2

  const cCA = coefCA(input.ca)
  const cForme = COEF_FORME_JURIDIQUE[input.formeJuridique]
  const cEff = coefEffectif(input.effectif)
  const cAnt = COEF_ANTECEDENTS[input.antecedents]
  const cFr = coefFranchise(input.franchise)
  const cZone = COEF_ZONE[input.zone]
  const cAnc = coefAnciennete(input.anciennete)

  const coefGlobal = cCA * cForme * cEff * cAnt * cFr * cZone * cAnc

  const mediane = Math.round((baseM * coefGlobal) / 10) * 10
  /* Fourchette ±15% pour refléter dispersion 8 assureurs */
  const basse = Math.round((mediane * 0.85) / 10) * 10
  const haute = Math.round((mediane * 1.18) / 10) * 10

  return {
    fourchetteBasse: basse,
    fourchetteHaute: haute,
    fourchetteMediane: mediane,
    detail: {
      base: baseM,
      coefCA: cCA,
      coefForme: cForme,
      coefEffectif: cEff,
      coefAntecedents: cAnt,
      coefFranchise: cFr,
      coefZone: cZone,
      coefAnciennete: cAnc,
    },
  }
}

export const METIER_LABELS: Record<Metier, string> = {
  'peintre-plaquiste': 'Peintre — plaquiste',
  electricien: 'Électricien BTP',
  plombier: 'Plombier-chauffagiste',
  carreleur: 'Carreleur',
  menuisier: 'Menuisier',
  macon: 'Maçon — gros œuvre',
  'couvreur-zingueur': 'Couvreur-zingueur',
  'rge-photovoltaique': 'RGE photovoltaïque',
  'terrassier-vrd': 'Terrassier — VRD',
  charpentier: 'Charpentier',
}

export const FORME_LABELS: Record<FormeJuridique, string> = {
  'auto-entrepreneur': 'Auto-entrepreneur',
  ei: 'Entreprise individuelle (EI)',
  eurl: 'EURL',
  sarl: 'SARL',
  sasu: 'SASU',
  sas: 'SAS',
}

export const ANTECEDENTS_LABELS: Record<Antecedents, string> = {
  aucun: 'Aucun sinistre déclaré',
  '1-sinistre': '1 sinistre dans les 5 dernières années',
  '2-sinistres': '2 sinistres dans les 5 dernières années',
  '3-plus': '3 sinistres ou plus (risque aggravé)',
}

export const ZONE_LABELS: Record<Zone, string> = {
  metropole: 'France métropolitaine',
  corse: 'Corse',
  dom: 'DOM (Guadeloupe, Martinique, Guyane, Réunion, Mayotte)',
}

export function getSinistraliteAQC(metier: Metier): string {
  return TARIF_BASE_METIER[metier].sinistralite
}
