import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationElectricien({
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
      {/* Multimeter body */}
      <rect x="48" y="80" width="80" height="92" rx="6" fill={SAND_FILL} stroke={BASE_STROKE} />
      {/* Screen */}
      <rect x="58" y="92" width="60" height="26" fill="white" stroke={BASE_STROKE} />
      <text
        x="88"
        y="111"
        fontSize="14"
        fontFamily="monospace"
        fill={accentColor}
        textAnchor="middle"
      >
        220V
      </text>
      {/* Dial */}
      <circle cx="88" cy="142" r="14" fill="white" stroke={BASE_STROKE} />
      <line x1="88" y1="142" x2="98" y2="134" stroke={accentColor} strokeWidth={2} />
      {/* Buttons */}
      <circle cx="64" cy="162" r="3" fill="white" stroke={BASE_STROKE} />
      <circle cx="76" cy="162" r="3" fill="white" stroke={BASE_STROKE} />
      <circle cx="100" cy="162" r="3" fill="white" stroke={BASE_STROKE} />
      <circle cx="112" cy="162" r="3" fill="white" stroke={BASE_STROKE} />
      {/* Probe wires */}
      <path d="M58 80 Q60 50 90 36" stroke={accentColor} strokeWidth={2.4} fill="none" />
      <path d="M118 80 Q140 50 156 30" stroke={BASE_STROKE} strokeWidth={2.4} fill="none" />
      {/* Probe tips */}
      <line x1="86" y1="32" x2="94" y2="40" stroke={accentColor} strokeWidth={3} />
      <line x1="152" y1="26" x2="160" y2="34" stroke={BASE_STROKE} strokeWidth={3} />
      {/* Lightning bolt accent */}
      <path
        d="M150 80 L142 100 L150 100 L144 118"
        stroke={accentColor}
        strokeWidth={2}
        fill="none"
      />
    </svg>
  )
}
