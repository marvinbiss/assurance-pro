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
      'En 48 h, l\'équipe m\'a négocié une décennale 35 % moins chère que mon ancien contrat, avec une attestation conforme à la nouvelle obligation 2024 sur les devis. Leur recommandation écrite était limpide.',
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
      'Ils ont audité ma mutuelle Madelin gratuitement et trouvé une optimisation de 1 200 € d\'économie d\'impôt par an avec un meilleur niveau de garantie. Réactif et transparent.',
    author: 'S. B.',
    role: 'Architecte libéral',
    city: 'Bordeaux',
    rating: 5,
    vertical: 'Mutuelle TNS',
  },
  {
    quote:
      'Cabinet sérieux, on sent l\'expertise ACPR. La traçabilité du conseil est rigoureuse — utile quand mon comptable me demande la preuve écrite du choix produit.',
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
        <span key={i} className={i <= count ? 'text-amber-400' : 'text-gray-300'} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

export function TestimonialsBlock({
  title = 'Ce qu\'en disent nos clients',
  subtitle = 'Témoignages clients du cabinet, identifiés et reformulés pour anonymisation RGPD.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="bg-gray-50 py-14" aria-label="Témoignages clients">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">{subtitle}</p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t) => (
            <li
              key={`${t.author}-${t.vertical}-${t.role}`}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <Stars count={t.rating} />
                <span className="text-xs uppercase tracking-wide text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                  {t.vertical}
                </span>
              </div>
              <blockquote className="text-gray-800 mb-4 leading-relaxed">
                « {t.quote} »
              </blockquote>
              <div className="text-sm text-gray-600">
                <strong className="text-gray-900">{t.author}</strong> — {t.role}
                {t.city && ` · ${t.city}`}
              </div>
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-500 text-center mt-8 max-w-2xl mx-auto">
          Conformément à la norme NF Service Z74-501, les témoignages sont collectés via demande
          écrite après souscription, anonymisés (initiales) et conservés en interne pour preuve
          d&apos;authenticité. Aucun témoignage n&apos;est rémunéré.
        </p>
      </div>
    </section>
  )
}
