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
        background: 'linear-gradient(135deg, #2B4D85 0%, #1B3A6D 50%, #0E2040 100%)',
        borderRadius: 38,
      }}
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 12 22 Q 32 8, 52 22"
          stroke="#DCC067"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 16 26 L 32 54 L 48 26"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>,
    { ...size }
  )
}
