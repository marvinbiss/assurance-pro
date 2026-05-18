import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationFormateur({
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
      <rect x="35" y="50" width="130" height="85" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="55" y1="75" x2="120" y2="75" stroke={ACCENT_STROKE[accent]} />
      <line x1="55" y1="90" x2="110" y2="90" stroke={BASE_STROKE} />
      <line x1="55" y1="105" x2="130" y2="105" stroke={BASE_STROKE} />
      <line x1="55" y1="120" x2="100" y2="120" stroke={BASE_STROKE} />
      <line x1="100" y1="135" x2="100" y2="155" stroke={BASE_STROKE} />
      <ellipse cx="100" cy="160" rx="35" ry="6" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect
        x="155"
        y="120"
        width="14"
        height="4"
        rx="2"
        stroke={ACCENT_STROKE[accent]}
        fill={SAND_FILL}
      />
    </svg>
  )
}
