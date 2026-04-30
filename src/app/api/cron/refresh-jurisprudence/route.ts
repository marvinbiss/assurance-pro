/**
 * CRON — Refresh mensuel jurisprudence Légifrance
 * Cadence : 1× / mois (Vercel Cron)
 * Importe les décisions Cour de cassation récentes par mot-clé métier × garantie
 */

import { NextResponse, type NextRequest } from 'next/server'
import { searchJurisprudence } from '@/lib/api/legifrance'
import { logger } from '@/lib/logger'
import { createClient } from '@/lib/supabase/server'

const QUERIES = [
  'décennale plombier',
  'décennale couvreur',
  'décennale maçon',
  'décennale charpentier',
  'décennale électricien',
  'décennale étanchéité',
  'décennale photovoltaïque',
  'rc pro avocat',
  'rc pro médecin',
  'rc pro vtc',
  'dommages ouvrage',
  'multirisque commerce',
  'cyber assurance',
]

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = await createClient()
    let totalImported = 0

    for (const query of QUERIES) {
      try {
        const decisions = await searchJurisprudence(query, { pageSize: 20 })
        for (const d of decisions) {
          await supabase
            .schema('app')
            .from('jurisprudence_assurance')
            .upsert({
              legifrance_id: d.id,
              numero_pourvoi: d.numero,
              date_arret: d.date,
              juridiction: d.juridiction,
              resume: d.resume ?? d.titre,
              enseignements: d.solution ?? '',
              url_legifrance: d.url,
              importance: 3,
            }, { onConflict: 'legifrance_id' })
          totalImported++
        }
      } catch (err) {
        logger.error({ err, query }, 'Légifrance query failed')
      }
    }

    return NextResponse.json({
      ok: true,
      total_imported: totalImported,
      queries_processed: QUERIES.length,
    })
  } catch (err) {
    logger.error({ err }, 'Légifrance cron failed')
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
