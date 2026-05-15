import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationFreelanceIt({
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
      <rect x="35" y="55" width="130" height="90" rx="6" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="35" y1="75" x2="165" y2="75" stroke={BASE_STROKE} />
      <circle cx="46" cy="65" r="2" fill={BASE_STROKE} />
      <circle cx="55" cy="65" r="2" fill={BASE_STROKE} />
      <circle cx="64" cy="65" r="2" fill={BASE_STROKE} />
      <path d="M 60 95 L 50 115 L 60 135" stroke={ACCENT_STROKE[accent]} />
      <path d="M 140 95 L 150 115 L 140 135" stroke={ACCENT_STROKE[accent]} />
      <line x1="85" y1="100" x2="115" y2="130" stroke={ACCENT_STROKE[accent]} />
    </svg>
  )
}
