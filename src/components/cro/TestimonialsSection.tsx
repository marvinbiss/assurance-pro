/**
 * TestimonialsSection — Témoignages clients avec Schema.org Review
 *
 * Best practice CRO : témoignages = +12-30% conversion (Nielsen Norman 2024).
 * Schema.org Review/AggregateRating = rich snippets étoiles dans Google SERP.
 *
 * IMPORTANT : témoignages doivent être RÉELS (avis clients vérifiables).
 * Ne JAMAIS inventer — risque CNIL + pratique commerciale trompeuse art. L. 121-1 C. conso.
 */

interface Testimonial {
  authorName: string
  authorRole: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  date: string
  /** Vertical métier pour ciblage contextuel */
  segment?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  /** Si true, n'affiche pas le bloc Schema.org (pour éviter doublons si déjà rendu ailleurs) */
  skipSchema?: boolean
}

const STAR = '★'
const EMPTY_STAR = '☆'

export function TestimonialsSection({
  testimonials,
  title = 'Ils nous ont fait confiance',
  skipSchema = false,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  const avgRating =
    Math.round((testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) * 10) / 10

  return (
    <section aria-label="Témoignages clients" className="bg-gray-50 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center justify-center gap-2 text-amber-500">
            <span aria-hidden="true">
              {STAR.repeat(Math.round(avgRating))}
              {EMPTY_STAR.repeat(5 - Math.round(avgRating))}
            </span>
            <span className="text-sm text-gray-700">
              <strong>{avgRating}/5</strong> · {testimonials.length} avis clients
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article key={i} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-900">{t.authorName}</p>
                  <p className="text-xs text-gray-500">{t.authorRole}</p>
                </div>
                <div className="text-sm text-amber-500" aria-label={`${t.rating} étoiles sur 5`}>
                  {STAR.repeat(t.rating)}
                  {EMPTY_STAR.repeat(5 - t.rating)}
                </div>
              </div>
              <blockquote className="text-sm italic text-gray-700">« {t.text} »</blockquote>
              <p className="mt-3 text-xs text-gray-400">
                {new Date(t.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                {t.segment && <span className="ml-2">· {t.segment}</span>}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Schema.org AggregateRating + Reviews — rich snippets Google SERP */}
      {!skipSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Assurance Pro',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: avgRating.toFixed(1),
                reviewCount: testimonials.length,
                bestRating: '5',
                worstRating: '1',
              },
              review: testimonials.map((t) => ({
                '@type': 'Review',
                author: { '@type': 'Person', name: t.authorName },
                datePublished: t.date,
                reviewBody: t.text,
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: String(t.rating),
                  bestRating: '5',
                  worstRating: '1',
                },
              })),
            }),
          }}
        />
      )}
    </section>
  )
}
