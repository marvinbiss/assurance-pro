/**
 * Reusable page metadata builder for static MONEY KW pages.
 *
 * Wires dynamic OG images (next/og at edge) + canonical + OG/Twitter
 * cards from a single input object, removing 30+ lines of boilerplate
 * per page.
 *
 * Usage:
 *
 *   export const metadata = buildPageMetadata({
 *     slug: 'prix/rc-pro',
 *     title: 'Prix RC Pro 2026',
 *     tagline: 'Comparatif 5 assureurs',
 *     description: '...',
 *     price: 'dès 95€ par an',  // optional, appears in OG image
 *   })
 */

import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from './config'
import { buildOgImageUrl, inferOgCategoryFromSlug, type OgCategory } from './og'

export interface PageMetadataInput {
  slug: string
  title: string
  tagline: string
  description: string
  category?: OgCategory
  price?: string
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const canonical = `${SITE_URL}/${input.slug.replace(/^\//, '')}`
  const category = input.category ?? inferOgCategoryFromSlug(input.slug)
  const ogImage = buildOgImageUrl({
    title: input.title,
    subtitle: input.tagline,
    category,
    price: input.price,
  })

  return {
    title: `${input.title} | ${SITE_NAME}`,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.tagline,
      url: canonical,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.tagline,
      images: [ogImage],
    },
  }
}
