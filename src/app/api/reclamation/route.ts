import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { makeReference } from '@/lib/security/reference'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/resend'
import {
  reclamationAckTemplate,
  reclamationInternalNotificationTemplate,
} from '@/lib/email/templates/reclamation-ack'
import { logger } from '@/lib/logger'
import { RECLAMATIONS_INBOX } from '@/lib/email/inboxes'
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter'
import { captureApiException } from '@/lib/observability/sentry'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ReclamationSchema = z.object({
  civilite: z.enum(['M.', 'Mme']).optional().default('M.'),
  nom: z.string().min(1).max(120),
  prenom: z.string().min(1).max(120),
  email: z.string().email().max(254),
  telephone: z.string().max(40).optional().default(''),
  societe: z.string().max(200).optional().default(''),
  contrat: z.string().max(80).optional().default(''),
  sinistre_ref: z.string().max(80).optional().default(''),
  categorie: z.enum([
    'conseil',
    'souscription',
    'sinistre',
    'resiliation',
    'facturation',
    'rgpd',
    'autre',
  ]),
  objet: z.string().min(3).max(200),
  message: z.string().min(10).max(4000),
  consent: z.literal(true),
})


export async function POST(req: NextRequest) {
  // Rate limiting (formulaire ACPR — 3 réclamations / 15 min / IP).
  // Conforme Recommandation ACPR 2024-R-02 : éviter saturation médiateur,
  // tout en laissant la possibilité légitime de soumettre une réclamation
  // multi-contrat (max 3 / 15 min suffit largement).
  const ip = getClientIp(req.headers)
  const rl = await checkRateLimit(`reclamation:${ip}`, { window: 900_000, max: 3 })
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Trop de réclamations soumises depuis cette adresse, veuillez réessayer dans quelques minutes' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetTime - Date.now()) / 1000)) } }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  const parsed = ReclamationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Champs invalides', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data
  const ticket = makeReference('RCL')

  // 1) Persistance Supabase
  try {
    const supabase = createPiiAdminClient()
    const { error } = await supabase.from('reclamations').insert({
      ticket,
      civilite: data.civilite,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone || null,
      societe: data.societe || null,
      contrat: data.contrat || null,
      sinistre_ref: data.sinistre_ref || null,
      categorie: data.categorie,
      objet: data.objet,
      message: data.message,
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
      user_agent: req.headers.get('user-agent') ?? null,
      status: 'received',
    })
    if (error) {
      logger.error({ err: error, ticket }, 'reclamation supabase insert error')
      captureApiException(error, { route: 'api/reclamation', category: 'compliance', extra: { ticket, stage: 'supabase-insert' } })
      return NextResponse.json({ error: 'Persistence indisponible' }, { status: 500 })
    }
  } catch (e) {
    logger.error({ err: e, ticket }, 'reclamation admin client error')
    captureApiException(e, { route: 'api/reclamation', category: 'compliance', extra: { ticket, stage: 'admin-client' } })
    return NextResponse.json({ error: 'Persistence indisponible' }, { status: 500 })
  }

  // 2) Emails best-effort (non-bloquant : le ticket est déjà persisté).
  // Une défaillance email n'invalide pas la réception réglementaire ACPR.
  void (async () => {
    try {
      const ack = reclamationAckTemplate({
        ticket,
        prenom: data.prenom,
        nom: data.nom,
        objet: data.objet,
        categorie: data.categorie,
      })
      await sendEmail({ to: data.email, subject: ack.subject, html: ack.html })
    } catch (err) {
      logger.error({ err, ticket }, 'reclamation ack email failed')
      captureApiException(err, { route: 'api/reclamation', category: 'compliance', extra: { ticket, stage: 'ack-email' } })
    }
    try {
      const internal = reclamationInternalNotificationTemplate({
        ticket,
        payload: {
          civilite: data.civilite,
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          societe: data.societe,
          contrat: data.contrat,
          sinistre_ref: data.sinistre_ref,
          categorie: data.categorie,
          objet: data.objet,
          message: data.message,
        },
      })
      await sendEmail({ to: RECLAMATIONS_INBOX, subject: internal.subject, html: internal.html })
    } catch (err) {
      logger.error({ err, ticket }, 'reclamation internal notification failed')
      captureApiException(err, { route: 'api/reclamation', category: 'compliance', extra: { ticket, stage: 'internal-notification' } })
    }
  })()

  return NextResponse.json({ ticket }, { status: 201 })
}
