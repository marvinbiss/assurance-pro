import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationMedecin({
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
      strokeWidth={2}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <circle cx="65" cy="80" r="10" fill={SAND_FILL} stroke={BASE_STROKE} />
      <circle cx="95" cy="80" r="10" fill={SAND_FILL} stroke={BASE_STROKE} />
      <path d="M 65 90 L 65 120 Q 65 140 80 140 Q 95 140 95 120 L 95 90" stroke={BASE_STROKE} />
      <line x1="80" y1="140" x2="80" y2="155" stroke={BASE_STROKE} />
      <circle cx="80" cy="162" r="7" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect x="130" y="60" width="40" height="80" rx="4" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="150" y1="80" x2="150" y2="120" stroke={ACCENT_STROKE[accent]} strokeWidth={3} />
      <line x1="138" y1="100" x2="162" y2="100" stroke={ACCENT_STROKE[accent]} strokeWidth={3} />
    </svg>
  )
}
