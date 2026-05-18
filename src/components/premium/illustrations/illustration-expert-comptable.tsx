import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationExpertComptable({
  className = '',
  accent = 'forest',
  ariaLabel,
}: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <rect x="50" y="40" width="60" height="120" rx="4" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect x="58" y="50" width="44" height="14" stroke={BASE_STROKE} />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          {[0, 1, 2, 3].map((col) => (
            <circle key={col} cx={64 + col * 11} cy={80 + row * 16} r="3" stroke={BASE_STROKE} />
          ))}
        </g>
      ))}
      <path d="M 130 70 L 150 70 L 150 150 L 130 150 Z" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="135" y1="85" x2="145" y2="85" stroke={ACCENT_STROKE[accent]} />
      <line x1="135" y1="100" x2="145" y2="100" stroke={ACCENT_STROKE[accent]} />
      <line x1="135" y1="115" x2="145" y2="115" stroke={ACCENT_STROKE[accent]} />
      <line x1="135" y1="130" x2="145" y2="130" stroke={ACCENT_STROKE[accent]} />
    </svg>
  )
}
