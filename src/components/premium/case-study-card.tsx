import { Quote } from 'lucide-react'

interface CaseStudyClient {
  readonly firstName: string
  readonly lastInitial: string
  readonly metier: string
  readonly city: string
}

interface CaseStudyMetric {
  readonly value: string
  readonly label: string
}

interface CaseStudyCardProps {
  client: CaseStudyClient
  metric: CaseStudyMetric
  quote: string
  before?: string
  after?: string
  className?: string
}

export function CaseStudyCard({
  client,
  metric,
  quote,
  before,
  after,
  className = '',
}: CaseStudyCardProps) {
  const initials = `${client.firstName.charAt(0)}${client.lastInitial.charAt(0)}`.toUpperCase()
  const fullName = `${client.firstName} ${client.lastInitial.toUpperCase()}.`
  const showCompare = typeof before === 'string' && typeof after === 'string'

  return (
    <article
      className={`relative flex h-full flex-col gap-6 rounded-2xl border border-sand-300 bg-white p-7 shadow-soft ${className}`}
    >
      <header className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="font-display inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xl font-semibold text-primary-700"
          style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
        >
          {initials}
        </span>
        <div className="flex-1">
          <p className="font-heading text-base font-semibold text-charcoal-900">{fullName}</p>
          <p className="font-heading text-sm text-charcoal-500">
            {client.metier}
            <span className="mx-1.5 text-charcoal-500">·</span>
            {client.city}
          </p>
        </div>
      </header>

      <div className="inline-flex w-fit items-baseline gap-2 rounded-full border border-secondary-200 bg-secondary-50 px-4 py-2">
        <span
          className="font-display text-2xl font-semibold tabular-nums text-secondary-700"
          style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
        >
          {metric.value}
        </span>
        <span className="font-heading text-xs font-semibold uppercase tracking-wider text-secondary-700">
          {metric.label}
        </span>
      </div>

      <blockquote className="relative">
        <Quote className="absolute -left-1 -top-2 h-5 w-5 text-primary-200" aria-hidden="true" />
        <p
          className="font-display pl-6 text-xl italic leading-snug text-charcoal-800"
          style={{
            fontFamily: 'var(--font-heading), Fraunces, serif',
            fontVariationSettings: '"SOFT" 100, "WONK" 1',
          }}
        >
          {quote}
        </p>
      </blockquote>

      {showCompare && (
        <dl className="mt-auto flex flex-wrap gap-2 border-t border-sand-300 pt-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1.5">
            <dt className="font-heading text-[10px] font-semibold uppercase tracking-wider text-charcoal-500">
              Avant
            </dt>
            <dd className="font-heading text-sm font-semibold tabular-nums text-charcoal-800">
              {before}
            </dd>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1.5">
            <dt className="font-heading text-[10px] font-semibold uppercase tracking-wider text-accent-700">
              Après
            </dt>
            <dd className="font-heading text-sm font-semibold tabular-nums text-accent-700">
              {after}
            </dd>
          </div>
        </dl>
      )}
    </article>
  )
}
