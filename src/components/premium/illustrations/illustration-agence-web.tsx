import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationAgenceWeb({
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
      strokeWidth={2}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <rect x="35" y="50" width="130" height="90" rx="4" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="35" y1="68" x2="165" y2="68" stroke={BASE_STROKE} />
      <circle cx="46" cy="59" r="2" fill={BASE_STROKE} />
      <circle cx="55" cy="59" r="2" fill={BASE_STROKE} />
      <rect x="50" y="80" width="50" height="40" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect x="108" y="80" width="50" height="15" stroke={BASE_STROKE} />
      <rect x="108" y="103" width="50" height="17" stroke={BASE_STROKE} />
      <path d="M 120 145 L 130 155 L 138 145" stroke={ACCENT_STROKE[accent]} />
      <line x1="130" y1="140" x2="130" y2="160" stroke={ACCENT_STROKE[accent]} />
    </svg>
  )
}
