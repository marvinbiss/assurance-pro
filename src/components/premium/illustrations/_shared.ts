export interface IllustrationProps {
  className?: string
  accent?: 'primary' | 'forest' | 'honey'
  ariaLabel?: string
}

export const ACCENT_STROKE = {
  primary: '#C24B2A',
  forest: '#3D8B68',
  honey: '#E8960A',
} as const

export const BASE_STROKE = '#45403B'
export const SAND_FILL = '#F4EFE8'
