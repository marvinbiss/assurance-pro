import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  Hammer,
  Briefcase,
  Lock,
  Heart,
  ShieldCheck,
  Mail,
} from 'lucide-react'
import { getAllPosts, getAllCategories, getCategorySlug } from '@/lib/data/blog-posts'
import { SITE_URL } from '@/lib/seo/config'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Blog — Insights & guides assurance pro',
  description:
    'Décryptages réglementaires, guides pratiques et analyses de marché par les courtiers ORIAS Vivos Assurance. Décennale, RC Pro, Mutuelle TNS, Cyber assurance.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog — Insights & guides assurance pro',
    description:
      'Décryptages réglementaires, guides pratiques et analyses de marché par les courtiers ORIAS Vivos Assurance.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Insights & guides assurance pro',
    description:
      'Décryptages réglementaires, guides pratiques et analyses de marché par les courtiers ORIAS Vivos Assurance.',
  },
}

interface CategoryConfig {
  Icon: typeof Hammer
  bg: string
  text: string
  ring: string
  gradient: string
  accent: string
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  btp: {
    Icon: Hammer,
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    ring: 'ring-primary-200',
    gradient: 'from-primary-500 via-primary-600 to-primary-800',
    accent: 'bg-primary-500',
  },
  'rc-pro': {
    Icon: Briefcase,
    bg: 'bg-secondary-50',
    text: 'text-secondary-700',
    ring: 'ring-secondary-200',
    gradient: 'from-secondary-500 via-secondary-600 to-secondary-700',
    accent: 'bg-secondary-500',
  },
  cyber: {
    Icon: Lock,
    bg: 'bg-charcoal-100',
    text: 'text-charcoal-800',
    ring: 'ring-charcoal-300',
    gradient: 'from-charcoal-700 via-charcoal-800 to-charcoal-950',
    accent: 'bg-charcoal-800',
  },
  'mutuelle-tns': {
    Icon: Heart,
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    ring: 'ring-rose-200',
    gradient: 'from-rose-500 via-rose-600 to-rose-700',
    accent: 'bg-rose-500',
  },
}

