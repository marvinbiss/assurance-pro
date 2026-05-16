import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BookOpen, Briefcase, Calendar, Clock, Hammer, Heart, Lock } from 'lucide-react'
import { getAllCategories, getPostsByCategory, getCategorySlug } from '@/lib/data/blog-posts'
import { getCoverForCategory } from '@/lib/data/blog-covers'
import { SITE_URL } from '@/lib/seo/config'

type Params = { category: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  return getAllCategories().map((c) => ({ category: c.slug }))
}

function findCategoryBySlug(slug: string) {
  return getAllCategories().find((c) => c.slug === slug)
}

interface CategoryVisual {
  Icon: typeof Hammer
  gradient: string
}

const CATEGORY_VISUAL: Record<string, CategoryVisual> = {
  btp: { Icon: Hammer, gradient: 'from-primary-500 via-primary-600 to-primary-800' },
  'rc-pro': { Icon: Briefcase, gradient: 'from-secondary-500 via-secondary-600 to-secondary-700' },
  cyber: { Icon: Lock, gradient: 'from-charcoal-700 via-charcoal-800 to-charcoal-950' },
  'mutuelle-tns': { Icon: Heart, gradient: 'from-rose-500 via-rose-600 to-rose-700' },
}

const DEFAULT_VISUAL: CategoryVisual = {
  Icon: BookOpen,
  gradient: 'from-accent-500 via-accent-600 to-accent-700',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const cat = findCategoryBySlug(params.category)
  if (!cat) return {}
  return {
    title: `Blog ${cat.name} — Analyses ORIAS Vivos Assurance`,
    description: `Articles sourcés (Légifrance, ACPR, AQC, FFA) sur ${cat.name}. Conseils motivés par courtiers ORIAS spécialistes.`,
    alternates: { canonical: `${SITE_URL}/blog/categorie/${cat.slug}` },
  }
}

export default async function BlogCategoryPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const cat = findCategoryBySlug(params.category)
  if (!cat) notFound()

  const posts = getPostsByCategory(cat.name)
  const visual = CATEGORY_VISUAL[cat.slug] ?? DEFAULT_VISUAL
  const cover = getCoverForCategory(cat.slug)
  const featured = posts[0]
  const rest = posts.slice(1)
  const totalReadMin = posts.reduce((sum, p) => {
    const n = parseInt(p.readTime, 10)
    return sum + (Number.isFinite(n) ? n : 0)
  }, 0)
  const Icon = visual.Icon

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Hero catégorie — cover image + stats */}
      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-14 text-white md:py-20">
        <div className="absolute inset-0">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-80`}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-secondary-400/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative mx-auto max-w-4xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/80"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <div className="mb-5 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-secondary-300" strokeWidth={2.4} aria-hidden="true" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Catégorie</span>
          </div>
          <h1 className="mb-4 font-display-premium font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Blog {cat.name}
          </h1>
          <p className="max-w-3xl text-lg text-white/85 md:text-xl">
            Analyses sourcées (Légifrance, ACPR, AQC) sur {cat.name.toLowerCase()}, par courtiers
            ORIAS Vivos Assurance.
          </p>

          <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                Articles
              </dt>
              <dd className="mt-1 font-display-premium text-3xl font-extrabold tabular-nums md:text-4xl">
                {posts.length}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                Lecture totale
              </dt>
              <dd className="mt-1 font-display-premium text-3xl font-extrabold tabular-nums md:text-4xl">
                {totalReadMin || '—'}
                <span className="text-base font-bold text-white/70"> min</span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                Expert
              </dt>
              <dd className="mt-1 text-sm font-bold leading-tight md:text-base">
                Courtier ORIAS dédié
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-14">
        {featured && (
          <article className="mb-14">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="relative aspect-[16/9] overflow-hidden lg:col-span-2 lg:aspect-auto">
                  <Image
                    src={
                      (featured.coverImage ?? getCoverForCategory(featured.category, featured.slug))
                        .src
                    }
                    alt={
                      (featured.coverImage ?? getCoverForCategory(featured.category, featured.slug))
                        .alt
                    }
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${visual.gradient} opacity-40 mix-blend-multiply`}
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-charcoal-800 backdrop-blur-sm">
                    <Icon
                      className="h-3.5 w-3.5 text-primary-700"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    Pilier
                  </span>
                </div>
                <div className="flex flex-col justify-between p-7 lg:col-span-3 lg:p-10">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-charcoal-500">
                      <time
                        dateTime={featured.publishedAt}
                        className="inline-flex items-center gap-1.5 font-semibold"
                      >
                        <Calendar className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                        {formatDate(featured.publishedAt)}
                      </time>
                      <span className="text-charcoal-300">·</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold">
                        <Clock className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                        {featured.readTime}
                      </span>
                    </div>
                    <h2 className="mb-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-charcoal-900 transition-colors group-hover:text-primary-700 md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="text-base leading-relaxed text-charcoal-600">
                      {featured.description}
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 transition-transform group-hover:translate-x-1">
                    Lire l&apos;article
                    <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          </article>
        )}

        {rest.length > 0 && (
          <section>
            <header className="mb-8">
              <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
                <BookOpen className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                Tous les articles {cat.name}
              </span>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
                {posts.length - 1} autre{posts.length - 1 > 1 ? 's' : ''} article
                {posts.length - 1 > 1 ? 's' : ''}
              </h2>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => {
                const pCover = p.coverImage ?? getCoverForCategory(p.category, p.slug)
                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={pCover.src}
                        alt={pCover.alt}
                        width={800}
                        height={450}
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${visual.gradient} opacity-55 mix-blend-multiply`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-charcoal-500">
                        <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                        <span className="text-charcoal-300">·</span>
                        <span>{p.readTime}</span>
                      </div>
                      <h3 className="mb-3 font-heading text-base font-extrabold leading-snug tracking-tight text-charcoal-900 transition-colors group-hover:text-primary-700">
                        {p.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-charcoal-600">
                        {p.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-primary-700 transition-transform group-hover:translate-x-0.5">
                        Lire
                        <ArrowRight className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 underline-offset-4 hover:underline"
          >
            ← Retour au blog
          </Link>
        </div>
      </div>
    </main>
  )
}

export { getCategorySlug }
