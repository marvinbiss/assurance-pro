/**
 * Sitemap — Assurance Pro France
 *
 * Architecture segmentée :
 * - Pages statiques principales (homepage, piliers, ressources)
 * - Sous-pages métiers décennale + RC Pro (générées dynamiquement)
 * - Pages IPID
 * - Pages légales et conformité
 */

import type { MetadataRoute } from 'next'
import { getIpidSlugs } from '@/lib/data/ipid-products'
import { getPostSlugs, getAllCategories } from '@/lib/data/blog-posts'
import { getMembreSlugs } from '@/lib/data/equipe'
import { getVilleSlugs } from '@/lib/data/villes-top100'
import {
  decennaleStaticSlugs,
  rcProStaticSlugs,
} from '@/lib/seo/garantie-slug-dispatcher'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'

type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly'

const STATIC_PAGES: Array<{ path: string; priority: number; changeFrequency: ChangeFrequency }> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },

  // Piliers
  { path: 'assurance-decennale', priority: 0.95, changeFrequency: 'weekly' },
  { path: 'rc-pro', priority: 0.95, changeFrequency: 'weekly' },
  { path: 'multirisque-pro', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'mutuelle-pro', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'assurance-vtc', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'cyber-assurance', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'rc-pro-avocat', priority: 0.85, changeFrequency: 'monthly' },
  { path: 'rc-pro-medecin', priority: 0.85, changeFrequency: 'monthly' },

  // Action / acquisition
  { path: 'comparateur-assureurs', priority: 0.85, changeFrequency: 'monthly' },
  { path: 'devis', priority: 0.95, changeFrequency: 'monthly' },
  { path: 'a-propos', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'equipe', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'notre-processus-conseil', priority: 0.7, changeFrequency: 'yearly' },
  { path: 'selection-assureurs', priority: 0.7, changeFrequency: 'yearly' },
  { path: 'contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: 'blog', priority: 0.7, changeFrequency: 'daily' },

  // Ressources
  { path: 'glossaire', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'normes', priority: 0.4, changeFrequency: 'yearly' },

  // Conformité — DDA / ACPR
  { path: 'fic', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'ipid', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'reclamation', priority: 0.5, changeFrequency: 'yearly' },

  // Pages légales
  { path: 'mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'cgv', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'confidentialite', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'cookies', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'mediation', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'plan-du-site', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${BASE_URL}/${path}` : BASE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // Toutes les routes /assurance-decennale/[slug] (métiers + villes hors collision)
  // — source unique via le dispatcher pour éviter divergence avec generateStaticParams.
  const decennaleSlugs = decennaleStaticSlugs().map(({ slug }) => ({
    url: `${BASE_URL}/assurance-decennale/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.85,
  }))

  const rcProSlugs = rcProStaticSlugs().map(({ slug }) => ({
    url: `${BASE_URL}/rc-pro/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.85,
  }))

  const ipidProducts = getIpidSlugs().map((slug) => ({
    url: `${BASE_URL}/ipid/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.4,
  }))

  // Phase 1 : 4 nouvelles verticales avec routes ville (template générique).
  const villeSlugs = getVilleSlugs()
  const verticales: Array<'multirisque-pro' | 'mutuelle-pro' | 'assurance-vtc' | 'cyber-assurance'> = [
    'multirisque-pro',
    'mutuelle-pro',
    'assurance-vtc',
    'cyber-assurance',
  ]
  const villesParVerticale = verticales.flatMap((v) =>
    villeSlugs.map((slug) => ({
      url: `${BASE_URL}/${v}/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    }))
  )

  const blogPosts = getPostSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.7,
  }))

  const blogCategories = getAllCategories().map((c) => ({
    url: `${BASE_URL}/blog/categorie/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.5,
  }))

  const membres = getMembreSlugs().map((slug) => ({
    url: `${BASE_URL}/equipe/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...decennaleSlugs,
    ...rcProSlugs,
    ...villesParVerticale,
    ...ipidProducts,
    ...blogPosts,
    ...blogCategories,
    ...membres,
  ]
}
