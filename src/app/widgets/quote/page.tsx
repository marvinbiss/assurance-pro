/**
 * Widget iframe Vivos Quote — rendu visuel inline dans ChatGPT/Claude apps.
 *
 * URL: https://vivos-assurance.fr/widgets/quote?proofId=mcp_proof_X
 *
 * Usage MCP: le tool generate_quote_pro / compare_offers retourne ce URL
 * dans _meta.ui.resourceUri → le LLM client (ChatGPT, Claude) embed
 * cette iframe dans la conversation.
 *
 * Conforme:
 *   - Pas d'auth (anonyme, lecture proof Supabase)
 *   - CSP nonce hérité du layout
 *   - Responsive mobile (ChatGPT mobile app)
 *   - Pas de tracking analytics tier (widget = vue éphémère)
 */

import { Suspense } from 'react'
import type { Metadata } from 'next'
import { WidgetQuoteClient } from './WidgetQuoteClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Devis Vivos Assurance — Widget',
  description: 'Devis assurance professionnelle conforme DDA art. L.521-4.',
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
}

interface PageProps {
  searchParams: Promise<{ proofId?: string; variant?: 'quote' | 'compare' | 'audit' }>
}

export default async function WidgetQuotePage({ searchParams }: PageProps) {
  const params = await searchParams
  const proofId = params.proofId
  const variant = params.variant ?? 'quote'

  return (
    <main className="min-h-screen bg-sand-50 p-4 md:p-6">
      <Suspense
        fallback={
          <div className="animate-pulse rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft">
            <div className="mb-3 h-5 w-2/3 rounded bg-sand-200" />
            <div className="mb-2 h-3 w-full rounded bg-sand-200" />
            <div className="h-3 w-4/5 rounded bg-sand-200" />
          </div>
        }
      >
        <WidgetQuoteClient proofId={proofId} variant={variant} />
      </Suspense>
    </main>
  )
}
