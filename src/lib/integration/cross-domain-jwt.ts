/**
 * Cross-domain JWT — ServicesArtisans → Vivos Assurance
 *
 * ServicesArtisans peut envoyer un visiteur vers Vivos Assurance avec un token
 * JWT signé qui pré-remplit certains champs du formulaire devis (vertical,
 * métier, ville, données de contact si l'utilisateur a déjà consenti).
 *
 * Algo : HS256 avec une clé partagée stockée dans CROSS_DOMAIN_JWT_SECRET.
 * Audience : 'vivos-assurance.fr'. Issuer : 'servicesartisans.fr'.
 * TTL : 10 minutes (limiter la fenêtre de remploi).
 */

import { SignJWT, jwtVerify } from 'jose'
import { z } from 'zod'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { logger } from '@/lib/logger'

const CrossDomainPayloadSchema = z.object({
  vertical: z.string().max(40).optional(),
  metier: z.string().max(40).optional(),
  garantie: z.string().max(40).optional(),
  ville: z.string().max(80).optional(),
  postal_code: z
    .string()
    .regex(/^\d{5}$/)
    .optional(),
  prenom: z.string().max(80).optional(),
  nom: z.string().max(80).optional(),
  email: z.string().email().max(254).optional(),
  telephone: z.string().max(30).optional(),
  statut_juridique: z.string().max(40).optional(),
  ca_range: z.string().max(20).optional(),
  siret: z.string().max(20).optional(),
  utm: z.record(z.string(), z.string()).optional(),
  source_artisan_id: z.string().max(80).optional(),
})

export type CrossDomainPayload = z.infer<typeof CrossDomainPayloadSchema>

const ISSUER = 'servicesartisans.fr'
const AUDIENCE = 'vivos-assurance.fr'
const TTL = '10m'

function getKey(): Uint8Array {
  const secret = process.env.CROSS_DOMAIN_JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('CROSS_DOMAIN_JWT_SECRET missing or too short (>=32 chars).')
  }
  // Construct Uint8Array directly to avoid cross-realm issues under jsdom test env.
  const out = new Uint8Array(secret.length)
  for (let i = 0; i < secret.length; i++) out[i] = secret.charCodeAt(i) & 0xff
  return out
}

/**
 * Signe un token côté ServicesArtisans (utilitaire exporté pour le partner).
 */
export async function signCrossDomainToken(payload: CrossDomainPayload): Promise<string> {
  // Validate before signing to surface programmer errors immediately.
  const validated = CrossDomainPayloadSchema.parse(payload)
  return await new SignJWT({ ...validated } as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime(TTL)
    .sign(getKey())
}

/**
 * Vérifie + décode côté Vivos Assurance.
 * Renvoie null si invalide / expiré.
 */
/**
 * Vérifie + décode un token côté Vivos Assurance.
 * Si `consumeJti=true` (défaut en prod), enregistre le jti dans la table
 * `public.jwt_jti_consumed` ; toute réutilisation ultérieure renvoie null.
 *
 * En environnement de test/build (NEXT_BUILD_SKIP_DB ou pas de Supabase URL),
 * la vérification anti-replay est désactivée silencieusement pour ne pas
 * coupler la lib à l'infra DB.
 */
export async function verifyCrossDomainToken(
  token: string,
  options: { consumeJti?: boolean } = {}
): Promise<CrossDomainPayload | null> {
  const consumeJti = options.consumeJti ?? true
  try {
    const { payload } = await jwtVerify(token, getKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    })
    const raw = payload as Record<string, unknown>
    const jti = typeof raw.jti === 'string' ? raw.jti : null
    const exp = typeof raw.exp === 'number' ? raw.exp : null

    // Anti-replay déterministe : INSERT avec onConflict ignoreDuplicates.
    // Si data est vide → JTI déjà consommé → replay rejeté.
    // Si erreur autre que succès → fail-closed (DoS Supabase n'ouvre pas de fenêtre).
    if (
      consumeJti &&
      jti &&
      exp &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_BUILD_SKIP_DB
    ) {
      try {
        const admin = createPiiAdminClient()
        const { data, error } = await admin
          .from('jwt_jti_consumed')
          .upsert(
            { jti, expires_at: new Date(exp * 1000).toISOString() },
            { onConflict: 'jti', ignoreDuplicates: true }
          )
          .select('jti')

        if (error) {
          logger.error({ err: error, jti }, 'jwt_jti_consumed upsert failed — fail-closed')
          return null
        }
        if (!data || data.length === 0) {
          logger.warn({ jti }, 'cross-domain JWT replay rejected (jti already consumed)')
          return null
        }
      } catch (err) {
        logger.error({ err, jti }, 'jwt_jti_consumed unreachable — fail-closed')
        return null
      }
    }

    const stripped: Record<string, unknown> = { ...raw }
    delete stripped.iss
    delete stripped.aud
    delete stripped.iat
    delete stripped.exp
    delete stripped.nbf
    delete stripped.jti
    const parsed = CrossDomainPayloadSchema.safeParse(stripped)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}
