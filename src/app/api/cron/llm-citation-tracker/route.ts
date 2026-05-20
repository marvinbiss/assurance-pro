/**
 * CRON — LLM Citation Tracker.
 *
 * Cadence: 1× / jour (Vercel Cron à 06h UTC = 07h Paris hors été).
 *
 * Pipeline:
 *   1. Lit llm_target_queries (active=true) depuis Supabase
 *   2. Pour chaque query, interroge OpenAI + Anthropic (+Perplexity +Gemini si keys présentes)
 *   3. Parse citations vivos-assurance.fr dans réponses
 *   4. Insert résultats dans llm_citations
 *   5. Retourne stats (queries, providers, citation_rate)
 *
 * Budget estimé: 50 queries × 4 LLM × ~0.005$/query = ~1$/jour = 30$/mois.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { logger } from '@/lib/logger'
import { verifyCronAuthorization } from '@/lib/security/cron-auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { queryLLM, type LlmProvider } from '@/lib/llm-citations/tracker'
import { enqueueWebhookDeliveries } from '@/lib/webhooks/dispatcher'

const PROVIDERS: LlmProvider[] = ['openai', 'anthropic', 'perplexity', 'gemini']

interface TargetQuery {
  id: string
  query: string
  category: string
  priority: number
}

export async function GET(req: NextRequest) {
  if (!verifyCronAuthorization(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient()
  const startedAt = Date.now()

  // Limite à 25 queries par run pour rester sous 300s maxDuration Vercel
  // (25 × 4 LLM × ~2s ≈ 200s). Priorité 5 → 1, FIFO sur égalité.
  const { data: queries, error: queriesErr } = await admin
    .from('llm_target_queries')
    .select('id, query, category, priority')
    .eq('active', true)
    .order('priority', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(25)

  if (queriesErr || !queries || queries.length === 0) {
    logger.error({ err: queriesErr }, 'llm-citation-tracker: queries fetch failed')
    return NextResponse.json({ error: 'No active queries' }, { status: 500 })
  }

  const inserts: Array<Record<string, unknown>> = []
  let citationsCount = 0
  let totalCostUsd = 0
  const providerStats: Record<string, { queries: number; cited: number; failed: number }> = {}

  for (const q of queries as TargetQuery[]) {
    for (const provider of PROVIDERS) {
      providerStats[provider] ??= { queries: 0, cited: 0, failed: 0 }
      const stat = providerStats[provider]!
      stat.queries++
      const measure = await queryLLM(provider, q.query)
      if (!measure) {
        stat.failed++
        continue
      }
      if (measure.cited) {
        stat.cited++
        citationsCount++
        // Emit webhook llm_citation.detected (fire-and-forget)
        void enqueueWebhookDeliveries({
          event: 'llm_citation.detected',
          payload: {
            query: q.query,
            category: q.category,
            llm_provider: provider,
            llm_model: measure.modelUsed,
            citation_rank: measure.citationRank,
            citation_url: measure.citationUrl,
            citation_snippet: measure.citationSnippet,
            competitor_cited: measure.competitorCited,
            measured_at: new Date().toISOString(),
          },
        }).catch(() => undefined)
      }
      totalCostUsd += measure.costUsd ?? 0
      inserts.push({
        query_id: q.id,
        llm_provider: provider,
        llm_model: measure.modelUsed,
        cited: measure.cited,
        citation_rank: measure.citationRank,
        citation_url: measure.citationUrl,
        citation_snippet: measure.citationSnippet,
        response_full: measure.responseFull,
        competitor_cited: measure.competitorCited,
        cost_usd: measure.costUsd,
        latency_ms: measure.latencyMs,
      })
    }
  }

  if (inserts.length > 0) {
    const { error: insertErr } = await admin.from('llm_citations').insert(inserts)
    if (insertErr) {
      logger.error({ err: insertErr }, 'llm-citation-tracker: insert failed')
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
    }
  }

  const durationMs = Date.now() - startedAt
  const result = {
    success: true,
    queries: queries.length,
    measurements: inserts.length,
    citations: citationsCount,
    citation_rate_pct: inserts.length > 0 ? (100 * citationsCount) / inserts.length : 0,
    cost_usd: Number(totalCostUsd.toFixed(4)),
    duration_ms: durationMs,
    providers: providerStats,
  }
  logger.info(result, 'llm-citation-tracker completed')
  return NextResponse.json(result)
}
