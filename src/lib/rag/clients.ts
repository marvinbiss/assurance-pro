/**
 * Singletons partagés pour clients LLM — évite double connection pool.
 *
 * Avant cette extraction : src/lib/rag/index.ts et src/lib/rag/models.ts
 * définissaient chacun leur propre `let _openai: OpenAI | null = null`,
 * donc 2 instances + 2 connection pools sous Node module caching.
 *
 * Source unique de vérité ici. No-op gracieux si API key absente.
 */

import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

const TIMEOUT_MS = 30_000

let _openai: OpenAI | null = null
export function getOpenAI(): OpenAI | null {
  if (_openai) return _openai
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  _openai = new OpenAI({ apiKey, timeout: TIMEOUT_MS, maxRetries: 1 })
  return _openai
}

let _anthropic: Anthropic | null = null
export function getAnthropic(): Anthropic | null {
  if (_anthropic) return _anthropic
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null
  _anthropic = new Anthropic({ apiKey, timeout: TIMEOUT_MS, maxRetries: 1 })
  return _anthropic
}
