import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import {
  ArrowLeft,
  Printer,
  Clock,
  Calendar,
  Info,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { getRessource, getRessourceSlugs } from '@/lib/data/ressources'
import { SITE_URL } from '@/lib/seo/config'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { NewsletterForm } from '@/components/marketing/NewsletterForm'

export const dynamicParams = false
export const revalidate = 86400

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getRessourceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const r = getRessource(params.slug)
  if (!r) return {}
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `${SITE_URL}/ressources/${r.slug}` },
    openGraph: {
      title: r.title,
      description: r.description,
      url: `${SITE_URL}/ressources/${r.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: r.title,
      description: r.description,
    },
  }
}

function renderInline(text: string) {
  // Très simple markdown parsing : **bold** uniquement.
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i}>{p.slice(2, -2)}</strong>
    }
    return <span key={i}>{p}</span>
  })
}

export default async function RessourcePage(props: { params: Promise<Params> }) {
  const params = await props.params
  const r = getRessource(params.slug)
  if (!r) notFound()

  const nonce = (await headers()).get('x-nonce') ?? undefined
  const url = `${SITE_URL}/ressources/${r.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: r.title,
    description: r.description,
    datePublished: r.updatedAt,
    dateModified: r.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Cabinet Vivos Assurance',
      url: `${SITE_URL}/a-propos`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vivos Assurance',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-vivos.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <script {...jsonLdScriptProps(schema, nonce)} />

      {/* Hero */}
      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-14 text-white md:py-20 print:hidden">
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-90" />
        <div className="container relative mx-auto max-w-4xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/ressources" className="transition-colors hover:text-white">
              Ressources
            </Link>
          </nav>
          <h1 className="mb-5 font-display-premium font-heading text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {r.title}
          </h1>
          <p className="mb-7 max-w-3xl text-lg text-white/85 md:text-xl">{r.description}</p>
          <div className="flex flex-wrap items-center gap-5 border-t border-white/15 pt-6 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              {r.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              Mis à jour le {new Date(r.updatedAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </section>

      {/* En-tête imprimable (visible uniquement en print) */}
      <header className="mb-6 hidden print:block">
        <p className="text-2xl font-bold">{r.title}</p>
        <p className="text-sm text-charcoal-600">{r.description}</p>
        <p className="mt-2 text-xs text-charcoal-500">
          Vivos Assurance · Cabinet de courtage ORIAS · Mis à jour le{' '}
          {new Date(r.updatedAt).toLocaleDateString('fr-FR')}
        </p>
        <hr className="my-4 border-sand-300" />
      </header>

      <div className="container mx-auto max-w-3xl px-4 py-12 print:px-0 print:py-0">
        {/* Toolbar : retour + imprimer (caché en print) */}
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link
            href="/ressources"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-charcoal-600 transition-colors hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
            Retour aux ressources
          </Link>
          <a
            href="javascript:window.print()"
            className="inline-flex items-center gap-1.5 rounded-xl border border-charcoal-200 bg-white px-4 py-2 text-sm font-bold text-charcoal-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700"
          >
            <Printer className="h-4 w-4" strokeWidth={2.4} />
            Imprimer ou PDF
          </a>
        </div>

        {/* Article body */}
        <article className="prose prose-lg max-w-none text-charcoal-700">
          {r.sections.map((s, i) => (
            <section key={i} className="mb-8">
              <h2 className="mb-4 font-heading text-xl font-extrabold text-charcoal-900 md:text-2xl">
                {s.h2}
              </h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mb-3 leading-relaxed">
                  {renderInline(p)}
                </p>
              ))}
              {s.list && (
                <>
                  {s.list.ordered ? (
                    <ol className="my-4 space-y-2 pl-6">
                      {s.list.items.map((item, k) => (
                        <li key={k} className="list-decimal leading-relaxed">
                          {renderInline(item)}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="my-4 space-y-2 pl-6">
                      {s.list.items.map((item, k) => (
                        <li key={k} className="list-disc leading-relaxed">
                          {renderInline(item)}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
              {s.callout && (
                <div
                  className={`my-5 flex items-start gap-3 rounded-2xl border p-4 ${
                    s.callout.tone === 'warning'
                      ? 'border-amber-200 bg-amber-50 text-amber-900'
                      : s.callout.tone === 'success'
                        ? 'border-green-200 bg-green-50 text-green-900'
                        : 'border-blue-200 bg-blue-50 text-blue-900'
                  }`}
                >
                  {s.callout.tone === 'warning' && (
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" strokeWidth={2.4} />
                  )}
                  {s.callout.tone === 'success' && (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" strokeWidth={2.4} />
                  )}
                  {s.callout.tone === 'info' && (
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0" strokeWidth={2.4} />
                  )}
                  <span className="text-sm leading-relaxed">{renderInline(s.callout.text)}</span>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Mention DDA L. 521-4 + CTA newsletter (caché en print pour ne pas polluer le PDF) */}
        <div className="mt-12 space-y-8 print:hidden">
          <div className="rounded-2xl border border-charcoal-100 bg-white p-5 text-xs text-charcoal-600 shadow-soft">
            <strong className="text-charcoal-800">Mention légale :</strong> ce document a une
            vocation informative et ne constitue pas un conseil personnalisé au sens de la DDA art.
            L. 521-4 du Code des assurances. Pour une recommandation motivée écrite adaptée à votre
            situation exacte, contactez un courtier ORIAS humain.
          </div>

          <div className="rounded-3xl border border-charcoal-100 bg-white p-6 shadow-soft md:p-8">
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                <Sparkles className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div>
                <h3 className="mb-1 font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
                  Cette ressource vous a été utile ?
                </h3>
                <p className="text-sm leading-relaxed text-charcoal-600">
                  Recevez les prochaines (1 fois par mois, sans spam) par email.
                </p>
              </div>
            </div>
            <NewsletterForm variant="compact" source={`ressource-${r.slug}`} />
          </div>

          {/* Pied print : copyright + URL */}
          <footer className="mt-8 hidden border-t border-sand-200 pt-4 text-xs text-charcoal-500 print:block">
            <p>© Vivos Assurance · Cabinet de courtage ORIAS — {url}</p>
            <p className="mt-1">
              Ce document est mis à jour régulièrement. Vérifiez la dernière version sur notre site.
              Mention conforme DDA art. L. 521-4.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
