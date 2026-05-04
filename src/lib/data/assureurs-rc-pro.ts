/**
 * Référentiel — 8 assureurs RC Pro partenaires cabinet ORIAS
 *
 * Données factuelles 2026 (publiques, sourcing : sites assureurs + brochures
 * partenariat + audit positionnement marché). Notes internes /5 reflètent
 * l'expertise terrain du cabinet pour orienter le client vers le bon assureur
 * selon son profil.
 *
 * Conformité : ACPR 2024-R-02 (transparence comparaison intermédiaire) +
 * Reco ACPR 2025-R-01 (devoir conseil + analyse d'adéquation).
 */

export interface Assureur {
  id: string
  nom: string
  groupe: string
  sloganRcPro: string
  agrement: 'ACPR' | 'ACPR + EU passport'
  noteGlobale: number /* /5 — synthèse expérience cabinet */
  forces: string[]
  faiblesses: string[]
  secteursForts: string[] /* secteurs où l'assureur excelle */
  secteursEvites: string[]
  tarifRangAdequation: 'low' | 'medium' | 'premium'
  delaiDevis: string
  delaiAttestation: string
  specialiteJuridique: string
  cgvUrl?: string
}

export const ASSUREURS_RC_PRO: Assureur[] = [
  {
    id: 'hiscox',
    nom: 'Hiscox',
    groupe: 'Hiscox France (groupe Hiscox Ltd UK)',
    sloganRcPro: 'Spécialiste freelances/IT/médias depuis 2007',
    agrement: 'ACPR + EU passport',
    noteGlobale: 4.7,
    forces: [
      'Souscription 100% en ligne (5 min)',
      'Spécialiste cyber + RC pro IT',
      'Plafonds élevés (5M€+ standard)',
      'Service client anglophone',
    ],
    faiblesses: [
      'Tarifs premium (-15-25% vs concurrents)',
      'Refus profils à risque aggravé',
    ],
    secteursForts: ['Informatique / SaaS / freelance IT', 'Marketing / communication', 'Consultant / conseil', 'Photographe / graphiste'],
    secteursEvites: ['BTP', 'Restaurateur (sinistralité élevée)'],
    tarifRangAdequation: 'premium',
    delaiDevis: 'Immédiat (en ligne)',
    delaiAttestation: '24h après paiement',
    specialiteJuridique: 'Cyber + breach data + frais notification CNIL',
  },
  {
    id: 'mma-pro',
    nom: 'MMA Pro',
    groupe: 'Covéa (MMA + MAAF + GMF)',
    sloganRcPro: 'Mutualiste française n°1 RC pro TPE',
    agrement: 'ACPR',
    noteGlobale: 4.5,
    forces: [
      'Tarifs ultra-compétitifs (-10-20% vs marché)',
      'Service client en agence physique (réseau dense)',
      'Pack RC Pro + multirisque + auto pro avantageux',
      'Spécialiste artisans + commerçants',
    ],
    faiblesses: [
      'Souscription en ligne moins fluide',
      'Pas de spécialité cyber',
    ],
    secteursForts: ['Artisans BTP', 'Commerce de détail', 'Restaurateur / traiteur', 'Esthétique / bien-être'],
    secteursEvites: ['Avocat affaires (plafonds insuffisants)'],
    tarifRangAdequation: 'low',
    delaiDevis: '24-48h',
    delaiAttestation: '48h après signature',
    specialiteJuridique: 'Multirisque + protection juridique recours',
  },
  {
    id: 'axa-pro',
    nom: 'AXA Entreprise / AXA Pro',
    groupe: 'AXA SA (n°1 mondial assurance)',
    sloganRcPro: 'Assureur global multi-sectoriel',
    agrement: 'ACPR + EU passport',
    noteGlobale: 4.4,
    forces: [
      'Couverture multi-pays (international standard)',
      'Plafonds très élevés (10M€+ négociables)',
      'Garanties optionnelles complètes',
      'Réputation institutionnelle forte',
    ],
    faiblesses: [
      'Tarifs premium',
      'Délais souscription longs (3-7j)',
    ],
    secteursForts: ['ETI / grandes structures', 'Avocat affaires', 'Expert-comptable cabinet', 'Médecin libéral spécialiste'],
    secteursEvites: ['AE solo (sur-dimensionné)'],
    tarifRangAdequation: 'premium',
    delaiDevis: '3-5j',
    delaiAttestation: '5-7j après signature',
    specialiteJuridique: 'International + protection pénale dirigeant',
  },
  {
    id: 'allianz-pro',
    nom: 'Allianz Pro',
    groupe: 'Allianz France (groupe Allianz SE)',
    sloganRcPro: 'Spécialiste industriel + risques techniques',
    agrement: 'ACPR + EU passport',
    noteGlobale: 4.4,
    forces: [
      'Très fort sur risques industriels + grands chantiers BTP',
      'Garanties optionnelles RGE photovoltaïque',
      'Réseau partenaire Wakam pour profils atypiques',
    ],
    faiblesses: [
      'Tarifs au-dessus de la moyenne',
      'Moins fluide pour TPE simples',
    ],
    secteursForts: ['Industriels', 'BTP gros œuvre', 'RGE photovoltaïque', 'Couvreur-zingueur'],
    secteursEvites: ['Freelance solo activité simple'],
    tarifRangAdequation: 'medium',
    delaiDevis: '48-72h',
    delaiAttestation: '3-5j après signature',
    specialiteJuridique: 'Risques techniques + cyber industriel',
  },
  {
    id: 'generali',
    nom: 'Generali Pro',
    groupe: 'Generali France (groupe Generali italien)',
    sloganRcPro: 'Spécialiste professions libérales',
    agrement: 'ACPR + EU passport',
    noteGlobale: 4.3,
    forces: [
      'Très fort sur professions médicales + paramédicales',
      'Pack RC pro + prévoyance + retraite Madelin',
      'Délais courts si dossier simple',
    ],
    faiblesses: [
      'Moins compétitif sur BTP',
      'Tarifs moyens',
    ],
    secteursForts: ['Médecin libéral', 'Santé paramédical (kiné, infirmier)', 'Avocat / juridique', 'Expert-comptable'],
    secteursEvites: ['Restaurateur (sinistralité)', 'VTC'],
    tarifRangAdequation: 'medium',
    delaiDevis: '24-48h',
    delaiAttestation: '48-72h',
    specialiteJuridique: 'Professions libérales + Madelin',
  },
  {
    id: 'maif-pro',
    nom: 'MAIF Entreprise Pro',
    groupe: 'MAIF (mutualiste)',
    sloganRcPro: 'Mutualiste éthique pour TPE/AE',
    agrement: 'ACPR',
    noteGlobale: 4.2,
    forces: [
      'Approche conseil (pas commerciale agressive)',
      'Tarifs justes pour AE/TPE éducation/social',
      'Service client en français+++',
      'Engagement RSE',
    ],
    faiblesses: [
      'Plafonds plus modestes (1M€ standard)',
      'Moins fort sur risques techniques',
    ],
    secteursForts: ['Formateur / coach', 'Consultant / conseil', 'Photographe / graphiste', 'Marketing / communication'],
    secteursEvites: ['BTP gros œuvre', 'Médical à risque'],
    tarifRangAdequation: 'low',
    delaiDevis: '24-72h',
    delaiAttestation: '48h après signature',
    specialiteJuridique: 'Protection juridique étendue + recours',
  },
  {
    id: 'wakam',
    nom: 'Wakam',
    groupe: 'Wakam (assureur insurtech)',
    sloganRcPro: 'Insurtech 100% digital — niches BTP',
    agrement: 'ACPR + EU passport',
    noteGlobale: 4.1,
    forces: [
      'Souscription 100% digitale en 5 min',
      'Accepte profils refusés ailleurs (résiliés, primo-installés)',
      'API ouverte aux courtiers',
      'Spécialiste BTP via partenariat Allianz',
    ],
    faiblesses: [
      'Tarifs majorés (+15-30% vs marché)',
      'Pas de service client physique',
    ],
    secteursForts: ['AE primo-installés', 'Profils résiliés', 'Niches BTP atypiques', 'Auto-entrepreneurs jeunes'],
    secteursEvites: ['ETI grandes structures'],
    tarifRangAdequation: 'medium',
    delaiDevis: 'Immédiat',
    delaiAttestation: 'Immédiat après paiement',
    specialiteJuridique: 'Profils inassurables + niches digitales',
  },
  {
    id: 'april-pro',
    nom: 'April Pro / April BTP',
    groupe: 'April Group',
    sloganRcPro: 'Spécialiste BTP + santé pro',
    agrement: 'ACPR',
    noteGlobale: 4.2,
    forces: [
      'Couvreur-zingueur + RGE photovoltaïque excellents',
      'Pack RC Pro + décennale + multirisque chantier',
      'Spécialiste santé paramédical',
    ],
    faiblesses: [
      'Tarifs moyens à premium',
      'Moins fort sur services intellectuels',
    ],
    secteursForts: ['Couvreur-zingueur', 'RGE photovoltaïque', 'Santé paramédical', 'Plombier-chauffagiste'],
    secteursEvites: ['Conseil / consultant pur (sur-prime)'],
    tarifRangAdequation: 'medium',
    delaiDevis: '48-72h',
    delaiAttestation: '24h après paiement',
    specialiteJuridique: 'BTP intégral (RC + décennale + chantier)',
  },
]

export function getAssureurById(id: string): Assureur | undefined {
  return ASSUREURS_RC_PRO.find((a) => a.id === id)
}

export function getAssureursForSecteur(secteur: string): Assureur[] {
  /* Tri descendant : assureurs forts pour le secteur en premier */
  return [...ASSUREURS_RC_PRO].sort((a, b) => {
    const aFort = a.secteursForts.some((s) => s.toLowerCase().includes(secteur.toLowerCase())) ? 1 : 0
    const bFort = b.secteursForts.some((s) => s.toLowerCase().includes(secteur.toLowerCase())) ? 1 : 0
    if (aFort !== bFort) return bFort - aFort
    return b.noteGlobale - a.noteGlobale
  })
}

export const TARIF_LABELS: Record<Assureur['tarifRangAdequation'], { label: string; couleur: string }> = {
  low: { label: 'Tarif compétitif', couleur: 'bg-green-100 text-green-800' },
  medium: { label: 'Tarif moyen', couleur: 'bg-blue-100 text-blue-800' },
  premium: { label: 'Tarif premium', couleur: 'bg-orange-100 text-orange-800' },
}
