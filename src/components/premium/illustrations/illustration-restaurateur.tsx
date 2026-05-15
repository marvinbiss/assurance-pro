import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationRestaurateur({
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
      <circle cx="100" cy="105" r="48" fill={SAND_FILL} stroke={BASE_STROKE} />
      <circle cx="100" cy="105" r="36" stroke={BASE_STROKE} />
      <line x1="55" y1="50" x2="55" y2="105" stroke={BASE_STROKE} />
      <path d="M 50 50 L 50 75 L 60 75 L 60 50" stroke={BASE_STROKE} />
      <line x1="145" y1="50" x2="145" y2="105" stroke={ACCENT_STROKE[accent]} strokeWidth={2.5} />
      <ellipse cx="145" cy="55" rx="6" ry="11" fill={SAND_FILL} stroke={ACCENT_STROKE[accent]} />
    </svg>
  )
}
