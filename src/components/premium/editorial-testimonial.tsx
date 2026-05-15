import { Star } from 'lucide-react'

interface EditorialTestimonialProps {
  quote: string
  author: string
  role: string
  city?: string
  rating?: 1 | 2 | 3 | 4 | 5
  metric?: string
  className?: string
}

export function EditorialTestimonial({
  quote,
  author,
  role,
  city,
  rating = 5,
  metric,
  className = '',
}: EditorialTestimonialProps) {
  return (
    <figure
      className={`relative flex h-full flex-col justify-between rounded-2xl border border-sand-300 bg-white p-8 shadow-soft ${className}`}
    >
      <div>
        <div aria-label={`Note ${rating} sur 5`} className="mb-5 flex gap-1 text-accent-500">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
          ))}
        </div>

        <blockquote>
          <p
            className="font-display text-xl italic leading-snug text-charcoal-900 md:text-2xl"
            style={{
              fontFamily: 'var(--font-heading), Fraunces, serif',
              fontVariationSettings: '"SOFT" 100, "WONK" 1',
            }}
          >
            “{quote}”
          </p>
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-end justify-between gap-4 border-t border-sand-300 pt-5">
        <div>
          <p className="font-heading text-sm font-semibold text-charcoal-900">{author}</p>
          <p className="text-sm text-charcoal-700">
            {role}
            {city && <span className="text-charcoal-500"> · {city}</span>}
          </p>
        </div>
        {metric && (
          <span className="shrink-0 rounded-full bg-accent-50 px-3 py-1 font-heading text-sm font-bold tabular-nums text-accent-700">
            {metric}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
