import { createPiiAdminClient } from '@/lib/supabase/admin'
import { buildPriorityUrlPaths } from '@/lib/seo/url-universe'
import type { IndexingUrlResult } from '@/lib/seo/google-indexing'

/**
 * File d'indexation persistée dans `public.seo_index_submissions`.
 * Permet de faire tourner tout l'univers d'URLs à travers le quota Google
 * (200/jour) en priorisant les jamais-soumis puis les plus anciens.
 *
 * On utilise `createPiiAdminClient` (no-store) et non `createAdminClient` :
 * la file est mutable, un cache ISR 1h re-sélectionnerait les mêmes URLs.
 */

const ENGINE = 'google' as const
const UPSERT_CHUNK = 1000

export interface ClaimedUrl {
  url: string
  submit_count: number
}

/** Insère les nouvelles URLs de l'univers sans toucher aux lignes existantes. */
export async function syncUrlUniverse(): Promise<{ total: number }> {
  const supabase = createPiiAdminClient()
  const paths = buildPriorityUrlPaths()

  for (let i = 0; i < paths.length; i += UPSERT_CHUNK) {
    const rows = paths.slice(i, i + UPSERT_CHUNK).map((url) => ({ url, engine: ENGINE }))
    const { error } = await supabase
      .from('seo_index_submissions')
      .upsert(rows, { onConflict: 'url', ignoreDuplicates: true })
    if (error) throw new Error(`syncUrlUniverse upsert failed: ${error.message}`)
  }

  return { total: paths.length }
}

/** Sélectionne les `limit` URLs prioritaires : jamais soumises d'abord, puis les plus anciennes. */
export async function claimNextUrls(limit: number): Promise<ClaimedUrl[]> {
  const supabase = createPiiAdminClient()
  const { data, error } = await supabase
    .from('seo_index_submissions')
    .select('url, submit_count')
    .eq('engine', ENGINE)
    .order('last_submitted_at', { ascending: true, nullsFirst: true })
    .limit(limit)

  if (error) throw new Error(`claimNextUrls failed: ${error.message}`)
  return (data ?? []) as ClaimedUrl[]
}

/** Enregistre le résultat de soumission (statut, http, erreur) et incrémente le compteur. */
export async function recordSubmissions(
  claimed: ClaimedUrl[],
  results: IndexingUrlResult[]
): Promise<void> {
  if (results.length === 0) return
  const supabase = createPiiAdminClient()
  const countByUrl = new Map(claimed.map((c) => [c.url, c.submit_count]))
  const now = new Date().toISOString()

  const rows = results.map((r) => ({
    url: r.url,
    engine: ENGINE,
    last_submitted_at: now,
    last_status: r.ok ? 'ok' : 'error',
    last_http_status: r.httpStatus,
    last_error: r.error ?? null,
    submit_count: (countByUrl.get(r.url) ?? 0) + 1,
    updated_at: now,
  }))

  for (let i = 0; i < rows.length; i += UPSERT_CHUNK) {
    const { error } = await supabase
      .from('seo_index_submissions')
      .upsert(rows.slice(i, i + UPSERT_CHUNK), { onConflict: 'url' })
    if (error) throw new Error(`recordSubmissions upsert failed: ${error.message}`)
  }
}
