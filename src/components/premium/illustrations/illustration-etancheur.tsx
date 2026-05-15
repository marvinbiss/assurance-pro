import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationEtancheur({
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
      <ellipse cx="70" cy="120" rx="35" ry="14" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect x="60" y="100" width="20" height="22" stroke={BASE_STROKE} />
      <line x1="80" y1="105" x2="135" y2="80" stroke={BASE_STROKE} />
      <path
        d="M 135 80 L 145 70 L 160 85 L 150 95 Z"
        fill={SAND_FILL}
        stroke={ACCENT_STROKE[accent]}
      />
      <line x1="145" y1="90" x2="155" y2="100" stroke={ACCENT_STROKE[accent]} />
    </svg>
  )
}
