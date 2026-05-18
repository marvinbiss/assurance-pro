import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationCharpentier({
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
      {/* Plank */}
      <rect x="20" y="130" width="160" height="28" fill={SAND_FILL} stroke={BASE_STROKE} />
      {/* Wood grain */}
      <path d="M30 140 Q60 138 90 142 T180 140" stroke={BASE_STROKE} />
      <path d="M30 150 Q70 152 110 148 T180 152" stroke={BASE_STROKE} />
      <ellipse cx="60" cy="144" rx="4" ry="2" stroke={BASE_STROKE} fill="none" />
      <ellipse cx="140" cy="146" rx="3" ry="1.5" stroke={BASE_STROKE} fill="none" />
      {/* Handsaw handle */}
      <path
        d="M40 50 Q34 50 32 56 L32 72 Q32 82 42 82 L56 82 L56 60 Q56 50 50 50 Z"
        fill={SAND_FILL}
        stroke={BASE_STROKE}
      />
      <circle cx="44" cy="66" r="4" fill="white" stroke={BASE_STROKE} />
      {/* Saw blade */}
      <path d="M56 70 L168 96 L168 102 L56 78 Z" fill={SAND_FILL} stroke={accentColor} />
      {/* Saw teeth */}
      <path
        d="M60 78 L62 84 L66 78 L68 84 L72 78 L74 84 L78 78 L80 84 L84 78 L86 84 L90 78 L92 84 L96 78 L98 84 L102 78 L104 84 L108 78 L110 84 L114 78 L116 84 L120 78 L122 84 L126 78 L128 84 L132 78 L134 84 L138 78 L140 84 L144 78 L146 84 L150 78 L152 84 L156 78 L158 84 L162 78"
        stroke={accentColor}
        fill="none"
        strokeWidth={1.2}
      />
    </svg>
  )
}
