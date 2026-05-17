import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export interface InlineCtaProps {
  title?: string
  description?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  variant?: 'sand' | 'charcoal'
  className?: string
}

/**
 * InlineCta — section CTA universelle, branded.
 * Réutilisable sur toutes pages éditoriales (auteurs/équipe/méthodologie/presse/blog/légales).
 */
export function InlineCta({
  title = "Besoin d'un avis sur votre assurance pro ?",
  description = 'Notre équipe de courtiers ORIAS étudie votre situation et propose 3 devis personnalisés sous 24 h.',
  primaryHref = '/devis',
  primaryLabel = 'Demander un devis',
  secondaryHref = '/contact',
  secondaryLabel = 'Parler à un conseiller',
  variant = 'charcoal',
  className,
}: InlineCtaProps) {
  const bg =
    variant === 'charcoal'
      ? 'bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950 text-white'
      : 'bg-sand-100 text-charcoal-900'
  const subColor = variant === 'charcoal' ? 'text-white/85' : 'text-charcoal-700'
  const secondaryStyle =
    variant === 'charcoal'
      ? 'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
      : 'border border-charcoal-200 bg-white text-charcoal-800 hover:border-charcoal-300'

  return (
    <section
      className={`relative overflow-hidden rounded-3xl p-10 shadow-premium md:p-14 ${bg} ${className ?? ''}`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.4fr_auto]">
        <div>
          <h2 className="mb-3 font-display-premium font-heading text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className={`text-base leading-relaxed ${subColor}`}>{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link
            href={primaryHref}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
          >
            {primaryLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </Link>
          <Link
            href={secondaryHref}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold transition-all ${secondaryStyle}`}
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
