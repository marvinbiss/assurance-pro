/**
 * POST /api/leads/score
 *
 * Score un lead à partir d'un formulaire devis ou enrichissement CRM.
 * Retourne score 0-100 + tier A/B/C/D + breakdown explicable + routing.
 *
 * Usage côté courtier (CRM ou dashboard internal) — NON exposé public.
 * Auth : header X-API-Key === LEAD_SCORING_API_KEY (env var, rotated annuel).
 *
 * Rate limit : 100 req/min/IP (cas usage internal — batch enrichment).
 */

import { type NextRequest } from 'next/server'
import { LeadInputSchema, scoreLead, suggestRouting } from '@/lib/leads/scoring'
import { checkRateLimit, getRateLimitKey, getClientIp } from '@/lib/rate-limiter'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.LEAD_SCORING_API_KEY
  // Fail-closed : sans clé configurée, JAMAIS d'accès (même dev/preview Vercel)
  // Évite l'exposition accidentelle de la business logic sur Vercel Preview
  // où NODE_ENV=production n'est pas garanti.
  if (!expected) return false
  const provided = req.headers.get('x-api-key')
  if (!provided || provided.length !== expected.length) return false
  // Comparaison constant-time pour empêcher timing attacks
  let diff = 0
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ provided.charCodeAt(i)
  }
  return diff === 0
}

export async function POST(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────────
  if (!isAuthorized(req)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  // ── Rate limiting ───────────────────────────────────────────────────────
  const ip = getClientIp(req.headers)
  const rl = await checkRateLimit(getRateLimitKey(ip, '/api/leads/score'), {
    max: 100,
    window: 60_000,
  })
  if (!rl.allowed) {
    return Response.json(
      { error: 'rate_limited', retryAfterMs: rl.resetTime - Date.now() },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetTime - Date.now()) / 1000)) },
      }
    )
  }

  // ── Body validation ─────────────────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = LeadInputSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'invalid_body', detail: parsed.error.flatten() }, { status: 400 })
  }

  // ── Scoring ─────────────────────────────────────────────────────────────
  const result = scoreLead(parsed.data)
  const routing = suggestRouting(result.tier)

  logger.info('[leads.score] scored', {
    score: result.score,
    tier: result.tier,
    estimatedValueEur: result.estimatedValueEur,
    activity: parsed.data.activity.slice(0, 60), // pas de PII
  })

  return Response.json(
    {
      score: result.score,
      tier: result.tier,
      estimatedValueEur: result.estimatedValueEur,
      breakdown: result.breakdown,
      enrichmentTier: result.enrichmentTier,
      routing,
    },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    }
  )
}
