import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E86B4B 0%, #C24B2A 100%)',
        color: 'white',
        fontFamily: 'serif',
        fontWeight: 800,
        fontSize: 22,
        borderRadius: 6,
      }}
    >
      V
    </div>,
    { ...size }
  )
}
