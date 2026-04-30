/**
 * PilierLayout — Template réutilisable pour les pages piliers verticaux
 * Couche A — Têtes de pont E-E-A-T (480 pages au total)
 */

import Link from 'next/link'
import type { ReactNode } from 'react'

export interface PilierProps {
  /** Slug pour Schema.org */
  slug: string
  /** Titre H1 */
  title: string
  /** Sous-titre court */
  tagline: string
  /** Description méta + intro */
  intro: string
  /** Bénéfices clés (3-4 points) */
  benefits: { icon?: string; title: string; desc: string }[]
  /** Sections de contenu (H2 + body riche) */
  sections: { h2: string; body: ReactNode }[]
  /** FAQ */
  faq: { q: string; a: string }[]
  /** Métiers / activités liées (cards de redirection) */
  relatedMetiers?: { name: string; slug: string }[]
  /** Référence légale principale (ex : "Loi Spinetta — art. L. 241-1 C. assur.") */
  legalReference?: string
  /** Garantie obligatoire ? */
  isObligatoire?: boolean
}

export function PilierLayout({
  slug,
  title,
  tagline,
  intro,
  benefits,
  sections,
  faq,
  relatedMetiers,
  legalReference,
  isObligatoire,
}: PilierProps) {
  return (
    <article className="min-h-screen">
      {/* HERO */}
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm opacity-80 mb-4" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            {' / '}
            <span>{title}</span>
          </nav>

          {isObligatoire ? (
            <span className="inline-block mb-4 px-3 py-1 bg-red-500/90 text-white rounded-full text-sm font-semibold">
              ⚠️ Garantie obligatoire
            </span>
          ) : null}

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">{tagline}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/devis?garantie=${slug}`}
              className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
            >
              Obtenir mon devis →
            </Link>
            <a
              href="#faq"
              className="inline-block px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10"
            >
              Questions fréquentes
            </a>
          </div>

          {legalReference ? (
            <p className="mt-6 text-sm opacity-80 italic">
              📜 Référence légale&nbsp;: {legalReference}
            </p>
          ) : null}
        </div>
      </header>

      {/* BÉNÉFICES */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                {b.icon ? (
                  <div className="text-3xl mb-2" aria-hidden="true">
                    {b.icon}
                  </div>
                ) : null}
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">{intro}</p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          {sections.map((s) => (
            <div key={s.h2}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{s.h2}</h2>
              <div className="prose prose-lg max-w-none text-gray-700">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED MÉTIERS */}
      {relatedMetiers && relatedMetiers.length > 0 ? (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Couvert pour votre métier&nbsp;?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {relatedMetiers.map((m) => (
                <Link
                  key={m.slug}
                  href={`/${slug}/${m.slug}`}
                  className="block px-4 py-3 bg-white rounded text-center text-sm hover:bg-blue-50 hover:text-blue-700 border border-gray-200 transition"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section id="faq" className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="bg-gray-50 rounded-lg p-5 cursor-pointer group"
              >
                <summary className="font-semibold text-gray-900 list-none flex justify-between items-center">
                  <span>{f.q}</span>
                  <span className="text-blue-600 group-open:rotate-180 transition" aria-hidden="true">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-blue-700 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Prêt à comparer&nbsp;?</h2>
          <p className="text-lg mb-8 opacity-95">
            Devis gratuit et sans engagement. Réponse sous 24&nbsp;heures.
          </p>
          <Link
            href={`/devis?garantie=${slug}`}
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-gray-100 shadow-lg"
          >
            Démarrer mon devis →
          </Link>
        </div>
      </section>

      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </article>
  )
}
