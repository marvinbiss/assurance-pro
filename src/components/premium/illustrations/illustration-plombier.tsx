import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationPlombier({
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
      {/* Pipe U-bend */}
      <path
        d="M44 60 L44 100 Q44 130 74 130 L126 130 Q156 130 156 100 L156 60"
        stroke={BASE_STROKE}
        strokeWidth={6}
        fill="none"
      />
      <path
        d="M44 60 L44 100 Q44 130 74 130 L126 130 Q156 130 156 100 L156 60"
        stroke={SAND_FILL}
        strokeWidth={3}
        fill="none"
      />
      {/* Flanges */}
      <rect x="34" y="52" width="20" height="10" fill={SAND_FILL} stroke={BASE_STROKE} />
      <rect x="146" y="52" width="20" height="10" fill={SAND_FILL} stroke={BASE_STROKE} />
      {/* Water drop */}
      <path d="M100 150 Q92 162 100 172 Q108 162 100 150 Z" fill={SAND_FILL} stroke={accentColor} />
      {/* Wrench */}
      <line x1="60" y1="34" x2="92" y2="66" stroke={accentColor} strokeWidth={2.5} />
      <path
        d="M56 30 Q44 30 44 42 Q44 50 52 52 L60 44 L68 52 Q72 48 70 40 Q66 30 56 30 Z"
        fill={SAND_FILL}
        stroke={accentColor}
        strokeWidth={2}
      />
    </svg>
  )
}
