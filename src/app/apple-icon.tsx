import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
        fontSize: 128,
        borderRadius: 38,
      }}
    >
      V
    </div>,
    { ...size }
  )
}
