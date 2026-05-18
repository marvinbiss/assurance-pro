import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationPhotographe({
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
      <path
        d="M 70 70 L 80 60 L 120 60 L 130 70 L 165 70 L 165 145 L 35 145 L 35 70 Z"
        fill={SAND_FILL}
        stroke={BASE_STROKE}
      />
      <circle cx="100" cy="107" r="28" stroke={BASE_STROKE} />
      <circle cx="100" cy="107" r="18" stroke={ACCENT_STROKE[accent]} />
      <circle cx="148" cy="82" r="3" fill={ACCENT_STROKE[accent]} />
    </svg>
  )
}
