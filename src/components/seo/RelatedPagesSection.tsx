/**
 * RelatedPagesSection — Maillage interne contextuel premium
 *
 * Affiche MIN 15 liens sémantiquement proches groupés par type avec design brand.
 * Pattern Hub & Spoke + tools + guides + cross-cluster.
 */

import Link from 'next/link'
import { ArrowRight, Briefcase, Wrench, BookOpen, Link2, Pin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { selectContextualLinks, getRelatedCluster, type RelatedLink } from '@/lib/seo/related-pages'

interface Props {
  currentSlug: string
  title?: string
  variant?: 'default' | 'compact'
}

type GroupType = NonNullable<RelatedLink['type']>

interface GroupConfig {
  label: string
  Icon: LucideIcon
  iconBg: string
  iconColor: string
  accent: string
}

const GROUP_CONFIG: Record<GroupType, GroupConfig> = {
  hub: {
    label: 'Pilier principal',
    Icon: Pin,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-700',
    accent: 'from-primary-500 to-primary-700',
  },
  spoke: {
    label: 'Métiers connexes',
    Icon: Briefcase,
    iconBg: 'bg-accent-50',
    iconColor: 'text-accent-700',
    accent: 'from-accent-500 to-accent-700',
  },
  tool: {
    label: 'Outils transactionnels',
    Icon: Wrench,
    iconBg: 'bg-secondary-50',
    iconColor: 'text-secondary-800',
    accent: 'from-secondary-500 to-secondary-700',
  },
  guide: {
    label: 'Guides juridiques',
    Icon: BookOpen,
    iconBg: 'bg-charcoal-100',
    iconColor: 'text-charcoal-700',
    accent: 'from-charcoal-700 to-charcoal-900',
  },
  sibling: {
    label: 'Voir aussi',
    Icon: Link2,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-700',
    accent: 'from-rose-500 to-rose-700',
  },
}

const GROUP_ORDER: GroupType[] = ['hub', 'spoke', 'tool', 'guide', 'sibling']

export function RelatedPagesSection({
  currentSlug,
  title = 'Pour approfondir',
  variant = 'default',
}: Props) {
  const links = selectContextualLinks(currentSlug, 15)
  const cluster = getRelatedCluster(currentSlug)

  if (links.length === 0) return null

  const grouped: Record<GroupType, RelatedLink[]> = {
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
        className="my-6 rounded-2xl border-l-4 border-primary-500 bg-sand-50 p-5"
      >
        <p className="mb-3 font-heading text-sm font-bold text-charcoal-900">
          {title} <span className="text-charcoal-500">({links.length} liens)</span>
        </p>
        <ul className="space-y-1.5 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
              >
                <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <section
      aria-label="Pages connexes"
      className="border-t border-charcoal-100 bg-white py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
            <Link2 className="h-3.5 w-3.5" />
            Maillage sémantique
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-display text-charcoal-900 md:text-4xl">
            {title}
          </h2>
          {cluster ? (
            <p className="mx-auto mt-3 max-w-xl text-sm text-charcoal-500">
              Cluster <strong className="text-charcoal-700">{cluster.hub.label}</strong> ·{' '}
              <strong className="text-charcoal-700">{links.length} pages connexes</strong>
            </p>
          ) : null}
        </div>

        {/* Groupes */}
        <div className="space-y-10">
          {GROUP_ORDER.map((type) => {
            const groupLinks = grouped[type]
            if (groupLinks.length === 0) return null
            const cfg = GROUP_CONFIG[type]
            return (
              <div key={type}>
                {/* Group header */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${cfg.iconBg} ${cfg.iconColor}`}
                    aria-hidden="true"
                  >
                    <cfg.Icon className="h-4.5 w-4.5" strokeWidth={2.4} />
                  </span>
                  <h3 className="font-heading text-base font-bold text-charcoal-900">
                    {cfg.label}
                    <span className="ml-2 font-medium text-charcoal-500">
                      ({groupLinks.length})
                    </span>
                  </h3>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {groupLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group relative flex items-start justify-between gap-3 overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover"
                    >
                      <div
                        className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${cfg.accent} opacity-50 transition-opacity group-hover:opacity-100`}
                        aria-hidden="true"
                      />
                      <div className="flex-1 pl-1 leading-tight">
                        <p className="font-heading text-sm font-bold text-charcoal-900 transition-colors group-hover:text-primary-700">
                          {link.label}
                        </p>
                        {link.description ? (
                          <p className="mt-1 text-xs leading-relaxed text-charcoal-500">
                            {link.description}
                          </p>
                        ) : null}
                      </div>
                      <ArrowRight
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-charcoal-300 transition-all group-hover:translate-x-1 group-hover:text-primary-600"
                        strokeWidth={2.4}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
