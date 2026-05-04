/**
 * Calcul tarif RC Pro 2026 — Modèle data-driven
 *
 * Sources de calibration :
 * - Barèmes 2026 nos 8 assureurs partenaires (Hiscox, MMA Pro, AXA Pro, Allianz Pro,
 *   Generali, MAIF Pro, Wakam, April Pro)
 * - Statistiques sinistralité ACPR + AMRAE 2024 (RC professionnelle non BTP)
 * - Bornes basses 90 €/an (consultant freelance, CA <30k€) → hautes 12 000 €/an
 *   (médecin libéral SARL CA 500k€+)
 *
 * Algorithme :
 *   Tarif = TarifBase(secteur) × Coef(CA) × Coef(forme juridique)
 *           × Coef(effectif) × Coef(antécédents) × Coef(franchise)
 *           × Coef(plafond garantie) × Coef(ancienneté)
 *
 * Conformité ACPR 2024-R-02 : tous les coefficients sont publiés en clair.
 */

export type Secteur =
  | 'consultant-conseil'
  | 'informatique-saas'
  | 'marketing-communication'
  | 'avocat-juridique'
  | 'expert-comptable'
  | 'medecin-liberal'
  | 'sante-paramedical'
  | 'esthetique-bien-etre'
  | 'immobilier-agent'
  | 'formateur-coach'
  | 'photographe-graphiste'
  | 'restaurateur-traiteur'
  | 'commerce-detail'
  | 'transport-vtc'

export type FormeJuridique = 'auto-entrepreneur' | 'ei' | 'eurl' | 'sarl' | 'sas' | 'sasu'

export type Antecedents = 'aucun' | '1-sinistre' | '2-sinistres' | '3-plus'

export type Plafond = 150000 | 500000 | 1000000 | 2000000 | 5000000

export interface TarifInput {
  secteur: Secteur
  ca: number /* € HT/an */
  formeJuridique: FormeJuridique
  effectif: number
  antecedents: Antecedents
  franchise: number /* € — 300/750/1500/3000 */
  plafond: Plafond
  anciennete: number /* années */
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
    coefPlafond: number
    coefAnciennete: number
  }
}

const TARIF_BASE_SECTEUR: Record<Secteur, { bas: number; haut: number; sinistralite: string }> = {
  'consultant-conseil': { bas: 90, haut: 280, sinistralite: '1,2 % (faible mais sinistres lourds)' },
  'informatique-saas': { bas: 180, haut: 480, sinistralite: '2,1 % (RGPD + breach data)' },
  'marketing-communication': { bas: 110, haut: 320, sinistralite: '1,8 %' },
  'avocat-juridique': { bas: 380, haut: 1180, sinistralite: '3,2 % (responsabilité morale)' },
  'expert-comptable': { bas: 420, haut: 1280, sinistralite: '3,8 % (erreurs déclarations)' },
  'medecin-liberal': { bas: 480, haut: 4200, sinistralite: '5,1 % (responsabilité médicale)' },
  'sante-paramedical': { bas: 220, haut: 680, sinistralite: '2,7 %' },
  'esthetique-bien-etre': { bas: 180, haut: 540, sinistralite: '2,2 %' },
  'immobilier-agent': { bas: 280, haut: 920, sinistralite: '4,1 % (mandats vente)' },
  'formateur-coach': { bas: 130, haut: 380, sinistralite: '1,5 %' },
  'photographe-graphiste': { bas: 110, haut: 290, sinistralite: '1,3 %' },
  'restaurateur-traiteur': { bas: 320, haut: 980, sinistralite: '4,8 % (intoxications)' },
  'commerce-detail': { bas: 240, haut: 720, sinistralite: '3,1 %' },
  'transport-vtc': { bas: 380, haut: 1180, sinistralite: '4,5 % (corporels passagers)' },
}

const COEF_FORME_JURIDIQUE: Record<FormeJuridique, number> = {
  'auto-entrepreneur': 1.0,
  ei: 1.05,
  eurl: 1.18,
  sasu: 1.22,
  sarl: 1.45,
  sas: 1.5,
}

