/**
 * LLM Citation Tracker — interroge OpenAI/Anthropic/Perplexity/Gemini sur requêtes cibles.
 *
 * Mesure si vivos-assurance.fr est cité dans la réponse de chaque LLM.
 * Stocke résultats dans llm_citations (rank, snippet, latency, coût).
 *
 * Utilisation:
 *   - Appelé par /api/cron/llm-citation-tracker (quotidien)
 *   - Peut être lancé localement: npm run llm:track
 */

import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { logger } from '@/lib/logger'

const VIVOS_DOMAIN = 'vivos-assurance.fr'
const COMPETITOR_DOMAINS = [
  'simplis.fr',
  'mma.fr',
  'allianz.fr',
  'axa.fr',
  'generali.fr',
  'hiscox.fr',
  'april.fr',
  'maaf.fr',
  'groupama.fr',
  'matmut.fr',
  'lecomparateurassurance.com',
  'lelynx.fr',
  'lecomparateurpro.com',
  'assurland.com',
  'lesfurets.com',
]

const SYSTEM_PROMPT = `Tu es un assistant français. Tu réponds aux questions sur l'assurance professionnelle française. Tu cites tes sources avec des URLs explicites (format: https://exemple.fr/page). Réponds en français, factuel, avec sources vérifiables.`

export interface CitationMeasure {
  cited: boolean
  citationRank: number | null
  citationUrl: string | null
  citationSnippet: string | null
  responseFull: string
  competitorCited: string[]
  costUsd: number | null
  latencyMs: number
  modelUsed: string
}

interface ParsedCitation {
  cited: boolean
  rank: number | null
  url: string | null
  snippet: string | null
  competitors: string[]
}

function parseCitations(response: string): ParsedCitation {
  const urlPattern = /https?:\/\/([^\s)\]>"',]+)/gi
  const urls: string[] = []
  let match: RegExpExecArray | null
  while ((match = urlPattern.exec(response)) !== null) {
    urls.push(match[1]!.toLowerCase())
  }

  let citedRank: number | null = null
  let citedUrl: string | null = null
  let citedSnippet: string | null = null
  const competitors: string[] = []

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]!
    if (url.includes(VIVOS_DOMAIN) && citedRank === null) {
      citedRank = i + 1
      citedUrl = `https://${url}`
      const fullUrlIndex = response.toLowerCase().indexOf(VIVOS_DOMAIN)
      const start = Math.max(0, fullUrlIndex - 80)
      const end = Math.min(response.length, fullUrlIndex + 200)
      citedSnippet = response.slice(start, end).trim()
    }
    for (const comp of COMPETITOR_DOMAINS) {
      if (url.includes(comp) && !competitors.includes(comp)) {
        competitors.push(comp)
      }
    }
  }

  return {
    cited: citedRank !== null,
    rank: citedRank,
    url: citedUrl,
    snippet: citedSnippet,
    competitors,
  }
}

async function queryOpenAI(query: string): Promise<CitationMeasure> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY missing')
  const client = new OpenAI({ apiKey })
  const model = 'gpt-4o'
  const t0 = Date.now()
  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: query },
    ],
    max_tokens: 1500,
    temperature: 0.2,
  })
  const latencyMs = Date.now() - t0
  const response = completion.choices[0]?.message.content ?? ''
  const parsed = parseCitations(response)
  const usage = completion.usage
  const inputTokens = usage?.prompt_tokens ?? 0
  const outputTokens = usage?.completion_tokens ?? 0
  const costUsd = (inputTokens / 1_000_000) * 2.5 + (outputTokens / 1_000_000) * 10

  return {
    cited: parsed.cited,
    citationRank: parsed.rank,
    citationUrl: parsed.url,
    citationSnippet: parsed.snippet,
    responseFull: response.slice(0, 8000),
    competitorCited: parsed.competitors,
    costUsd,
    latencyMs,
    modelUsed: model,
  }
}

