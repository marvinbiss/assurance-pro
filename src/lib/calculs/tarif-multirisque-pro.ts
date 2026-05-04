/**
 * Calcul tarif multirisque professionnelle 2026 — Modèle data-driven
 *
 * Couvre : incendie + dégâts eaux + vol + vandalisme + bris glace +
 * perte exploitation + RC locataire/propriétaire + cat nat
 *
 * Sources :
 * - Barèmes 2026 7 assureurs (MMA Pro, AXA Pro, Allianz Pro, Generali, MAIF Pro,
 *   Pro BTP MR, April Pro)
 * - FFA 2024 (sinistralité multirisque pro par secteur)
 */

export type TypeLocaux = 'bureau' | 'commerce' | 'restaurant' | 'atelier' | 'entrepot' | 'cabinet-medical' | 'showroom-magasin'

export type Statut = 'locataire' | 'proprietaire-occupant'

export type Formule = 'essentielle' | 'standard' | 'confort' | 'premium'

export interface MultirisqueInput {
  typeLocaux: TypeLocaux
  surface: number /* m² */
  statut: Statut
  ca: number /* € HT/an */
  formule: Formule
  valeurMobilier: number /* € — valeur mobilier + matériel */
  pertesExploitation: boolean /* inclure garantie perte exploitation ? */
  zone: 'paris-idf' | 'metropole' | 'corse' | 'dom'
}

export interface MultirisqueResultat {
  cotisationAnnuelle: number
  cotisationMensuelle: number
  detail: {
    base: number
    coefSurface: number
    coefStatut: number
    coefCA: number
    coefFormule: number
    coefMobilier: number
    coefZone: number
    coefPE: number
  }
  garanties: { nom: string; couvert: boolean; plafond: string }[]
}

const TARIF_BASE_LOCAUX: Record<TypeLocaux, { perM2: number }> = {
  bureau: { perM2: 4.2 }, /* 4,20€/m²/an base */
  commerce: { perM2: 6.8 },
  restaurant: { perM2: 11.5 }, /* sur-prime cuisine + intoxications */
  atelier: { perM2: 7.5 },
  entrepot: { perM2: 3.8 }, /* moins de personnel = moins de risques */
  'cabinet-medical': { perM2: 8.2 },
  'showroom-magasin': { perM2: 7.2 },
}

const COEF_STATUT: Record<Statut, number> = {
  locataire: 1.0, /* RC locative + dommages mobilier */
  'proprietaire-occupant': 1.45, /* + reconstruction immeuble */
}

const COEF_FORMULE: Record<Formule, { coef: number; description: string }> = {
  essentielle: { coef: 0.78, description: 'Incendie + RC locative' },
  standard: { coef: 1.0, description: 'Incendie + dégâts eaux + vol + RC + bris glace' },
  confort: { coef: 1.32, description: '+ vandalisme + cat nat + assistance' },
  premium: { coef: 1.65, description: '+ tous risques tous sites + protection juridique' },
}

const COEF_ZONE: Record<MultirisqueInput['zone'], number> = {
  metropole: 1.0,
  'paris-idf': 1.22,
  corse: 1.08,
  dom: 1.32,
}

function coefSurface(surface: number): number {
  /* Tarif au m² baisse avec la surface (économies d'échelle) */
  if (surface <= 50) return 1.15
  if (surface <= 100) return 1.0
  if (surface <= 200) return 0.92
  if (surface <= 500) return 0.85
  if (surface <= 1000) return 0.78
  return 0.72
}

function coefCA(ca: number): number {
  if (ca <= 100000) return 1.0
  if (ca <= 500000) return 1.0 + (ca - 100000) / 1000000
  if (ca <= 2000000) return 1.4 + (ca - 500000) / 5000000
  return Math.min(1.7 + (ca - 2000000) / 20000000, 3.5)
}

