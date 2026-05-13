import { NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'node:crypto'
import { logger } from '@/lib/logger'
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter'
import { createPiiAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const VALID_VERTICALS = new Set([
  'decennale',
  'rc_pro',
  'multirisque',
  'mutuelle',
  'vtc',
  'cyber',
  'autre',
])

const preinscriptionSchema = z.object({
  email: z.string().email('Email invalide').max(254),
  consent: z.literal(true),
  vertical: z.string().max(40).optional(),
})

const CONSENT_TEXT_FR =
  "J'accepte d'être informé(e) par email du lancement commercial de Vivos Assurance, dès l'immatriculation ORIAS validée. Je peux me désinscrire à tout moment."

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers)
    const rl = await checkRateLimit(`preinscription:${ip}`, { window: 300_000, max: 3 })
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes, veuillez réessayer plus tard.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rl.resetTime - Date.now()) / 1000)),
          },
        }
      )
    }

    const body = await request.json()
    const parsed = preinscriptionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Email ou consentement invalide.' }, { status: 400 })
    }
    const { email, vertical } = parsed.data
    const safeVertical = vertical && VALID_VERTICALS.has(vertical) ? vertical : null
    const source = safeVertical
      ? `preinscription_pre_orias:${safeVertical}`
      : 'preinscription_pre_orias'

    try {
      const admin = createPiiAdminClient()
      await admin.from('newsletter_subscribers').insert({
        email: email.toLowerCase(),
        consent_at: new Date().toISOString(),
        consent_ip: ip,
        consent_proof_text: CONSENT_TEXT_FR,
        consent_proof_lang: 'fr',
        consent_user_agent: request.headers.get('user-agent') ?? null,
        status: 'pending',
        source,
      })
    } catch (err) {
      logger.error(
        { err, email: crypto.createHash('sha256').update(email).digest('hex').slice(0, 12) },
        'preinscription consent record failed'
      )
      return NextResponse.json({ error: 'Persistence indisponible.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    logger.error({ err }, 'preinscription route error')
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
