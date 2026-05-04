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

  // Sprint 1 KPMG — Lot 7 : 4 piliers + 1 guide (~9 000 vol/mois cumulé)
  { path: 'assurance-entreprise', priority: 0.9, changeFrequency: 'weekly' },                   // 1 600 vol KD 30 CPC 400€ (famille 3 000 hors branded)
  { path: 'assurance-medecin', priority: 0.85, changeFrequency: 'weekly' },                     // 400 vol KD 0 (vacant)
  { path: 'assurance-transport-marchandises', priority: 0.85, changeFrequency: 'weekly' },      // 300 vol KD 1 (famille 920, vacant)
  { path: 'assurance-freelance', priority: 0.85, changeFrequency: 'weekly' },                   // 250 vol KD 1 CPC 350€ (famille 410)
  { path: 'guides/devis-assurance-professionnelle', priority: 0.85, changeFrequency: 'monthly' }, // 450 vol KD 17 CPC 600€ (money KW)

  // Sprint 1 KPMG — Lot 8 : 5 piliers (~1 350 vol/mois cumulé direct, marchés vacants KD 0-1)
  { path: 'assurance-btp', priority: 0.9, changeFrequency: 'weekly' },                          // 500 vol KD 27 CPC 250€ (HUB BTP global)
  { path: 'assurance-locaux-entreprise', priority: 0.85, changeFrequency: 'weekly' },           // 250 vol KD 1 CPC 350€ (vacant)
  { path: 'assurance-flotte-automobile', priority: 0.85, changeFrequency: 'weekly' },           // 200 vol KD 0 CPC 400€ (vacant)
  { path: 'protection-juridique-professionnelle', priority: 0.85, changeFrequency: 'weekly' },  // 200 vol KD 1 CPC 250€
  { path: 'assurance-sante-entreprise', priority: 0.85, changeFrequency: 'weekly' },            // 200 vol KD 11 CPC 150€ (mutuelle collective ANI 2013)

  // Sprint 1 KPMG — Lot 9 : 3 piliers + 2 guides (~1 350 vol direct, complémentaires)
  { path: 'assurance-auto-entreprise', priority: 0.9, changeFrequency: 'weekly' },              // 600 vol KD 7 CPC 300€
  { path: 'assurance-dommages-ouvrage', priority: 0.9, changeFrequency: 'weekly' },             // 150 vol KD 0 (transactionnel DO maître ouvrage)
  { path: 'assurance-chauffeur-taxi', priority: 0.85, changeFrequency: 'weekly' },              // 200 vol KD 0 (sous-pilier /assurance-taxi)
  { path: 'guides/tous-risques-chantier', priority: 0.85, changeFrequency: 'monthly' },         // 200 vol KD 0 CPC 80€ (guide TRC)
  { path: 'guides/avocat-litige-assurance', priority: 0.8, changeFrequency: 'monthly' },        // 200 vol KD 0 CPC 60€ (famille 700)

  // Sprint 1 KPMG — Lot 10 : 5 piliers niches (e-commerce, consultant, moto, domicile, mission)
  { path: 'assurance-e-commerce', priority: 0.85, changeFrequency: 'weekly' },                  // 150 vol KD 0 CPC 200€
  { path: 'assurance-consultant-independant', priority: 0.85, changeFrequency: 'weekly' },      // 150 vol KD 0 CPC 200€
  { path: 'assurance-moto-professionnelle', priority: 0.85, changeFrequency: 'weekly' },        // 150 vol KD 2 CPC 200€
  { path: 'assurance-habitation-professionnelle', priority: 0.85, changeFrequency: 'weekly' },  // 150 vol KD 0 CPC 300€
  { path: 'assurance-mission-professionnelle', priority: 0.85, changeFrequency: 'weekly' },     // 150 vol KD 0 CPC 140€

  // Sprint 1 KPMG — Lot 11 : 5 piliers (comparateur, juridique, santé pro, EI, décennale ME)
  { path: 'comparateur-assurance-professionnelle', priority: 0.9, changeFrequency: 'weekly' }, // 700 vol KD 5
  { path: 'assurance-juridique-professionnelle', priority: 0.85, changeFrequency: 'weekly' },  // 150 vol KD 0 CPC 200€
  { path: 'assurance-sante-professionnelle', priority: 0.85, changeFrequency: 'weekly' },      // 150 vol KD 0 CPC 450€
  { path: 'assurance-pour-entreprise-individuelle', priority: 0.85, changeFrequency: 'weekly' }, // 150 vol KD 0 CPC 350€
  { path: 'assurance-decennale/micro-entreprise', priority: 0.85, changeFrequency: 'weekly' }, // 150 vol KD 0 CPC 500€

  // Sprint 1 KPMG — Lot 12 FINAL : 4 piliers (atteint 50/50 = 100%)
  { path: 'guides/quelle-assurance-professionnelle-choisir', priority: 0.9, changeFrequency: 'monthly' }, // 700 vol KD 7 (guide hub)
  { path: 'assurance-obligatoire-entreprise', priority: 0.9, changeFrequency: 'weekly' },     // 150 vol KD 0 (liste exhaustive)
  { path: 'prevoyance-artisan', priority: 0.85, changeFrequency: 'weekly' },                  // 150 vol KD 0 CPC 250€ (sectoriel BTP)
  { path: 'assurance-sasu', priority: 0.85, changeFrequency: 'weekly' },                      // long-tail SASU (assimilé salarié)

  // Sprint 2 Lot 13 : 3 guides + 2 piliers (avocat IAS, AM médecin, travaux, courtier)
  { path: 'guides/avocat-specialise-assurance', priority: 0.8, changeFrequency: 'monthly' },  // 200 vol KD 0
  { path: 'guides/carte-professionnelle-assurance', priority: 0.8, changeFrequency: 'monthly' }, // 200 vol KD 0 CPC 200€
  { path: 'guides/numero-assurance-maladie-medecin', priority: 0.8, changeFrequency: 'monthly' }, // 300 vol KD 4
  { path: 'assurance-travaux-artisan', priority: 0.85, changeFrequency: 'weekly' },           // 150 vol KD 3 CPC 100€
  { path: 'courtier-assurance-pro', priority: 0.85, changeFrequency: 'weekly' },              // 100 vol KD 13 CPC 350€

  // Sprint 2 Lot 14 : 5 piliers/guides spécialisés
  { path: 'rc-pro/vtc', priority: 0.85, changeFrequency: 'weekly' },                          // RC pro VTC sous-route
  { path: 'mutuelle-sante-tns', priority: 0.85, changeFrequency: 'weekly' },                  // 200 vol KD 4 CPC 600€
  { path: 'guides/assurance-rgpd', priority: 0.8, changeFrequency: 'monthly' },               // RGPD entreprise
  { path: 'assurance-decennale/photovoltaique', priority: 0.85, changeFrequency: 'weekly' },  // RGE PV sous-route
  { path: 'guides/resiliation-assurance-professionnelle', priority: 0.8, changeFrequency: 'monthly' }, // Loi Hamon

  // Sprint 2 Lot 15 : 5 piliers métiers RC Pro (coiffeur, esthétique, photographe, coach, formateur)
  { path: 'rc-pro/coiffeur', priority: 0.85, changeFrequency: 'weekly' },                     // 200 vol
  { path: 'rc-pro/esthetique', priority: 0.85, changeFrequency: 'weekly' },                   // 250 vol KD 0
  { path: 'rc-pro/photographe', priority: 0.85, changeFrequency: 'weekly' },                  // 290 vol KD 0
  { path: 'rc-pro/coach-sportif', priority: 0.85, changeFrequency: 'weekly' },                // 200 vol KD 0 OBLIGATOIRE
  { path: 'rc-pro/formateur', priority: 0.85, changeFrequency: 'weekly' },                    // 70+50 vol KD 0

  // Sprint 2 Lot 16 : 5 piliers transverses (association, RC SASU, mutuelle dirigeant, portage, micro-prest)
  { path: 'assurance-association', priority: 0.85, changeFrequency: 'weekly' },               // 100 vol KD 2 (famille 400)
  { path: 'rc-pro/sasu', priority: 0.85, changeFrequency: 'weekly' },                         // 150 vol KD 0
  { path: 'mutuelle-dirigeant', priority: 0.85, changeFrequency: 'weekly' },                  // 180 vol KD 0
  { path: 'assurance-portage-salarial', priority: 0.85, changeFrequency: 'weekly' },          // long-tail freelance
  { path: 'rc-pro/micro-entreprise-prestation-service', priority: 0.85, changeFrequency: 'weekly' }, // 150 vol KD 8

  // OUTILS UTILITAIRES — money keywords (CPC 600-900€), conversion 3-5% vs 0,3% éditorial
  { path: 'outils/devis-rc-pro', priority: 0.95, changeFrequency: 'weekly' },                  // 400 vol KD 0 CPC 600€
  { path: 'outils/devis-assurance-decennale', priority: 0.95, changeFrequency: 'weekly' },     // 450 vol KD 7 CPC 900€

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
