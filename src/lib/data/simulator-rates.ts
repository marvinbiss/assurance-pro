/**
 * Tarifs de référence pour le simulateur d'estimation en ligne.
 *
 * Sources : analyses internes 2024-2025 sur ~500 dossiers du cabinet + benchmarks AQC SYCODÉS.
 * Tous les tarifs sont des FOURCHETTES indicatives — le tarif définitif dépend de la souscription.
 *
 * Note YMYL : les estimations affichées doivent toujours être suivies de la mention
 * "indicatif — devis personnalisé requis pour valeur ferme".
 */

export type Garantie =
  | 'rc-pro'
  | 'decennale'
  | 'multirisque'
  | 'mutuelle-tns'
  | 'cyber'
  | 'auto-pro'

export type Statut = 'micro' | 'ei' | 'eurl' | 'sasu' | 'sarl' | 'sas'

export type CARange = '0-30' | '30-77' | '77-150' | '150-300' | '300+'

export interface MetierTarif {
  /** Identifiant unique du métier */
  id: string
  /** Libellé affiché */
  label: string
  /** Garanties pertinentes pour ce métier */
  garanties: Garantie[]
  /** Fourchette de prime annuelle HT en € par garantie, pour profil standard CA 30-77k€ */
  fourchettes: Partial<Record<Garantie, [number, number]>>
  /** Indique si le métier a une obligation légale décennale */
  decennaleObligatoire?: boolean
  /** Indique si le métier a une obligation légale RC Pro */
  rcProObligatoire?: boolean
}

const STATUT_MULTIPLIERS: Record<Statut, number> = {
  micro: 1.0,
  ei: 1.05,
  eurl: 1.25,
  sasu: 1.4,
  sarl: 1.45,
  sas: 1.5,
}

const CA_MULTIPLIERS: Record<CARange, number> = {
  '0-30': 0.85,
  '30-77': 1.0,
  '77-150': 1.35,
  '150-300': 1.75,
  '300+': 2.4,
}

const ANTECEDENTS_MULTIPLIERS = {
  none: 0.95,
  one: 1.0,
  two_plus: 1.4,
} as const

export type Antecedents = keyof typeof ANTECEDENTS_MULTIPLIERS

