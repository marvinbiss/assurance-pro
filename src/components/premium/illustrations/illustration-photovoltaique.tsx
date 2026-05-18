import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationPhotovoltaique({
  className = '',
  accent = 'honey',
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
      <circle cx="55" cy="55" r="14" fill={SAND_FILL} stroke={ACCENT_STROKE[accent]} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 55 + Math.cos(rad) * 20
        const y1 = 55 + Math.sin(rad) * 20
        const x2 = 55 + Math.cos(rad) * 28
        const y2 = 55 + Math.sin(rad) * 28
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT_STROKE[accent]} />
      })}
      <path d="M 100 110 L 170 110 L 155 165 L 85 165 Z" fill={SAND_FILL} stroke={BASE_STROKE} />
      <line x1="105" y1="128" x2="160" y2="128" stroke={BASE_STROKE} />
      <line x1="100" y1="146" x2="158" y2="146" stroke={BASE_STROKE} />
      <line x1="123" y1="110" x2="115" y2="165" stroke={BASE_STROKE} />
      <line x1="145" y1="110" x2="140" y2="165" stroke={BASE_STROKE} />
    </svg>
  )
}
