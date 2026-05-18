'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  title: string
}

interface TocStickyProps {
  items: TocItem[]
}

/**
 * Sticky table-of-contents with IntersectionObserver scroll-spy.
 * Highlights the section currently in the reader's viewport "active band"
 * (rootMargin -30%/-60%) so the indicator advances when the heading
 * crosses the upper third of the screen.
 */
export function TocSticky({ items }: TocStickyProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    const elements: Element[] = []
    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) {
        observer.observe(el)
        elements.push(el)
      }
    }

    return () => {
      for (const el of elements) observer.unobserve(el)
      observer.disconnect()
    }
  }, [items])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    setActiveId(id)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (typeof window !== 'undefined' && window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  if (items.length === 0) return null

  return (
    <nav aria-label="Sommaire de l'article" className="sticky top-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-charcoal-500">
        Sommaire
      </p>
      <ol className="space-y-2.5 text-sm">
        {items.map((item, index) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'group flex items-start gap-3 rounded-md px-3 py-2 transition-colors duration-200',
                  isActive
                    ? 'bg-primary-50 font-extrabold text-primary-700'
                    : 'text-charcoal-700 hover:bg-sand-100 hover:text-primary-700',
                ].join(' ')}
              >
                <span
                  className={[
                    'inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums transition-colors duration-200',
                    isActive
                      ? 'bg-primary-700 text-white'
                      : 'bg-primary-50 text-primary-700 group-hover:bg-primary-100',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-snug">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
