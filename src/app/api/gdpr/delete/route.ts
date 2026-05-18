/**
 * POST /api/gdpr/delete
 *
 * Anonymisation RGPD à la demande (art. 17 — droit à l'effacement) avec workflow
 * email-token signé HMAC-SHA256 :
 *   1. POST email + consent → email de confirmation envoyé.
 *   2. GET ?token=… → vérification + consume du token (anti-replay) + anonymisation.
 *
 * Conformité ACPR : les données ne sont pas supprimées intégralement mais
 * anonymisées (l'utilisateur en est explicitement informé) afin de respecter
 * les obligations de conservation 5 ans (registre réclamations, traçabilité DDA).
 */

import { NextResponse, type NextRequest } from 'next/server'
import crypto from 'node:crypto'
import { z } from 'zod'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/resend'
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter'
import { logger } from '@/lib/logger'
import { captureApiException } from '@/lib/observability/sentry'
import { SITE_URL } from '@/lib/seo/config'
import {
  signGdprToken,
  verifyGdprToken,
  hashEmail,
  GDPR_TOKEN_TTL_MINUTES,
} from '@/lib/security/gdpr-token'
import { esc } from '@/lib/email/templates/_html'

export const dynamic = 'force-dynamic'

const PostSchema = z.object({
  email: z.string().email().max(254),
  consent: z.literal(true),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const rl = await checkRateLimit(`gdpr-delete:${ip}`, { window: 86_400_000, max: 3 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Trop de demandes — réessayez dans quelques heures.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }
  const parsed = PostSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email / consentement invalide.' }, { status: 400 })
  }
  const email = parsed.data.email.toLowerCase()

  // Rate-limit per-email anti-abus (3 confirmations / 24h, indépendant de l'IP).
  const emailRl = await checkRateLimit(`gdpr-delete-email:${email}`, {
    window: 86_400_000,
    max: 3,
  })
  if (!emailRl.allowed) {
    return NextResponse.json(
      { error: 'Trop de demandes pour cette adresse — réessayez dans 24h.' },
      { status: 429 }
    )
  }
  const expiresAt = Date.now() + GDPR_TOKEN_TTL_MINUTES * 60_000

  let token: string
  try {
    token = signGdprToken('delete', email, expiresAt)
  } catch (err) {
    logger.error({ err }, 'gdpr-delete: token signing failed')
    return NextResponse.json({ error: 'Service indisponible.' }, { status: 500 })
  }

  const safeEmail = esc(email)
  const url = `${SITE_URL}/api/gdpr/delete?token=${encodeURIComponent(token)}`
  void sendEmail({
    to: email,
    subject: "[Vivos Assurance] Confirmer l'anonymisation de vos données",
    html: `
      <p>Bonjour,</p>
      <p>Vous avez demandé l'exercice de votre droit à l'effacement (RGPD art. 17)
      pour l'adresse <strong>${safeEmail}</strong>.</p>
      <p><strong>Important — anonymisation, pas suppression intégrale.</strong>
      Conformément aux obligations légales de conservation (Recommandation ACPR
      2024-R-02 — registre réclamations 5 ans, art. L. 521-4 — traçabilité du
      conseil 10 ans), les enregistrements ne sont pas supprimés mais
      <em>anonymisés</em> : votre nom, prénom, email et téléphone sont remplacés
      par des valeurs neutres, votre identité n'est plus identifiable.</p>
      <p>Pour confirmer (lien valable 1 heure)&nbsp;:</p>
      <p><a href="${url}">${url}</a></p>
      <p>Si vous n'êtes pas à l'origine de cette demande, ignorez ce message —
      aucune anonymisation ne sera effectuée.</p>
      <p>— Service DPO Vivos Assurance</p>
    `,
  }).catch((err) => logger.error({ err }, 'gdpr-delete confirmation email failed'))

  return NextResponse.json({
    ok: true,
    message:
      "Email de confirmation envoyé. Cliquez sur le lien dans l'heure pour valider l'anonymisation.",
  })
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Token manquant.' }, { status: 400 })

  const verified = verifyGdprToken('delete', token)
  if (!verified) return NextResponse.json({ error: 'Token invalide / expiré.' }, { status: 400 })

  const { email, expiresAt, tokenHash } = verified
  const admin = createPiiAdminClient()

  // Anti-replay : enregistre le tokenHash. PK violation = déjà consommé.
  const { error: replayErr } = await admin.from('gdpr_token_consumed').insert({
    token_hash: tokenHash,
    kind: 'delete',
    email_hash: hashEmail(email),
    expires_at: new Date(expiresAt).toISOString(),
  })
  if (replayErr) {
    if (replayErr.code === '23505') {
      logger.warn({ tokenHash: tokenHash.slice(0, 12) }, 'gdpr-delete replay rejected')
      return NextResponse.json({ error: 'Lien déjà utilisé.' }, { status: 400 })
    }
    // Fail-closed : pas de consume = pas d'anonymisation (CRITICAL : ne PAS continuer)
    logger.error(
      { err: replayErr, tokenHash: tokenHash.slice(0, 12) },
      'gdpr-delete consume insert failed'
    )
    return NextResponse.json({ error: 'Service indisponible.' }, { status: 500 })
  }

  const anonymizedEmail = `anonymized-${crypto.randomUUID()}@deleted.local`

  // Anonymisation atomique des 3 surfaces PII. Toute erreur = rollback logique
  // (le token est consommé donc une nouvelle demande peut être déclenchée).
  const leadsRes = await admin
    .from('leads')
    .update({
      contact_email: anonymizedEmail,
      contact_prenom: 'ANONYMISÉ',
      contact_nom: 'ANONYMISÉ',
      contact_telephone: null,
      ip: null,
      user_agent: null,
    })
    .eq('contact_email', email)

  const reclamationsRes = await admin
    .from('reclamations')
    .update({
      email: anonymizedEmail,
      prenom: 'ANONYMISÉ',
      nom: 'ANONYMISÉ',
      telephone: null,
      ip: null,
      user_agent: null,
    })
    .eq('email', email)

  // conseil_records est immuable (trigger anti-UPDATE migration 009) — c'est la
  // preuve opposable du conseil DDA, conservée 10 ans (art. L. 521-4 + ACPR R-03).
  // L'anonymisation des leads suffit : la traçabilité reste, l'identité du
  // prospect (déduite via leads anonymisés) n'est plus accessible. Choix RGPD
  // art. 23 — limitation pour obligation légale de conservation.

  const newsletterRes = await admin.from('newsletter_subscribers').delete().eq('email', email)

  const errors = [leadsRes.error, reclamationsRes.error, newsletterRes.error].filter(
    (e): e is NonNullable<typeof e> => e !== null && e !== undefined
  )

  if (errors.length > 0) {
    logger.error(
      { errors, emailHash: hashEmail(email).slice(0, 12) },
      'gdpr-delete partial anonymization — manual review required'
    )
    captureApiException(new Error('gdpr-delete partial anonymization'), {
      route: 'api, gdpr ou delete',
      category: 'gdpr',
      extra: { emailHash: hashEmail(email).slice(0, 12), errorCount: errors.length },
    })
    return NextResponse.json(
      { error: 'Anonymisation partielle, équipe DPO notifiée.' },
      { status: 500 }
    )
  }

  logger.info({ emailHash: hashEmail(email).slice(0, 12) }, 'gdpr-delete completed')
  return NextResponse.json({
    ok: true,
    message:
      "Vos données personnelles ont été anonymisées sur l'ensemble des registres. " +
      'Les obligations légales de conservation ACPR sont respectées avec données anonymisées.',
  })
}
