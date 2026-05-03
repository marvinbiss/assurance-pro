/**
 * POST /api/devis-assurance
 *
 * Endpoint principal de captation des leads assurance pro.
 * Pipeline complet : validation → scoring → routing → emails → audit DDA.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { makeReference } from '@/lib/security/reference'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter'
import { scoreLead } from '@/lib/courtage/scoring-leads'
import { decideRouting, dispatchLeadToPartners } from '@/lib/courtage/routing-assureurs'
import { persistLead } from '@/lib/courtage/lead-persistence'
import { sendEmail } from '@/lib/email/resend'
import {
  leadConfirmationTemplate,
  internalLeadAlertTemplate,
} from '@/lib/email/templates/lead-confirmation'
import {
  buildExigencesSnapshot,
  hashExigences,
  deriveLegalRequirements,
} from '@/lib/compliance/exigences-capture'
import { logger } from '@/lib/logger'
import { captureApiException } from '@/lib/observability/sentry'

const Schema = z.object({
  garantie_code: z.string().min(2),
  metier_code: z.string().min(2),
  ville: z.string().optional(),
  postal_code: z.string().regex(/^\d{5}$/),
  ca_range: z.enum(['lt_50k', '50_100k', '100_250k', '250_500k', 'gt_500k']),
  statut_juridique: z.enum([
    'auto_entrepreneur',
    'ei',
    'eurl',
    'sarl',
    'sasu',
    'sas',
    'profession_liberale',
  ]),
  anciennete_annees: z.number().int().min(0).max(80),
  sinistralite_36m: z.number().int().min(0).max(20),
  garanties_demandees: z.array(z.string()).default([]),
  sous_traitance: z.boolean().default(false),
  prenom: z.string().min(2).max(80),
  nom: z.string().min(2).max(80),
  email: z.string().email(),
  telephone: z.string().min(10).max(20),
  siret: z
    .string()
    .optional()
    .transform((v) => v?.replace(/\s/g, '') || undefined),
  consent_rgpd: z.literal(true),
  consent_fic_ipid: z.literal(true, {
    message: 'Vous devez confirmer avoir consulté la FIC et les IPID (art. L. 521-2 C. assur.).',
  }),
  consent_marketing: z.boolean().optional().default(false),
  source_page_id: z.string().uuid().optional(),
  source_url: z.string().url().optional(),
  utm: z.record(z.string(), z.string()).optional(),
})

const COURTIER_INBOX = process.env.COURTIER_INBOX ?? 'leads@assurance-pro.fr'


export async function POST(req: NextRequest) {
  try {
    // Rate-limit per-IP (5 req / 5 min) — protège contre flood bot et coût email
    // (le rate-limit générique du middleware est complété par cette policy stricte).
    const ip = getClientIp(req.headers)
    const ipLimit = await checkRateLimit(`devis:${ip}`, { window: 300_000, max: 5 })
    if (!ipLimit.allowed) {
      const retryAfter = Math.ceil((ipLimit.resetTime - Date.now()) / 1000)
      return NextResponse.json(
        { error: 'Trop de demandes. Veuillez réessayer dans quelques minutes.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const body = await req.json()
    const parsed = Schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const data = parsed.data

    // Rate-limit per-email (3 req / heure) — anti-doublon + anti-bombing.
    const emailLimit = await checkRateLimit(`devis-email:${data.email.toLowerCase()}`, {
      window: 3_600_000,
      max: 3,
    })
    if (!emailLimit.allowed) {
      const retryAfter = Math.ceil((emailLimit.resetTime - Date.now()) / 1000)
      return NextResponse.json(
        { error: 'Une demande pour cet email a déjà été enregistrée récemment.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }

    const headersList = await headers()
    const userAgent = headersList.get('user-agent') ?? 'unknown'

    const reference = makeReference('LEAD')
    const vertical = deriveVertical(data.metier_code)

    // Conseil DDA — snapshot exigences + hash signature
    const exigences = buildExigencesSnapshot({
      vertical,
      metier_code: data.metier_code,
      garantie_code: data.garantie_code,
      statut_juridique: data.statut_juridique,
      tranche_ca: data.ca_range,
      anciennete_annees: data.anciennete_annees,
      sinistralite_36m: data.sinistralite_36m,
      sous_traitance: data.sous_traitance,
      garanties_demandees: data.garanties_demandees,
      postal_code: data.postal_code,
      ville: data.ville,
    })
    const conseilHash = hashExigences(exigences)
    const obligationsLegales = deriveLegalRequirements(exigences)

    // Scoring
    const scoring = scoreLead({
      metier_code: data.metier_code,
      ca_range: data.ca_range,
      statut_juridique: data.statut_juridique,
      anciennete_annees: data.anciennete_annees,
      sinistralite_36m: data.sinistralite_36m,
      garanties_demandees: data.garanties_demandees,
      time_on_site_sec: 0,
      pages_viewed: 1,
      form_completed_one_shot: true,
      has_siret: Boolean(data.siret),
    })

    const supabase = await createClient()

    // 1) Persiste le lead — ADR-001 : public.leads est canonique,
    //    app.insurance_leads en parallèle pendant la fenêtre de dépréciation.
    let persistResult
    try {
      persistResult = await persistLead(
        supabase,
        {
          vertical,
          metier_code: data.metier_code,
          garantie_code: data.garantie_code,
          statut_juridique: data.statut_juridique,
          tranche_ca_code: data.ca_range,
          source_page_id: data.source_page_id,
          source_url: data.source_url,
          utm: data.utm,
          postal_code: data.postal_code,
          siret: data.siret,
          anciennete_annees: data.anciennete_annees,
          sinistralite_36m: data.sinistralite_36m,
          sous_traitance: data.sous_traitance,
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          consent_rgpd: data.consent_rgpd,
          consent_marketing: data.consent_marketing,
          score: scoring.score,
          segment: scoring.segment,
        },
        {
          reference,
          vertical,
          metier_slug: data.metier_code,
          forme_juridique: data.statut_juridique,
          ville: data.ville,
          ville_cp: data.postal_code,
          contact_civilite: 'M.',
          contact_prenom: data.prenom,
          contact_nom: data.nom,
          contact_email: data.email,
          contact_telephone: data.telephone,
          scoring: scoring.segment,
          scoring_score: scoring.score,
          utm: data.utm ?? {},
          ip,
          user_agent: userAgent,
          consent_dda: data.consent_rgpd,
          consent_marketing: data.consent_marketing,
          conseil_hash: conseilHash,
          fic_acknowledged_at: new Date().toISOString(),
          fic_acknowledged_version: 'v1',
        },
        {
          reference,
          besoins: { ...exigences, obligations_legales: obligationsLegales },
          signature_hash: conseilHash,
        }
      )
    } catch (e) {
      logger.error({ err: e }, 'Lead persistence failed')
      return NextResponse.json({ error: 'Persistence indisponible' }, { status: 500 })
    }
    const lead = { id: persistResult.legacyLeadId }

    // 3) Audit event
    await supabase.schema('app').from('events').insert({
      entity_type: 'lead',
      entity_id: lead.id,
      event_type: 'lead.created',
      ip_address: ip,
      user_agent: userAgent,
      metadata: {
        reference,
        score: scoring.score,
        segment: scoring.segment,
        breakdown: scoring.breakdown,
        conseil_hash: conseilHash,
        obligations_legales: obligationsLegales,
        source_page_id: data.source_page_id,
        source_url: data.source_url,
      },
    })

    // 4) Emails (best-effort, non-bloquant)
    void (async () => {
      try {
        const conf = leadConfirmationTemplate({
          reference,
          prenom: data.prenom,
          nom: data.nom,
          garantie: data.garantie_code,
          metier: data.metier_code,
          segment: scoring.segment,
        })
        await sendEmail({ to: data.email, subject: conf.subject, html: conf.html })
      } catch (err) {
        logger.error({ err, leadId: lead.id }, 'Lead confirmation email failed')
      }
      try {
        const alert = internalLeadAlertTemplate({
          reference,
          segment: scoring.segment,
          score: scoring.score,
          payload: {
            prenom: data.prenom,
            nom: data.nom,
            email: data.email,
            telephone: data.telephone,
            siret: data.siret,
            metier: data.metier_code,
            garantie: data.garantie_code,
            statut: data.statut_juridique,
            ca: data.ca_range,
            anciennete: data.anciennete_annees,
            sinistralite_36m: data.sinistralite_36m,
            postal_code: data.postal_code,
            ville: data.ville,
            obligations_legales: obligationsLegales.join(', '),
            conseil_hash: conseilHash.slice(0, 16) + '…',
          },
        })
        await sendEmail({ to: COURTIER_INBOX, subject: alert.subject, html: alert.html })
      } catch (err) {
        logger.error({ err, leadId: lead.id }, 'Internal lead alert failed')
      }
    })()

    // 5) Routing async (non-bloquant)
    void (async () => {
      try {
        const decision = await decideRouting({
          lead_id: lead.id,
          metier_code: data.metier_code,
          garantie_code: data.garantie_code,
          statut_juridique: data.statut_juridique,
          tranche_ca: data.ca_range,
          score: scoring.score,
          segment: scoring.segment,
        })
        await dispatchLeadToPartners(lead.id, decision)
      } catch (err) {
        logger.error({ err, leadId: lead.id }, 'Async routing failed')
      }
    })()

    return NextResponse.json({
      lead_id: lead.id,
      reference,
      score: scoring.score,
      segment: scoring.segment,
      conseil_hash: conseilHash,
      redirect_url: `/devis/merci?ref=${reference}&seg=${scoring.segment}`,
    })
  } catch (err) {
    logger.error({ err }, '/api/devis-assurance error')
    captureApiException(err, { route: 'api/devis-assurance', category: 'lead' })
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

function deriveVertical(metierCode: string): string {
  const verticals: Record<string, string[]> = {
    BTP: [
      'macon',
      'plombier',
      'electricien',
      'couvreur_zingueur',
      'charpentier_bois',
      'peintre',
      'menuisier_interieur',
      'menuisier_exterieur',
      'carreleur',
      'plaquiste_platrier',
      'etancheur',
      'facadier_ite',
      'photovoltaique',
      'pisciniste',
      'paysagiste',
      'multi_services_btp',
    ],
    VTC_TAXI: ['vtc', 'taxi', 'chauffeur_prive', 'lvc'],
    AVOCATS_JURIDIQUE: [
      'avocat',
      'notaire',
      'huissier',
      'mandataire_judiciaire',
      'expert_comptable',
      'commissaire_aux_comptes',
    ],
    SANTE_MEDICAL: [
      'medecin_generaliste',
      'medecin_specialiste',
      'infirmier_libéral',
      'kinesitherapeute',
      'osteopathe',
      'sage_femme',
      'dentiste',
      'psychologue',
      'pharmacien',
    ],
  }
  for (const [v, codes] of Object.entries(verticals)) {
    if (codes.includes(metierCode)) return v
  }
  return 'GENERIQUE'
}
