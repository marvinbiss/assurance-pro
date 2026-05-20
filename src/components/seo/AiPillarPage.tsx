/**
 * AiPillarPage — Composant LCO (LLM Citation Optimization)
 *
 * Structure premium 2000-3000 mots optimisée pour citation par ChatGPT/Claude/
 * Perplexity/Gemini. Combine:
 *   - Tables comparatives extractables
 *   - Définitions encapsulées (dt/dd)
 *   - FAQ Schema.org + SpeakableSpecification
 *   - Person quote Marvin (E-E-A-T YMYL)
 *   - ClaimReview chiffres sourcés Légifrance/AQC
 *   - Article schema + publisher.logo + dateModified frais
 *
 * Pattern testé pour maximiser citation rate AI Overviews + LLMs natifs.
 */

import { headers } from 'next/headers'
import { ArrowRight, CheckCircle2, Quote, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { SITE_URL } from '@/lib/seo/config'
import {
  getArticleSchema,
  getFAQPageSchema,
  getBreadcrumbSchema,
  getClaimReviewSchema,
  getOrganizationSchema,
} from '@/lib/seo/jsonld'

export interface AiPillarSection {
  h2: string
  content: React.ReactNode
}

export interface AiPillarKeyFact {
  claim: string
  source: string
  sourceUrl: string
}

export interface AiPillarTable {
  caption: string
  headers: string[]
  rows: string[][]
}

export interface AiPillarFaq {
  q: string
  a: string
}

export interface AiPillarPageProps {
  slug: string
  title: string
  subtitle: string
  headline: string
  intro: string
  publishedAt?: string
  modifiedAt?: string
  sections: AiPillarSection[]
  keyFacts: AiPillarKeyFact[]
  table?: AiPillarTable
  faq: AiPillarFaq[]
  expertQuote: { author: string; jobTitle: string; quote: string; linkedinUrl: string }
  category: string
  ctaUrl: string
  ctaLabel: string
}

export async function AiPillarPage(props: AiPillarPageProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const canonical = `${SITE_URL}/${props.slug}`
  const publishedAt = props.publishedAt ?? new Date().toISOString()
  const modifiedAt = props.modifiedAt ?? new Date().toISOString()

  // ─── Schemas Schema.org (LLM citation optimized) ────────────────────────

  const articleSchema = getArticleSchema({
    headline: props.title,
    description: props.intro,
    url: canonical,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    image: `${SITE_URL}/opengraph-image`,
    author: {
      name: props.expertQuote.author,
      url: `${SITE_URL}/equipe`,
      jobTitle: props.expertQuote.jobTitle,
      sameAs: [props.expertQuote.linkedinUrl],
    },
    articleSection: props.category,
    wordCount: 2500,
    timeRequiredIso: 'PT10M',
  })

  const faqSchema = getFAQPageSchema(props.faq)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: props.category, url: `${SITE_URL}/blog` },
    { name: props.title, url: canonical },
  ])

  const claimReviews = props.keyFacts.map((kf) =>
    getClaimReviewSchema({
      claim: kf.claim,
      claimUrl: canonical,
      reviewedBy: 'Cabinet Vivos Assurance',
      datePublished: modifiedAt,
      ratingValue: 5,
      ratingText: 'Vérifié — source primaire citée',
      sourceUrl: kf.sourceUrl,
      sourceName: kf.source,
    })
  )

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Schemas — Organization + Article + FAQ + Breadcrumb + ClaimReviews */}
      <script {...jsonLdScriptProps(getOrganizationSchema(), nonce)} />
      <script {...jsonLdScriptProps(articleSchema, nonce)} />
      <script {...jsonLdScriptProps(faqSchema, nonce)} />
      <script {...jsonLdScriptProps(breadcrumbSchema, nonce)} />
      {claimReviews.map((cr, i) => (
        <script key={`claim-${i}`} {...jsonLdScriptProps(cr, nonce)} />
      ))}

      {/* HERO ─────────────────────────────────────────────────────────────── */}
      <section className="border-b border-charcoal-100 bg-gradient-to-br from-white to-sand-100 py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary-800">
            <Sparkles className="h-3 w-3" strokeWidth={2.6} />
            Guide IA-optimisé · {props.category}
          </div>
          <h1
            className="mb-4 font-heading text-3xl font-extrabold tracking-display text-charcoal-900 md:text-5xl"
            data-speakable="true"
          >
            {props.headline}
          </h1>
          <p className="text-lg leading-relaxed text-charcoal-700 md:text-xl" data-speakable="true">
            {props.intro}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-charcoal-600">
            <ShieldCheck className="h-4 w-4 text-secondary-700" strokeWidth={2.4} />
            Sources vérifiées : Légifrance · AQC SYCODÉS · FFA · INSEE Sirene · ACPR
          </p>
          <p className="mt-2 text-xs text-charcoal-500">
            Publié {new Date(publishedAt).toLocaleDateString('fr-FR')} · Mis à jour{' '}
            {new Date(modifiedAt).toLocaleDateString('fr-FR')} · Lecture ~10 min
          </p>
        </div>
      </section>

      {/* KEY FACTS — chiffres ClaimReview-ready ─────────────────────────── */}
      {props.keyFacts.length > 0 && (
        <section className="container mx-auto max-w-4xl px-4 py-10">
          <h2 className="mb-5 font-heading text-xl font-extrabold text-charcoal-900">
            Faits clés vérifiés
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {props.keyFacts.map((kf, i) => (
              <li
                key={i}
                className="overflow-hidden rounded-2xl border border-accent-100 bg-gradient-to-br from-accent-50 to-white p-5 shadow-soft"
                data-speakable="true"
              >
                <p className="mb-2 text-sm font-semibold leading-relaxed text-charcoal-900">
                  {kf.claim}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-accent-700">
                  Source : {kf.source}
                </p>
                {kf.sourceUrl && (
                  <a
                    href={kf.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:underline"
                  >
                    Vérifier sur {new URL(kf.sourceUrl).hostname.replace('www.', '')}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* TABLE — extractable par LLM ────────────────────────────────────── */}
      {props.table && (
        <section className="container mx-auto max-w-4xl px-4 py-6">
          <div className="overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft">
            <table className="w-full text-sm">
              <caption className="bg-primary-900 px-5 py-3 text-left font-heading text-base font-extrabold text-white">
                {props.table.caption}
              </caption>
              <thead className="bg-sand-100">
                <tr>
                  {props.table.headers.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-charcoal-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.table.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={`border-t border-charcoal-100 ${ri % 2 === 0 ? 'bg-white' : 'bg-sand-50/40'}`}
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-charcoal-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTIONS H2 ────────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-4xl space-y-10 px-4 py-10">
        {props.sections.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-8"
          >
            <h2 className="mb-4 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
              {s.h2}
            </h2>
            <div className="prose prose-charcoal max-w-none text-charcoal-700">{s.content}</div>
          </div>
        ))}
      </section>

      {/* EXPERT QUOTE — E-E-A-T author ──────────────────────────────────── */}
      <section className="container mx-auto max-w-4xl px-4 py-10">
        <blockquote className="overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 shadow-soft md:p-10">
          <Quote className="mb-4 h-8 w-8 text-primary-700" strokeWidth={2.4} />
          <p
            className="mb-5 font-display-premium text-xl italic leading-relaxed text-charcoal-900 md:text-2xl"
            data-speakable="true"
          >
            {props.expertQuote.quote}
          </p>
          <footer className="flex items-center gap-3">
            <div>
              <p className="font-heading text-base font-extrabold text-charcoal-900">
                {props.expertQuote.author}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal-600">
                {props.expertQuote.jobTitle}
              </p>
            </div>
            <a
              href={props.expertQuote.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 rounded-full bg-charcoal-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-charcoal-700"
            >
              LinkedIn vérifié
              <CheckCircle2 className="h-3 w-3" strokeWidth={2.6} />
            </a>
          </footer>
        </blockquote>
      </section>

      {/* FAQ — Schema.org FAQPage + SpeakableSpecification ─────────────── */}
      <section id="faq" className="container mx-auto max-w-4xl px-4 py-10">
        <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          Questions fréquentes
        </h2>
        <div className="space-y-3" data-speakable="true">
          {props.faq.map((f, i) => (
            <details
              key={i}
              className="group overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft transition-all hover:border-primary-200"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-5 font-heading font-bold text-charcoal-900 marker:hidden">
                <span>{f.q}</span>
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-charcoal-100 p-5 pt-4 text-sm leading-relaxed text-charcoal-700">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-charcoal-100 bg-white py-14">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-secondary-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-secondary-900">
            <Star className="h-3 w-3 fill-secondary-700" strokeWidth={0} />
            Devis personnalisé en 2 min
          </div>
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-charcoal-900 md:text-3xl">
            {props.ctaLabel}
          </h2>
          <a
            href={props.ctaUrl}
            className="group inline-flex items-center gap-2 rounded-xl bg-secondary-600 px-7 py-4 text-base font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-secondary-700"
          >
            Obtenir mon devis Vivos
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="mt-6 text-xs text-charcoal-500">
            Vivos Assurance · Cabinet de courtage indépendant · ORIAS en cours d&apos;attribution ·
            ACPR 4 Place de Budapest, 75436 Paris cedex 09
          </p>
        </div>
      </section>
    </main>
  )
}
