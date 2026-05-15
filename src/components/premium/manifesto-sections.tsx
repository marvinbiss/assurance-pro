interface ManifestoItem {
  n: string
  title: string
  desc: string
}

interface ManifestoSectionsProps {
  items: readonly ManifestoItem[]
  eyebrow?: string
  className?: string
}

export function ManifestoSections({ items, eyebrow, className = '' }: ManifestoSectionsProps) {
  return (
    <section aria-label="manifesto" className={`mx-auto max-w-5xl px-4 ${className}`}>
      {eyebrow && (
        <p className="mb-12 font-heading text-xs font-medium uppercase tracking-[0.2em] text-primary-500 md:mb-16">
          {eyebrow}
        </p>
      )}

      <div>
        {items.map((item, i) => {
          const isOdd = i % 2 === 1
          const isFirst = i === 0

          return (
            <article
              key={item.n}
              className={`${isFirst ? '' : 'border-t border-sand-300'} py-24 md:py-32 ${
                isOdd
                  ? 'md:ml-auto md:max-w-prose md:text-left'
                  : 'md:mr-auto md:max-w-prose md:text-left'
              }`}
            >
              <span
                aria-hidden
                className="font-display block select-none text-7xl font-medium leading-none tracking-tight text-primary-200 md:text-8xl"
                style={{
                  fontFamily: 'var(--font-heading), Fraunces, serif',
                  fontVariationSettings: '"SOFT" 100, "WONK" 1',
                  opacity: 0.5,
                }}
              >
                {item.n}
              </span>

              <h3 className="mt-6 font-heading text-2xl font-semibold text-charcoal-900 md:text-3xl">
                {item.title}
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-charcoal-700">{item.desc}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
