import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'

export interface StatBlockProps {
  value: string
  label: string
  trend?: 'up' | 'down' | 'flat'
  trendValue?: string
  source?: string
}

const TREND_MAP = {
  up: { Icon: ArrowUpRight, color: 'text-secondary-700 bg-secondary-50' },
  down: { Icon: ArrowDownRight, color: 'text-red-700 bg-red-50' },
  flat: { Icon: ArrowRight, color: 'text-charcoal-600 bg-charcoal-100' },
} as const

export function StatBlock({ value, label, trend, trendValue, source }: StatBlockProps) {
  const t = trend ? TREND_MAP[trend] : null
  return (
    <figure className="my-10 rounded-3xl border border-charcoal-100 bg-gradient-to-br from-sand-50 to-white p-8 shadow-soft dark:border-charcoal-800 dark:from-charcoal-900 dark:to-charcoal-950">
      <div className="flex items-baseline gap-4">
        <span className="font-display-premium text-6xl font-extrabold tabular-nums leading-none tracking-tight text-charcoal-900 dark:text-white md:text-7xl">
          {value}
        </span>
        {t && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${t.color}`}
          >
            <t.Icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
            {trendValue}
          </span>
        )}
      </div>
      <figcaption className="mt-3 text-sm font-bold uppercase tracking-wider text-charcoal-600 dark:text-charcoal-400">
        {label}
      </figcaption>
      {source && (
        <p className="mt-2 text-xs italic text-charcoal-500 dark:text-charcoal-500">
          Source : {source}
        </p>
      )}
    </figure>
  )
}
