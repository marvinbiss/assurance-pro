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

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const m = getMembre(params.slug)
  if (!m) return {}
  return {
    title: `${m.prenom} ${m.nom} — ${m.poste}`,
    description: m.bio.slice(0, 200),
    alternates: { canonical: `${SITE_URL}/equipe/${m.slug}` },
  }
}

export default async function MembrePage(props: { params: Promise<Params> }) {
  const params = await props.params
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
      name: 'Vivos Assurance',
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
    <div className="min-h-screen bg-white py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="container mx-auto max-w-3xl px-4">
        <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-charcoal-600">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href="/equipe" className="hover:underline">
            Équipe
          </Link>{' '}
          ›{' '}
          <span className="text-charcoal-900">
            {m.prenom} {m.nom}
          </span>
        </nav>

        <header className="mb-6 border-b border-sand-200 pb-6">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
              {m.prenom.charAt(0)}
              {m.nom.charAt(0)}
            </div>
            <div>
              <h1 className="mb-1 text-2xl font-bold md:text-3xl">
                {m.prenom} {m.nom}
              </h1>
              <p className="mb-2 text-charcoal-600">{m.poste}</p>
              {m.oriasNumber && (
                <p className="text-xs text-charcoal-500">
                  N° ORIAS&nbsp;:{' '}
                  <a
                    href="https://www.orias.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary-700 hover:underline"
                  >
                    {m.oriasNumber}
                  </a>
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="prose prose-lg mb-8 max-w-none">
          <h2>Présentation</h2>
          <p>{m.bio}</p>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Block title="Expertises">
            <ul className="space-y-1 text-sm">
              {m.expertises.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </Block>
          <Block title="Formations">
            <ul className="space-y-1 text-sm">
              {m.formations.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </Block>
          <Block title="Expérience">
            <ul className="space-y-1 text-sm">
              {m.experiences.map((e) => (
                <li key={e}>• {e}</li>
              ))}
            </ul>
          </Block>
          <Block title="Certifications">
            <ul className="space-y-1 text-sm">
              {m.certifications.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-charcoal-500">Langues&nbsp;: {m.langues.join(', ')}</p>
          </Block>
        </section>

        {m.emailPro && (
          <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50 p-5">
            <p className="text-sm">
              Contact direct&nbsp;:{' '}
              <a
                href={`mailto:${m.emailPro}`}
                className="font-semibold text-primary-700 hover:underline"
              >
                {m.emailPro}
              </a>
            </p>
          </div>
        )}

        {others.length > 0 && (
          <section className="border-t border-sand-200 pt-6">
            <h2 className="mb-3 text-lg font-bold">Autres membres de l&apos;équipe</h2>
            <ul className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/equipe/${o.slug}`}
                    className="block rounded-lg border border-sand-200 bg-white p-3 transition hover:shadow-md"
                  >
                    <div className="font-semibold text-charcoal-900">
                      {o.prenom} {o.nom}
                    </div>
                    <div className="text-xs text-charcoal-500">{o.poste}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-sand-200 bg-white p-4">
      <h3 className="mb-2 text-sm font-bold text-charcoal-900">{title}</h3>
      {children}
    </div>
  )
}
