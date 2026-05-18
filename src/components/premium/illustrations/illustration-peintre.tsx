import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationPeintre({
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
      strokeWidth={2}
    >
      {/* Brush handle */}
      <line x1="30" y1="40" x2="80" y2="90" stroke={BASE_STROKE} strokeWidth={3} />
      {/* Brush ferrule */}
      <rect
        x="74"
        y="88"
        width="16"
        height="10"
        transform="rotate(45 82 93)"
        fill={SAND_FILL}
        stroke={BASE_STROKE}
      />
      {/* Brush bristles */}
      <path
        d="M88 102 L112 126 L102 136 L78 112 Z"
        fill={SAND_FILL}
        stroke={accentColor}
        strokeWidth={2}
      />
      <line x1="84" y1="108" x2="106" y2="130" stroke={accentColor} />
      <line x1="92" y1="100" x2="114" y2="122" stroke={accentColor} />
      {/* Paint stroke */}
      <path
        d="M100 144 Q130 136 156 152"
        stroke={accentColor}
        strokeWidth={4}
        fill="none"
        opacity="0.6"
      />
      {/* Roller frame */}
      <line x1="120" y1="40" x2="120" y2="70" stroke={BASE_STROKE} strokeWidth={2} />
      <path d="M120 70 L120 80 L160 80" stroke={BASE_STROKE} strokeWidth={2} fill="none" />
      {/* Roller */}
      <rect x="138" y="70" width="48" height="20" rx="4" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="146" y1="72" x2="146" y2="88" stroke={BASE_STROKE} />
      <line x1="160" y1="72" x2="160" y2="88" stroke={BASE_STROKE} />
      <line x1="174" y1="72" x2="174" y2="88" stroke={BASE_STROKE} />
    </svg>
  )
}
