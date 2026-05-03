/**
 * POST /api/admin/conseil-recommandation
 *
 * Endpoint courtier — finalise et envoie la recommandation écrite motivée
 * (art. L. 521-4 C. assur., Recommandation ACPR 2024-R-03) au prospect.
 *
 * Effets :
 * 1) Met à jour le record `public.conseil_records` correspondant avec la
 *    motivation écrite + alternatives examinées + nombre de contrats.
 * 2) Calcule un nouveau hash SHA-256 immuable (signature opposable).
 * 3) Envoie l'email de recommandation au prospect avec le hash en pièce de preuve.
 * 4) Met à jour `public.leads.status` → 'quoted'.
 *
 * Auth : header `Authorization: Bearer ${ADMIN_API_TOKEN}`.
 * Le token doit être un secret distinct du CRON_SECRET, scoped à l'admin
 * dashboard (à terme remplacé par une session courtier authentifiée).
 */

import { NextResponse, type NextRequest } from 'next/server'
import { createHash, timingSafeEqual } from 'node:crypto'
import { z } from 'zod'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { sendEmail } from '@/lib/email/resend'
import { conseilRecommandationTemplate } from '@/lib/email/templates/conseil-recommandation'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const Schema = z.object({
  // Nonce anti-replay : UUID v4 généré côté caller, consommé une seule fois.
  nonce: z.string().uuid(),
  // TTL : timestamp epoch ms — refusé si > 5 min dans le passé (clock skew safe).
  issued_at: z.number().int().positive(),
  reference: z.string().regex(/^LEAD-\d{8}-[A-Z0-9]{10}$/),
  produit_recommande: z.string().min(2).max(200),
  partenaire_recommande: z.string().min(2).max(80),
  motivation_choix: z.string().min(50).max(4000),
  alternatives_examinees: z
    .array(
      z.object({
        partenaire: z.string().min(2).max(80),
        raison_ecart: z.string().min(10).max(500),
      })
    )
    .min(0)
    .max(10),
  nombre_contrats_analyses: z.number().int().min(1).max(50),
  plafond_garantie: z.string().max(80).optional(),
  cotisation_annuelle: z.string().max(80).optional(),
  signature_courtier: z.string().min(2).max(120),
  orias_courtier: z.string().min(5).max(40),
  delivery_method: z.enum(['email', 'phone', 'docusign', 'meeting', 'signed_pdf']).default('email'),
})

