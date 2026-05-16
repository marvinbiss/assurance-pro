/**
 * Cover images map — Unsplash CDN éditorial premium par catégorie.
 * Fallback automatique quand l'article n'a pas de `coverImage` explicite.
 */
import type { BlogCoverImage } from './blog-blocks'

export const COVER_BY_CATEGORY: Record<string, BlogCoverImage> = {
  btp: {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop',
    alt: 'Chantier BTP — artisans en intervention',
    credit: 'Josh Olalde / Unsplash',
  },
  'rc-pro': {
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop',
    alt: 'Équipe professionnelle en réunion bureau',
    credit: 'Brooke Cagle / Unsplash',
  },
  cyber: {
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80&auto=format&fit=crop',
    alt: 'Sécurité numérique — visualisation code',
    credit: 'Markus Spiske / Unsplash',
  },
  'mutuelle-tns': {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80&auto=format&fit=crop',
    alt: 'Soins de santé — stéthoscope médical',
    credit: 'Hush Naidoo / Unsplash',
  },
  reglementation: {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop',
    alt: 'Documents légaux et réglementation',
    credit: 'Wesley Tingey / Unsplash',
  },
  sinistre: {
    src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop',
    alt: 'Analyse de documents financiers',
    credit: 'Scott Graham / Unsplash',
  },
  default: {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&auto=format&fit=crop',
    alt: 'Assurance professionnelle',
    credit: 'Scott Graham / Unsplash',
  },
}

const DEFAULT_COVER: BlogCoverImage = COVER_BY_CATEGORY.default as BlogCoverImage

export function getCoverForCategory(category: string): BlogCoverImage {
  const slug = category.toLowerCase().replace(/\s+/g, '-')
  return COVER_BY_CATEGORY[slug] ?? DEFAULT_COVER
}