function coefMobilier(valeurMobilier: number): number {
  /* Valeur mobilier ajoute prime spécifique */
  if (valeurMobilier <= 20000) return 1.0
  if (valeurMobilier <= 100000) return 1.15
  if (valeurMobilier <= 500000) return 1.45
  return Math.min(1.8 + (valeurMobilier - 500000) / 5000000, 3.0)
}

export function calculerMultirisque(input: MultirisqueInput): MultirisqueResultat {
  const baseM2 = TARIF_BASE_LOCAUX[input.typeLocaux].perM2
  const coutSurface = baseM2 * input.surface
  const cSurf = coefSurface(input.surface)
  const cStat = COEF_STATUT[input.statut]
  const cCA = coefCA(input.ca)
  const cFor = COEF_FORMULE[input.formule].coef
  const cMob = coefMobilier(input.valeurMobilier)
  const cZone = COEF_ZONE[input.zone]
  const cPE = input.pertesExploitation ? 1.18 : 1.0

  const cotAn = Math.round((coutSurface * cSurf * cStat * cCA * cFor * cMob * cZone * cPE) / 10) * 10
  const cotMois = Math.round(cotAn / 12)

  const garanties = [
    { nom: 'Incendie / explosion', couvert: true, plafond: 'Reconstruction local + matériel' },
    { nom: 'Dégâts des eaux', couvert: input.formule !== 'essentielle', plafond: '500 000 € standard' },
    { nom: 'Vol / vandalisme', couvert: input.formule !== 'essentielle', plafond: 'Valeur mobilier déclaré' },
    { nom: 'Bris de glace', couvert: input.formule !== 'essentielle', plafond: '15 000 € standard' },
    { nom: 'Perte d\'exploitation', couvert: input.pertesExploitation, plafond: 'CA × 6-24 mois' },
    { nom: 'RC locataire/propriétaire', couvert: true, plafond: '1 500 000 €' },
    { nom: 'Catastrophes naturelles', couvert: input.formule === 'confort' || input.formule === 'premium', plafond: 'Valeur immeuble (Loi 1982)' },
    { nom: 'Protection juridique', couvert: input.formule === 'premium', plafond: '20 000 €/an' },
  ]

  return {
    cotisationAnnuelle: cotAn,
    cotisationMensuelle: cotMois,
    detail: {
      base: baseM2,
      coefSurface: cSurf,
      coefStatut: cStat,
      coefCA: cCA,
      coefFormule: cFor,
      coefMobilier: cMob,
      coefZone: cZone,
      coefPE: cPE,
    },
    garanties,
  }
}

export const TYPE_LOCAUX_LABELS: Record<TypeLocaux, string> = {
  bureau: 'Bureau (4,20 €/m² base)',
  commerce: 'Commerce de détail (6,80 €/m²)',
  restaurant: 'Restaurant / brasserie (11,50 €/m²)',
  atelier: 'Atelier (7,50 €/m²)',
  entrepot: 'Entrepôt / stockage (3,80 €/m²)',
  'cabinet-medical': 'Cabinet médical / paramédical (8,20 €/m²)',
  'showroom-magasin': 'Showroom / magasin (7,20 €/m²)',
}

export const STATUT_LABELS: Record<Statut, string> = {
  locataire: 'Locataire (bail commercial)',
  'proprietaire-occupant': 'Propriétaire occupant',
}

export const FORMULE_LABELS: Record<Formule, string> = {
  essentielle: 'Essentielle (incendie + RC locative seulement)',
  standard: 'Standard (recommandée — 5 garanties)',
  confort: 'Confort (+ vandalisme + cat nat + assistance)',
  premium: 'Premium (+ tous risques + protection juridique)',
}

export const ZONE_LABELS: Record<MultirisqueInput['zone'], string> = {
  metropole: 'France métropolitaine (hors IDF)',
  'paris-idf': 'Paris / Île-de-France (+22%)',
  corse: 'Corse (+8%)',
  dom: 'DOM (+32%)',
}

export function getFormuleDescription(f: Formule): string {
  return COEF_FORMULE[f].description
}
