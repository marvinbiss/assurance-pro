import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'

interface ArticleItem {
  readonly title: string
  readonly excerpt: string
  readonly href: string
  readonly readTime: string
  readonly category?: string
}

interface ArticlesGuidesConnexesProps {
  articles: readonly ArticleItem[]
  eyebrow?: string
  className?: string
}

export function ArticlesGuidesConnexes({
  articles,
  eyebrow = 'Guides connexes',
  className = '',
}: ArticlesGuidesConnexesProps) {
  const items = articles.slice(0, 6)
  if (items.length === 0) return null

  return (
    <section className={`w-full ${className}`} aria-label={eyebrow}>
      <header className="mb-8 flex items-center gap-2">
        <Newspaper className="h-4 w-4 text-secondary-500" aria-hidden="true" />
        <p className="font-heading text-xs font-semibold uppercase tracking-wider text-secondary-700">
          {eyebrow}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group flex flex-col rounded-xl border border-sand-300 bg-white p-6 shadow-soft transition-all duration-300 ease-enter hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
          >
            {article.category && (
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-secondary-50 px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider text-secondary-700">
                {article.category}
              </span>
            )}
            <h3 className="mb-2 font-heading text-lg font-semibold leading-snug text-charcoal-900 group-hover:text-primary-700">
              {article.title}
            </h3>
            <p className="mb-4 line-clamp-3 text-sm text-charcoal-700">{article.excerpt}</p>
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-sand-300 pt-4">
              <span className="font-heading text-xs uppercase tracking-wider text-charcoal-500">
                {article.readTime}
              </span>
              <ArrowRight
                className="h-4 w-4 text-charcoal-500 transition-transform duration-200 ease-enter group-hover:translate-x-1 group-hover:text-primary-600"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
