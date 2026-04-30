/**
 * Sitemap — Assurance Pro France
 *
 * Architecture segmentée :
 * - Pages statiques principales (homepage, piliers, ressources)
 * - Pages dynamiques pSEO (cms_pages publiées) — TODO branchement Supabase
 * - Pages légales et conformité
 */

import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'

const STATIC_PAGES: Array<{
  path: string
  priority: number
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
}> = [
  // Homepage (priorité maximale)
  { path: '', priority: 1.0, changeFrequency: 'weekly' },

  // Pages piliers (Couche A — E-E-A-T)
  { path: 'assurance-decennale', priority: 0.95, changeFrequency: 'weekly' },
  { path: 'rc-pro', priority: 0.95, changeFrequency: 'weekly' },
  { path: 'multirisque-pro', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'mutuelle-pro', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'assurance-vtc', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'cyber-assurance', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'rc-pro-avocat', priority: 0.85, changeFrequency: 'monthly' },
  { path: 'rc-pro-medecin', priority: 0.85, changeFrequency: 'monthly' },

  // Action pages
  { path: 'devis', priority: 0.95, changeFrequency: 'monthly' },
  { path: 'a-propos', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: 'blog', priority: 0.7, changeFrequency: 'daily' },

  // Ressources
  { path: 'glossaire', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: 'normes', priority: 0.4, changeFrequency: 'yearly' },

  // Pages légales
  { path: 'cgv', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'confidentialite', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'mediation', priority: 0.3, changeFrequency: 'yearly' },
  { path: 'plan-du-site', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${BASE_URL}/${path}` : BASE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
