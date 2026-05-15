import type { ReactNode } from 'react'

interface PremiumBadgeProps {
  children: ReactNode
  variant?: 'honey' | 'forest' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

const VARIANTS = {
  honey:
    'bg-secondary-50 text-secondary-700 border-secondary-300 shadow-[0_2px_8px_rgba(232,150,10,0.15)]',
  forest: 'bg-accent-50 text-accent-700 border-accent-300',
  outline: 'bg-white/80 text-charcoal-800 border-charcoal-200 backdrop-blur-sm',
} as const

const SIZES = {
  sm: 'px-2.5 py-0.5 text-[10px] tracking-wider',
  md: 'px-3 py-1 text-xs tracking-wide',
} as const

export function PremiumBadge({
  children,
  variant = 'honey',
  size = 'md',
  className = '',
}: PremiumBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-heading font-semibold uppercase ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </span>
  )
}
