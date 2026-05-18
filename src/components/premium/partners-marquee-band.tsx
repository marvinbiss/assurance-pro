interface Partner {
  name: string
  initials: string
  color: string
}

interface PartnersMarqueeBandProps {
  partners: readonly Partner[]
  label?: string
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
}

const DURATIONS = { slow: '60s', normal: '40s', fast: '25s' } as const

export function PartnersMarqueeBand({
  partners,
  label = 'Partenaires assureurs',
  className = '',
  speed = 'normal',
}: PartnersMarqueeBandProps) {
  const doubled = [...partners, ...partners]
  const duration = DURATIONS[speed]

  return (
    <section
      aria-label={label}
      className={`group/marquee relative overflow-hidden border-y border-sand-300 bg-sand-50 py-8 dark:bg-charcoal-900 ${className}`}
    >
      <div className="mb-4 text-center">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500">
          {label} · ORIAS · ACPR · CSCA
        </p>
      </div>

      <div
        className="marquee-track flex gap-12 group-hover/marquee:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration} linear infinite`, animationPlayState: 'running' }}
      >
        {doubled.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-full border border-sand-300 bg-white px-5 py-2.5 transition-[border-color,box-shadow,transform] duration-200 ease-enter hover:-translate-y-0.5 hover:border-sand-500 hover:shadow-soft"
            style={{ borderLeftColor: p.color, borderLeftWidth: 3 }}
          >
            <span
              className="font-heading text-base font-bold leading-none"
              style={{ color: p.color }}
            >
              {p.initials}
            </span>
            <span className="font-heading text-sm font-semibold text-charcoal-700">{p.name}</span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sand-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sand-50 to-transparent" />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
