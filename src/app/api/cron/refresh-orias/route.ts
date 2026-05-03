/**
 * CRON — Refresh hebdomadaire ORIAS pour les courtiers actifs
 * Cadence : 1× / semaine (Vercel Cron)
 * Vérifie le statut ORIAS des auteurs du site (E-E-A-T critique)
 */

import { NextResponse, type NextRequest } from 'next/server'
import { fetchOriasFiche } from '@/lib/api/orias'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/supabase/server'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'

export async function GET(req: NextRequest) {
  if (!verifyCronAuthorization(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = await createClient()

    // Récupérer tous les courtiers ORIAS actifs (auteurs du site)
    const { data: profiles } = await supabase
      .schema('app')
      .from('profiles')
      .select('id, orias_number, full_name')
      .eq('is_orias_certified', true)
      .not('orias_number', 'is', null)

    let updated = 0
    let suspended = 0

    for (const p of profiles ?? []) {
      if (!p.orias_number) continue
      const fiche = await fetchOriasFiche(p.orias_number)
      if (!fiche) {
        logger.warn({ orias: p.orias_number, name: p.full_name }, 'ORIAS fiche unavailable')
        continue
      }

      // Cache dans la table orias_register_cache
      await supabase
        .schema('app')
        .from('orias_register_cache')
        .upsert({
          orias_number: fiche.orias_number,
          legal_name: fiche.legal_name,
          siret: fiche.siret,
          category: fiche.category,
          status: fiche.status,
          immatriculation_date: fiche.immatriculation_date,
          address: fiche.address,
          postal_code: fiche.postal_code,
          city: fiche.city,
          last_synced_at: new Date().toISOString(),
        }, { onConflict: 'orias_number' })

      if (fiche.status !== 'ACTIVE') {
        suspended++
        logger.warn(
          { orias: p.orias_number, status: fiche.status, name: p.full_name },
          '⚠️ Auteur ORIAS non-actif — désactiver les pages signées par lui'
        )
      }
      updated++
    }

    return NextResponse.json({
      ok: true,
      profiles_checked: profiles?.length ?? 0,
      updated,
      suspended,
    })
  } catch (err) {
    logger.error({ err }, 'ORIAS cron failed')
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