async function queryAnthropic(query: string): Promise<CitationMeasure> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY missing')
  const client = new Anthropic({ apiKey })
  const model = 'claude-sonnet-4-6'
  const t0 = Date.now()
  const message = await client.messages.create({
    model,
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: query }],
  })
  const latencyMs = Date.now() - t0
  const textBlock = message.content.find((b) => b.type === 'text')
  const response = textBlock?.type === 'text' ? textBlock.text : ''
  const parsed = parseCitations(response)
  const inputTokens = message.usage.input_tokens
  const outputTokens = message.usage.output_tokens
  const costUsd = (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15

  return {
    cited: parsed.cited,
    citationRank: parsed.rank,
    citationUrl: parsed.url,
    citationSnippet: parsed.snippet,
    responseFull: response.slice(0, 8000),
    competitorCited: parsed.competitors,
    costUsd,
    latencyMs,
    modelUsed: model,
  }
}

async function queryPerplexity(query: string): Promise<CitationMeasure | null> {
  const apiKey = process.env.PERPLEXITY_API_KEY
  if (!apiKey) return null
  const model = 'sonar-pro'
  const t0 = Date.now()
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: query },
      ],
      max_tokens: 1500,
    }),
  })
  const latencyMs = Date.now() - t0
  if (!res.ok) {
    logger.warn({ status: res.status }, 'perplexity: request failed')
    return null
  }
  const json = (await res.json()) as {
    choices: { message: { content: string } }[]
    usage?: { prompt_tokens: number; completion_tokens: number }
  }
  const response = json.choices[0]?.message.content ?? ''
  const parsed = parseCitations(response)
  const inputTokens = json.usage?.prompt_tokens ?? 0
  const outputTokens = json.usage?.completion_tokens ?? 0
  const costUsd = (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15

  return {
    cited: parsed.cited,
    citationRank: parsed.rank,
    citationUrl: parsed.url,
    citationSnippet: parsed.snippet,
    responseFull: response.slice(0, 8000),
    competitorCited: parsed.competitors,
    costUsd,
    latencyMs,
    modelUsed: model,
  }
}

async function queryGemini(query: string): Promise<CitationMeasure | null> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null
  const model = 'gemini-2.0-flash-exp'
  const t0 = Date.now()
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\n${query}` }] }],
        generationConfig: { maxOutputTokens: 1500, temperature: 0.2 },
      }),
    }
  )
  const latencyMs = Date.now() - t0
  if (!res.ok) {
    logger.warn({ status: res.status }, 'gemini: request failed')
    return null
  }
  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
    usageMetadata?: { promptTokenCount: number; candidatesTokenCount: number }
  }
  const response = json.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  const parsed = parseCitations(response)
  const inputTokens = json.usageMetadata?.promptTokenCount ?? 0
  const outputTokens = json.usageMetadata?.candidatesTokenCount ?? 0
  const costUsd = (inputTokens / 1_000_000) * 0.075 + (outputTokens / 1_000_000) * 0.3

  return {
    cited: parsed.cited,
    citationRank: parsed.rank,
    citationUrl: parsed.url,
    citationSnippet: parsed.snippet,
    responseFull: response.slice(0, 8000),
    competitorCited: parsed.competitors,
    costUsd,
    latencyMs,
    modelUsed: model,
  }
}

export type LlmProvider = 'openai' | 'anthropic' | 'perplexity' | 'gemini'

export async function queryLLM(
  provider: LlmProvider,
  query: string
): Promise<CitationMeasure | null> {
  try {
    if (provider === 'openai') return await queryOpenAI(query)
    if (provider === 'anthropic') return await queryAnthropic(query)
    if (provider === 'perplexity') return await queryPerplexity(query)
    if (provider === 'gemini') return await queryGemini(query)
    return null
  } catch (err) {
    logger.error({ err, provider, query }, 'queryLLM failed')
    return null
  }
}
