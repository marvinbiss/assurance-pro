import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationMacon({
  className = '',
  accent = 'primary',
  ariaLabel,
}: IllustrationProps) {
  const accentColor = ACCENT_STROKE[accent]
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      {/* Brick stack */}
      <rect x="38" y="118" width="64" height="20" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect x="50" y="138" width="64" height="20" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect x="38" y="158" width="64" height="20" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="70" y1="118" x2="70" y2="138" stroke={BASE_STROKE} />
      <line x1="82" y1="138" x2="82" y2="158" stroke={BASE_STROKE} />
      <line x1="70" y1="158" x2="70" y2="178" stroke={BASE_STROKE} />
      <line x1="44" y1="124" x2="54" y2="124" stroke={BASE_STROKE} />
      <line x1="56" y1="144" x2="68" y2="144" stroke={BASE_STROKE} />
      {/* Trowel */}
      <line x1="138" y1="42" x2="118" y2="62" stroke={BASE_STROKE} strokeWidth={2.5} />
      <line x1="142" y1="38" x2="148" y2="32" stroke={BASE_STROKE} strokeWidth={3} />
      <path d="M118 62 L98 92 L88 82 Z" fill={SAND_FILL} stroke={accentColor} strokeWidth={2} />
      <line x1="108" y1="72" x2="98" y2="82" stroke={accentColor} />
    </svg>
  )
}
