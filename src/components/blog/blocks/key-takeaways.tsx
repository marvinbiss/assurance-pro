import { CheckCircle2, Sparkles } from 'lucide-react'

export interface KeyTakeawaysProps {
  points: string[]
}

export function KeyTakeaways({ points }: KeyTakeawaysProps) {
  return (
    <aside
      aria-labelledby="key-takeaways-heading"
      className="my-8 rounded-2xl border-l-4 border-accent-500 bg-accent-50/50 p-7"
    >
      <h3
        id="key-takeaways-heading"
        className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-accent-800"
      >
        <Sparkles className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />À retenir
      </h3>
      <ul role="list" className="space-y-2.5">
        {points.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[15px] leading-relaxed text-charcoal-800"
          >
            <CheckCircle2
              className="mt-1 h-4 w-4 flex-shrink-0 text-accent-700"
              strokeWidth={2.6}
              aria-hidden="true"
            />
            <span className="flex-1 font-medium">{p}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