function verifyAdminAuth(authHeader: string | null): boolean {
  const secret = process.env.ADMIN_API_TOKEN
  if (!secret || !authHeader) return false
  const expected = `Bearer ${secret}`
  if (authHeader.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(authHeader), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdminAuth(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data

  // Validation de la fenêtre temporelle : issued_at doit être dans les 5 dernières min.
  const now = Date.now()
  const ageMs = now - data.issued_at
  if (ageMs < -60_000 || ageMs > 5 * 60_000) {
    return NextResponse.json({ error: 'Token expiré ou clock skew trop large.' }, { status: 400 })
  }

  try {
    const admin = createPiiAdminClient()

    // Anti-replay : consume le nonce avant tout traitement métier.
    const nonceExpiresAt = new Date(data.issued_at + 5 * 60_000).toISOString()
    const { data: nonceData, error: nonceErr } = await admin
      .from('admin_nonce_consumed')
      .upsert(
        {
          nonce: data.nonce,
          endpoint: 'conseil-recommandation',
          expires_at: nonceExpiresAt,
        },
        { onConflict: 'nonce', ignoreDuplicates: true }
      )
      .select('nonce')

    if (nonceErr) {
      logger.error({ err: nonceErr, nonce: data.nonce.slice(0, 8) }, 'admin nonce consume failed')
      return NextResponse.json({ error: 'Service indisponible.' }, { status: 500 })
    }
    if (!nonceData || nonceData.length === 0) {
      logger.warn({ nonce: data.nonce.slice(0, 8) }, 'admin-conseil-recommandation: nonce replay rejected')
      return NextResponse.json({ error: 'Nonce déjà consommé.' }, { status: 409 })
    }

    // 1) Récupère le lead canonique
    const { data: lead, error: leadErr } = await admin
      .from('leads')
      .select('id, contact_prenom, contact_nom, contact_email, vertical, metier_slug, conseil_hash')
      .eq('reference', data.reference)
      .single()

    if (leadErr || !lead) {
      logger.warn({ reference: data.reference }, 'conseil-recommandation : lead introuvable')
      return NextResponse.json({ error: 'Référence introuvable' }, { status: 404 })
    }

    // 2) Récupère le conseil_record existant (créé au moment du devis)
    const { data: conseil, error: conseilErr } = await admin
      .from('conseil_records')
      .select('id, besoins, signature_hash')
      .eq('reference', data.reference)
      .single()

    if (conseilErr || !conseil) {
      return NextResponse.json({ error: 'conseil_record introuvable' }, { status: 404 })
    }

    // 3) Calcule un nouveau hash combinant les besoins initiaux ET la recommandation.
    // conseil_records est immuable (trigger anti-UPDATE). On insère donc un nouveau
    // record (conseil_record_id_v2) et on lie au lead via reference.
    const recommandations = {
      stage: 'recommandation_emise',
      produit_recommande: data.produit_recommande,
      partenaire_recommande: data.partenaire_recommande,
      motivation_choix: data.motivation_choix,
      alternatives_examinees: data.alternatives_examinees,
      nombre_contrats_analyses: data.nombre_contrats_analyses,
      plafond_garantie: data.plafond_garantie ?? null,
      cotisation_annuelle: data.cotisation_annuelle ?? null,
      delivery_method: data.delivery_method,
      delivery_at: new Date().toISOString(),
      signature_courtier: data.signature_courtier,
      orias_courtier: data.orias_courtier,
    }

    // Hash déterministe : tri récursif à TOUS les niveaux (Object.keys.sort()
    // en replacer JSON.stringify ne trie que le 1er niveau — non opposable).
    const sortedStringify = (value: unknown): string => {
      if (value === null || typeof value !== 'object') return JSON.stringify(value)
      if (Array.isArray(value)) return '[' + value.map(sortedStringify).join(',') + ']'
      const obj = value as Record<string, unknown>
      const keys = Object.keys(obj).sort()
      return '{' + keys.map((k) => JSON.stringify(k) + ':' + sortedStringify(obj[k])).join(',') + '}'
    }
    const fullPayload = { besoins: conseil.besoins, recommandations, reference: data.reference }
    const newHash = createHash('sha256').update(sortedStringify(fullPayload)).digest('hex')

    // Trigger DB anti-UPDATE — on enregistre un nouveau record (conservation legacy).
    const { error: insertErr } = await admin.from('conseil_records').insert({
      lead_id: lead.id,
      reference: `${data.reference}-RECO`,
      besoins: conseil.besoins,
      recommandations,
      produits_proposes: [
        { partenaire: data.partenaire_recommande, produit: data.produit_recommande },
        ...data.alternatives_examinees.map((a) => ({
          partenaire: a.partenaire,
          produit: 'alternative_examinee',
          raison_ecart: a.raison_ecart,
        })),
      ],
      signature_hash: newHash,
      signed_by_email: lead.contact_email,
      signed_at: new Date().toISOString(),
    })

    if (insertErr) {
      logger.error({ err: insertErr, reference: data.reference }, 'conseil-recommandation insert failed')
      return NextResponse.json({ error: 'Persistence indisponible' }, { status: 500 })
    }

    // 4) Met à jour le statut du lead (audit error explicit)
    const { error: statusErr } = await admin.from('leads').update({ status: 'quoted' }).eq('id', lead.id)
    if (statusErr) {
      logger.warn({ err: statusErr, leadId: lead.id }, 'conseil-recommandation: status update failed')
    }

    // Audit log : qui/quand/quel dossier (preuve d'appel admin opposable)
    logger.info(
      {
        ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown',
        reference: data.reference,
        orias_courtier: data.orias_courtier,
        signature_hash: newHash.slice(0, 16),
      },
      'admin-conseil-recommandation: invoked'
    )

    // 5) Email recommandation au prospect (best-effort)
    void (async () => {
      try {
        const tpl = conseilRecommandationTemplate({
          reference: data.reference,
          prenom: lead.contact_prenom,
          nom: lead.contact_nom,
          garantie: lead.vertical,
          metier: lead.metier_slug ?? undefined,
          produitRecommande: data.produit_recommande,
          partenaireRecommande: data.partenaire_recommande,
          motivationChoix: data.motivation_choix,
          alternativesExaminees: data.alternatives_examinees,
          nombreContratsAnalyses: data.nombre_contrats_analyses,
          plafondGarantie: data.plafond_garantie,
          cotisationAnnuelle: data.cotisation_annuelle,
          signatureCourtier: data.signature_courtier,
          oriasCourtier: data.orias_courtier,
          signatureHash: newHash,
        })
        await sendEmail({ to: lead.contact_email, subject: tpl.subject, html: tpl.html })
        logger.info(
          { reference: data.reference, hash: newHash.slice(0, 16) },
          'conseil-recommandation : email envoyé au prospect'
        )
      } catch (err) {
        logger.error({ err, reference: data.reference }, 'conseil-recommandation email failed')
      }
    })()

    return NextResponse.json({
      ok: true,
      reference: data.reference,
      signature_hash: newHash,
      delivery_method: data.delivery_method,
    })
  } catch (err) {
    logger.error({ err }, '/api/admin/conseil-recommandation error')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
