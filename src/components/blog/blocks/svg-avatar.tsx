/**
 * Deterministic SVG avatar — initiale + gradient + pattern par hash.
 * Remplace les Image avatar placeholders.
 */

export interface SvgAvatarProps {
  name: string
  size?: number
  className?: string
}

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

const GRADIENTS: Array<[string, string]> = [
  ['#2B4D85', '#142C55'], // navy
  ['#B8975A', '#7E6638'], // antique gold
  ['#3D8B68', '#2A6650'], // forest
  ['#5071A1', '#1B3A6D'], // navy lighter
  ['#9C7F48', '#534327'], // gold deep
  ['#0F766E', '#0A5450'], // teal
]

export function SvgAvatar({ name, size = 96, className }: SvgAvatarProps) {
  const seed = hash(name)
  const grad = GRADIENTS[seed % GRADIENTS.length] as [string, string]
  const initial = name.charAt(0).toUpperCase()
  const id = `av-${seed.toString(36)}`
  return (
    <svg
      viewBox="0 0 96 96"
      width={size}
      height={size}
      role="img"
      aria-label={`Avatar ${name}`}
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={grad[0]} />
          <stop offset="100%" stopColor={grad[1]} />
        </linearGradient>
        <pattern id={`${id}-p`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="0.8" fill="white" opacity="0.18" />
        </pattern>
      </defs>
      <circle cx="48" cy="48" r="48" fill={`url(#${id}-g)`} />
      <circle cx="48" cy="48" r="48" fill={`url(#${id}-p)`} />
      <text
        x="48"
        y="64"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="44"
        fontWeight="700"
        fill="white"
      >
        {initial}
      </text>
    </svg>
  )
}
