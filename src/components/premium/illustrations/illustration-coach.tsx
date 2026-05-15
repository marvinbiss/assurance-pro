import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationCoach({
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
      strokeWidth={1.5}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <circle cx="100" cy="100" r="55" fill={SAND_FILL} stroke={BASE_STROKE} />
      <circle cx="100" cy="100" r="38" stroke={BASE_STROKE} />
      <circle cx="100" cy="100" r="20" stroke={BASE_STROKE} />
      <circle cx="100" cy="100" r="6" fill={ACCENT_STROKE[accent]} />
      <line x1="40" y1="160" x2="100" y2="100" stroke={ACCENT_STROKE[accent]} strokeWidth={2} />
      <path d="M 100 100 L 90 105 L 95 95 Z" fill={ACCENT_STROKE[accent]} />
    </svg>
  )
}
