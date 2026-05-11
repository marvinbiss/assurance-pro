/**
 * PilierLayout — Template réutilisable pour les pages piliers verticaux
 * Couche A — Têtes de pont E-E-A-T (480 pages au total)
 */

import Link from 'next/link'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import {
  getBreadcrumbSchema,
  getServiceSchema,
  getArticleSchema,
  getFAQPageSchema,
} from '@/lib/seo/jsonld'
import { SITE_URL } from '@/lib/seo/config'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { RelatedPagesSection } from '@/components/seo/RelatedPagesSection'

/**
 * Construit dynamiquement la liste BreadcrumbList depuis le slug.
 * Ex : "guides/attestation-decennale" → [Accueil, Guides, Attestation décennale]
 */
function buildBreadcrumbItems(slug: string, title: string) {
  const segments = slug.split('/').filter((s): s is string => Boolean(s))
  const items: { name: string; url: string }[] = [{ name: 'Accueil', url: '/' }]
  let acc = ''
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i] ?? ''
    acc = `${acc}/${seg}`
    const isLast = i === segments.length - 1
    items.push({
      name: isLast ? title : prettifySegment(seg),
      url: acc,
    })
  }
  return items
}

function prettifySegment(s: string): string {
  return s
    .split('-')
    .map((w) => (w.length > 0 ? `${w[0]?.toUpperCase() ?? ''}${w.slice(1)}` : w))
    .join(' ')
}

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

export async function PilierLayout({
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
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <article className="min-h-screen">
      {/* HERO */}
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 py-16 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav className="mb-4 text-sm opacity-80" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            {' / '}
            <span>{title}</span>
          </nav>

          {isObligatoire ? (
            <span className="mb-4 inline-block rounded-full bg-red-500/90 px-3 py-1 text-sm font-semibold text-white">
              ⚠️ Garantie obligatoire
            </span>
          ) : null}

          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">{tagline}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/devis?garantie=${slug}`}
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-blue-700 shadow-lg transition hover:bg-gray-100"
            >
              Obtenir mon devis →
            </Link>
            <a
              href="#faq"
              className="inline-block rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Questions fréquentes
            </a>
          </div>

          {legalReference ? (
            <p className="mt-6 text-sm italic opacity-80">
              📜 Référence légale&nbsp;: {legalReference}
            </p>
          ) : null}
        </div>
      </header>

      {/* BÉNÉFICES */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                {b.icon ? (
                  <div className="mb-2 text-3xl" aria-hidden="true">
                    {b.icon}
                  </div>
                ) : null}
                <h3 className="mb-1 font-semibold">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">{intro}</p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-3xl space-y-12 px-4">
          {sections.map((s) => (
            <div key={s.h2}>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">{s.h2}</h2>
              <div className="prose prose-lg max-w-none text-gray-700">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED MÉTIERS */}
      {relatedMetiers && relatedMetiers.length > 0 ? (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-6 text-center text-2xl font-bold">
              Couvert pour votre métier&nbsp;?
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {relatedMetiers.map((m) => (
                <Link
                  key={m.slug}
                  href={`/${slug}/${m.slug}`}
                  className="block rounded border border-gray-200 bg-white px-4 py-3 text-center text-sm transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* MAILLAGE INTERNE — Pages connexes (auto-injecté selon cluster sémantique) */}
      <RelatedPagesSection currentSlug={slug} />

      {/* FAQ */}
      <section id="faq" className="bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Questions fréquentes</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="group cursor-pointer rounded-lg bg-gray-50 p-5">
                <summary className="flex list-none items-center justify-between font-semibold text-gray-900">
                  <span>{f.q}</span>
                  <span
                    className="text-blue-600 transition group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-blue-700 py-16 text-center text-white">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Prêt à comparer&nbsp;?</h2>
          <p className="mb-8 text-lg opacity-95">
            Devis gratuit et sans engagement. Réponse sous 24&nbsp;heures.
          </p>
          <Link
            href={`/devis?garantie=${slug}`}
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-lg hover:bg-gray-100"
          >
            Démarrer mon devis →
          </Link>
        </div>
      </section>

      {/* Schemas JSON-LD — safe escape + nonce CSP (defense in depth XSS) */}
      <script {...jsonLdScriptProps(getFAQPageSchema(faq), nonce)} />
      <script
        {...jsonLdScriptProps(getBreadcrumbSchema(buildBreadcrumbItems(slug, title)), nonce)}
      />
      <script
        {...jsonLdScriptProps(
          slug.startsWith('guides/')
            ? getArticleSchema({
                headline: title,
                description: tagline,
                url: `${SITE_URL}/${slug}`,
              })
            : getServiceSchema({
                name: title,
                description: tagline,
                url: `${SITE_URL}/${slug}`,
              }),
          nonce
        )}
      />
    </article>
  )
}
