import { NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'node:crypto'
import { logger } from '@/lib/logger'
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter'
import { sendEmail } from '@/lib/email/resend'
import { createPiiAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const newsletterSchema = z.object({
  email: z.string().email('Email invalide').max(254),
  consent: z.literal(true),
})

const CONSENT_TEXT_FR =
  "J'accepte de recevoir la newsletter mensuelle d'Vivos Assurance et je peux me désinscrire à tout moment."

const WELCOME_HTML = `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #e2e8f0">
      <h1 style="font-size:20px;margin:0 0 12px">Bienvenue dans la newsletter Vivos Assurance</h1>
      <p>Merci pour votre inscription. Vous recevrez chaque mois&nbsp;:</p>
      <ul>
        <li>Actualités réglementaires (ACPR, DDA, Loi Spinetta, Madelin&hellip;)</li>
        <li>Guides pratiques par vertical (BTP, RC Pro, Mutuelle TNS, Cyber, VTC)</li>
        <li>Comparatifs et benchmarks de marché</li>
      </ul>
      <p style="font-size:12px;color:#64748b;margin-top:24px">
        Pour vous désinscrire, répondez simplement à cet email avec « STOP ».
        <br>Politique RGPD&nbsp;: <a href="https://vivos-assurance.fr/confidentialite" style="color:#1d4ed8">vivos-assurance.fr/confidentialite</a>
      </p>
    </div>
  </body>
</html>
`

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers)
    const rl = await checkRateLimit(`newsletter:${ip}`, { window: 300_000, max: 3 })
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
    const parsed = newsletterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Email / consentement invalide.' }, { status: 400 })
    }
    const { email } = parsed.data

    // RGPD art. 7 : registre du consentement avant envoi.
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
        source: 'site_web',
      })
    } catch (err) {
      logger.error(
        { err, email: crypto.createHash('sha256').update(email).digest('hex').slice(0, 12) },
        'newsletter consent record failed'
      )
      return NextResponse.json({ error: 'Persistence indisponible.' }, { status: 500 })
    }

    void sendEmail({
      to: email,
      subject: 'Bienvenue dans la newsletter Vivos Assurance',
      html: WELCOME_HTML,
    }).catch((err) => logger.error({ err }, 'newsletter welcome email failed'))

    return NextResponse.json({ success: true })
  } catch (err) {
    logger.error({ err }, 'newsletter route error')
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
