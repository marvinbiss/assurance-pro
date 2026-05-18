import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationCouvreur({
  className = '',
  accent = 'primary',
  ariaLabel,
}: IllustrationProps) {
  const accentColor = ACCENT_STROKE[accent]
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      {/* Roof slope baseline */}
      <line x1="20" y1="170" x2="180" y2="100" stroke={BASE_STROKE} strokeWidth={2} />
      {/* Tile rows (terracotta-style arcs) */}
      {[0, 1, 2].map((row) => {
        const offsetY = row * 18
        const tiles = [0, 1, 2, 3, 4, 5]
        return (
          <g key={row}>
            {tiles.map((col) => {
              const cx = 40 + col * 22 + (row % 2 === 0 ? 0 : 11)
              const cy = 158 - row * 16 - offsetY * 0.2
              const offsetSlope = (cx - 20) * (-70 / 160)
              const ty = cy + offsetSlope
              return (
                <path
                  key={col}
                  d={`M${cx - 11} ${ty + 8} Q${cx} ${ty - 4} ${cx + 11} ${ty + 8}`}
                  fill={SAND_FILL}
                  stroke={row === 1 && col === 3 ? accentColor : BASE_STROKE}
                  strokeWidth={2}
                />
              )
            })}
          </g>
        )
      })}
      {/* Screwdriver */}
      <line x1="48" y1="40" x2="88" y2="80" stroke={BASE_STROKE} strokeWidth={2.4} />
      <rect
        x="32"
        y="24"
        width="22"
        height="14"
        rx="3"
        transform="rotate(45 43 31)"
        fill={SAND_FILL}
        stroke={accentColor}
        strokeWidth={2}
      />
      <line x1="86" y1="78" x2="94" y2="86" stroke={BASE_STROKE} strokeWidth={3} />
    </svg>
  )
}
