import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationConsultant({
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
      <rect x="40" y="80" width="100" height="65" rx="4" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="40" y1="135" x2="140" y2="135" stroke={BASE_STROKE} />
      <line x1="30" y1="150" x2="150" y2="150" stroke={BASE_STROKE} />
      <line x1="55" y1="95" x2="80" y2="95" stroke={ACCENT_STROKE[accent]} />
      <line x1="55" y1="105" x2="120" y2="105" stroke={BASE_STROKE} />
      <line x1="55" y1="115" x2="100" y2="115" stroke={BASE_STROKE} />
      <path
        d="M 155 110 L 175 110 L 175 75 L 165 65 L 155 75 Z"
        fill={SAND_FILL}
        stroke={BASE_STROKE}
      />
      <circle cx="165" cy="68" r="3" fill={ACCENT_STROKE[accent]} />
    </svg>
  )
}
