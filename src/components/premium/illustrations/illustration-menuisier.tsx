import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationMenuisier({
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
      {/* Plank (perspective) */}
      <rect x="20" y="124" width="160" height="32" fill={SAND_FILL} stroke={BASE_STROKE} />
      <path d="M20 124 L30 116 L190 116 L180 124" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="180" y1="124" x2="190" y2="116" stroke={BASE_STROKE} />
      <path d="M40 134 Q90 132 140 136 T180 138" stroke={BASE_STROKE} opacity="0.5" />
      <path d="M40 146 Q90 148 140 144" stroke={BASE_STROKE} opacity="0.5" />
      {/* Plane (rabot) body */}
      <path
        d="M50 60 L140 60 Q150 60 150 70 L150 90 Q150 100 140 100 L50 100 Q40 100 40 90 L40 70 Q40 60 50 60 Z"
        fill={SAND_FILL}
        stroke={BASE_STROKE}
        strokeWidth={2}
      />
      {/* Plane front knob */}
      <circle cx="58" cy="68" r="6" fill="white" stroke={BASE_STROKE} />
      {/* Plane handle */}
      <path
        d="M118 60 Q132 50 134 40 Q134 36 130 36 Q124 36 122 44 L118 60 Z"
        fill={SAND_FILL}
        stroke={BASE_STROKE}
      />
      {/* Plane blade */}
      <path d="M76 76 L114 76 L110 96 L80 96 Z" fill="white" stroke={accentColor} strokeWidth={2} />
      <line x1="80" y1="86" x2="110" y2="86" stroke={accentColor} />
      {/* Wood shaving curl */}
      <path
        d="M150 100 Q170 96 178 110 Q170 116 162 112 Q170 120 174 130"
        stroke={accentColor}
        strokeWidth={2}
        fill="none"
      />
    </svg>
  )
}
