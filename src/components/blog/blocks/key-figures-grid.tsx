export interface KeyFiguresGridProps {
  items: Array<{ value: string; label: string; source?: string }>
}

export function KeyFiguresGrid({ items }: KeyFiguresGridProps) {
  const cols =
    items.length >= 4 ? 'md:grid-cols-4' : items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  return (
    <div className={`my-10 grid grid-cols-2 gap-4 ${cols}`}>
      {items.map((item, i) => (
        <figure
          key={i}
          className="rounded-2xl bg-sand-100 p-6 text-center transition-transform hover:-translate-y-0.5 dark:bg-charcoal-900"
        >
          <div className="font-display-premium text-4xl font-extrabold tabular-nums leading-none tracking-tight text-primary-700 md:text-5xl">
            {item.value}
          </div>
          <figcaption className="mt-3 text-xs font-bold uppercase tracking-wider text-charcoal-700">
            {item.label}
          </figcaption>
          {item.source && (
            <p className="mt-1.5 text-[10px] italic text-charcoal-500">{item.source}</p>
          )}
        </figure>
      ))}
    </div>
  )
}
