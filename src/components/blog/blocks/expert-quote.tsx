import Image from 'next/image'
import { Award } from 'lucide-react'
import { SvgAvatar } from './svg-avatar'

export interface ExpertQuoteProps {
  expertName: string
  expertRole: string
  expertAvatar?: string
  quote: string
}

export function ExpertQuote({ expertName, expertRole, expertAvatar, quote }: ExpertQuoteProps) {
  return (
    <aside className="my-10 rounded-2xl border border-secondary-200 bg-secondary-50/40 p-8 dark:border-secondary-700/50 dark:bg-secondary-900/20">
      <div className="mb-5 flex items-center gap-4">
        {expertAvatar ? (
          <Image
            src={expertAvatar}
            alt={expertName}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-secondary-200 dark:ring-secondary-700"
          />
        ) : (
          <SvgAvatar name={expertName} size={56} className="h-14 w-14 rounded-full shadow-soft" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="m-0 font-heading text-base font-extrabold text-charcoal-900 dark:text-charcoal-50">
              {expertName}
            </p>
            <Award
              className="h-4 w-4 text-secondary-700 dark:text-secondary-400"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </div>
          <p className="m-0 text-xs font-bold uppercase tracking-wider text-charcoal-600 dark:text-charcoal-400">
            {expertRole}
          </p>
        </div>
      </div>
      <blockquote className="m-0">
        <p className="font-display-premium text-xl italic leading-snug text-charcoal-900 dark:text-charcoal-100">
          “{quote}”
        </p>
      </blockquote>
    </aside>
  )
}
