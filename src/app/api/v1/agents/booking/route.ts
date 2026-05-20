/**
 * POST /api/v1/agents/booking — Agentic Booking API.
 *
 * Permet aux LLM/agents externes (ChatGPT, Claude, Perplexity, Gemini)
 * de créer un lead courtier direct depuis leur interface conversationnelle.
 *
 * Auth:
 *   - Bearer token OAuth 2.1 (optionnel pour MVP, requis production)
 *   - OU clé API agent (header X-Agent-Source)
 *
 * Consent:
 *   - L'agent doit transmettre consent_text + consent_at (RGPD compliance).
 *
 * Post-création:
 *   - Email confirmation au lead
 *   - Email alerte à Marvin (courtier)
 *   - Retour booking_reference + URL tracking
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { randomBytes } from 'node:crypto'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/resend'
import { leadConfirmationTemplate } from '@/lib/email/templates/lead-confirmation'
import { introspectAccessToken } from '@/lib/oauth/mcp-gateway'
import { enqueueWebhookDeliveries } from '@/lib/webhooks/dispatcher'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'
const MARVIN_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL ?? 'marvin@vivos-assurance.fr'

const GARANTIES = [
  'decennale',
  'rc-pro',
  'multirisque-pro',
  'mutuelle-pro',
  'prevoyance',
  'cyber',
  'vtc',
  'dommages-ouvrage',
  'tous-risques-chantier',
  'transport-marchandises',
  'moto-pro',
  'protection-juridique-pro',
  'homme-cle',
  'flotte-auto',
] as const

const AGENT_SOURCES = ['openai', 'anthropic', 'perplexity', 'gemini', 'mcp', 'other'] as const

const bodySchema = z.object({
  email: z.string().email().toLowerCase().max(255),
  first_name: z.string().min(1).max(100).optional(),
  last_name: z.string().min(1).max(100).optional(),
  phone: z.string().max(30).optional(),
  garantie: z.enum(GARANTIES),
  metier: z.string().max(100).optional(),
  statut_juridique: z.string().max(50).optional(),
  ca_annuel: z.number().positive().max(100_000_000).optional(),
  ville: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  preferred_contact_window: z.enum(['morning', 'afternoon', 'evening', 'asap']).optional(),
  agent_source: z.enum(AGENT_SOURCES),
  agent_session_id: z.string().max(128).optional(),
  agent_user_pseudo_id: z.string().max(128).optional(),
  consent_at: z.string().datetime(),
  consent_text: z.string().min(20).max(1000),
})

function generateBookingReference(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-6)
  const rnd = randomBytes(2).toString('hex').toUpperCase()
  return `AGT-${ts}-${rnd}`
}

export async function POST(req: NextRequest) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', details: parsed.error.format() },
      { status: 400 }
    )
  }

  // OAuth optionnel pour MVP, log si présent
  let oauthClientId: string | null = null
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    const introspection = await introspectAccessToken(token)
    if (introspection.active && introspection.clientId) {
      oauthClientId = introspection.clientId
    } else {
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
    }
  }

  const reference = generateBookingReference()
  const data = parsed.data

  const admin = createAdminClient()
  const { error: insertErr } = await admin.from('agent_bookings').insert({
    booking_reference: reference,
    user_email: data.email,
    user_first_name: data.first_name ?? null,
    user_last_name: data.last_name ?? null,
    user_phone: data.phone ?? null,
    garantie_souhaitee: data.garantie,
    metier: data.metier ?? null,
    statut_juridique: data.statut_juridique ?? null,
    ca_annuel: data.ca_annuel ?? null,
    ville: data.ville ?? null,
    message: data.message ?? null,
    preferred_contact_window: data.preferred_contact_window ?? null,
    agent_source: data.agent_source,
    agent_session_id: data.agent_session_id ?? null,
    agent_user_pseudo_id: data.agent_user_pseudo_id ?? null,
    oauth_client_id: oauthClientId,
    consent_at: data.consent_at,
    consent_text: data.consent_text,
  })

  if (insertErr) {
    logger.error({ err: insertErr, reference }, 'agent_booking insert failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  // Email confirmation lead
  const firstName = data.first_name ?? 'Client'
  const lastName = data.last_name ?? ''
  const confirmation = leadConfirmationTemplate({
    reference,
    prenom: firstName,
    nom: lastName,
    garantie: data.garantie,
    metier: data.metier,
    segment: 'hot',
  })
  void sendEmail({
    to: data.email,
    subject: confirmation.subject,
    html: confirmation.html,
  }).catch((err) => logger.error({ err, reference }, 'agent_booking confirmation email failed'))

  // Email alerte Marvin
  void sendEmail({
    to: MARVIN_EMAIL,
    subject: `[AGENT-${data.agent_source.toUpperCase()}] Lead ${data.garantie} — ${reference}`,
    html: `<p><strong>Nouveau lead via agent IA (${data.agent_source})</strong></p>
<ul>
  <li>Référence: ${reference}</li>
  <li>Email: ${data.email}</li>
  <li>Nom: ${firstName} ${lastName}</li>
  <li>Téléphone: ${data.phone ?? 'non communiqué'}</li>
  <li>Garantie: ${data.garantie}</li>
  <li>Métier: ${data.metier ?? '-'}</li>
  <li>Statut: ${data.statut_juridique ?? '-'}</li>
  <li>CA annuel: ${data.ca_annuel ?? '-'}€</li>
  <li>Ville: ${data.ville ?? '-'}</li>
  <li>Préférence contact: ${data.preferred_contact_window ?? 'pas de préférence'}</li>
  <li>OAuth client: ${oauthClientId ?? 'aucun (MVP)'}</li>
</ul>
<p><strong>Message:</strong></p>
<blockquote>${data.message ?? 'Aucun message'}</blockquote>
<p><strong>Consent:</strong> ${data.consent_text}</p>`,
  }).catch((err) => logger.error({ err, reference }, 'agent_booking marvin notify failed'))

  await admin
    .from('agent_bookings')
    .update({ marvin_notified_at: new Date().toISOString() })
    .eq('booking_reference', reference)

  // Emit webhook event agent_booking.created to all subscribers
  void enqueueWebhookDeliveries({
    event: 'agent_booking.created',
    payload: {
      booking_reference: reference,
      garantie: data.garantie,
      metier: data.metier ?? null,
      statut_juridique: data.statut_juridique ?? null,
      ca_annuel: data.ca_annuel ?? null,
      ville: data.ville ?? null,
      agent_source: data.agent_source,
      agent_session_id: data.agent_session_id ?? null,
      created_at: new Date().toISOString(),
      tracking_url: `${SITE_URL}/lead-status/${reference}`,
    },
  }).catch((err) => logger.error({ err, reference }, 'agent_booking webhook enqueue failed'))

  return NextResponse.json(
    {
      status: 'created',
      booking_reference: reference,
      tracking_url: `${SITE_URL}/lead-status/${reference}`,
      sla: 'Un courtier ORIAS vous contactera sous 2h ouvrées.',
      consent_recorded_at: data.consent_at,
    },
    { status: 201 }
  )
}

export function GET() {
  return NextResponse.json({
    endpoint: '/api/v1/agents/booking',
    method: 'POST',
    description: 'Agentic booking API — LLM/agents externes créent leads courtier ORIAS.',
    auth: 'OAuth 2.1 Bearer (optionnel MVP)',
    consent_required: true,
    required_fields: ['email', 'garantie', 'agent_source', 'consent_at', 'consent_text'],
    optional_fields: [
      'first_name',
      'last_name',
      'phone',
      'metier',
      'statut_juridique',
      'ca_annuel',
      'ville',
      'message',
      'preferred_contact_window',
      'agent_session_id',
      'agent_user_pseudo_id',
    ],
    valid_garanties: GARANTIES,
    valid_agent_sources: AGENT_SOURCES,
    docs: `${SITE_URL}/llms-full.txt`,
  })
}
