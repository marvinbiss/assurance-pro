import { ACCENT_STROKE, BASE_STROKE, SAND_FILL, type IllustrationProps } from './_shared'

export function IllustrationCarreleur({
  className = '',
  accent = 'primary',
  ariaLabel,
}: IllustrationProps) {
  const accentColor = ACCENT_STROKE[accent]
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      {/* Tile grid 3x3 */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const x = 40 + col * 42
          const y = 40 + row * 42
          const isAccent = row === 1 && col === 1
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="38"
              height="38"
              fill={isAccent ? SAND_FILL : 'white'}
              stroke={isAccent ? accentColor : BASE_STROKE}
              strokeWidth={isAccent ? 2 : 1.5}
            />
          )
        })
      )}
      {/* Tile spacer (cross) on intersection */}
      <g transform="translate(124 124)">
        <path
          d="M-4 -10 L4 -10 L4 -4 L10 -4 L10 4 L4 4 L4 10 L-4 10 L-4 4 L-10 4 L-10 -4 L-4 -4 Z"
          fill={accentColor}
          stroke={accentColor}
          strokeWidth={1}
        />
      </g>
      {/* Floating spacer cross */}
      <g transform="translate(150 30) scale(0.8)">
        <path
          d="M-4 -10 L4 -10 L4 -4 L10 -4 L10 4 L4 4 L4 10 L-4 10 L-4 4 L-10 4 L-10 -4 L-4 -4 Z"
          fill="none"
          stroke={BASE_STROKE}
        />
      </g>
      <g transform="translate(34 170) scale(0.7)">
        <path
          d="M-4 -10 L4 -10 L4 -4 L10 -4 L10 4 L4 4 L4 10 L-4 10 L-4 4 L-10 4 L-10 -4 L-4 -4 Z"
          fill="none"
          stroke={BASE_STROKE}
        />
      </g>
    </svg>
  )
}
