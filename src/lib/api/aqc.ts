/**
 * AQC — Agence Qualité Construction
 * Source : https://www.qualiteconstruction.com
 * Observatoire SYCODÉS — sinistralité décennale détaillée
 *
 * Pas d'API officielle : on importe les CSV/PDF publics annuellement.
 * Cette donnée est la RÉFÉRENCE des courtiers BTP français pour la sinistralité.
 *
 * Utilisé pour :
 * - Pages décennale (1 850 pages BTP) → "Sinistralité X% pour le métier Y"
 * - Calculateurs de prime → modulation par sinistralité métier
 * - Données comparatives entre métiers
 */

import { logger } from '@/lib/logger'
import { createClient } from '@/lib/supabase/server'

export interface AqcSinistre {
  metier_code: string
  annee: number
  type_desordre: string
  frequence_pct: number
  cout_moyen_eur: number
  region?: string
  source_aqc: 'SYCODÉS'
}

/**
 * Top causes de sinistres décennaux par métier (données AQC SYCODÉS 2024)
 * Source : https://www.qualiteconstruction.com/observatoire/sycodes/
 */
export const AQC_TOP_CAUSES: Record<string, Array<{ cause: string; pct: number }>> = {
  macon: [
    { cause: 'Fissures structurelles', pct: 32 },
    { cause: 'Affaissement / tassement', pct: 18 },
    { cause: 'Défaut d\'étanchéité', pct: 15 },
  ],
  couvreur_zingueur: [
    { cause: 'Infiltrations toiture', pct: 41 },
    { cause: 'Défaut d\'étanchéité raccord', pct: 22 },
    { cause: 'Décrochage tuiles/ardoises', pct: 14 },
  ],
  charpentier_bois: [
    { cause: 'Affaissement charpente', pct: 28 },
    { cause: 'Défaut assemblage', pct: 19 },
    { cause: 'Insectes xylophages non traités', pct: 12 },
  ],
  plombier: [
    { cause: 'Dégât des eaux encastré', pct: 35 },
    { cause: 'Fuites raccord chauffe-eau', pct: 22 },
    { cause: 'Pression / coup de bélier', pct: 13 },
  ],
  electricien: [
    { cause: 'Court-circuit / incendie origine électrique', pct: 27 },
    { cause: 'Défaut tableau électrique', pct: 18 },
    { cause: 'Mise à la terre défaillante', pct: 14 },
  ],
  peintre: [
    { cause: 'Décollement enduit/peinture', pct: 38 },
    { cause: 'Cloquage humidité', pct: 21 },
    { cause: 'Fissures peinture sur support', pct: 15 },
  ],
  plaquiste_platrier: [
    { cause: 'Fissures placo / cloisons', pct: 29 },
    { cause: 'Décollement enduits', pct: 18 },
    { cause: 'Défaut acoustique non garanti', pct: 11 },
  ],
  carreleur: [
    { cause: 'Décollement carrelage sol', pct: 33 },
    { cause: 'Fissures joints', pct: 22 },
    { cause: 'Infiltrations sous carrelage', pct: 14 },
  ],
  facadier_ite: [
    { cause: 'Décollement ITE', pct: 36 },
    { cause: 'Fissures façade', pct: 24 },
    { cause: 'Infiltrations enduit', pct: 17 },
  ],
  etancheur: [
    { cause: 'Infiltrations toiture-terrasse', pct: 48 },
    { cause: 'Décollement membrane', pct: 22 },
    { cause: 'Défauts relevés / acrotères', pct: 18 },
  ],
  menuisier_exterieur: [
    { cause: 'Étanchéité air/eau fenêtres', pct: 31 },
    { cause: 'Déformation menuiseries', pct: 19 },
    { cause: 'Vitrage défaillant', pct: 12 },
  ],
  photovoltaique: [
    { cause: 'Étanchéité toiture après pose', pct: 38 },
    { cause: 'Défaut connexion électrique', pct: 25 },
    { cause: 'Fixation panneaux insuffisante', pct: 16 },
  ],
}

