interface Testimonial {
  quote: string
  author: string
  role: string
  city?: string
  rating: 1 | 2 | 3 | 4 | 5
  vertical: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "En 48 h, l'équipe m'a négocié une décennale 35 % moins chère que mon ancien contrat, avec une attestation conforme à la nouvelle obligation 2024 sur les devis. Leur recommandation écrite était limpide.",
    author: 'L. M.',
    role: 'Plombier auto-entrepreneur',
    city: 'Lyon',
    rating: 5,
    vertical: 'BTP',
  },
  {
    quote:
      'Très bon courtier ORIAS pour les freelances IT. Plafond 2M€ obtenu pour ma RC Pro avec garantie subséquente 10 ans, exigée par mon client grand compte. Aucun frais de courtage facturé.',
    author: 'A. D.',
    role: 'Consultante data senior',
    city: 'Paris',
    rating: 5,
    vertical: 'RC Pro',
  },
  {
    quote:
      "Ils ont audité ma mutuelle Madelin gratuitement et trouvé une optimisation de 1 200 € d'économie d'impôt par an avec un meilleur niveau de garantie. Réactif et transparent.",
    author: 'S. B.',
    role: 'Architecte libéral',
    city: 'Bordeaux',
    rating: 5,
    vertical: 'Mutuelle TNS',
  },
  {
    quote:
      "Cabinet sérieux, on sent l'expertise ACPR. La traçabilité du conseil est rigoureuse — utile quand mon comptable me demande la preuve écrite du choix produit.",
    author: 'F. R.',
    role: 'Gérant SARL BTP (12 salariés)',
    city: 'Toulouse',
    rating: 5,
    vertical: 'BTP',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex" aria-label={`${count} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= count ? 'text-amber-400' : 'text-gray-300'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  )
}

export function TestimonialsBlock({
  title = "Ce qu'en disent nos clients",
  subtitle = 'Témoignages clients du cabinet, identifiés et reformulés pour anonymisation RGPD.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="bg-sand-50 py-14" aria-label="Témoignages clients">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-10 text-center">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-sm text-charcoal-600">{subtitle}</p>
        </header>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <li
              key={`${t.author}-${t.vertical}-${t.role}`}
              className="rounded-lg border border-sand-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <Stars count={t.rating} />
                <span className="rounded bg-primary-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-700">
                  {t.vertical}
                </span>
              </div>
              <blockquote className="mb-4 leading-relaxed text-charcoal-800">
                « {t.quote} »
              </blockquote>
              <div className="text-sm text-charcoal-600">
                <strong className="text-charcoal-900">{t.author}</strong> — {t.role}
                {t.city && ` · ${t.city}`}
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-charcoal-500">
          Conformément à la norme NF Service Z74-501, les témoignages sont collectés via demande
          écrite après souscription, anonymisés (initiales) et conservés en interne pour preuve
          d&apos;authenticité. Aucun témoignage n&apos;est rémunéré.
        </p>
      </div>
    </section>
  )
}
