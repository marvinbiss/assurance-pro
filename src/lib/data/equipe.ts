/**
 * Équipe Vivos Assurance — pages auteur YMYL
 * E-E-A-T : Expérience, Expertise, Authoritativeness, Trustworthiness.
 *
 * NB : ces données sont des templates ; à personnaliser avant prod
 *      avec les vrais courtiers et leurs n° ORIAS personnels.
 */

export interface MembreEquipe {
  slug: string
  prenom: string
  nom: string
  poste: string
  oriasNumber?: string
  emailPro?: string
  linkedin?: string
  bio: string
  expertises: string[]
  formations: string[]
  experiences: string[]
  certifications: string[]
  langues: string[]
  publicSlugAuteur?: string
}

export const EQUIPE: Record<string, MembreEquipe> = {
  'directeur-cabinet': {
    slug: 'directeur-cabinet',
    prenom: 'Direction',
    nom: 'Cabinet',
    poste: 'Directeur du cabinet — Courtier responsable',
    oriasNumber: process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX',
    emailPro: 'direction@vivos-assurance.fr',
    bio: "Directeur du cabinet Vivos Assurance et courtier responsable au sens des articles L. 511-1 et suivants du Code des assurances. Représente le cabinet auprès de l'ACPR et de l'ORIAS. Garant de la conformité des recommandations délivrées et de la traçabilité du devoir de conseil (art. L. 521-4).",
    expertises: [
      'Direction de cabinet de courtage indépendant',
      'Conformité ACPR / ORIAS / DDA',
      'Négociation grandes lignes décennale et RC Pro',
      'Architecture de programmes multi-assureurs',
    ],
    formations: [
      'Master 2 Assurance ou équivalent (ITB / ENASS / ESA)',
      'Capacité professionnelle Niveau I — IAS (art. R. 512-9)',
      'Formation continue ACPR — 15h/an minimum',
    ],
    experiences: [
      '+10 ans en courtage indépendant',
      "Pilotage d'un portefeuille pluri-millions € de cotisations",
      'Conduite des audits annuels CSCA',
    ],
    certifications: ['IAS Niveau I', 'Adhérent CSCA'],
    langues: ['Français', 'Anglais'],
  },
  'pole-btp': {
    slug: 'pole-btp',
    prenom: 'Pôle',
    nom: 'BTP',
    poste: 'Responsable pôle BTP — Décennale & multirisque chantier',
    bio: 'Pôle dédié aux artisans, auto-entrepreneurs et PME du bâtiment. Spécialisé Loi Spinetta, art. 1792 C. civ., Tous Risques Chantier (TRC), dommages-ouvrage et garantie de parfait achèvement. Travaille avec les 10 assureurs partenaires positionnés sur le BTP (SMABTP, MMA, Allianz Pro, AXA Pro, MAAF, Wakam, Stello).',
    expertises: [
      'Garantie décennale Loi Spinetta',
      'Dommages-ouvrage et TRC',
      'Profils difficiles (sinistralité, jeune entreprise)',
      'Mention obligatoire devis/factures (réforme 2024)',
      'Recours BCT (Bureau Central de Tarification)',
    ],
    formations: ['IAS Niveau I', 'Spécialisation décennale AQC'],
    experiences: [
      '+8 ans courtage spécialisé BTP',
      'Connaissance fine sinistralité AQC SYCODÉS',
      "Réseau d'experts d'assurés et avocats spécialisés",
    ],
    certifications: ['IAS Niveau I'],
    langues: ['Français'],
  },
  'pole-rc-pro': {
    slug: 'pole-rc-pro',
    prenom: 'Pôle',
    nom: 'RC Pro & Services',
    poste: 'Responsable pôle Services — RC Pro, freelances, professions réglementées',
    bio: 'Pôle dédié aux freelances, consultants, agences digitales et professions réglementées (avocats, médecins, experts-comptables, architectes). Architecture programmes RC Pro (claims-made, garantie subséquente, plafonds 500k€ – 5M€), protection juridique, cyber. Maîtrise approfondie du devoir de conseil DDA pour les profils premium.',
    expertises: [
      'RC Pro consultants / freelances IT',
      'RC Pro professions réglementées (avocat, médecin, expert-comptable)',
      'Cyber assurance et fuite de données',
      'Garantie subséquente longue (5 à 10 ans)',
      'Plafonds élevés (>2M€) pour grands comptes',
    ],
    formations: ['IAS Niveau I', 'Formation RC professions réglementées'],
    experiences: [
      '+7 ans courtage RC Pro',
      "Accompagnement sur appels d'offres grands comptes",
      'Audit de couverture pour cabinets cotés',
    ],
    certifications: ['IAS Niveau I'],
    langues: ['Français', 'Anglais'],
  },
  'pole-sante-prevoyance': {
    slug: 'pole-sante-prevoyance',
    prenom: 'Pôle',
    nom: 'Santé & Prévoyance',
    poste: 'Responsable pôle Santé/Prévoyance — TNS Madelin',
    bio: 'Pôle dédié à la mutuelle santé pro, prévoyance dirigeant TNS, retraite Madelin. Conseil fiscal Madelin (art. 154 bis CGI), arbitrage entre contrats santé responsables et solidaires, optimisation Madelin pour gérants TNS, EI, AE et professions libérales.',
    expertises: [
      'Mutuelle TNS Madelin (Loi 1994)',
      'Prévoyance dirigeant et homme-clé',
      'Retraite Madelin et PER',
      'Optimisation fiscale 154 bis CGI',
      'Arbitrage SAS vs TNS pour optimisation cotisations',
    ],
    formations: ['IAS Niveau I', 'Spécialisation Madelin'],
    experiences: [
      '+6 ans courtage santé/prévoyance pro',
      'Travail conjoint avec experts-comptables partenaires',
    ],
    certifications: ['IAS Niveau I'],
    langues: ['Français'],
  },
}

export function getMembre(slug: string): MembreEquipe | undefined {
  return EQUIPE[slug]
}

export function getMembreSlugs(): string[] {
  return Object.keys(EQUIPE)
}
