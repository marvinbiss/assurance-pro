/**
 * MCP (Model Context Protocol) Server — Vivos Assurance
 *
 * Endpoint JSON-RPC 2.0 exposé aux LLMs (Claude, ChatGPT, Perplexity, Gemini).
 * Permet à chaque LLM d'appeler les 4 tools Vivos pour générer des devis
 * assurance pro en France, conforme DDA art. L.521-4.
 *
 * Specs:
 *   - Anthropic MCP: https://modelcontextprotocol.io/spec
 *   - OpenAI Apps SDK: https://developers.openai.com/apps-sdk
 *
 * Mode stealth: le serveur est fonctionnel mais pas listé dans les stores.
 * Submission stores prévue J+0 attribution ORIAS Vivos.
 */

import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import {
  rpcSuccess,
  rpcError,
  RPC_ERRORS,
  type JsonRpcRequest,
  type McpInitializeResult,
  type McpToolSpec,
} from '@/lib/mcp/types'
import { recueilExigencesToolSpec, handleRecueilExigences } from '@/lib/mcp/tools/recueil-exigences'
import {
  generateQuoteProToolSpec,
  handleGenerateQuotePro,
} from '@/lib/mcp/tools/generate-quote-pro'
import { compareOffersToolSpec, handleCompareOffers } from '@/lib/mcp/tools/compare-offers'
import { auditCoverageToolSpec, handleAuditCoverage } from '@/lib/mcp/tools/audit-coverage'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const PROTOCOL_VERSION = '2026-01-01'
const SERVER_NAME = 'vivos-assurance'
const SERVER_VERSION = '0.1.0'

const TOOLS_REGISTRY: McpToolSpec[] = [
  recueilExigencesToolSpec,
  generateQuoteProToolSpec,
  compareOffersToolSpec,
  auditCoverageToolSpec,
]

// ─── Helpers ──────────────────────────────────────────────────────────────

function extractLlmContext(headers: Headers): {
  llmSessionId?: string
  llmUserPseudoId?: string
  llmOrigin?: 'openai' | 'anthropic' | 'perplexity' | 'gemini' | 'cursor' | 'other'
} {
  // OpenAI Apps SDK injecte _meta dans le body, pas les headers — placeholder
  // Anthropic Claude Desktop expose des headers MCP-specific
  const userAgent = headers.get('user-agent') ?? ''
  let llmOrigin: 'openai' | 'anthropic' | 'perplexity' | 'gemini' | 'cursor' | 'other' = 'other'
  if (/ChatGPT|OpenAI/i.test(userAgent)) llmOrigin = 'openai'
  else if (/Claude|Anthropic/i.test(userAgent)) llmOrigin = 'anthropic'
  else if (/Perplexity/i.test(userAgent)) llmOrigin = 'perplexity'
  else if (/Gemini|Google/i.test(userAgent)) llmOrigin = 'gemini'
  else if (/Cursor/i.test(userAgent)) llmOrigin = 'cursor'

  const sessionId =
    headers.get('mcp-session-id') ??
    headers.get('x-openai-session') ??
    headers.get('x-anthropic-session') ??
    undefined
  const userPseudoId =
    headers.get('x-openai-subject') ?? headers.get('x-anthropic-user') ?? undefined

  return {
    ...(sessionId ? { llmSessionId: sessionId } : {}),
    ...(userPseudoId ? { llmUserPseudoId: userPseudoId } : {}),
    llmOrigin,
  }
}

async function trackSession(
  sessionId: string | undefined,
  origin: 'openai' | 'anthropic' | 'perplexity' | 'gemini' | 'cursor' | 'other',
  userPseudoId?: string
): Promise<void> {
  if (!sessionId) return
  try {
    const admin = createPiiAdminClient()
    await admin.from('mcp_sessions').upsert(
      {
        id: sessionId,
        llm_origin: origin,
        user_pseudo_id: userPseudoId ?? null,
        last_activity_at: new Date().toISOString(),
      },
      { onConflict: 'id', ignoreDuplicates: false }
    )
    // increment tool_calls_count atomically
    await admin.rpc('increment_mcp_session_tool_calls', { p_session_id: sessionId })
  } catch (err) {
    // Best-effort tracking, ne bloque pas la requête
    logger.warn({ err, sessionId }, 'mcp session tracking failed (non-blocking)')
  }
}

