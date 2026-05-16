import { CheckCircle2 } from 'lucide-react'

export interface ListBlockProps {
  ordered?: boolean
  variant?: 'check' | 'numbered' | 'bullet'
  items: string[]
}

export function ListBlock({ ordered, variant, items }: ListBlockProps) {
  const isNumbered = variant === 'numbered' || (ordered && variant !== 'check')

  if (isNumbered) {
    return (
      <ol role="list" className="my-6 list-none space-y-3 pl-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl border border-charcoal-100 bg-white/60 p-4"
          >
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-extrabold text-primary-700">
              {i + 1}
            </span>
            <span className="flex-1 leading-relaxed text-charcoal-700">{item}</span>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul role="list" className="my-6 list-none space-y-2.5 pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2
            className="mt-1 h-4 w-4 flex-shrink-0 text-secondary-600"
            strokeWidth={2.6}
            aria-hidden="true"
          />
          <span className="flex-1 leading-relaxed text-charcoal-700">{item}</span>
        </li>
      ))}
    </ul>
  )
}
