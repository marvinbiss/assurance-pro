'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, X } from 'lucide-react'

export interface BlogSearchItem {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
}

export interface BlogSearchProps {
  items: BlogSearchItem[]
  limit?: number
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
}

function scoreItem(item: BlogSearchItem, query: string): number {
  const q = normalize(query)
  if (!q) return 0
  const title = normalize(item.title)
  const desc = normalize(item.description)
  const cat = normalize(item.category)
  const tags = item.tags.map(normalize).join(' ')
  let score = 0
  if (title.includes(q)) score += 10
  if (title.startsWith(q)) score += 5
  if (cat.includes(q)) score += 4
  if (tags.includes(q)) score += 3
  if (desc.includes(q)) score += 2
  for (const word of q.split(/\s+/).filter((w) => w.length >= 3)) {
    if (title.includes(word)) score += 2
    if (tags.includes(word)) score += 1
  }
  return score
}

export function BlogSearch({ items, limit = 6 }: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [, startTransition] = useTransition()

  useEffect(() => {
    const t = setTimeout(() => startTransition(() => setDebounced(query)), 120)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    if (debounced.trim().length < 2) return []
    return items
      .map((item) => ({ item, score: scoreItem(item, debounced) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.item)
  }, [items, debounced, limit])

  return (
    <div className="relative">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-400"
          strokeWidth={2.4}
          aria-hidden="true"
        />
        <label htmlFor="blog-search" className="sr-only">
          Rechercher un article
        </label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un sujet (cyber, décennale, RC Pro…)"
          autoComplete="off"
          className="w-full rounded-2xl border border-charcoal-100 bg-white py-4 pl-12 pr-12 text-base text-charcoal-900 placeholder:text-charcoal-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-charcoal-800 dark:bg-charcoal-900 dark:text-white dark:placeholder:text-charcoal-500"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Effacer"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-charcoal-500 transition-colors hover:bg-sand-100 hover:text-charcoal-800 dark:hover:bg-charcoal-800"
          >
            <X className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
      </div>

      {debounced.trim().length >= 2 && (
        <div
          role="listbox"
          aria-label="Résultats de recherche"
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-[420px] overflow-y-auto rounded-2xl border border-charcoal-100 bg-white shadow-premium-lg dark:border-charcoal-800 dark:bg-charcoal-900"
        >
          {results.length === 0 ? (
            <p className="p-5 text-sm text-charcoal-600 dark:text-charcoal-400">
              Aucun résultat pour <span className="font-bold">{debounced}</span>.
            </p>
          ) : (
            <ul className="divide-y divide-charcoal-100 dark:divide-charcoal-800">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    role="option"
                    className="group flex items-start gap-3 px-5 py-3 transition-colors hover:bg-sand-50 dark:hover:bg-charcoal-800"
                  >
                    <span className="mt-0.5 inline-flex flex-shrink-0 items-center rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-primary-700 dark:bg-primary-950/50 dark:text-primary-300">
                      {r.category}
                    </span>
                    <span className="flex-1 text-sm font-semibold leading-snug text-charcoal-900 group-hover:text-primary-700 dark:text-white">
                      {r.title}
                    </span>
                    <ArrowRight
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary-700 opacity-0 transition-opacity group-hover:opacity-100 dark:text-primary-300"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
