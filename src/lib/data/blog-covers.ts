/**
 * Cover images — Unsplash CDN éditorial premium.
 * - Plusieurs variantes par catégorie (variation visuelle entre articles).
 * - Sélection déterministe par hash du slug (stable build-to-build, varié visuellement).
 * - Fallback automatique si catégorie inconnue.
 */
import type { BlogCoverImage } from './blog-blocks'

const COVERS_BY_CATEGORY: Record<string, BlogCoverImage[]> = {
  btp: [
    {
      src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=72&auto=format&fit=crop',
      alt: 'Chantier BTP — artisans en intervention',
      credit: 'Josh Olalde — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=72&auto=format&fit=crop',
      alt: 'Maçon au travail sur un chantier',
      credit: 'Greyson Joralemon — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=1600&q=72&auto=format&fit=crop',
      alt: 'Charpentier sur toiture',
      credit: 'Avel Chuklanov — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=72&auto=format&fit=crop',
      alt: 'Outils BTP atelier artisan',
      credit: 'Hunter Haley — Unsplash',
    },
  ],
  'rc-pro': [
    {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=72&auto=format&fit=crop',
      alt: 'Équipe professionnelle en réunion bureau',
      credit: 'Brooke Cagle — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=72&auto=format&fit=crop',
      alt: 'Bureau pro architecture moderne',
      credit: 'Charles Forerunner — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=72&auto=format&fit=crop',
      alt: 'Consultant indépendant ordinateur',
      credit: 'Charles Forerunner — Unsplash',
    },
  ],
  cyber: [
    {
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=72&auto=format&fit=crop',
      alt: 'Sécurité numérique — visualisation code',
      credit: 'Markus Spiske — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1600&q=72&auto=format&fit=crop',
      alt: 'Serveurs datacenter sécurité',
      credit: 'Taylor Vick — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=72&auto=format&fit=crop',
      alt: 'Verrou sécurité numérique abstrait',
      credit: 'FLY:D — Unsplash',
    },
  ],
  'mutuelle-tns': [
    {
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=72&auto=format&fit=crop',
      alt: 'Soins de santé — stéthoscope médical',
      credit: 'Hush Naidoo — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&q=72&auto=format&fit=crop',
      alt: 'Consultation médicale professionnelle',
      credit: 'Online Marketing — Unsplash',
    },
  ],
  reglementation: [
    {
      src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=72&auto=format&fit=crop',
      alt: 'Documents légaux et réglementation',
      credit: 'Wesley Tingey — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=72&auto=format&fit=crop',
      alt: 'Code juridique livre ouvert',
      credit: 'Tingey Injury Law Firm — Unsplash',
    },
  ],
  sinistre: [
    {
      src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=72&auto=format&fit=crop',
      alt: 'Analyse de documents financiers',
      credit: 'Scott Graham — Unsplash',
    },
    {
      src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=72&auto=format&fit=crop',
      alt: 'Dossier sinistre expertise',
      credit: 'Wesley Tingey — Unsplash',
    },
  ],
  default: [
    {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=72&auto=format&fit=crop',
      alt: 'Assurance professionnelle',
      credit: 'Scott Graham — Unsplash',
    },
  ],
}

function hashSlug(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) {
    h = ((h << 5) - h + slug.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function normalizeCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-')
}

export function getCoverForCategory(category: string, slug?: string): BlogCoverImage {
  const key = normalizeCategory(category)
  const variants = COVERS_BY_CATEGORY[key] ?? COVERS_BY_CATEGORY.default
  if (!variants || variants.length === 0) {
    const defaults = COVERS_BY_CATEGORY.default
    if (!defaults || defaults.length === 0) {
      throw new Error('blog-covers: default cover list is empty')
    }
    return defaults[0] as BlogCoverImage
  }
  if (variants.length === 1 || !slug) {
    return variants[0] as BlogCoverImage
  }
  const idx = hashSlug(slug) % variants.length
  return variants[idx] as BlogCoverImage
}

// Backward compatibility — earlier code referenced COVER_BY_CATEGORY as a single map.
export const COVER_BY_CATEGORY: Record<string, BlogCoverImage> = Object.fromEntries(
  Object.entries(COVERS_BY_CATEGORY).map(([k, list]) => [k, list[0] as BlogCoverImage])
)
