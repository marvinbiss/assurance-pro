/**
 * RelatedPagesSection — Maillage interne contextuel
 *
 * Affiche MIN 15 liens sémantiquement proches de la page courante (best practice SEO 2024 enrichie).
 * Pattern Hub & Spoke élargi : hub + tous spokes cousins + tous tools + tous guides + cross-cluster.
 *
 * Groupement visuel par type pour UX :
 * - 🏛️ Pilier (hub)
 * - 📋 Métiers connexes (spokes)
 * - 🛠️ Outils transactionnels (tools)
 * - 📖 Guides juridiques (guides)
 * - 🔗 Voir aussi (cross-cluster siblings)
 */

import Link from 'next/link'
import { selectContextualLinks, getRelatedCluster, type RelatedLink } from '@/lib/seo/related-pages'

interface Props {
  /** Slug de la page courante (ex: "rc-pro/immobilier") */
  currentSlug: string
  /** Titre custom optionnel (défaut : "Pages connexes") */
  title?: string
  /** Variant visuel */
  variant?: 'default' | 'compact'
}

const TYPE_BADGE: Record<NonNullable<RelatedLink['type']>, { label: string; className: string }> = {
  hub: { label: 'Pilier', className: 'bg-blue-100 text-blue-800' },
  spoke: { label: 'Métier', className: 'bg-emerald-100 text-emerald-800' },
  sibling: { label: 'Connexe', className: 'bg-violet-100 text-violet-800' },
  tool: { label: 'Outil', className: 'bg-amber-100 text-amber-800' },
  guide: { label: 'Guide', className: 'bg-slate-100 text-slate-800' },
}

const GROUP_LABELS: Record<NonNullable<RelatedLink['type']>, string> = {
  hub: '🏛️ Pilier principal',
  spoke: '📋 Métiers & sous-niches connexes',
  tool: '🛠️ Outils transactionnels (calculateurs + devis + PDF)',
  guide: '📖 Guides juridiques',
  sibling: '🔗 Voir aussi (autres clusters)',
}

const GROUP_ORDER: Array<NonNullable<RelatedLink['type']>> = [
  'hub',
  'spoke',
  'tool',
  'guide',
  'sibling',
]

export function RelatedPagesSection({
  currentSlug,
  title = 'Pages connexes — Maillage sémantique complet',
  variant = 'default',
}: Props) {
  const links = selectContextualLinks(currentSlug, 15)
  const cluster = getRelatedCluster(currentSlug)

  if (links.length === 0) return null

  /* Groupe par type pour affichage structuré */
  const grouped: Record<NonNullable<RelatedLink['type']>, RelatedLink[]> = {
    hub: [],
    spoke: [],
    tool: [],
    guide: [],
    sibling: [],
  }
  links.forEach((l) => {
    if (l.type) grouped[l.type].push(l)
  })

  if (variant === 'compact') {
    return (
      <nav
        aria-label="Pages connexes"
        className="my-6 rounded-r border-l-4 border-blue-500 bg-gray-50 p-4"
      >
        <p className="mb-2 text-sm font-semibold">
          {title} ({links.length} liens)
        </p>
        <ul className="space-y-1 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-blue-700 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <section aria-label="Pages connexes" className="mt-8 border-t border-gray-200 bg-gray-50 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {cluster && (
            <p className="mt-1 text-sm text-gray-600">
              Cluster sémantique : <strong>{cluster.hub.label}</strong> ·{' '}
              <strong>{links.length} liens internes</strong>
            </p>
          )}
        </div>

        {GROUP_ORDER.map((type) => {
          const groupLinks = grouped[type]
          if (groupLinks.length === 0) return null
          const badge = TYPE_BADGE[type]
          return (
            <div key={type} className="mb-8 last:mb-0">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-700">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${badge.className}`}
                >
                  {badge.label}
                </span>
                <span>
                  {GROUP_LABELS[type]} ({groupLinks.length})
                </span>
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {groupLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block rounded border border-gray-200 bg-white p-3 transition hover:border-blue-500 hover:bg-blue-50 hover:shadow-sm"
                  >
                    <p className="text-sm font-semibold text-gray-900 transition group-hover:text-blue-700">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="mt-0.5 text-xs text-gray-600">{link.description}</p>
                    )}
                    <p className="mt-1 text-xs text-blue-600 group-hover:underline">
                      → {link.href}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
