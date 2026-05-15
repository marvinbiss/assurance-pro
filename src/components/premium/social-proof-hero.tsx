interface SocialProofStat {
  value: string
  label: string
}

interface SocialProofHeroProps {
  stats: readonly SocialProofStat[]
  className?: string
}

export function SocialProofHero({ stats, className = '' }: SocialProofHeroProps) {
  // Cap at 4 stats as per spec
  const items = stats.slice(0, 4)

  return (
    <div
      role="list"
      aria-label="Indicateurs de confiance"
      className={`grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:flex-row md:items-center md:gap-0 ${className}`}
    >
      {items.map((stat, i) => (
        <div
          key={`${stat.label}-${i}`}
          role="listitem"
          className={`flex flex-col md:flex-1 md:px-6 md:text-center ${
            i > 0 ? 'md:border-l md:border-sand-400' : ''
          }`}
        >
          <span
            className="font-display text-4xl font-medium tabular-nums leading-none tracking-tight text-charcoal-900 md:text-4xl"
            style={{
              fontFamily: 'var(--font-heading), Fraunces, serif',
              fontVariationSettings: '"SOFT" 100, "WONK" 1',
            }}
          >
            {stat.value}
          </span>
          <span className="mt-2 font-heading text-xs font-medium uppercase tracking-wider text-charcoal-500">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
