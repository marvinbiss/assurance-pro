/**
 * Photothèque Vivos — Unsplash CDN curaté par usage.
 * Photos pros France, traitement warm (cohérent palette terracotta).
 * Tous les URLs sont autorisés via next.config.js remotePatterns.
 */

export interface BrandPhoto {
  src: string
  alt: string
  credit?: string
}

export const HERO_PHOTOS = {
  bureau: {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=72&auto=format&fit=crop',
    alt: 'Professionnel en bureau moderne — courtage assurance',
    credit: 'Charles Forerunner / Unsplash',
  },
  chantier: {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=72&auto=format&fit=crop',
    alt: 'Artisan BTP sur chantier — décennale',
    credit: 'Josh Olalde / Unsplash',
  },
  poignee: {
    src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=72&auto=format&fit=crop',
    alt: 'Poignée de main signature contrat',
    credit: 'Cytonn Photography / Unsplash',
  },
  equipe: {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=72&auto=format&fit=crop',
    alt: 'Équipe de courtage en réunion',
    credit: 'Annie Spratt / Unsplash',
  },
  conseil: {
    src: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1600&q=72&auto=format&fit=crop',
    alt: 'Conseil personnalisé en cabinet',
    credit: 'LinkedIn Sales Solutions / Unsplash',
  },
} as const satisfies Record<string, BrandPhoto>

export const STEP_PHOTOS = {
  decrire: {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=72&auto=format&fit=crop',
    alt: 'Personne remplissant un formulaire devis en ligne',
  },
  comparer: {
    src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=72&auto=format&fit=crop',
    alt: 'Analyse comparative de devis',
  },
  souscrire: {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=72&auto=format&fit=crop',
    alt: 'Signature électronique de contrat assurance',
  },
} as const satisfies Record<string, BrandPhoto>

// Photos pages secondaires : équipe, contact, devis, presse.
export const PAGE_PHOTOS = {
  equipeGrid: [
    {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=72&auto=format&fit=crop&crop=faces',
      alt: 'Femme courtière sourire',
    },
    {
      src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=72&auto=format&fit=crop&crop=faces',
      alt: 'Homme courtier en costume',
    },
    {
      src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=72&auto=format&fit=crop&crop=faces',
      alt: 'Conseillère assurance souriante',
    },
    {
      src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=72&auto=format&fit=crop&crop=faces',
      alt: 'Courtier ORIAS expérimenté',
    },
  ],
  contact: {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=72&auto=format&fit=crop',
    alt: 'Bureau de courtage Vivos — Paris',
  },
  devisConfiance: {
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=72&auto=format&fit=crop',
    alt: 'Conseillère ORIAS en consultation client',
  },
  presseBureau: {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=72&auto=format&fit=crop',
    alt: 'Espace de travail moderne Vivos Assurance',
  },
  ctaFinal: {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=72&auto=format&fit=crop',
    alt: 'Documents contrat assurance et stylo signature',
  },
} as const
