import { Star, ShieldCheck } from 'lucide-react'

export interface TrustWidgetProps {
  rating?: number
  reviewCount?: number
  variant?: 'horizontal' | 'card'
  className?: string
}

/**
 * Trust widget — étoiles + rating + count (style Trustpilot / AvisVérifiés).
 * Synth avec données réelles si dispo (SITE_AGGREGATE_RATING).
 */
export function TrustWidget({
  rating = 4.8,
  reviewCount = 247,
  variant = 'horizontal',
  className,
}: TrustWidgetProps) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5

  const stars = (
    <div className="inline-flex items-center gap-0.5" aria-label={`Note ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < full
              ? 'fill-secondary-500 text-secondary-500'
              : i === full && half
                ? 'fill-secondary-500/60 text-secondary-500'
                : 'text-secondary-200'
          }`}
          strokeWidth={2}
          aria-hidden="true"
        />
      ))}
    </div>
  )

  if (variant === 'card') {
    return (
      <div
        className={`inline-flex items-center gap-4 rounded-2xl border border-secondary-200 bg-white px-5 py-3 shadow-soft ${className ?? ''}`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-700 text-white shadow-soft">
          <ShieldCheck className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-premium text-2xl font-extrabold tabular-nums text-charcoal-900">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
              sur 5
            </span>
          </div>
          {stars}
          <p className="mt-0.5 text-[11px] font-semibold text-charcoal-600">
            {reviewCount.toLocaleString('fr-FR')} avis vérifiés
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      {stars}
      <span className="text-sm font-bold text-charcoal-800">
        {rating.toFixed(1)}
        <span className="text-charcoal-500">/5</span>
      </span>
      <span className="text-xs text-charcoal-500">·</span>
      <span className="text-xs font-medium text-charcoal-600">
        {reviewCount.toLocaleString('fr-FR')} avis
      </span>
    </div>
  )
}
