/**
 * RelatedPagesSection — Maillage interne contextuel
 *
 * Affiche 4-6 liens sémantiquement proches de la page courante.
 * Pattern Hub & Spoke : remonte vers le hub + propose cousins + outils.
 *
 * Best practice SEO 2024 : ratio 5-10 liens internes/page maximise le link juice
 * vs 2-3 ratio insuffisant qui sous-exploite l'architecture.
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

export function RelatedPagesSection({
  currentSlug,
  title = 'Pages connexes — Pour aller plus loin',
  variant = 'default',
}: Props) {
  const links = selectContextualLinks(currentSlug, 6)
  const cluster = getRelatedCluster(currentSlug)

  if (links.length === 0) return null

  if (variant === 'compact') {
    return (
      <nav
        aria-label="Pages connexes"
        className="my-6 rounded-r border-l-4 border-blue-500 bg-gray-50 p-4"
      >
        <p className="mb-2 text-sm font-semibold">{title}</p>
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
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {cluster && (
            <p className="mt-1 text-sm text-gray-600">
              Cluster sémantique : <strong>{cluster.hub.label}</strong>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const badge = link.type ? TYPE_BADGE[link.type] : null
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-500 hover:shadow-md"
              >
                {badge && (
                  <span
                    className={`mb-2 inline-block rounded px-2 py-0.5 text-xs font-semibold ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                )}
                <p className="font-semibold text-gray-900 transition group-hover:text-blue-700">
                  {link.label}
                </p>
                {link.description && (
                  <p className="mt-1 text-xs text-gray-600">{link.description}</p>
                )}
                <p className="mt-2 text-xs text-blue-600 group-hover:underline">→ {link.href}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
