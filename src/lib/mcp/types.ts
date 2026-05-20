/**
 * MCP (Model Context Protocol) — types JSON-RPC 2.0 + Anthropic spec.
 *
 * Spec officielle : https://modelcontextprotocol.io/spec
 *
 * Serveur Vivos expose 4 tools accessibles via Claude/ChatGPT/Perplexity/Gemini :
 *   1. recueil_exigences (DDA L.521-4 compliance gate)
 *   2. generate_quote_pro (devis temps réel)
 *   3. compare_offers (comparatif assureurs)
 *   4. audit_coverage (audit contrat existant)
 */

import { z } from 'zod'

// ─── JSON-RPC 2.0 types ───────────────────────────────────────────────────

export interface JsonRpcRequest {
  jsonrpc: '2.0'
  id: string | number | null
  method: string
  params?: Record<string, unknown>
}

export interface JsonRpcSuccess<T = unknown> {
  jsonrpc: '2.0'
  id: string | number | null
  result: T
}

export interface JsonRpcError {
  jsonrpc: '2.0'
  id: string | number | null
  error: {
    code: number
    message: string
    data?: unknown
  }
}

export type JsonRpcResponse<T = unknown> = JsonRpcSuccess<T> | JsonRpcError

// ─── MCP Protocol types ───────────────────────────────────────────────────

export interface McpInitializeResult {
  protocolVersion: string
  serverInfo: { name: string; version: string }
  capabilities: {
    tools?: Record<string, unknown>
    resources?: Record<string, unknown>
    prompts?: Record<string, unknown>
  }
}

export interface McpToolSpec {
  name: string
  title?: string
  description: string
  inputSchema: Record<string, unknown>
  outputSchema?: Record<string, unknown>
  annotations?: {
    readOnlyHint?: boolean
    destructiveHint?: boolean
    openWorldHint?: boolean
    idempotentHint?: boolean
  }
}

export interface McpToolResult {
  content: Array<{ type: 'text'; text: string } | { type: 'resource'; resource: unknown }>
  structuredContent?: Record<string, unknown>
  isError?: boolean
  _meta?: Record<string, unknown>
}

// ─── Vivos domain types ──────────────────────────────────────────────────

export const GARANTIES_SUPPORTED = [
  'rc-pro',
  'decennale',
  'cyber',
  'multirisque-pro',
  'mutuelle-pro',
  'vtc',
  'dommages-ouvrage',
  'tous-risques-chantier',
  'transport-marchandises',
  'moto-pro',
  'prevoyance',
  'protection-juridique',
  'homme-cle',
  'flotte-auto',
] as const

export const STATUTS_SUPPORTED = [
  'auto-entrepreneur',
  'micro-entreprise',
  'entreprise-individuelle',
  'eurl',
  'sarl',
  'sasu',
  'sas',
  'profession-liberale',
] as const

export const recueilExigencesSchema = z.object({
  garantie_souhaitee: z.enum(GARANTIES_SUPPORTED),
  metier: z
    .string()
    .min(2)
    .max(80)
    .describe('Métier exercé (ex: "plombier", "freelance IT", "expert-comptable")'),
  statut_juridique: z.enum(STATUTS_SUPPORTED),
  ca_annuel: z.number().min(0).max(50_000_000).optional(),
  nb_salaries: z.number().int().min(0).max(500).optional().default(0),
  anciennete_activite_annees: z.number().min(0).max(60).optional(),
  sinistres_5_derniers_ans: z.number().int().min(0).max(20).optional().default(0),
  ville: z.string().min(2).max(80).optional(),
})

export type RecueilExigencesPayload = z.infer<typeof recueilExigencesSchema>

export const generateQuoteSchema = z.object({
  proofId: z.string().regex(/^mcp_proof_[a-f0-9]{32}$/, 'Format proofId invalide'),
  garanties_options: z.array(z.string()).max(10).optional(),
})

export type GenerateQuotePayload = z.infer<typeof generateQuoteSchema>

// ─── Error codes JSON-RPC ────────────────────────────────────────────────

export const RPC_ERRORS = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  // Vivos custom errors (range -32000 à -32099)
  COMPLIANCE_DDA_REQUIRED: -32001,
  PROOF_EXPIRED: -32002,
  PROOF_NOT_FOUND: -32003,
  ORIAS_PENDING: -32004,
} as const

// ─── Helpers réponse JSON-RPC ────────────────────────────────────────────

export function rpcSuccess<T>(id: string | number | null, result: T): JsonRpcSuccess<T> {
  return { jsonrpc: '2.0', id, result }
}

export function rpcError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown
): JsonRpcError {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  }
}
