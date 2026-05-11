import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const SIZE = { width: 1200, height: 630 }

const CATEGORY_PALETTE: Record<string, { bg: string; accent: string; label: string }> = {
  pilier: {
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
    accent: '#fbbf24',
    label: 'GUIDE',
  },
  prix: {
    bg: 'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
    accent: '#fef08a',
    label: 'TARIFS',
  },
  devis: {
    bg: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
    accent: '#fed7aa',
    label: 'DEVIS',
  },
  attestation: {
    bg: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)',
    accent: '#f3e8ff',
    label: 'ATTESTATION',
  },
  souscription: {
    bg: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 100%)',
    accent: '#cffafe',
    label: 'EN LIGNE',
  },
  comparateur: {
    bg: 'linear-gradient(135deg, #581c87 0%, #c026d3 100%)',
    accent: '#fae8ff',
    label: 'COMPARATEUR',
  },
  courtier: {
    bg: 'linear-gradient(135deg, #831843 0%, #db2777 100%)',
    accent: '#fce7f3',
    label: 'COURTIER',
  },
  default: {
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
    accent: '#fbbf24',
    label: 'ASSURANCE PRO',
  },
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max - 1).trimEnd() + '…'
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = truncate(searchParams.get('title')?.trim() || 'Assurance Professionnelle', 90)
  const subtitle = truncate(searchParams.get('subtitle')?.trim() || '', 120)
  const categoryKey = (searchParams.get('category')?.trim().toLowerCase() ||
    'default') as keyof typeof CATEGORY_PALETTE
  const price = searchParams.get('price')?.trim() || ''
  const palette = CATEGORY_PALETTE[categoryKey] ?? CATEGORY_PALETTE.default!

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: palette.bg,
        color: 'white',
        fontFamily: 'sans-serif',
        padding: '70px 80px',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 22,
            opacity: 0.9,
            letterSpacing: 1.2,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              display: 'flex',
              width: 44,
              height: 44,
              borderRadius: 999,
              background: '#fff',
              color: '#1d4ed8',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            AP
          </span>
          VIVOS · COURTIER ORIAS
        </div>
        <div
          style={{
            display: 'flex',
            padding: '8px 18px',
            borderRadius: 8,
            background: palette.accent,
            color: '#111',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1.4,
          }}
        >
          {palette.label}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div
          style={{
            fontSize: title.length > 60 ? 56 : 68,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 28,
              opacity: 0.92,
              fontWeight: 500,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        )}
        {price && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 10,
              fontSize: 36,
              fontWeight: 800,
              color: palette.accent,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.85 }}>À PARTIR DE</span>
            {price}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 28,
          fontSize: 20,
          opacity: 0.9,
          borderTop: '1px solid rgba(255,255,255,0.22)',
          paddingTop: 22,
        }}
      >
        <span>ORIAS · ACPR</span>
        <span>·</span>
        <span>10 assureurs comparés</span>
        <span>·</span>
        <span>Devis 5 min</span>
        <span>·</span>
        <span>vivos-assurance.fr</span>
      </div>
    </div>,
    {
      ...SIZE,
      headers: {
        'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
      },
    }
  )
}
