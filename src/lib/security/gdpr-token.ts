/**
 * Tokens GDPR HMAC SHA-256 — utilisés par /api/gdpr/{delete,export}.
 *
 * Choix de design :
 * - Séparateur `|` (interdit en local-part email RFC 5321) au lieu de `:`
 *   pour éviter de casser sur des adresses contenant `:` (anciennes RFC).
 * - Anti-replay : chaque token consommé est enregistré dans
 *   `public.gdpr_token_consumed` (migration 011). Rejouer = rejet 400.
 * - Pas de fallback CRON_SECRET : un secret dédié est REQUIS pour chaque
 *   workflow (séparation des primitives cryptographiques).
 */

import crypto from 'node:crypto'

export type GdprTokenKind = 'delete' | 'export'

const SEP = '|'

/** TTL standard d'un token GDPR (1 heure). Source unique. */
export const GDPR_TOKEN_TTL_MINUTES = 60

function getSecret(kind: GdprTokenKind): string {
  const key = kind === 'delete' ? 'GDPR_DELETE_TOKEN_SECRET' : 'GDPR_EXPORT_TOKEN_SECRET'
  const value = process.env[key]
  if (!value || value.length < 32) {
    throw new Error(`${key} missing or too short (>=32 chars).`)
  }
  return value
}

export function signGdprToken(kind: GdprTokenKind, email: string, expiresAt: number): string {
  const secret = getSecret(kind)
  const data = `${email}${SEP}${expiresAt}`
  const sig = crypto.createHmac('sha256', secret).update(data).digest('hex')
  return Buffer.from(`${data}${SEP}${sig}`).toString('base64url')
}

export function verifyGdprToken(
  kind: GdprTokenKind,
  token: string
): { email: string; expiresAt: number; tokenHash: string } | null {
  let secret: string
  try {
    secret = getSecret(kind)
  } catch {
    return null
  }
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8')
    const parts = decoded.split(SEP)
    if (parts.length !== 3) return null
    const [email, expiresStr, sig] = parts
    if (!email || !expiresStr || !sig) return null

    const expected = crypto.createHmac('sha256', secret).update(`${email}${SEP}${expiresStr}`).digest('hex')

    // Buffers de longueur fixe pour neutraliser le timing-leak sur length.
    const PADDED = 128
    const expectedBuf = Buffer.alloc(PADDED, 0)
    const sigBuf = Buffer.alloc(PADDED, 0)
    Buffer.from(expected).copy(expectedBuf, 0, 0, Math.min(expected.length, PADDED))
    Buffer.from(sig).copy(sigBuf, 0, 0, Math.min(sig.length, PADDED))
    if (!crypto.timingSafeEqual(expectedBuf, sigBuf)) return null
    if (expected.length !== sig.length) return null

    const expiresAt = Number(expiresStr)
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return null

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    return { email, expiresAt, tokenHash }
  } catch {
    return null
  }
}

/** Hash SHA-256 d'un email, utilisé pour le log et le consume store (PII-safe). */
export function hashEmail(email: string): string {
  return crypto.createHash('sha256').update(email.toLowerCase()).digest('hex')
}
