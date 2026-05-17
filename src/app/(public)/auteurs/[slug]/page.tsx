import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BookOpen, Linkedin, ShieldCheck } from 'lucide-react'
import { SvgAvatar } from '@/components/blog/blocks/svg-avatar'
import { InlineCta } from '@/components/cta/inline-cta'
import { SITE_URL } from '@/lib/seo/config'
import { AUTHORS } from '@/lib/data/blog-authors'
import { getAllPosts } from '@/lib/data/blog-posts'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { headers } from 'next/headers'

type Params = { slug: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  return Object.keys(AUTHORS).map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const author = AUTHORS[params.slug]
  if (!author) return {}
  return {
    title: `${author.name} — Auteur Vivos Assurance`,
    description: `Articles, bio et qualifications de ${author.name}, ${author.role}.`,
    alternates: { canonical: `${SITE_URL}/auteurs/${params.slug}` },
  }
}

export default async function AuthorPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const author = AUTHORS[params.slug]
  if (!author) notFound()

  const nonce = (await headers()).get('x-nonce') ?? undefined
  const posts = getAllPosts().filter((p) => p.author === author.name)

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${SITE_URL}/auteurs/${params.slug}`,
    sameAs: author.linkedinUrl ? [author.linkedinUrl] : undefined,
    worksFor: {
      '@type': 'Organization',
      name: 'Vivos Assurance',
      url: SITE_URL,
    },
  }

  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <script {...jsonLdScriptProps(personSchema, nonce)} />
      <BreadcrumbSchema
        items={[{ label: 'Auteurs', href: '/methodologie' }, { label: author.name }]}
      />

      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-14 text-white md:py-20">
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-90" />
        <div className="container relative mx-auto max-w-4xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-5 flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/methodologie" className="transition-colors hover:text-white">
              Auteurs
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">{author.name}</span>
          </nav>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <SvgAvatar
              name={author.name}
              size={96}
              className="h-24 w-24 flex-shrink-0 rounded-full shadow-premium ring-4 ring-white/20"
            />
            <div>
              <h1 className="mb-2 font-display-premium font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                {author.name}
              </h1>
              <p className="mb-3 text-base font-bold uppercase tracking-wider text-white/80">
                {author.role}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {author.oriasN && author.oriasN !== '...' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-400/20 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-secondary-200">
                    <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                    ORIAS n° {author.oriasN}
                  </span>
                )}
                {author.linkedinUrl && (
                  <Link
                    href={author.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 underline-offset-4 hover:underline"
                  >
                    <Linkedin className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                    LinkedIn
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {author.bio && (
        <section className="container mx-auto max-w-3xl px-4 py-12">
          <h2 className="sr-only">Biographie</h2>
          <p className="text-lg leading-relaxed text-charcoal-700 dark:text-charcoal-300">
            {author.bio}
          </p>
        </section>
      )}

      <section className="container mx-auto max-w-6xl px-4 pb-16">
        <header className="mb-8">
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700 dark:text-primary-300">
            <BookOpen className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
            Articles signés
          </span>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 dark:text-white md:text-3xl">
            {posts.length} article{posts.length > 1 ? 's' : ''}
          </h2>
        </header>
        {posts.length === 0 ? (
          <p className="text-charcoal-600 dark:text-charcoal-400">
            Aucun article publié pour le moment.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 12).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-premium dark:border-charcoal-800 dark:bg-charcoal-900"
                >
                  <span className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                    {p.category}
                  </span>
                  <h3 className="mb-2 line-clamp-3 font-heading text-base font-extrabold leading-snug tracking-tight text-charcoal-900 dark:text-white">
                    {p.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-primary-700 dark:text-primary-300">
                    Lire <ArrowRight className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="container mx-auto max-w-4xl px-4 pb-16">
        <InlineCta
          title={`Avis sur votre situation — par ${author.name}`}
          description="Conseil motivé écrit conforme art. L. 521-4 du Code des assurances. Devis sous 24h ouvrées."
        />
      </section>
    </main>
  )
}
