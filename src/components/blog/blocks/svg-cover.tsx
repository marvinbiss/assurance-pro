/**
 * Custom SVG cover illustrations per category.
 * Zero external image deps. Geometric premium aesthetic.
 * Deterministic variation per slug via hash → variant index.
 */

export interface SvgCoverProps {
  category: string
  slug: string
  className?: string
}

function hashSlug(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

interface Palette {
  bg: string
  fg: string
  accent: string
  highlight: string
}

const PALETTES: Record<string, Palette> = {
  btp: { bg: '#060F20', fg: '#2B4D85', accent: '#5071A1', highlight: '#D7DFEC' },
  'rc-pro': { bg: '#0E2040', fg: '#B8975A', accent: '#DCC067', highlight: '#F5EDD0' },
  cyber: { bg: '#0A0E1A', fg: '#3D8B68', accent: '#55A882', highlight: '#A8D8C0' },
  'mutuelle-tns': { bg: '#142C55', fg: '#B8975A', accent: '#DCC067', highlight: '#F5EDD0' },
  reglementation: { bg: '#0E2040', fg: '#5071A1', accent: '#7E96BD', highlight: '#D7DFEC' },
  sinistre: { bg: '#0E2040', fg: '#2B4D85', accent: '#5071A1', highlight: '#D7DFEC' },
  default: { bg: '#060F20', fg: '#2B4D85', accent: '#B8975A', highlight: '#D7DFEC' },
}

const DEFAULT_PALETTE = PALETTES.default as Palette

function paletteFor(category: string): Palette {
  const key = category.toLowerCase().replace(/\s+/g, '-')
  return PALETTES[key] ?? DEFAULT_PALETTE
}

type Variant = 0 | 1 | 2 | 3 | 4

interface CoverGeometryProps {
  variant: Variant
  p: Palette
}

function CoverGeometry({ variant, p }: CoverGeometryProps) {
  switch (variant) {
    case 0:
      return (
        <g>
          <circle cx="320" cy="180" r="180" fill={p.fg} opacity="0.85" />
          <circle cx="520" cy="320" r="140" fill={p.accent} opacity="0.6" />
          <circle cx="200" cy="400" r="80" fill={p.highlight} opacity="0.35" />
        </g>
      )
    case 1:
      return (
        <g>
          <rect
            x="60"
            y="80"
            width="280"
            height="280"
            rx="32"
            fill={p.fg}
            opacity="0.85"
            transform="rotate(-12 200 220)"
          />
          <rect
            x="380"
            y="220"
            width="220"
            height="220"
            rx="28"
            fill={p.accent}
            opacity="0.7"
            transform="rotate(8 490 330)"
          />
          <circle cx="600" cy="120" r="60" fill={p.highlight} opacity="0.5" />
        </g>
      )
    case 2:
      return (
        <g>
          <polygon points="100,80 300,40 480,180 380,360 140,340" fill={p.fg} opacity="0.85" />
          <polygon points="420,200 620,160 700,360 540,420" fill={p.accent} opacity="0.65" />
          <circle cx="200" cy="420" r="50" fill={p.highlight} opacity="0.45" />
        </g>
      )
    case 3:
      return (
        <g>
          <path
            d="M 0 280 Q 200 120 400 280 T 800 280 L 800 450 L 0 450 Z"
            fill={p.fg}
            opacity="0.85"
          />
          <path
            d="M 0 360 Q 200 240 400 360 T 800 360 L 800 450 L 0 450 Z"
            fill={p.accent}
            opacity="0.7"
          />
          <circle cx="640" cy="140" r="80" fill={p.highlight} opacity="0.4" />
          <circle cx="160" cy="120" r="40" fill={p.highlight} opacity="0.3" />
        </g>
      )
    case 4:
      return (
        <g>
          <line x1="0" y1="100" x2="800" y2="100" stroke={p.fg} strokeWidth="3" opacity="0.3" />
          <line x1="0" y1="200" x2="800" y2="200" stroke={p.fg} strokeWidth="3" opacity="0.3" />
          <line x1="0" y1="300" x2="800" y2="300" stroke={p.fg} strokeWidth="3" opacity="0.3" />
          <line x1="0" y1="400" x2="800" y2="400" stroke={p.fg} strokeWidth="3" opacity="0.3" />
          <circle cx="240" cy="200" r="100" fill={p.fg} opacity="0.85" />
          <rect x="420" y="180" width="180" height="180" rx="24" fill={p.accent} opacity="0.7" />
          <circle cx="640" cy="120" r="48" fill={p.highlight} opacity="0.5" />
        </g>
      )
  }
}

export function SvgCover({ category, slug, className }: SvgCoverProps) {
  const p = paletteFor(category)
  const variant = (hashSlug(slug) % 5) as Variant
  const noiseId = `noise-${slug.replace(/[^a-z0-9]/gi, '')}`
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Illustration ${category}`}
      className={className ?? 'h-full w-full'}
    >
      <defs>
        <filter id={noiseId} x="0" y="0">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={hashSlug(slug) % 100}
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
        </filter>
        <linearGradient id={`grad-${noiseId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.fg} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill={`url(#grad-${noiseId})`} />
      <CoverGeometry variant={variant} p={p} />
      <rect width="800" height="450" filter={`url(#${noiseId})`} />
    </svg>
  )
}
