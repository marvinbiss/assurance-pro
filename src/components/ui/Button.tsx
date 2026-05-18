/**
 * Button — variant system unifié (primary/secondary/ghost/danger).
 *
 * Anti-pattern résolu: avant ce composant, ~30 boutons inline avec classes
 * divergentes (some bg-primary-500, others bg-primary-600, some shadow,
 * others not). Single source of truth design system.
 *
 * Usage:
 *   <Button variant="primary" size="lg" asChild>
 *     <Link href="/devis">Devis 24h</Link>
 *   </Button>
 *
 * Accessibility:
 * - min-h-[44px] WCAG 2.5.8 touch target
 * - focus-visible:ring-4 brand color
 * - disabled state explicite
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white shadow-cta hover:bg-primary-700 hover:shadow-cta-hover focus-visible:ring-primary-200',
  secondary:
    'border-2 border-primary-600 bg-white text-primary-700 hover:bg-primary-50 hover:border-primary-700 focus-visible:ring-primary-200',
  ghost:
    'bg-transparent text-charcoal-700 hover:bg-sand-100 hover:text-charcoal-900 focus-visible:ring-charcoal-200',
  danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-200',
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'min-h-[36px] px-4 py-2 text-sm',
  md: 'min-h-[44px] px-5 py-2.5 text-base',
  lg: 'min-h-[48px] px-7 py-3.5 text-base',
}

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  variant?: Variant
  size?: Size
  /** Render as child element (Slot pattern pour Link wrapping) */
  asChild?: boolean
  children?: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200',
    'hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none disabled:hover:shadow-none',
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className
  )

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    })
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
