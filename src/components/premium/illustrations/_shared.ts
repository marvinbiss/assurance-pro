export interface IllustrationProps {
  className?: string
  accent?: 'primary' | 'forest' | 'honey'
  ariaLabel?: string
}

export const ACCENT_STROKE = {
  primary: '#1B3A6D',
  forest: '#3D8B68',
  honey: '#B8975A',
} as const

export const BASE_STROKE = '#45403B'
export const SAND_FILL = '#F4EFE8'
