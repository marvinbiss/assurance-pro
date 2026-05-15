import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationPlaquiste({
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
      strokeWidth={1.5}
    >
      {/* BA13 board (perspective) */}
      <path
        d="M50 40 L170 40 L160 160 L40 160 Z"
        fill={SAND_FILL}
        stroke={BASE_STROKE}
        strokeWidth={2}
      />
      {/* Board edge thickness */}
      <path d="M170 40 L178 48 L168 168 L160 160 Z" fill="white" stroke={BASE_STROKE} />
      {/* Board paper face stripes */}
      <line x1="58" y1="64" x2="166" y2="64" stroke={BASE_STROKE} opacity="0.4" />
      <line x1="56" y1="100" x2="164" y2="100" stroke={BASE_STROKE} opacity="0.4" />
      <line x1="54" y1="136" x2="162" y2="136" stroke={BASE_STROKE} opacity="0.4" />
      {/* Screws */}
      <circle cx="68" cy="58" r="3" fill="white" stroke={accentColor} />
      <line x1="66" y1="58" x2="70" y2="58" stroke={accentColor} />
      <circle cx="146" cy="62" r="3" fill="white" stroke={accentColor} />
      <line x1="144" y1="62" x2="148" y2="62" stroke={accentColor} />
      <circle cx="78" cy="148" r="3" fill="white" stroke={accentColor} />
      <line x1="76" y1="148" x2="80" y2="148" stroke={accentColor} />
      {/* Wedge (cale) bottom right */}
      <path
        d="M120 170 L172 170 L172 184 L120 178 Z"
        fill={SAND_FILL}
        stroke={accentColor}
        strokeWidth={2}
      />
    </svg>
  )
}