/** Catalogue des métiers couverts par le simulateur (40 métiers principaux). */
export const METIERS: MetierTarif[] = [
  // BTP gros œuvre
  {
    id: 'macon',
    label: 'Maçon',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [900, 1500], 'rc-pro': [200, 400], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'charpentier',
    label: 'Charpentier',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [960, 1600], 'rc-pro': [200, 400], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'couvreur',
    label: 'Couvreur zingueur',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [1320, 2200], 'rc-pro': [280, 480], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'etancheur',
    label: 'Étancheur',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [1800, 2800], 'rc-pro': [320, 540], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'terrassier',
    label: 'Terrassier',
    garanties: ['decennale', 'rc-pro', 'multirisque', 'auto-pro'],
    fourchettes: {
      decennale: [1020, 1700],
      'rc-pro': [220, 420],
      multirisque: [300, 600],
      'auto-pro': [600, 1500],
    },
    decennaleObligatoire: true,
  },
  // BTP second œuvre
  {
    id: 'plombier',
    label: 'Plombier-chauffagiste',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [900, 1500], 'rc-pro': [200, 400], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'electricien',
    label: 'Électricien',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [840, 1400], 'rc-pro': [200, 400], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'plaquiste',
    label: 'Plaquiste',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [720, 1200], 'rc-pro': [180, 360], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'menuisier',
    label: 'Menuisier intérieur',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [660, 1100], 'rc-pro': [180, 360], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'menuisier-ext',
    label: 'Menuisier extérieur',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [840, 1400], 'rc-pro': [200, 400], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'carreleur',
    label: 'Carreleur',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [720, 1200], 'rc-pro': [180, 360], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'peintre-int',
    label: 'Peintre intérieur',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [600, 1000], 'rc-pro': [160, 320], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'peintre-ext',
    label: 'Peintre extérieur / ravaleur',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [960, 1600], 'rc-pro': [220, 420], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  // BTP spécialisés
  {
    id: 'isolateur-ite',
    label: 'Isolateur ITE (RGE)',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [900, 1500], 'rc-pro': [200, 400], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'poseur-pac',
    label: 'Installateur PAC',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [1140, 1900], 'rc-pro': [220, 420], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  {
    id: 'poseur-solaire',
    label: 'Poseur panneaux solaires',
    garanties: ['decennale', 'rc-pro', 'multirisque'],
    fourchettes: { decennale: [1080, 1800], 'rc-pro': [220, 420], multirisque: [240, 500] },
    decennaleObligatoire: true,
  },
  // Conseil / IT
  {
    id: 'consultant',
    label: 'Consultant indépendant',
    garanties: ['rc-pro', 'cyber'],
    fourchettes: { 'rc-pro': [200, 540], cyber: [360, 800] },
  },
  {
    id: 'consultant-it',
    label: 'Consultant IT / dev',
    garanties: ['rc-pro', 'cyber'],
    fourchettes: { 'rc-pro': [240, 540], cyber: [400, 900] },
  },
  {
    id: 'coach',
    label: 'Coach professionnel',
    garanties: ['rc-pro'],
    fourchettes: { 'rc-pro': [216, 420] },
  },
  {
    id: 'formateur',
    label: 'Formateur indépendant',
    garanties: ['rc-pro'],
    fourchettes: { 'rc-pro': [108, 240] },
    rcProObligatoire: true,
  },
  // Professions réglementées
  {
    id: 'avocat',
    label: 'Avocat libéral',
    garanties: ['rc-pro', 'cyber'],
    fourchettes: { 'rc-pro': [960, 1560], cyber: [400, 900] },
    rcProObligatoire: true,
  },
  {
    id: 'expert-comptable',
    label: 'Expert-comptable',
    garanties: ['rc-pro', 'cyber'],
    fourchettes: { 'rc-pro': [780, 1200], cyber: [400, 900] },
    rcProObligatoire: true,
  },
  {
    id: 'notaire',
    label: 'Notaire',
    garanties: ['rc-pro', 'cyber'],
    fourchettes: { 'rc-pro': [1800, 3000], cyber: [500, 1100] },
    rcProObligatoire: true,
  },
  // Santé
  {
    id: 'medecin',
    label: 'Médecin libéral généraliste',
    garanties: ['rc-pro', 'multirisque'],
    fourchettes: { 'rc-pro': [2400, 4800], multirisque: [360, 720] },
    rcProObligatoire: true,
  },
  {
    id: 'kine',
    label: 'Kinésithérapeute libéral',
    garanties: ['rc-pro', 'multirisque'],
    fourchettes: { 'rc-pro': [360, 600], multirisque: [240, 500] },
    rcProObligatoire: true,
  },
  {
    id: 'osteopathe',
    label: 'Ostéopathe',
    garanties: ['rc-pro', 'multirisque'],
    fourchettes: { 'rc-pro': [300, 540], multirisque: [240, 500] },
    rcProObligatoire: true,
  },
  {
    id: 'esthetique',
    label: 'Esthéticienne',
    garanties: ['rc-pro', 'multirisque'],
    fourchettes: { 'rc-pro': [264, 480], multirisque: [240, 500] },
    rcProObligatoire: true,
  },
  // Immobilier
  {
    id: 'agent-immo',
    label: 'Agent immobilier (carte T)',
    garanties: ['rc-pro', 'multirisque', 'cyber'],
    fourchettes: { 'rc-pro': [1080, 1680], multirisque: [360, 720], cyber: [360, 800] },
    rcProObligatoire: true,
  },
  {
    id: 'syndic',
    label: 'Syndic de copropriété (carte S)',
    garanties: ['rc-pro', 'cyber'],
    fourchettes: { 'rc-pro': [1560, 2400], cyber: [400, 1000] },
    rcProObligatoire: true,
  },
  {
    id: 'diagnostiqueur',
    label: 'Diagnostiqueur immobilier',
    garanties: ['rc-pro'],
    fourchettes: { 'rc-pro': [960, 1560] },
    rcProObligatoire: true,
  },
  // Transport
  {
    id: 'vtc',
    label: 'VTC indépendant',
    garanties: ['rc-pro', 'auto-pro'],
    fourchettes: { 'rc-pro': [900, 1560], 'auto-pro': [1500, 2400] },
    rcProObligatoire: true,
  },
  {
    id: 'taxi',
    label: 'Taxi indépendant',
    garanties: ['rc-pro', 'auto-pro'],
    fourchettes: { 'rc-pro': [1200, 2160], 'auto-pro': [1800, 3000] },
    rcProObligatoire: true,
  },
  {
    id: 'transporteur',
    label: 'Transporteur de marchandises',
    garanties: ['rc-pro', 'auto-pro'],
    fourchettes: { 'rc-pro': [1440, 2400], 'auto-pro': [3000, 6000] },
    rcProObligatoire: true,
  },
  // Sport / Sécurité
  {
    id: 'educateur-sportif',
    label: 'Éducateur sportif',
    garanties: ['rc-pro'],
    fourchettes: { 'rc-pro': [360, 660] },
    rcProObligatoire: true,
  },
  {
    id: 'agent-securite',
    label: 'Agent de sécurité privée',
    garanties: ['rc-pro'],
    fourchettes: { 'rc-pro': [720, 1200] },
    rcProObligatoire: true,
  },
  // E-commerce / digital
  {
    id: 'ecommerce',
    label: 'E-commerçant',
    garanties: ['rc-pro', 'cyber', 'multirisque'],
    fourchettes: { 'rc-pro': [240, 540], cyber: [400, 1100], multirisque: [360, 720] },
  },
  {
    id: 'web-designer',
    label: 'Web designer / freelance créatif',
    garanties: ['rc-pro', 'cyber'],
    fourchettes: { 'rc-pro': [144, 288], cyber: [300, 700] },
  },
  // Commerce / restauration
  {
    id: 'restaurateur',
    label: 'Restaurateur',
    garanties: ['rc-pro', 'multirisque'],
    fourchettes: { 'rc-pro': [360, 600], multirisque: [840, 1800] },
  },
  {
    id: 'commercant',
    label: 'Commerçant boutique',
    garanties: ['rc-pro', 'multirisque'],
    fourchettes: { 'rc-pro': [300, 540], multirisque: [600, 1200] },
  },
  {
    id: 'artisan-bouche',
    label: 'Artisan de bouche (boulangerie, etc.)',
    garanties: ['rc-pro', 'multirisque'],
    fourchettes: { 'rc-pro': [300, 540], multirisque: [600, 1200] },
  },
]

export const STATUTS: Array<{ id: Statut; label: string }> = [
  { id: 'micro', label: 'Micro-entreprise / Auto-entrepreneur' },
  { id: 'ei', label: 'Entreprise individuelle (EI)' },
  { id: 'eurl', label: 'EURL' },
  { id: 'sasu', label: 'SASU' },
  { id: 'sarl', label: 'SARL' },
  { id: 'sas', label: 'SAS' },
]

export const CA_RANGES: Array<{ id: CARange; label: string }> = [
  { id: '0-30', label: 'Moins de 30 000 €' },
  { id: '30-77', label: '30 000 € à 77 000 €' },
  { id: '77-150', label: '77 000 € à 150 000 €' },
  { id: '150-300', label: '150 000 € à 300 000 €' },
  { id: '300+', label: 'Plus de 300 000 €' },
]

export interface SimulationInput {
  metier: string
  statut: Statut
  ca: CARange
  antecedents: Antecedents
  garanties: Garantie[]
}

export interface SimulationResult {
  /** Détail par garantie : min/max annuel HT estimé */
  perGarantie: Array<{
    garantie: Garantie
    label: string
    min: number
    max: number
    obligatoire?: boolean
  }>
  /** Total annuel HT estimé (fourchette) */
  totalMin: number
  totalMax: number
}

const GARANTIE_LABELS: Record<Garantie, string> = {
  'rc-pro': 'Responsabilité Civile Professionnelle',
  decennale: 'Garantie Décennale',
  multirisque: 'Multirisque Professionnelle',
  'mutuelle-tns': 'Mutuelle TNS Madelin',
  cyber: 'Cyber Assurance',
  'auto-pro': 'Auto pro / Flotte',
}

export function simulate(input: SimulationInput): SimulationResult | null {
  const metierData = METIERS.find((m) => m.id === input.metier)
  if (!metierData) return null

  const statutMult = STATUT_MULTIPLIERS[input.statut]
  const caMult = CA_MULTIPLIERS[input.ca]
  const antMult = ANTECEDENTS_MULTIPLIERS[input.antecedents]
  const totalMult = statutMult * caMult * antMult

  const perGarantie: SimulationResult['perGarantie'] = []
  let totalMin = 0
  let totalMax = 0

  for (const g of input.garanties) {
    const range = metierData.fourchettes[g]
    if (!range) continue
    const min = Math.round((range[0] * totalMult) / 10) * 10
    const max = Math.round((range[1] * totalMult) / 10) * 10
    perGarantie.push({
      garantie: g,
      label: GARANTIE_LABELS[g],
      min,
      max,
      obligatoire:
        (g === 'decennale' && metierData.decennaleObligatoire) ||
        (g === 'rc-pro' && metierData.rcProObligatoire),
    })
    totalMin += min
    totalMax += max
  }

  return { perGarantie, totalMin, totalMax }
}

export { GARANTIE_LABELS }
