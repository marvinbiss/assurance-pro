import { ChevronDown } from 'lucide-react'

export interface AccordionFAQProps {
  items: Array<{ q: string; a: string }>
}

export function AccordionFAQ({ items }: AccordionFAQProps) {
  return (
    <dl className="my-10 divide-y divide-charcoal-100 overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-soft dark:divide-charcoal-800 dark:border-charcoal-800 dark:bg-charcoal-900">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-sand-50 dark:hover:bg-charcoal-800">
            <dt className="m-0 flex-1 text-base font-bold text-charcoal-900 dark:text-white">
              {item.q}
            </dt>
            <ChevronDown
              className="h-5 w-5 flex-shrink-0 text-primary-700 transition-transform duration-200 group-open:rotate-180"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </summary>
          <dd className="m-0 border-t border-charcoal-50 bg-sand-50/40 px-6 py-5 text-[15px] leading-relaxed text-charcoal-700 dark:border-charcoal-800 dark:bg-charcoal-950/40 dark:text-charcoal-300">
            {item.a}
          </dd>
        </details>
      ))}
    </dl>
  )
}
