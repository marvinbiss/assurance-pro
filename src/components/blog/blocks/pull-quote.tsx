import { ArrowUpRight, Quote } from 'lucide-react'

export interface PullQuoteProps {
  text: string
  attribution?: string
  sourceUrl?: string
}

export function PullQuote({ text, attribution, sourceUrl }: PullQuoteProps) {
  return (
    <blockquote className="relative my-12 border-l-4 border-primary-400 px-8 py-6">
      <Quote
        className="absolute -left-4 top-2 h-7 w-7 -rotate-12 text-primary-200"
        aria-hidden="true"
        strokeWidth={2}
      />
      <p className="font-display-premium text-2xl font-medium italic leading-snug text-charcoal-900 md:text-3xl">
        “{text}”
      </p>
      {attribution && (
        <footer className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500">
          <span aria-hidden="true">—</span>
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-primary-700"
            >
              {attribution}
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
            </a>
          ) : (
            <span>{attribution}</span>
          )}
        </footer>
      )}
    </blockquote>
  )
}
