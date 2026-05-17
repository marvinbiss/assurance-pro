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
