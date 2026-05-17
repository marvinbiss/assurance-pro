/**
 * TransparencyWidget — où va votre cotisation ? (style Lemonade Giveback).
 * Donut SVG + breakdown legend.
 * Pédagogie + signal trust : assureur (87%) + frais gestion (8%) + courtage (5%, 0€ client).
 */

const ALLOCATIONS = [
  { label: 'Sinistres + provisions assureur', pct: 87, color: '#2B4D85' },
  { label: 'Frais de gestion compagnie', pct: 8, color: '#B8975A' },
  { label: 'Courtage Vivos (rémunéré par l’assureur)', pct: 5, color: '#3D8B68' },
] as const

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export function TransparencyWidget() {
  let cursor = 0
  const arcs = ALLOCATIONS.map((a) => {
    const start = (cursor / 100) * 360
    cursor += a.pct
    const end = (cursor / 100) * 360
    return { ...a, d: describeArc(120, 120, 96, start, end) }
  })

  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex justify-center">
            <svg viewBox="0 0 240 240" width="280" height="280" aria-hidden="true">
              <circle cx="120" cy="120" r="96" fill="none" stroke="#F4EFE8" strokeWidth="28" />
              {arcs.map((a) => (
                <path
                  key={a.label}
                  d={a.d}
                  fill="none"
                  stroke={a.color}
                  strokeWidth="28"
                  strokeLinecap="butt"
                />
              ))}
              <text
                x="120"
                y="124"
                textAnchor="middle"
                fontFamily="Fraunces, Georgia, serif"
                fontSize="32"
                fontWeight="700"
                fill="#1c1917"
              >
                100 €
              </text>
              <text
                x="120"
                y="148"
                textAnchor="middle"
                fontFamily="Sora, sans-serif"
                fontSize="11"
                fontWeight="700"
                fill="#7d6a5c"
                letterSpacing="1.5"
              >
                DE COTISATION
              </text>
            </svg>
          </div>

          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-accent-800">
              Transparence intégrale
            </span>
            <h2 className="mb-5 font-display-premium font-heading text-3xl font-extrabold leading-tight tracking-tight text-charcoal-900 md:text-4xl">
              Où vont vos 100 € de cotisation ?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-charcoal-700 md:text-lg">
              Aucune zone d&apos;ombre. Nous publions la répartition réelle d&apos;une cotisation
              type pour que vous sachiez exactement à quoi sert chaque euro.
            </p>
            <ul className="space-y-4">
              {ALLOCATIONS.map((a) => (
                <li key={a.label} className="flex items-start gap-4">
                  <span
                    className="mt-1 inline-block h-4 w-4 flex-shrink-0 rounded-sm"
                    style={{ background: a.color }}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="m-0 font-heading text-base font-extrabold text-charcoal-900">
                        {a.label}
                      </p>
                      <span className="font-display-premium text-2xl font-extrabold tabular-nums text-charcoal-900">
                        {a.pct} %
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl border border-accent-200 bg-accent-50/40 p-4 text-sm leading-relaxed text-charcoal-700">
              <strong className="text-charcoal-900">À retenir :</strong> notre rémunération courtage
              (5 %) est payée par l&apos;assureur, jamais par vous. Vous payez le même tarif
              qu&apos;en direct — avec un courtier en plus.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
