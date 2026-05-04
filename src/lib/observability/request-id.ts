/**
 * Request ID — corrélation logs API → Sentry → client
 *
 * Pattern : chaque requête API génère un ID (ou réutilise X-Request-Id du client).
 * Cet ID est :
 * - injecté dans tous les logs de la requête (correlation)
 * - retourné en header X-Request-Id au client (debug client-side)
 * - tagué Sentry pour grouper les events par requête
 */

import { randomUUID } from 'node:crypto'

const REQUEST_ID_HEADER = 'x-request-id'
const MAX_LENGTH = 64
const VALID_PATTERN = /^[A-Za-z0-9_\-:.]+$/

/**
 * Récupère ou génère un request ID pour la requête courante.
 * Accepte un ID fourni par le client si valide (format safe + ≤64 chars).
 */
export function getOrCreateRequestId(headers: Headers): string {
  const incoming = headers.get(REQUEST_ID_HEADER)
  if (incoming && incoming.length <= MAX_LENGTH && VALID_PATTERN.test(incoming)) {
    return incoming
  }
  return randomUUID()
}

export const REQUEST_ID_HEADER_KEY = REQUEST_ID_HEADER