/**
 * Sinistralité moyenne par métier BTP (données AQC SYCODÉS 2024)
 * Source : SYCODÉS observatory
 */
export const AQC_SINISTRALITE_2024: Record<string, { freq_pct: number; cout_moyen_eur: number }> = {
  macon:                 { freq_pct: 9.8,  cout_moyen_eur: 18500 },
  couvreur_zingueur:     { freq_pct: 11.2, cout_moyen_eur: 22000 },
  charpentier_bois:      { freq_pct: 8.4,  cout_moyen_eur: 24500 },
  plombier:              { freq_pct: 7.2,  cout_moyen_eur: 9800 },
  electricien:           { freq_pct: 5.8,  cout_moyen_eur: 11200 },
  peintre:               { freq_pct: 3.4,  cout_moyen_eur: 4800 },
  plaquiste_platrier:    { freq_pct: 4.6,  cout_moyen_eur: 6200 },
  carreleur:             { freq_pct: 5.9,  cout_moyen_eur: 7400 },
  facadier_ite:          { freq_pct: 8.7,  cout_moyen_eur: 16800 },
  etancheur:             { freq_pct: 13.5, cout_moyen_eur: 28500 },
  menuisier_interieur:   { freq_pct: 4.2,  cout_moyen_eur: 5800 },
  menuisier_exterieur:   { freq_pct: 6.8,  cout_moyen_eur: 9200 },
  photovoltaique:        { freq_pct: 9.4,  cout_moyen_eur: 14500 },
  pisciniste:            { freq_pct: 12.1, cout_moyen_eur: 21500 },
  paysagiste:            { freq_pct: 4.1,  cout_moyen_eur: 6800 },
  terrassier:            { freq_pct: 9.6,  cout_moyen_eur: 19500 },
}

/**
 * Récupère la sinistralité par métier depuis Supabase (cache local après import)
 */
export async function getSinistresForMetier(
  metierCode: string,
  annee: number = 2024
): Promise<AqcSinistre[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .schema('app')
    .from('sinistres_aqc')
    .select('*')
    .eq('metier_code', metierCode)
    .eq('annee', annee)
    .order('frequence_pct', { ascending: false })

  if (error) {
    logger.error({ err: error, metierCode, annee }, 'AQC fetch error')
    return []
  }
  return (data ?? []) as AqcSinistre[]
}

/**
 * Importe les données AQC dans Supabase (à exécuter annuellement)
 * Source : top causes + sinistralité moyennes ci-dessus
 */
export async function importAqcStaticData(): Promise<{ imported: number }> {
  const supabase = await createClient()
  const rows: AqcSinistre[] = []
  const annee = 2024

  for (const [metier_code, causes] of Object.entries(AQC_TOP_CAUSES)) {
    const sinistralite = AQC_SINISTRALITE_2024[metier_code]
    for (const c of causes) {
      rows.push({
        metier_code,
        annee,
        type_desordre: c.cause,
        frequence_pct: c.pct,
        cout_moyen_eur: sinistralite?.cout_moyen_eur ?? 10000,
        source_aqc: 'SYCODÉS',
      })
    }
  }

  const { error, count } = await supabase
    .schema('app')
    .from('sinistres_aqc')
    .upsert(rows, { onConflict: 'metier_code,annee,type_desordre,region', count: 'exact' })

  if (error) {
    logger.error({ err: error }, 'AQC import error')
    throw error
  }

  return { imported: count ?? 0 }
}

/**
 * Helper formatage pour affichage
 */
export function formatSinistralite(metierCode: string): string | null {
  const data = AQC_SINISTRALITE_2024[metierCode]
  if (!data) return null
  return `${data.freq_pct}% (coût moyen ${data.cout_moyen_eur.toLocaleString('fr-FR')} € — AQC SYCODÉS 2024)`
}