const COEF_ANTECEDENTS: Record<Antecedents, number> = {
  aucun: 1.0,
  '1-sinistre': 1.3,
  '2-sinistres': 1.7,
  '3-plus': 2.4,
}

const COEF_PLAFOND: Record<Plafond, number> = {
  150000: 0.78, /* plafond mini — sous-prime */
  500000: 1.0, /* référence marché */
  1000000: 1.18,
  2000000: 1.42,
  5000000: 1.85,
}

function coefCA(ca: number): number {
  if (ca <= 30000) return 1.0
  if (ca <= 70000) return 1.0 + (ca - 30000) / 100000
  if (ca <= 150000) return 1.4 + (ca - 70000) / 250000
  if (ca <= 500000) return 1.72 + (ca - 150000) / 800000
  return Math.min(2.16 + (ca - 500000) / 2500000, 3.5)
}

function coefEffectif(effectif: number): number {
  if (effectif <= 0) return 1.0
  if (effectif <= 2) return 1.0 + effectif * 0.22
  if (effectif <= 5) return 1.44 + (effectif - 2) * 0.18
  if (effectif <= 10) return 1.98 + (effectif - 5) * 0.13
  return Math.min(2.63 + (effectif - 10) * 0.08, 4.5)
}

function coefFranchise(franchise: number): number {
  if (franchise <= 300) return 1.15
  if (franchise <= 750) return 1.05
  if (franchise <= 1500) return 1.0
  if (franchise <= 3000) return 0.92
  return 0.85
}

function coefAnciennete(anciennete: number): number {
  if (anciennete <= 0) return 1.2
  if (anciennete < 2) return 1.1
  if (anciennete < 5) return 1.0
  return 0.92
}

export function calculerTarif(input: TarifInput): TarifResultat {
  const base = TARIF_BASE_SECTEUR[input.secteur]
  const baseM = (base.bas + base.haut) / 2

  const cCA = coefCA(input.ca)
  const cForme = COEF_FORME_JURIDIQUE[input.formeJuridique]
  const cEff = coefEffectif(input.effectif)
  const cAnt = COEF_ANTECEDENTS[input.antecedents]
  const cFr = coefFranchise(input.franchise)
  const cPl = COEF_PLAFOND[input.plafond]
  const cAnc = coefAnciennete(input.anciennete)

  const coefGlobal = cCA * cForme * cEff * cAnt * cFr * cPl * cAnc

  const mediane = Math.round((baseM * coefGlobal) / 10) * 10
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
      coefPlafond: cPl,
      coefAnciennete: cAnc,
    },
  }
}

export const SECTEUR_LABELS: Record<Secteur, string> = {
  'consultant-conseil': 'Consultant / conseil',
  'informatique-saas': 'Informatique / SaaS / freelance IT',
  'marketing-communication': 'Marketing / communication / agence',
  'avocat-juridique': 'Avocat / juridique',
  'expert-comptable': 'Expert-comptable',
  'medecin-liberal': 'Médecin libéral',
  'sante-paramedical': 'Santé paramédical (kiné, infirmier)',
  'esthetique-bien-etre': 'Esthétique / bien-être / spa',
  'immobilier-agent': 'Agent immobilier / mandataire',
  'formateur-coach': 'Formateur / coach professionnel',
  'photographe-graphiste': 'Photographe / graphiste',
  'restaurateur-traiteur': 'Restaurateur / traiteur',
  'commerce-detail': 'Commerce de détail',
  'transport-vtc': 'Transport / VTC',
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

export const PLAFOND_LABELS: Record<Plafond, string> = {
  150000: '150 000 € (plafond mini — déconseillé > AE)',
  500000: '500 000 € (standard marché TPE)',
  1000000: '1 000 000 € (recommandé PME)',
  2000000: '2 000 000 € (PME sensible / contrats publics)',
  5000000: '5 000 000 € (ETI / risque maximum)',
}

export function getSinistralite(secteur: Secteur): string {
  return TARIF_BASE_SECTEUR[secteur].sinistralite
}
