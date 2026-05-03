import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names safely (resolves conflicting utility classes).
 * Only utility actively consumed by the UI layer (Skeleton).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
