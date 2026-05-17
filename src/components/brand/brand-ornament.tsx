/**
 * BrandOrnament — séparateur SVG signature Vivos.
 * Em-dash central + arc protecteur + dot honey accent.
 * Réutilisable: dividers sections, footer hero, between articles connexes.
 */

export interface BrandOrnamentProps {
  variant?: 'horizontal' | 'minimal' | 'arc'
  className?: string
  color?: string
}

export function BrandOrnament({
  variant = 'horizontal',
  className,
  color = 'currentColor',
}: BrandOrnamentProps) {
  if (variant === 'minimal') {
    return (
      <svg
        viewBox="0 0 80 12"
        width="80"
        height="12"
        aria-hidden="true"
        className={className ?? 'text-primary-400'}
      >
        <circle cx="6" cy="6" r="2" fill={color} />
        <line x1="14" y1="6" x2="66" y2="6" stroke={color} strokeWidth="1" />
        <circle cx="74" cy="6" r="2" fill={color} />
      </svg>
    )
  }
  if (variant === 'arc') {
    return (
      <svg
        viewBox="0 0 120 24"
        width="120"
        height="24"
        aria-hidden="true"
        className={className ?? 'text-primary-500'}
      >
        <path
          d="M 8 18 Q 60 4, 112 18"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="60" cy="9" r="2.4" fill="#f2b523" />
      </svg>
    )
  }
  // horizontal: em-dash central + dot honey + arcs latéraux
  return (
    <svg
      viewBox="0 0 200 20"
      width="200"
      height="20"
      aria-hidden="true"
      className={className ?? 'text-primary-400'}
    >
      <line x1="8" y1="10" x2="78" y2="10" stroke={color} strokeWidth="1" />
      <circle cx="88" cy="10" r="1.5" fill={color} opacity="0.6" />
      <circle cx="100" cy="10" r="3" fill="#f2b523" />
      <circle cx="112" cy="10" r="1.5" fill={color} opacity="0.6" />
      <line x1="122" y1="10" x2="192" y2="10" stroke={color} strokeWidth="1" />
    </svg>
  )
}
