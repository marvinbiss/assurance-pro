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

  // Sprint 1 KPMG — piliers data-driven (Ahrefs vol >= 100, KD <= 30)
  { path: 'mutuelle-pro-btp', priority: 0.95, changeFrequency: 'weekly' },           // 16 000 vol/mois
  { path: 'mutuelle-tns', priority: 0.9, changeFrequency: 'weekly' },                // 1 400 vol/mois
  { path: 'rc-pro/auto-entrepreneur', priority: 0.9, changeFrequency: 'weekly' },    // 1 900 vol/mois
  { path: 'assurance-decennale/auto-entrepreneur', priority: 0.9, changeFrequency: 'weekly' }, // 800 vol/mois
  { path: 'assurance-homme-cle', priority: 0.85, changeFrequency: 'weekly' },        // 1 100 vol/mois

  // Sprint 1 KPMG — guides juridiques (long-tail concentré + concurrents validés)
  { path: 'guides/attestation-decennale', priority: 0.85, changeFrequency: 'monthly' }, // 600 vol KD 1 (famille 1 800)
  { path: 'guides/dommages-ouvrage', priority: 0.85, changeFrequency: 'monthly' },      // 400 vol (famille 1 200)
  { path: 'guides/parfait-achevement', priority: 0.8, changeFrequency: 'monthly' },     // april capte 1 052 vis/mois

  // Sprint 1 KPMG — 3 piliers verticaux à fort CPC (KD 0-1, 78-99% marché vacant)
  { path: 'assurance-local-commercial', priority: 0.9, changeFrequency: 'weekly' },     // 800 vol KD 0 CPC 600€ (famille 1 550)
  { path: 'assurance-restaurant', priority: 0.9, changeFrequency: 'weekly' },           // 400 vol KD 1 CPC 600€ (famille 800)
  { path: 'assurance-bureau', priority: 0.85, changeFrequency: 'weekly' },              // 250 vol KD 0 CPC 700€ (famille 600)

  // Sprint 1 KPMG — Lot 5 : 4 piliers + 1 guide (familles 8 140 vol/mois cumulé)
  { path: 'assurance-commerce', priority: 0.9, changeFrequency: 'weekly' },             // 500 vol KD 1 CPC 500€ (famille 1 710)
  { path: 'assurance-taxi', priority: 0.9, changeFrequency: 'weekly' },                 // 500 vol KD 0 CPC 250€ (famille 1 510 — 98% vacant)
  { path: 'prevoyance-tns', priority: 0.85, changeFrequency: 'weekly' },                // 500 vol KD 4 CPC 350€ (famille 1 350)
  { path: 'assurance-artisan', priority: 0.9, changeFrequency: 'weekly' },              // 400 vol KD 1 CPC 300€ (famille 2 650)
  { path: 'guides/attestation-rc-pro', priority: 0.85, changeFrequency: 'monthly' },    // 350 vol KD 3 CPC 450€ (famille 920)

  // Sprint 1 KPMG — Lot 6 : 5 piliers (~13 000 vol/mois cumulé)
  { path: 'responsabilite-civile-professionnelle', priority: 0.95, changeFrequency: 'weekly' }, // 5 200 vol KD 22 (famille 12 000)
  { path: 'assurance-professionnelle', priority: 0.95, changeFrequency: 'weekly' },             // pilier RACINE (famille 10 000)
  { path: 'assurance-micro-entreprise', priority: 0.9, changeFrequency: 'weekly' },             // 1 100 vol KD 4 CPC 300€
  { path: 'rc-pro/informatique', priority: 0.9, changeFrequency: 'weekly' },                    // CPC 1 300€ (le plus haut du marché)
  { path: 'assurance-voiture-professionnelle', priority: 0.9, changeFrequency: 'weekly' },      // 600 vol KD 1 CPC 500€ (famille 2 450, vacant)

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
