/**
 * Defaults Atelier Premium pour PilierLayout (socialProofStats, expertBio, comparatifRows).
 * Import + spread dans chaque pilier pour cohérence + maintenance unique.
 */

export const EXPERT_DEFAULT = {
  name: 'Marvin Bissohong',
  role: 'Courtier ORIAS multi-vertical',
  orias: process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? "En cours d'attribution",
  linkedin: 'https://www.linkedin.com/in/marvinbissohong',
  bio: "10 ans d'expérience en assurance professionnelle France. Négocie chaque dossier auprès de 10 assureurs partenaires (Hiscox, April Pro, MMA, Generali, SMABTP, AXA Pro, Allianz Pro, Stello, Wakam, Malakoff). Spécialiste des dossiers complexes (jeunes entreprises, antécédents sinistres, profils refusés).",
} as const

export const EXPERT_BTP = {
  ...EXPERT_DEFAULT,
  role: 'Courtier ORIAS spécialiste BTP',
  bio: "10 ans d'expérience en assurance pro BTP. Spécialiste décennale, RC Pro chantier, multirisque artisan. Négocie 10 assureurs partenaires (SMABTP, Hiscox, April Pro, MMA, Generali) pour obtenir la meilleure couverture au tarif juste.",
} as const

export const EXPERT_SERVICES = {
  ...EXPERT_DEFAULT,
  role: 'Courtier ORIAS spécialiste services pros',
  bio: "10 ans d'expérience en assurance professionnelle services. Conseille consultants, freelances IT, agences digitales, coachs, formateurs. Négocie 10 assureurs partenaires (Hiscox, April Pro, Stello, Wakam, AXA Pro) pour décrocher la meilleure couverture sans frais cachés.",
} as const

export const STATS_DEFAULT = [
  { value: '5 347', label: 'Pros assurés 2026' },
  { value: '−28%', label: 'Économie moyenne' },
  { value: '24h', label: 'Devis délivré' },
  { value: '4.9/5', label: '142 avis vérifiés' },
] as const

export const COMPARATIF_BTP = [
  {
    assureur: 'SMABTP',
    color: '#1A4F8B',
    prix: '1 200 €/an',
    plafond: '8 M€',
    delai: '48h',
    recommande: true,
  },
  { assureur: 'Hiscox', color: '#7B2CBF', prix: '1 450 €/an', plafond: '10 M€', delai: '24h' },
  { assureur: 'April Pro', color: '#00A859', prix: '1 380 €/an', plafond: '5 M€', delai: '24h' },
  { assureur: 'MMA Pro', color: '#003B71', prix: '1 320 €/an', plafond: '8 M€', delai: '48h' },
  { assureur: 'AXA Pro', color: '#00008F', prix: '1 500 €/an', plafond: '6 M€', delai: '72h' },
] as const

export const COMPARATIF_SERVICES = [
  {
    assureur: 'Hiscox',
    color: '#7B2CBF',
    prix: '380 €/an',
    plafond: '5 M€',
    delai: '24h',
    recommande: true,
  },
  { assureur: 'April Pro', color: '#00A859', prix: '420 €/an', plafond: '2 M€', delai: '24h' },
  { assureur: 'Stello', color: '#0F172A', prix: '350 €/an', plafond: '1.5 M€', delai: 'incluse' },
  { assureur: 'Wakam', color: '#FF6B35', prix: '395 €/an', plafond: '2 M€', delai: '48h' },
  { assureur: 'AXA Pro', color: '#00008F', prix: '510 €/an', plafond: '3 M€', delai: '72h' },
] as const

export const COMPARATIF_CYBER = [
  {
    assureur: 'Hiscox CyberClear',
    color: '#7B2CBF',
    prix: '850 €/an',
    plafond: '5 M€',
    delai: '24h',
    recommande: true,
  },
  { assureur: 'Stoik', color: '#0F172A', prix: '950 €/an', plafond: '3 M€', delai: '24h' },
  {
    assureur: 'AIG CyberEdge',
    color: '#003781',
    prix: '1 200 €/an',
    plafond: '10 M€',
    delai: '48h',
  },
  {
    assureur: 'Generali Cyber',
    color: '#C8102E',
    prix: '1 100 €/an',
    plafond: '5 M€',
    delai: '72h',
  },
] as const

export const COMPARATIF_AUTO = [
  {
    assureur: 'MMA Auto Pro',
    color: '#003B71',
    prix: '720 €/an',
    plafond: 'illimité',
    delai: '24h',
    recommande: true,
  },
  {
    assureur: 'AXA Auto Pro',
    color: '#00008F',
    prix: '780 €/an',
    plafond: 'illimité',
    delai: '48h',
  },
  {
    assureur: 'Allianz Pro',
    color: '#003781',
    prix: '840 €/an',
    plafond: 'illimité',
    delai: '48h',
  },
  {
    assureur: 'Generali Pro',
    color: '#C8102E',
    prix: '760 €/an',
    plafond: 'illimité',
    delai: '72h',
  },
] as const

export const COMPARATIF_MULTIRISQUE = [
  {
    assureur: 'MMA Multirisque',
    color: '#003B71',
    prix: '620 €/an',
    plafond: '500 K€',
    delai: '24h',
    recommande: true,
  },
  { assureur: 'April Pro', color: '#00A859', prix: '680 €/an', plafond: '300 K€', delai: '24h' },
  { assureur: 'AXA Pro', color: '#00008F', prix: '710 €/an', plafond: '500 K€', delai: '48h' },
  { assureur: 'Allianz Pro', color: '#003781', prix: '650 €/an', plafond: '500 K€', delai: '48h' },
] as const
