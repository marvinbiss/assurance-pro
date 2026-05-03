import crypto from 'node:crypto'

/**
 * Génère une référence métier déterministe : `${PREFIX}-YYYYMMDD-${RAND10}`.
 * - 10 chars hex CSPRNG = 40 bits ≈ 1.1e12 valeurs (collision <0.01% à 100k/an).
 * - YYYYMMDD UTC permet le tri lexicographique stable.
 *
 * Usage : `makeReference('LEAD')` → `LEAD-20260430-ABCD1234EF`
 *         `makeReference('RCL')`  → `RCL-20260430-ABCD1234EF`
 */
export function makeReference(prefix: 'LEAD' | 'RCL' | 'CSL'): string {
  const d = new Date()
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(
    d.getUTCDate()
  ).padStart(2, '0')}`
  const rand = crypto.randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase()
  return `${prefix}-${ymd}-${rand}`
}

/** Regex pour valider la forme `${PREFIX}-YYYYMMDD-XXXXXXXXXX`. */
export function referenceRegex(prefix: string): RegExp {
  return new RegExp(`^${prefix}-\\d{8}-[A-F0-9]{10}$`)
}
