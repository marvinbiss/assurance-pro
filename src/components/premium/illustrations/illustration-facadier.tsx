import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationFacadier({
  className = '',
  accent = 'primary',
  ariaLabel,
}: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <rect x="40" y="50" width="90" height="110" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="55" y1="80" x2="115" y2="80" stroke={BASE_STROKE} />
      <line x1="55" y1="110" x2="115" y2="110" stroke={BASE_STROKE} />
      <line x1="55" y1="140" x2="115" y2="140" stroke={BASE_STROKE} />
      <path
        d="M 140 100 L 170 70 L 175 75 L 145 105 Z"
        fill={SAND_FILL}
        stroke={ACCENT_STROKE[accent]}
      />
      <line x1="145" y1="105" x2="160" y2="120" stroke={ACCENT_STROKE[accent]} />
    </svg>
  )
}