async function logAudit(
  sessionId: string | undefined,
  toolName: string,
  request: Record<string, unknown>,
  response: Record<string, unknown> | null,
  errorCode: string | null,
  durationMs: number
): Promise<void> {
  try {
    const admin = createPiiAdminClient()
    await admin.from('mcp_audit_log').insert({
      session_id: sessionId ?? null,
      tool_name: toolName,
      request_json: request,
      response_json: response,
      error_code: errorCode,
      duration_ms: durationMs,
    })
  } catch (err) {
    logger.warn({ err, toolName }, 'mcp audit log failed (non-blocking)')
  }
}

// ─── JSON-RPC dispatch ────────────────────────────────────────────────────

async function handleRequest(req: JsonRpcRequest, headers: Headers): Promise<unknown> {
  const ctx = extractLlmContext(headers)

  // Track session (best effort)
  if (ctx.llmSessionId && ctx.llmOrigin) {
    void trackSession(ctx.llmSessionId, ctx.llmOrigin, ctx.llmUserPseudoId)
  }

  switch (req.method) {
    case 'initialize':
      return rpcSuccess<McpInitializeResult>(req.id, {
        protocolVersion: PROTOCOL_VERSION,
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        capabilities: {
          tools: { listChanged: false },
          resources: {},
        },
      })

    case 'initialized':
    case 'notifications/initialized':
      // Notification client confirmation, pas de réponse
      return null

    case 'tools/list':
      return rpcSuccess(req.id, { tools: TOOLS_REGISTRY })

    case 'tools/call': {
      const params = (req.params ?? {}) as { name?: string; arguments?: Record<string, unknown> }
      const toolName = params.name
      if (!toolName) {
        return rpcError(req.id, RPC_ERRORS.INVALID_PARAMS, 'Paramètre "name" requis')
      }

      const startTs = Date.now()
      let result
      let errorCode: string | null = null

      switch (toolName) {
        case 'recueil_exigences':
          result = await handleRecueilExigences(params.arguments ?? {}, ctx)
          break
        case 'generate_quote_pro':
          result = await handleGenerateQuotePro(params.arguments ?? {})
          break
        case 'compare_offers':
          result = await handleCompareOffers(params.arguments ?? {})
          break
        case 'audit_coverage':
          result = await handleAuditCoverage(params.arguments ?? {})
          break
        default:
          errorCode = 'tool_not_found'
          return rpcError(
            req.id,
            RPC_ERRORS.METHOD_NOT_FOUND,
            `Tool "${toolName}" inconnu. Tools disponibles: ${TOOLS_REGISTRY.map((t) => t.name).join(', ')}`
          )
      }

      const duration = Date.now() - startTs
      if (result.isError) errorCode = 'tool_error'
      void logAudit(
        ctx.llmSessionId,
        toolName,
        params.arguments ?? {},
        result as unknown as Record<string, unknown>,
        errorCode,
        duration
      )

      return rpcSuccess(req.id, result)
    }

    case 'resources/list':
      return rpcSuccess(req.id, { resources: [] })

    case 'ping':
      return rpcSuccess(req.id, {})

    default:
      return rpcError(req.id, RPC_ERRORS.METHOD_NOT_FOUND, `Méthode "${req.method}" non supportée`)
  }
}

// ─── HTTP handlers ────────────────────────────────────────────────────────

export async function POST(request: Request) {
  let body: JsonRpcRequest | JsonRpcRequest[]
  try {
    body = (await request.json()) as JsonRpcRequest | JsonRpcRequest[]
  } catch {
    return NextResponse.json(rpcError(null, RPC_ERRORS.PARSE_ERROR, 'JSON invalide'), {
      status: 400,
    })
  }

  // Batch requests supportés (JSON-RPC 2.0)
  if (Array.isArray(body)) {
    const responses = await Promise.all(body.map((req) => handleRequest(req, request.headers)))
    const filtered = responses.filter((r) => r !== null)
    return NextResponse.json(filtered)
  }

  if (typeof body !== 'object' || body === null || body.jsonrpc !== '2.0') {
    return NextResponse.json(
      rpcError(null, RPC_ERRORS.INVALID_REQUEST, 'Requête JSON-RPC 2.0 invalide'),
      { status: 400 }
    )
  }

  const response = await handleRequest(body, request.headers)
  if (response === null) {
    // Notification (pas de réponse attendue)
    return new NextResponse(null, { status: 204 })
  }
  return NextResponse.json(response)
}

export async function GET() {
  // Pour debug/probe healthcheck
  return NextResponse.json({
    server: SERVER_NAME,
    version: SERVER_VERSION,
    protocol: PROTOCOL_VERSION,
    tools: TOOLS_REGISTRY.map((t) => t.name),
    note: 'MCP Server — POST JSON-RPC 2.0 pour appeler les tools',
  })
}
