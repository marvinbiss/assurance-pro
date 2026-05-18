import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationAvocat({
  className = '',
  accent = 'honey',
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
      <line x1="100" y1="40" x2="100" y2="160" stroke={BASE_STROKE} />
      <circle cx="100" cy="40" r="5" fill={ACCENT_STROKE[accent]} />
      <line x1="60" y1="70" x2="140" y2="70" stroke={BASE_STROKE} />
      <path d="M 60 70 L 45 110 L 75 110 Z" fill={SAND_FILL} stroke={BASE_STROKE} />
      <path d="M 140 70 L 125 110 L 155 110 Z" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="40" y1="160" x2="160" y2="160" stroke={BASE_STROKE} strokeWidth={2} />
      <rect x="80" y="135" width="40" height="25" stroke={BASE_STROKE} fill={SAND_FILL} />
    </svg>
  )
}
