import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Info,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Hammer,
  Briefcase,
  Lock,
  Heart,
  BookOpen,
  List,
  Link2,
} from 'lucide-react'
import { getPost, getPostSlugs, getAllPosts, getCategorySlug } from '@/lib/data/blog-posts'
import { SITE_URL } from '@/lib/seo/config'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

type Params = { slug: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog Vivos Assurance`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

interface CategoryConfig {
  Icon: typeof Hammer
  bg: string
  text: string
  gradient: string
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  btp: {
    Icon: Hammer,
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    gradient: 'from-primary-500 via-primary-600 to-primary-800',
  },
  'rc-pro': {
    Icon: Briefcase,
    bg: 'bg-secondary-50',
    text: 'text-secondary-700',
    gradient: 'from-secondary-500 via-secondary-600 to-secondary-700',
  },
  cyber: {
    Icon: Lock,
    bg: 'bg-charcoal-100',
    text: 'text-charcoal-800',
    gradient: 'from-charcoal-700 via-charcoal-800 to-charcoal-950',
  },
  'mutuelle-tns': {
    Icon: Heart,
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    gradient: 'from-rose-500 via-rose-600 to-rose-700',
  },
}

const DEFAULT_CONFIG: CategoryConfig = {
  Icon: BookOpen,
  bg: 'bg-accent-50',
  text: 'text-accent-700',
  gradient: 'from-accent-500 via-accent-600 to-accent-700',
}

function configForCategory(category: string): CategoryConfig {
  return CATEGORY_CONFIG[getCategorySlug(category)] ?? DEFAULT_CONFIG
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const CALLOUT_THEMES = {
  info: {
    Icon: Info,
    container: 'border-accent-200 bg-accent-50/60',
    iconBg: 'bg-accent-100 text-accent-700',
    title: 'À noter',
  },
  warning: {
    Icon: AlertTriangle,
    container: 'border-amber-200 bg-amber-50/70',
    iconBg: 'bg-amber-100 text-amber-700',
    title: 'Point de vigilance',
  },
  success: {
    Icon: CheckCircle2,
    container: 'border-secondary-200 bg-secondary-50/70',
    iconBg: 'bg-secondary-100 text-secondary-700',
    title: 'Bonne pratique',
  },
} as const

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const post = getPost(params.slug)
  if (!post) notFound()

  const nonce = (await headers()).get('x-nonce') ?? undefined
  const config = configForCategory(post.category)
  const categorySlug = getCategorySlug(post.category)

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Vivos Assurance', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  }

  return (
    <main className="min-h-screen bg-sand-50">
      <script {...jsonLdScriptProps(articleSchema, nonce)} />

      {/* Hero — fil d'Ariane + meta + titre + auteur */}
      <section className="relative overflow-hidden bg-charcoal-900 py-14 text-white md:py-20">
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-90" />
        <div
          className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-secondary-400/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary-700/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-4xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
            </Link>
            <span aria-hidden="true">›</span>
            <Link
              href={`/blog/categorie/${categorySlug}`}
              className="transition-colors hover:text-white"
            >
              {post.category}
            </Link>
          </nav>

          <Link
            href={`/blog/categorie/${categorySlug}`}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm transition-all hover:bg-white/15"
          >
            <config.Icon className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
            {post.category}
          </Link>

          <h1 className="font-display-premium mb-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mb-7 max-w-3xl text-lg text-white/85 md:text-xl">{post.description}</p>

          <div className="flex flex-wrap items-center gap-5 border-t border-white/15 pt-6">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient} text-base font-bold text-white shadow-soft`}
              >
                {post.author.charAt(0)}
              </div>
              <div className="text-sm leading-tight">
                <div className="font-bold">{post.author}</div>
                <div className="text-xs text-white/70">{post.authorRole}</div>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-white/20 sm:block" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
                {post.readTime} de lecture
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          {/* Corps de l'article */}
          <div>
            {/* TOC sticky mobile inline */}
            <aside className="mb-10 rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft lg:hidden">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                <List className="h-3.5 w-3.5" strokeWidth={2.4} />
                Sommaire
              </p>
              <ol className="space-y-1.5 text-sm">
                {post.toc.map((item, i) => (
                  <li key={item.id} className="flex items-start gap-2 text-charcoal-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-[10px] font-bold text-primary-700">
                      {i + 1}
                    </span>
                    <a
                      href={`#${item.id}`}
                      className="font-semibold transition-colors hover:text-primary-700"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <article className="prose prose-charcoal prose-headings:font-heading prose-headings:tracking-tight prose-h2:mt-12 prose-h2:scroll-mt-24 prose-h2:text-2xl prose-h2:font-extrabold prose-h2:text-charcoal-900 prose-p:text-base prose-p:leading-relaxed prose-p:text-charcoal-700 prose-a:font-semibold prose-a:text-primary-700 prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline prose-strong:font-bold prose-strong:text-charcoal-900 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-li:text-charcoal-700 md:prose-h2:text-3xl max-w-none">
              {post.body.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2>{section.h2}</h2>
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {section.list &&
                    (section.list.ordered ? (
                      <ol>
                        {section.list.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul>
                        {section.list.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ))}
                  {section.callout &&
                    (() => {
                      const theme = CALLOUT_THEMES[section.callout.tone]
                      return (
                        <div
                          className={`not-prose my-6 flex gap-4 rounded-2xl border p-5 ${theme.container}`}
                        >
                          <div
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${theme.iconBg}`}
                          >
                            <theme.Icon className="h-5 w-5" strokeWidth={2.2} />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-700">
                              {theme.title}
                            </div>
                            <p className="m-0 text-sm leading-relaxed text-charcoal-800">
                              {section.callout!.text}
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                </section>
              ))}
            </article>

            {/* Sources */}
            <section className="mt-12 rounded-2xl border border-charcoal-100 bg-white p-7 shadow-soft">
              <h2 className="mb-4 inline-flex items-center gap-2 font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50">
                  <Link2 className="h-4 w-4 text-primary-700" strokeWidth={2.4} />
                </span>
                Sources &amp; références légales
              </h2>
              <ul className="space-y-2.5 text-sm">
                {post.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-2 font-semibold text-charcoal-700 transition-colors hover:text-primary-700"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500 transition-transform group-hover:scale-150" />
                      <span className="flex-1 leading-snug">{s.label}</span>
                      <ArrowUpRight
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-charcoal-400 transition-colors group-hover:text-primary-700"
                        strokeWidth={2.4}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA milieu */}
            <section className="relative mt-12 overflow-hidden rounded-3xl bg-charcoal-900 p-9 text-white shadow-premium md:p-12">
              <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-95" />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary-400/30 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-1 items-center gap-7 md:grid-cols-[1fr_auto]">
                <div>
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 text-secondary-300" />
                    Conseil personnalisé
                  </span>
                  <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-tight md:text-3xl">
                    Besoin d&apos;un avis sur ce sujet&nbsp;?
                  </h2>
                  <p className="max-w-xl text-base text-white/85">
                    Notre équipe de courtiers ORIAS étudie votre situation et formule un conseil
                    motivé conforme art. L. 521-4 du Code des assurances.
                  </p>
                </div>
                <Link
                  href="/devis"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar TOC desktop sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft">
                <p className="mb-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                  <List className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Sommaire
                </p>
                <ol className="space-y-2.5 text-sm">
                  {post.toc.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-start gap-2.5 text-charcoal-700 transition-colors hover:text-primary-700"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-[10px] font-bold text-primary-700 group-hover:bg-primary-100">
                          {i + 1}
                        </span>
                        <span className="font-semibold leading-snug">{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} p-6 text-white shadow-soft`}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <config.Icon className="mb-3 h-8 w-8 text-white/90" strokeWidth={1.8} />
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
                    Garantie associée
                  </p>
                  <p className="mb-4 font-heading text-lg font-extrabold leading-tight">
                    {post.category}
                  </p>
                  <Link
                    href={`/blog/categorie/${categorySlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white/95 underline-offset-4 hover:underline"
                  >
                    Voir tous les articles
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Articles liés */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-charcoal-200 pt-12">
            <header className="mb-8">
              <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
                <BookOpen className="h-3.5 w-3.5" strokeWidth={2.4} />
                Pour approfondir
              </span>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
                Articles {post.category} liés
              </h2>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((p) => {
                const rConfig = configForCategory(p.category)
                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                  >
                    <div
                      className={`relative aspect-[16/9] bg-gradient-to-br ${rConfig.gradient} p-4`}
                    >
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl"
                        aria-hidden="true"
                      />
                      <rConfig.Icon
                        className="relative h-9 w-9 text-white/95 transition-transform group-hover:scale-110"
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <time
                        dateTime={p.publishedAt}
                        className="mb-2 text-[11px] font-semibold text-charcoal-500"
                      >
                        {formatDate(p.publishedAt)} · {p.readTime}
                      </time>
                      <h3 className="mb-3 line-clamp-3 font-heading text-sm font-extrabold leading-snug tracking-tight text-charcoal-900 transition-colors group-hover:text-primary-700">
                        {p.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-primary-700 transition-transform group-hover:translate-x-0.5">
                        Lire
                        <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