const DEFAULT_CONFIG: CategoryConfig = {
  Icon: BookOpen,
  bg: 'bg-accent-50',
  text: 'text-accent-700',
  ring: 'ring-accent-200',
  gradient: 'from-accent-500 via-accent-600 to-accent-700',
  accent: 'bg-accent-500',
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

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const [featured, ...rest] = posts
  const featuredConfig = featured ? configForCategory(featured.category) : DEFAULT_CONFIG

  return (
    <main className="min-h-screen bg-sand-50">
      <BreadcrumbSchema items={[{ label: 'Blog' }]} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal-900 py-16 text-white md:py-24">
        <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-90" />
        <div
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-secondary-400/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary-700/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="container relative mx-auto max-w-6xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">Blog</span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
            Blog &amp; insights ORIAS
          </span>
          <h1 className="font-display-premium mb-5 max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] tracking-display sm:text-5xl md:text-6xl">
            Décryptages, guides
            <br />
            <span className="text-secondary-200">&amp; analyses de marché</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/85 md:text-xl">
            Réglementation, jurisprudence, retours d&apos;expérience terrain. Rédigé par notre
            équipe de courtiers ORIAS &mdash; sources et références légales systématiques.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              {posts.length} article{posts.length > 1 ? 's' : ''} publié
              {posts.length > 1 ? 's' : ''}
            </span>
            <span className="hidden text-white/30 sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-secondary-300" strokeWidth={2.4} />
              Sources Légifrance, ACPR, AQC
            </span>
          </div>
        </div>
      </section>

      {/* Filtres catégories */}
      <section className="border-b border-charcoal-100 bg-white py-6">
        <div className="container mx-auto max-w-6xl px-4">
          <nav aria-label="Catégories" className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
              Filtrer&nbsp;:
            </span>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full border border-charcoal-900 bg-charcoal-900 px-3.5 py-1.5 text-xs font-bold text-white transition-all hover:-translate-y-0.5"
            >
              Tous les articles
              <span className="rounded-full bg-white/15 px-1.5 py-0 text-[10px] font-extrabold">
                {posts.length}
              </span>
            </Link>
            {categories.map((cat) => {
              const config = CATEGORY_CONFIG[cat.slug] ?? DEFAULT_CONFIG
              return (
                <Link
                  key={cat.slug}
                  href={`/blog/categorie/${cat.slug}`}
                  className={`group inline-flex items-center gap-1.5 rounded-full border border-charcoal-200 bg-white px-3.5 py-1.5 text-xs font-bold text-charcoal-700 transition-all hover:-translate-y-0.5 hover:border-charcoal-300 hover:shadow-soft`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${config.bg}`}
                  >
                    <config.Icon className={`h-3 w-3 ${config.text}`} strokeWidth={2.4} />
                  </span>
                  {cat.name}
                  <span className="rounded-full bg-charcoal-100 px-1.5 py-0 text-[10px] font-extrabold text-charcoal-600 group-hover:bg-charcoal-200">
                    {cat.count}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-14">
        {/* Featured post */}
        {featured && (
          <article className="mb-14">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Cover gradient avec icon */}
                <div
                  className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${featuredConfig.gradient} p-8 lg:col-span-2 lg:aspect-auto`}
                >
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/20 blur-3xl"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-black/20 blur-3xl"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full flex-col justify-between text-white">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      <Sparkles className="h-3 w-3" />À la une
                    </span>
                    <div>
                      <featuredConfig.Icon
                        className="mb-3 h-12 w-12 text-white/90"
                        strokeWidth={1.8}
                      />
                      <div className="text-xs font-bold uppercase tracking-wider text-white/85">
                        {featured.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-7 lg:col-span-3 lg:p-10">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-charcoal-500">
                      <time
                        dateTime={featured.publishedAt}
                        className="inline-flex items-center gap-1.5 font-semibold"
                      >
                        <Calendar className="h-3.5 w-3.5" strokeWidth={2.4} />
                        {formatDate(featured.publishedAt)}
                      </time>
                      <span className="text-charcoal-300">·</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold">
                        <Clock className="h-3.5 w-3.5" strokeWidth={2.4} />
                        {featured.readTime} de lecture
                      </span>
                    </div>
                    <h2 className="mb-4 font-heading text-2xl font-extrabold leading-tight tracking-tight text-charcoal-900 transition-colors group-hover:text-primary-700 md:text-3xl lg:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mb-6 text-base leading-relaxed text-charcoal-600 md:text-lg">
                      {featured.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${featuredConfig.gradient} font-bold text-white shadow-soft`}
                      >
                        {featured.author.charAt(0)}
                      </div>
                      <div className="text-sm leading-tight">
                        <div className="font-bold text-charcoal-900">{featured.author}</div>
                        <div className="text-xs text-charcoal-500">{featured.authorRole}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 transition-transform group-hover:translate-x-1">
                      Lire l&apos;article
                      <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Section autres articles */}
        {rest.length > 0 && (
          <section>
            <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
                  <BookOpen className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Tous les articles
                </span>
                <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
                  Récemment publiés
                </h2>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => {
                const config = configForCategory(post.category)
                return (
                  <article key={post.slug} className="group">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-charcoal-200 hover:shadow-premium"
                    >
                      {/* Cover gradient */}
                      <div
                        className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${config.gradient} p-5`}
                      >
                        <div
                          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl"
                          aria-hidden="true"
                        />
                        <div className="relative flex h-full items-end justify-between text-white">
                          <config.Icon
                            className="h-10 w-10 text-white/90 transition-transform group-hover:scale-110"
                            strokeWidth={1.8}
                          />
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-charcoal-500">
                          <time
                            dateTime={post.publishedAt}
                            className="inline-flex items-center gap-1 font-semibold"
                          >
                            <Calendar className="h-3 w-3" strokeWidth={2.4} />
                            {formatDate(post.publishedAt)}
                          </time>
                          <span className="text-charcoal-300">·</span>
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <Clock className="h-3 w-3" strokeWidth={2.4} />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="mb-3 font-heading text-lg font-extrabold leading-snug tracking-tight text-charcoal-900 transition-colors group-hover:text-primary-700">
                          {post.title}
                        </h3>
                        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-charcoal-600">
                          {post.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${config.gradient} text-xs font-bold text-white`}
                            >
                              {post.author.charAt(0)}
                            </div>
                            <span className="text-xs font-semibold text-charcoal-700">
                              {post.author.split(' ').slice(0, 2).join(' ')}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 transition-transform group-hover:translate-x-0.5">
                            Lire
                            <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </section>
        )}

        {/* Newsletter CTA brand */}
        <section className="mt-16 overflow-hidden rounded-3xl border border-charcoal-100 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 p-10 text-white shadow-premium-lg md:p-14">
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-500/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-secondary-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Mail className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
                Newsletter mensuelle
              </span>
              <h2 className="mb-3 font-heading text-3xl font-extrabold leading-tight tracking-display md:text-4xl">
                Réglementation, jurisprudence,
                <br />
                <span className="text-secondary-200">les essentiels chaque mois.</span>
              </h2>
              <p className="text-base text-white/80">
                Une synthèse rédigée par nos courtiers ORIAS. Décennale, RC Pro, Mutuelle TNS,
                Cyber. Désinscription en un clic, jamais de spam.
              </p>
            </div>

            <div className="relative">
              <Link
                href="/devis"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-500 px-7 py-5 text-base font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover"
              >
                Rejoindre la newsletter
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-3 text-center text-[11px] text-white/60">
                RGPD &middot; consentement explicite &middot; hébergement UE
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
