import { timingSafeEqual } from 'node:crypto'

/**
 * Verify cron `Authorization: Bearer <CRON_SECRET>` in constant time.
 * Defends against timing attacks (CWE-208) on cron secret recovery.
 * Returns true only if the secret is configured AND matches exactly.
 */
export function verifyCronAuthorization(authHeader: string | null): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  if (!authHeader) return false

  const expected = `Bearer ${secret}`
  // Equal-length is required by timingSafeEqual to avoid throwing.
  if (authHeader.length !== expected.length) return false

  try {
    return timingSafeEqual(Buffer.from(authHeader), Buffer.from(expected))
  } catch {
    return false
  }
}
