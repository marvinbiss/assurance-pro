/**
 * POST /api/gdpr/export — droit d'accès art. 15 RGPD.
 * Workflow email-token HMAC :
 *   POST email + consent → email confirmation
 *   GET ?token=… → consume + JSON export (anti-replay)
 */

import { NextResponse, type NextRequest } from 'next/server'
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

// Colonnes PII destinées à l'export (principe de minimisation art. 5.1.c).
// Les champs internes (status, scoring interne, signature_hash, etc.) sont exclus
// — l'utilisateur reçoit ses données déclarées, pas l'analyse interne du courtier.
// `id` est inclus pour la jointure conseil_records ; il sera filtré du payload.
const LEAD_EXPORT_COLUMNS = [
  'id',
  'reference',
  'created_at',
  'vertical',
  'metier_slug',
  'forme_juridique',
  'ville',
  'ville_cp',
  'contact_civilite',
  'contact_prenom',
  'contact_nom',
  'contact_email',
  'contact_telephone',
  'consent_dda',
  'consent_marketing',
  'fic_acknowledged_at',
] as const

const RECLAMATION_EXPORT_COLUMNS = [
  'ticket',
  'created_at',
  'civilite',
  'prenom',
  'nom',
  'email',
  'telephone',
  'societe',
  'contrat',
  'sinistre_ref',
  'categorie',
  'objet',
  'message',
  'status',
  'sla_acknowledge_deadline',
  'sla_response_deadline',
] as const

const CONSEIL_EXPORT_COLUMNS = ['reference', 'created_at', 'recommandations'] as const

const NEWSLETTER_EXPORT_COLUMNS = [
  'email',
  'consent_at',
  'consent_proof_text',
  'consent_proof_lang',
  'status',
] as const

interface ExportPayload {
  generated_at: string
  email: string
  data: {
    leads: Record<string, unknown>[]
    reclamations: Record<string, unknown>[]
    conseil_records: Record<string, unknown>[]
    newsletter_subscribers: Record<string, unknown>[]
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const rl = await checkRateLimit(`gdpr-export:${ip}`, { window: 86_400_000, max: 3 })
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
    return NextResponse.json({ error: 'Email ou consentement invalide.' }, { status: 400 })
  }
  const email = parsed.data.email.toLowerCase()

  const emailRl = await checkRateLimit(`gdpr-export-email:${email}`, {
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
    token = signGdprToken('export', email, expiresAt)
  } catch (err) {
    logger.error({ err }, 'gdpr-export: token signing failed')
    return NextResponse.json({ error: 'Service indisponible.' }, { status: 500 })
  }

  const safeEmail = esc(email)
  const url = `${SITE_URL}/api/gdpr/export?token=${encodeURIComponent(token)}`
  void sendEmail({
    to: email,
    subject: "[Vivos Assurance] Confirmer l'export de vos données",
    html: `
      <p>Bonjour,</p>
      <p>Vous avez demandé un export de vos données personnelles
      (RGPD art. 15 — droit d'accès) pour l'adresse <strong>${safeEmail}</strong>.</p>
      <p>Pour télécharger l'export JSON (lien valable 1 heure)&nbsp;:</p>
      <p><a href="${url}">${url}</a></p>
      <p>— Service DPO Vivos Assurance</p>
    `,
  }).catch((err) => logger.error({ err }, 'gdpr-export confirmation email failed'))

  return NextResponse.json({
    ok: true,
    message:
      "Email de confirmation envoyé. Cliquez sur le lien dans l'heure pour récupérer vos données.",
  })
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Token manquant.' }, { status: 400 })

  const verified = verifyGdprToken('export', token)
  if (!verified) return NextResponse.json({ error: 'Token invalide ou expiré.' }, { status: 400 })

  const { email, expiresAt, tokenHash } = verified
  const admin = createPiiAdminClient()

  // Anti-replay : consume du tokenHash. PK violation = déjà utilisé.
  const { error: replayErr } = await admin.from('gdpr_token_consumed').insert({
    token_hash: tokenHash,
    kind: 'export',
    email_hash: hashEmail(email),
    expires_at: new Date(expiresAt).toISOString(),
  })
  if (replayErr) {
    if (replayErr.code === '23505') {
      logger.warn({ tokenHash: tokenHash.slice(0, 12) }, 'gdpr-export replay rejected')
      return NextResponse.json({ error: 'Lien déjà utilisé.' }, { status: 400 })
    }
    logger.error(
      { err: replayErr, tokenHash: tokenHash.slice(0, 12) },
      'gdpr-export consume insert failed'
    )
    return NextResponse.json({ error: 'Service indisponible.' }, { status: 500 })
  }

  try {
    const [leadsRes, reclamationsRes, newsletterRes] = await Promise.all([
      admin.from('leads').select(LEAD_EXPORT_COLUMNS.join(',')).eq('contact_email', email),
      admin.from('reclamations').select(RECLAMATION_EXPORT_COLUMNS.join(',')).eq('email', email),
      admin
        .from('newsletter_subscribers')
        .select(NEWSLETTER_EXPORT_COLUMNS.join(','))
        .eq('email', email),
    ])

    const leads = (leadsRes.data ?? []) as unknown as Record<string, unknown>[]
    const reclamations = (reclamationsRes.data ?? []) as unknown as Record<string, unknown>[]
    const newsletter = (newsletterRes.data ?? []) as unknown as Record<string, unknown>[]

    const conseilLeadIds = leads
      .map((l) => (typeof l.id === 'string' ? l.id : null))
      .filter((id): id is string => id !== null)

    let conseilRecords: Record<string, unknown>[] = []
    if (conseilLeadIds.length > 0) {
      const { data } = await admin
        .from('conseil_records')
        .select(CONSEIL_EXPORT_COLUMNS.join(','))
        .in('lead_id', conseilLeadIds)
      conseilRecords = (data ?? []) as unknown as Record<string, unknown>[]
    }

    // Retire `id` interne du payload exposé à l'utilisateur.
    const leadsForExport = leads.map((l) => {
      const { id: _id, ...rest } = l
      void _id
      return rest
    })

    const payload: ExportPayload = {
      generated_at: new Date().toISOString(),
      email,
      data: {
        leads: leadsForExport,
        reclamations,
        conseil_records: conseilRecords,
        newsletter_subscribers: newsletter,
      },
    }

    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="assurance-pro-gdpr-${Date.now()}.json"`,
        // PII strict : aucun cache (CDN, proxy, navigateur, history).
        'Cache-Control': 'no-store, no-cache, max-age=0, private',
        Pragma: 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  } catch (err) {
    logger.error({ err }, 'gdpr-export retrieval failed')
    captureApiException(err, {
      route: 'api/gdpr/export',
      category: 'gdpr',
      extra: { stage: 'retrieval' },
    })
    return NextResponse.json({ error: "Erreur lors de l'export." }, { status: 500 })
  }
}
