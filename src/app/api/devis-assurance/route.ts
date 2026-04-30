/**
 * POST /api/devis-assurance
 *
 * Endpoint principal de captation des leads assurance pro.
 * Pipeline complet : validation → scoring → routing → dispatch → audit.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { scoreLead } from '@/lib/courtage/scoring-leads'
import { decideRouting, dispatchLeadToPartners } from '@/lib/courtage/routing-assureurs'
import { logger } from '@/lib/logger'

const Schema = z.object({
  // Étape 1
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

  // Étape 2
  anciennete_annees: z.number().int().min(0).max(80),
  sinistralite_36m: z.number().int().min(0).max(20),
  garanties_demandees: z.array(z.string()).default([]),
  sous_traitance: z.boolean().default(false),

  // Étape 3
  prenom: z.string().min(2).max(80),
  nom: z.string().min(2).max(80),
  email: z.string().email(),
  telephone: z.string().min(10).max(20),
  siret: z.string().optional().transform((v) => v?.replace(/\s/g, '') || undefined),
  consent_rgpd: z.literal(true),
  consent_marketing: z.boolean().optional().default(false),

  // Tracking source pSEO
  source_page_id: z.string().uuid().optional(),
  source_url: z.string().url().optional(),
  utm: z.record(z.string(), z.string()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = Schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const data = parsed.data

    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const userAgent = headersList.get('user-agent') ?? 'unknown'

    const supabase = await createClient()

    // 1. Calculer le score
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

    // 2. Insert lead
    const { data: lead, error: insertErr } = await supabase
      .schema('app')
      .from('insurance_leads')
      .insert({
        vertical: deriveVertical(data.metier_code),
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
        status: 'new',
      })
      .select('id')
      .single()

    if (insertErr || !lead) {
      logger.error({ err: insertErr }, 'Lead insert failed')
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
    }

    // 3. Audit event
    await supabase.schema('app').from('events').insert({
      entity_type: 'lead',
      entity_id: lead.id,
      event_type: 'lead.created',
      ip_address: ip,
      user_agent: userAgent,
      metadata: {
        score: scoring.score,
        segment: scoring.segment,
        breakdown: scoring.breakdown,
        source_page_id: data.source_page_id,
        source_url: data.source_url,
      },
    })

    // 4. Routing async (non-bloquant)
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
      score: scoring.score,
      segment: scoring.segment,
      redirect_url: '/devis/merci?id=' + lead.id,
    })
  } catch (err) {
    logger.error({ err }, '/api/devis-assurance error')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

function deriveVertical(metierCode: string): string {
  const verticals: Record<string, string[]> = {
    BTP: ['macon', 'plombier', 'electricien', 'couvreur_zingueur', 'charpentier_bois', 'peintre', 'menuisier_interieur', 'menuisier_exterieur', 'carreleur', 'plaquiste_platrier', 'etancheur', 'facadier_ite', 'photovoltaique', 'pisciniste', 'paysagiste', 'multi_services_btp'],
    VTC_TAXI: ['vtc', 'taxi', 'chauffeur_prive', 'lvc'],
    AVOCATS_JURIDIQUE: ['avocat', 'notaire', 'huissier', 'mandataire_judiciaire', 'expert_comptable', 'commissaire_aux_comptes'],
    SANTE_MEDICAL: ['medecin_generaliste', 'medecin_specialiste', 'infirmier_libéral', 'kinesitherapeute', 'osteopathe', 'sage_femme', 'dentiste', 'psychologue', 'pharmacien'],
  }
  for (const [v, codes] of Object.entries(verticals)) {
    if (codes.includes(metierCode)) return v
  }
  return 'GENERIQUE'
}
