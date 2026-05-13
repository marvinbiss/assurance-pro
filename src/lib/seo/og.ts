/**
 * Dynamic OG image URL builder.
 *
 * Consumes /og?title=...&subtitle=...&category=...&price=...
 * The route returns a 1200x630 PNG generated at the edge (next/og).
 *
 * Usage in page metadata:
 *
 *   import { buildOgImageUrl } from '@/lib/seo/og'
 *   export const metadata: Metadata = {
 *     openGraph: {
 *       images: [{ url: buildOgImageUrl({ title, category: 'prix' }), width: 1200, height: 630 }],
 *     },
 *   }
 */

import { SITE_URL } from './config'

export type OgCategory =
  | 'pilier'
  | 'prix'
  | 'devis'
  | 'attestation'
  | 'souscription'
  | 'comparateur'
  | 'courtier'
  | 'default'

export interface OgImageInput {
  title: string
  subtitle?: string
  category?: OgCategory
  price?: string
}

export function buildOgImageUrl(input: OgImageInput): string {
  const params = new URLSearchParams()
  params.set('title', input.title)
  if (input.subtitle) params.set('subtitle', input.subtitle)
  if (input.category) params.set('category', input.category)
  if (input.price) params.set('price', input.price)
  return `${SITE_URL}/og?${params.toString()}`
}

/**
 * Infer OG category from a page slug (e.g. "prix/rc-pro" → "prix").
 */
export function inferOgCategoryFromSlug(slug: string): OgCategory {
  const normalized = slug.replace(/^\//, '').toLowerCase()
  if (normalized.startsWith('prix/') || normalized.startsWith('tarif/')) return 'prix'
  if (normalized.startsWith('devis/')) return 'devis'
  if (normalized.startsWith('attestation/')) return 'attestation'
  if (normalized.startsWith('comparateur/')) return 'comparateur'
  if (normalized.startsWith('courtier/')) return 'courtier'
  if (normalized.includes('en-ligne') || normalized.includes('souscri')) return 'souscription'
  return 'pilier'
}
