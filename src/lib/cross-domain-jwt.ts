/**
 * CROSS-DOMAIN JWT — Assurance Pro ↔ Assurance Pro
 *
 * Permet de pré-remplir le formulaire devis assurance avec les données
 * du user connecté sur Assurance Pro (métier, ville, contact).
 *
 * Pattern :
 * 1. Assurance Pro génère un JWT signé avec le secret partagé
 * 2. Lien `https://assurance-pro.fr/devis?token=...`
 * 3. Assurance-Pro vérifie le JWT, extrait les claims, pré-remplit le form
 *
 * Sécurité :
 * - JWT court terme (15 min)
 * - Issuer + Audience vérifiés
 * - Replay protection via nonce + cache
 */

import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { logger } from '@/lib/logger'

const ISSUER = process.env.CROSS_DOMAIN_JWT_ISSUER ?? 'servicesartisans.fr'
const AUDIENCE = process.env.CROSS_DOMAIN_JWT_AUDIENCE ?? 'assurance-pro.fr'
const SECRET = process.env.CROSS_DOMAIN_JWT_SECRET

const TOKEN_TTL_SECONDS = 15 * 60

export interface CrossDomainPayload {
  // User context
  user_id?: string
  email?: string
  prenom?: string
  nom?: string
  telephone?: string

  // Activity context (pré-remplissage formulaire devis)
  metier?: string
  ville?: string
  postal_code?: string
  siret?: string
  ca_range?: string
  statut_juridique?: string

  // UTM tracking
  source?: string
  campaign?: string
  medium?: string

  // Sécurité
  nonce: string
}

function getSecretKey(): Uint8Array {
  if (!SECRET) {
    throw new Error('CROSS_DOMAIN_JWT_SECRET not configured')
  }
  return new TextEncoder().encode(SECRET)
}

/**
 * Génère un JWT côté Assurance Pro (à intégrer là-bas)
 * Cette fonction sert de référence — elle peut aussi être appelée côté assurance-pro
 * pour des liens cross-domain inverses.
 */
export async function signCrossDomainToken(
  payload: Omit<CrossDomainPayload, 'nonce'>,
  ttlSeconds = TOKEN_TTL_SECONDS
): Promise<string> {
  const nonce = crypto.randomUUID()
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({ ...payload, nonce })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setSubject(payload.user_id ?? 'anonymous')
    .sign(getSecretKey())
}

/**
 * Vérifie un JWT entrant côté Assurance Pro
 * Retourne le payload si valide, null sinon.
 */
export async function verifyCrossDomainToken(
  token: string,
  expectedAudience: string = AUDIENCE
): Promise<CrossDomainPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: ISSUER,
      audience: expectedAudience,
      algorithms: ['HS256'],
      clockTolerance: 60,
    })

    if (!isCrossDomainPayload(payload)) {
      logger.warn({ payload }, 'JWT payload missing required fields')
      return null
    }

    // Replay protection (nonce already used ?)
    const replayed = await checkNonceReplay(payload.nonce)
    if (replayed) {
      logger.warn({ nonce: payload.nonce }, 'JWT nonce already used (replay attempt)')
      return null
    }

    return payload
  } catch (err) {
    logger.warn({ err }, 'JWT verification failed')
    return null
  }
}

function isCrossDomainPayload(p: JWTPayload): p is CrossDomainPayload & JWTPayload {
  return typeof p === 'object' && p !== null && typeof (p as unknown as CrossDomainPayload).nonce === 'string'
}

/**
 * Replay protection — store used nonces 30 min in memory cache
 * En production, utiliser Redis ou Supabase pour cache distribué
 */
const usedNonces = new Map<string, number>()
const NONCE_TTL_MS = 30 * 60 * 1000

async function checkNonceReplay(nonce: string): Promise<boolean> {
  const now = Date.now()

  // Cleanup expired nonces
  usedNonces.forEach((t, n) => {
    if (now - t > NONCE_TTL_MS) usedNonces.delete(n)
  })

  if (usedNonces.has(nonce)) return true
  usedNonces.set(nonce, now)
  return false
}

/**
 * Helper Next.js — extraire et vérifier le token depuis searchParams
 * Usage dans une page :
 *   const payload = await getCrossDomainContext(searchParams)
 *   if (payload) prefillForm(payload)
 */
export async function getCrossDomainContext(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): Promise<CrossDomainPayload | null> {
  const token =
    searchParams instanceof URLSearchParams
      ? searchParams.get('token') ?? searchParams.get('xd_token')
      : (searchParams.token as string | undefined) ??
        (searchParams.xd_token as string | undefined)

  if (!token) return null
  return verifyCrossDomainToken(token)
}
