/**
 * Calcul du temps de lecture estimé (signal E-E-A-T NerdWallet pattern).
 * Base : 220 mots/min (lecture moyenne adulte FR).
 */

const WORDS_PER_MINUTE = 220

export function calculateReadingTime(text: string): number {
  const wordCount = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '< 1 min'
  if (minutes === 1) return '1 min'
  return `${minutes} min`
}

/**
 * Calcule reading time depuis tableau de strings (ex: intro + sections + faq).
 */
export function calculateReadingTimeFromParts(parts: string[]): number {
  const totalText = parts.filter(Boolean).join(' ')
  return calculateReadingTime(totalText)
}
