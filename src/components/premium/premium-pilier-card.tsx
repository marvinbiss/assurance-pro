import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PremiumBadge } from './premium-badge'

interface PremiumPilierCardProps {
  title: string
  desc: string
  href: string
  Icon: LucideIcon
  bullets?: readonly string[]
  priceFrom?: string
  badge?: string
  ctaLabel?: string
  variant?: 'standard' | 'featured'
  className?: string
}

export function PremiumPilierCard({
  title,
  desc,
  href,
  Icon,
  bullets,
  priceFrom,
  badge,
  ctaLabel = 'Devis 2 min',
  variant = 'standard',
  className = '',
}: PremiumPilierCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 ease-enter md:p-7 ${
        isFeatured ? 'border-sand-400 shadow-md' : 'border-sand-300 shadow-sm'
      } hover:-translate-y-1 hover:border-sand-500 hover:shadow-card-hover ${className}`}
    >
      {badge && (
        <div className="mb-4">
          <PremiumBadge variant="honey" size="sm">
            {badge}
          </PremiumBadge>
        </div>
      )}

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-200 group-hover:bg-primary-100">
        <Icon className="h-6 w-6" aria-hidden />
      </div>

      <h3 className="mb-2 font-heading text-2xl font-semibold leading-tight text-charcoal-900">
        {title}
      </h3>

      <p className="mb-5 text-sm leading-relaxed text-charcoal-700">{desc}</p>

      {bullets && bullets.length > 0 && (
        <ul className="mb-6 space-y-2 text-sm text-charcoal-800">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 pt-2">
        {priceFrom && (
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-500">
              à partir de
            </p>
            <p
              className="font-display text-3xl font-medium tabular-nums text-charcoal-900"
              style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
            >
              {priceFrom}
            </p>
          </div>
        )}

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 rounded-lg bg-charcoal-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-enter group-hover:bg-primary-600"
          aria-label={`${ctaLabel} — ${title}`}
        >
          {ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 ease-enter group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  )
}
