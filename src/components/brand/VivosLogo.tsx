/**
 * Logo Vivos — SVG inline custom.
 *
 * Symbolique :
 *   - "V" stylisé avec coupe gradient terracotta → gold (brand)
 *   - Arc protecteur en haut (signal "courtier qui protège")
 *   - Point/séparateur après le nom (typo brand identifier)
 *
 * Usage :
 *   <VivosLogo size="md" variant="dark" />
 *   <VivosLogo size="lg" variant="light" />
 */

interface VivosLogoProps {
  /** Taille du logo (S/M/L/XL) */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Variant couleur : dark (sur fond clair) ou light (sur fond foncé) */
  variant?: 'dark' | 'light'
  /** Inclure le wordmark "Vivos." à côté du symbole */
  showWordmark?: boolean
  /** Classes additionnelles wrapper */
  className?: string
}

const SIZES = {
  sm: { mark: 28, text: 'text-base' },
  md: { mark: 36, text: 'text-xl' },
  lg: { mark: 48, text: 'text-2xl' },
  xl: { mark: 64, text: 'text-3xl' },
} as const

export function VivosLogo({
  size = 'md',
  variant = 'dark',
  showWordmark = true,
  className = '',
}: VivosLogoProps) {
  const { mark, text } = SIZES[size]
  const textColor = variant === 'dark' ? 'text-charcoal-900' : 'text-white'
  const accentColor = variant === 'dark' ? 'text-primary-600' : 'text-primary-400'

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <VivosMark size={mark} />
      {showWordmark && (
        <span className={`font-heading font-extrabold tracking-tight ${textColor} ${text}`}>
          Vivos<span className={accentColor}>.</span>
        </span>
      )}
    </div>
  )
}

/**
 * VivosMark — Symbole pur (sans wordmark).
 * V stylisé avec arc protecteur + gradient brand.
 */
function VivosMark({ size = 36 }: { size?: number }) {
  const uid = 'vivos-grad'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vivos"
      role="img"
      className="drop-shadow-sm"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E86B4B" />
          <stop offset="50%" stopColor="#D4553A" />
          <stop offset="100%" stopColor="#A33E22" />
        </linearGradient>
        <linearGradient id={`${uid}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2b523" />
          <stop offset="100%" stopColor="#e8960a" />
        </linearGradient>
        <linearGradient id={`${uid}-v`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.92" />
        </linearGradient>
      </defs>

      {/* Background carré arrondi gradient */}
      <rect width="64" height="64" rx="14" fill={`url(#${uid}-bg)`} />

      {/* Arc protecteur (signal courtage) — quart d'ellipse en haut */}
      <path
        d="M 12 20 Q 32 8, 52 20"
        stroke={`url(#${uid}-accent)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* V stylisé — deux trapezes formant le V */}
      <path d="M 18 24 L 32 50 L 46 24 L 41 24 L 32 41 L 23 24 Z" fill={`url(#${uid}-v)`} />

      {/* Point d'accent gold (signature brand) */}
      <circle cx="32" cy="55" r="2.2" fill={`url(#${uid}-accent)`} />
    </svg>
  )
}

/**
 * Export utilitaire : juste le mark sans wordmark.
 */
export { VivosMark }
