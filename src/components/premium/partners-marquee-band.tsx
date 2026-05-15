interface Partner {
  name: string
  initials: string
  color: string
}

interface PartnersMarqueeBandProps {
  partners: readonly Partner[]
  label?: string
  className?: string
}

export function PartnersMarqueeBand({
  partners,
  label = 'Partenaires assureurs',
  className = '',
}: PartnersMarqueeBandProps) {
  const doubled = [...partners, ...partners]

  return (
    <section
      aria-label={label}
      className={`relative overflow-hidden border-y border-sand-300 bg-sand-50 py-8 ${className}`}
    >
      <div className="mb-4 text-center">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500">
          {label} · ORIAS · ACPR · CSCA
        </p>
      </div>

      <div
        className="marquee-track flex gap-12"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {doubled.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-full border border-sand-300 bg-white px-5 py-2.5 transition-all duration-200 hover:border-sand-500 hover:shadow-soft"
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
