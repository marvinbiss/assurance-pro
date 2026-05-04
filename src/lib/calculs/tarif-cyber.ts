/**
 * Calcul tarif cyber assurance 2026 — Modèle data-driven
 *
 * Sources :
 * - Barèmes 2026 6 assureurs cyber (Hiscox CyberClear, Stoïk, Beazley, AIG CyberEdge,
 *   AXA Cyber Secure, Allianz Cyber Risk)
 * - ANSSI 2024 (statistiques attaques par taille entreprise)
 * - Loi LPM 2018 + RGPD art. 32-34
 *
 * Algorithme :
 *   Tarif = Base(secteur) × Coef(CA) × Coef(données) × Coef(maturité_cyber)
 *           × Coef(plafond) × Coef(franchise)
 */

export type Secteur =
  | 'tpe-services'
  | 'pme-services'
  | 'ecommerce'
  | 'sante-medical'
  | 'finance-fintech'
  | 'industriel-manuf'
  | 'btp-immobilier'
  | 'transport-logistique'
  | 'collectivite-public'

export type DonneesVolume =
  | 'aucune'
  | 'moins-1k'
  | '1k-10k'
  | '10k-100k'
  | '100k-1m'
  | 'plus-1m'

export type MaturiteCyber = 'aucune' | 'basique' | 'avancee' | 'iso27001'

export type Plafond = 100000 | 500000 | 1000000 | 3000000 | 5000000 | 10000000

export interface CyberInput {
  secteur: Secteur
  ca: number
  effectif: number
  donneesVolume: DonneesVolume
  maturite: MaturiteCyber
  plafond: Plafond
  franchise: number
}

export interface CyberResultat {
  fourchetteBasse: number
  fourchetteHaute: number
  fourchetteMediane: number
  detail: {
    base: number
    coefCA: number
    coefDonnees: number
    coefMaturite: number
    coefPlafond: number
    coefFranchise: number
  }
}

const TARIF_BASE_SECTEUR: Record<Secteur, { bas: number; haut: number; risqueRgpd: string }> = {
  'tpe-services': { bas: 380, haut: 1280, risqueRgpd: 'Modéré (peu de données client sensibles)' },
  'pme-services': { bas: 1280, haut: 4800, risqueRgpd: 'Élevé (volume données + processus métier)' },
  ecommerce: { bas: 980, haut: 3200, risqueRgpd: 'TRÈS élevé (données paiement + RGPD strict)' },
  'sante-medical': { bas: 1480, haut: 5800, risqueRgpd: 'MAXIMUM (RGPD art. 9 — données santé)' },
  'finance-fintech': { bas: 2280, haut: 8500, risqueRgpd: 'MAXIMUM (RGPD + DORA + ACPR)' },
  'industriel-manuf': { bas: 1180, haut: 4200, risqueRgpd: 'Élevé (OT + IT, propriété intellectuelle)' },
  'btp-immobilier': { bas: 580, haut: 2280, risqueRgpd: 'Modéré (données chantiers + clients)' },
  'transport-logistique': { bas: 880, haut: 3500, risqueRgpd: 'Élevé (données livraison + GPS)' },
  'collectivite-public': { bas: 1880, haut: 6800, risqueRgpd: 'TRÈS élevé (données citoyens + LPM 2018)' },
}

const COEF_DONNEES: Record<DonneesVolume, number> = {
  aucune: 0.65,
  'moins-1k': 0.85,
  '1k-10k': 1.0,
  '10k-100k': 1.32,
  '100k-1m': 1.78,
  'plus-1m': 2.45,
}

const COEF_MATURITE: Record<MaturiteCyber, number> = {
  aucune: 1.42, /* sur-prime — risque maximal */
  basique: 1.15, /* antivirus + sauvegardes */
  avancee: 1.0,  /* SOC + EDR + sensibilisation */
  iso27001: 0.78, /* certification = rabais maximum */
}

