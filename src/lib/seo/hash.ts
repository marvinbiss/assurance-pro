/**
 * Hash déterministe (FNV-like) pour rotation pseudo-aléatoire stable
 * d'ancres SEO ou de variantes par slug.
 */
export function hashCode(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}
