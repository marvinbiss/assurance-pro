/**
 * PageHero — Hero brand réutilisable pour les pages secondaires
 * (a-propos, equipe, comparateur, selection-assureurs, processus,
 * pages légales : mentions, cgv, confidentialite, cookies, etc.).
 *
 * Design : gradient hero-warm animé + radial blobs + breadcrumb +
 * eyebrow pill + H1 display + lead + meta items optionnels.
 */

import Link from 'next/link'
import type { ReactNode } from 'react'
import { Sparkles, type LucideIcon } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface MetaItem {
  Icon: LucideIcon
  label: string
}

interface PageHeroProps {
  /** Fil d'Ariane (sans Accueil, ajouté automatiquement). Ex: [{label: 'Cabinet'}] */
  breadcrumbs?: BreadcrumbItem[]
  /** Texte eyebrow en pill (uppercase, tracking wider) */
  eyebrow?: string
  /** Icon optionnel pour l'eyebrow (default Sparkles) */
  EyebrowIcon?: LucideIcon
  /** Titre H1 (peut contenir <br /> + <span> coloré) */
  title: ReactNode
  /** Description sous le H1 (lead paragraph) */
  description?: ReactNode
  /** Items meta affichés en bas du hero (ex: stats, dates, sources) */
  meta?: MetaItem[]
  /** Padding vertical (default md) */
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLASSES: Record<Required<PageHeroProps>['size'], string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-28',
}

export function PageHero({
  breadcrumbs,
  eyebrow,
  EyebrowIcon = Sparkles,
  title,
  description,
  meta,
  size = 'md',
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-charcoal-900 text-white ${SIZE_CLASSES[size]}`}
    >
      <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-90" />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-secondary-400/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary-700/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={`${b.label}-${i}`} className="flex items-center gap-2">
                <span aria-hidden="true">›</span>
                {b.href ? (
                  <Link href={b.href} className="transition-colors hover:text-white">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-white">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <EyebrowIcon className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
            {eyebrow}
          </span>
        )}

        <h1 className="font-display-premium mb-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.05] tracking-display sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {description && (
          <div className="max-w-3xl text-lg text-white/85 md:text-xl">{description}</div>
        )}

        {meta && meta.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            {meta.map((m, i) => (
              <span key={`${m.label}-${i}`} className="flex items-center gap-x-2">
                {i > 0 && <span className="hidden text-white/30 sm:inline">·</span>}
                <span className="inline-flex items-center gap-1.5">
                  <m.Icon className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
                  {m.label}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