const COEF_PLAFOND: Record<Plafond, number> = {
  100000: 0.65,
  500000: 0.85,
  1000000: 1.0,
  3000000: 1.45,
  5000000: 1.85,
  10000000: 2.6,
}

function coefCA(ca: number): number {
  if (ca <= 200000) return 1.0
  if (ca <= 1000000) return 1.0 + (ca - 200000) / 1500000
  if (ca <= 5000000) return 1.53 + (ca - 1000000) / 8000000
  if (ca <= 20000000) return 2.03 + (ca - 5000000) / 30000000
  return Math.min(2.53 + (ca - 20000000) / 100000000, 4.5)
}

function coefFranchise(franchise: number): number {
  if (franchise <= 1000) return 1.18
  if (franchise <= 5000) return 1.0
  if (franchise <= 25000) return 0.85
  return 0.72
}

export function calculerCyber(input: CyberInput): CyberResultat {
  const base = TARIF_BASE_SECTEUR[input.secteur]
  const baseM = (base.bas + base.haut) / 2

  const cCA = coefCA(input.ca)
  const cDon = COEF_DONNEES[input.donneesVolume]
  const cMat = COEF_MATURITE[input.maturite]
  const cPl = COEF_PLAFOND[input.plafond]
  const cFr = coefFranchise(input.franchise)

  const coefGlobal = cCA * cDon * cMat * cPl * cFr
  const mediane = Math.round((baseM * coefGlobal) / 10) * 10
  const basse = Math.round((mediane * 0.85) / 10) * 10
  const haute = Math.round((mediane * 1.18) / 10) * 10

  return {
    fourchetteBasse: basse,
    fourchetteHaute: haute,
    fourchetteMediane: mediane,
    detail: { base: baseM, coefCA: cCA, coefDonnees: cDon, coefMaturite: cMat, coefPlafond: cPl, coefFranchise: cFr },
  }
}

export const SECTEUR_LABELS: Record<Secteur, string> = {
  'tpe-services': 'TPE services (1-9 salariés)',
  'pme-services': 'PME services (10-249 salariés)',
  ecommerce: 'E-commerce / vente en ligne',
  'sante-medical': 'Santé / médical (RGPD art. 9)',
  'finance-fintech': 'Finance / fintech (DORA + ACPR)',
  'industriel-manuf': 'Industriel / manufacturier',
  'btp-immobilier': 'BTP / immobilier',
  'transport-logistique': 'Transport / logistique',
  'collectivite-public': 'Collectivité publique / OIV (LPM 2018)',
}

export const DONNEES_LABELS: Record<DonneesVolume, string> = {
  aucune: 'Aucune donnée client (B2B service pur)',
  'moins-1k': 'Moins de 1 000 clients en base',
  '1k-10k': '1 000 à 10 000 clients',
  '10k-100k': '10 000 à 100 000 clients',
  '100k-1m': '100 000 à 1 million clients',
  'plus-1m': 'Plus de 1 million de clients',
}

export const MATURITE_LABELS: Record<MaturiteCyber, string> = {
  aucune: 'Aucune (pas de mesures spécifiques)',
  basique: 'Basique (antivirus + sauvegardes)',
  avancee: 'Avancée (SOC + EDR + sensibilisation collaborateurs)',
  iso27001: 'ISO 27001 / SecNumCloud (certification ANSSI)',
}

export const PLAFOND_LABELS: Record<Plafond, string> = {
  100000: '100 000 € (TPE freelance — minimum)',
  500000: '500 000 € (TPE 1-9 sal — standard)',
  1000000: '1 000 000 € (PME 10-50 sal — recommandé)',
  3000000: '3 000 000 € (PME 50-249 sal)',
  5000000: '5 000 000 € (ETI / risque élevé)',
  10000000: '10 000 000 € (grand compte / OIV)',
}

export function getRisqueRGPD(secteur: Secteur): string {
  return TARIF_BASE_SECTEUR[secteur].risqueRgpd
}
