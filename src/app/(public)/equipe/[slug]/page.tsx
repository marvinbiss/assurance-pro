import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EQUIPE, getMembre, getMembreSlugs } from '@/lib/data/equipe'
import { SITE_URL } from '@/lib/seo/config'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getMembreSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const m = getMembre(params.slug)
  if (!m) return {}
  return {
    title: `${m.prenom} ${m.nom} — ${m.poste} | Assurance Pro`,
    description: m.bio.slice(0, 200),
    alternates: { canonical: `${SITE_URL}/equipe/${m.slug}` },
  }
}

export default function MembrePage({ params }: { params: Params }) {
  const m = getMembre(params.slug)
  if (!m) notFound()

  const others = Object.values(EQUIPE).filter((x) => x.slug !== m.slug)

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${m.prenom} ${m.nom}`,
    jobTitle: m.poste,
    worksFor: {
      '@type': 'InsuranceAgency',
      name: 'Assurance Pro',
      url: SITE_URL,
      identifier: m.oriasNumber,
    },
    knowsAbout: m.expertises,
    knowsLanguage: m.langues,
    hasCredential: [
      ...m.formations.map((f) => ({ '@type': 'EducationalOccupationalCredential', name: f })),
      ...m.certifications.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c })),
    ],
  }

  return (
    <main className="min-h-screen bg-white py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Accueil</Link> ›{' '}
          <Link href="/equipe" className="hover:underline">Équipe</Link> ›{' '}
          <span className="text-gray-900">{m.prenom} {m.nom}</span>
        </nav>

        <header className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl">
              {m.prenom.charAt(0)}
              {m.nom.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                {m.prenom} {m.nom}
              </h1>
              <p className="text-gray-600 mb-2">{m.poste}</p>
              {m.oriasNumber && (
                <p className="text-xs text-gray-500">
                  N° ORIAS&nbsp;:{' '}
                  <a
                    href="https://www.orias.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline font-semibold"
                  >
                    {m.oriasNumber}
                  </a>
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="prose prose-lg max-w-none mb-8">
          <h2>Présentation</h2>
          <p>{m.bio}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Block title="Expertises">
            <ul className="text-sm space-y-1">
              {m.expertises.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </Block>
          <Block title="Formations">
            <ul className="text-sm space-y-1">
              {m.formations.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </Block>
          <Block title="Expérience">
            <ul className="text-sm space-y-1">
              {m.experiences.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </Block>
          <Block title="Certifications">
            <ul className="text-sm space-y-1">
              {m.certifications.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2">Langues&nbsp;: {m.langues.join(', ')}</p>
          </Block>
        </section>

        {m.emailPro && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
            <p className="text-sm">
              Contact direct&nbsp;:{' '}
              <a href={`mailto:${m.emailPro}`} className="text-blue-700 hover:underline font-semibold">
                {m.emailPro}
              </a>
            </p>
          </div>
        )}

        {others.length > 0 && (
          <section className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-bold mb-3">Autres membres de l&apos;équipe</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/equipe/${o.slug}`}
                    className="block bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
                  >
                    <div className="font-semibold text-gray-900">
                      {o.prenom} {o.nom}
                    </div>
                    <div className="text-xs text-gray-500">{o.poste}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-bold mb-2 text-gray-900">{title}</h3>
      {children}
    </div>
  )
}
