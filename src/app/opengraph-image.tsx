import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Assurance Pro — Cabinet de courtage ORIAS multi-vertical'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
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
            gap: 14,
            fontSize: 24,
            opacity: 0.85,
            letterSpacing: 1,
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
          ASSURANCE PRO · CABINET ORIAS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              marginBottom: 24,
            }}
          >
            Assurance professionnelle française.
          </div>
          <div style={{ fontSize: 32, opacity: 0.9, fontWeight: 500, lineHeight: 1.3 }}>
            Décennale · RC Pro · Multirisque · Mutuelle TNS · VTC · Cyber · 10 assureurs comparés.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 28,
            fontSize: 22,
            opacity: 0.85,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            paddingTop: 22,
          }}
        >
          <span>ORIAS · ACPR</span>
          <span>·</span>
          <span>0 frais de courtage</span>
          <span>·</span>
          <span>Devis 24h</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
