/**
 * Multi-model strategy — Claude + GPT avec fallback automatique.
 *
 * Stratégie :
 *   - Routing par complexité : FAQ simple → Haiku (rapide+cheap)
 *                              Question moyenne → Sonnet (qualité)
 *                              Juridique complexe → Opus (premium)
 *   - Fallback : Anthropic → OpenAI → message générique
 *   - Streaming compatible : tous retournent AsyncGenerator<string>
 *
 * Coûts indicatifs (par 1M tokens, 2026) :
 *   - Claude Haiku 4.5  : $0.25 input / $1.25 output    ⭐ best price
 *   - Claude Sonnet 4.6 : $3 input / $15 output         ⭐ default
 *   - Claude Opus 4.7   : $15 input / $75 output        ⭐ premium
 *   - GPT-4o-mini       : $0.15 input / $0.60 output    ⭐ fallback cheap
 *   - GPT-4o            : $2.50 input / $10 output      ⭐ fallback quality
 */

import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

export type ModelTier = 'fast' | 'standard' | 'premium'
export type ModelProvider = 'anthropic' | 'openai'

export interface ModelConfig {
  provider: ModelProvider
  model: string
  maxTokens: number
  temperature: number
}

export const MODELS: Record<ModelTier, ModelConfig[]> = {
  fast: [
    { provider: 'anthropic', model: 'claude-haiku-4-5-20251001', maxTokens: 500, temperature: 0.3 },
    { provider: 'openai', model: 'gpt-4o-mini', maxTokens: 500, temperature: 0.3 },
  ],
  standard: [
    { provider: 'anthropic', model: 'claude-sonnet-4-6', maxTokens: 800, temperature: 0.3 },
    { provider: 'anthropic', model: 'claude-haiku-4-5-20251001', maxTokens: 800, temperature: 0.3 },
    { provider: 'openai', model: 'gpt-4o-mini', maxTokens: 800, temperature: 0.3 },
  ],
  premium: [
    { provider: 'anthropic', model: 'claude-opus-4-7', maxTokens: 1200, temperature: 0.2 },
    { provider: 'anthropic', model: 'claude-sonnet-4-6', maxTokens: 1200, temperature: 0.2 },
    { provider: 'openai', model: 'gpt-4o', maxTokens: 1200, temperature: 0.2 },
  ],
}

// ─── Tier inference ──────────────────────────────────────────────────────────

/**
 * Détermine le tier optimal selon la complexité de la question.
 *
 * Signaux :
 *   - Longueur > 200 chars → premium
 *   - Mots-clés juridiques (jurisprudence, contentieux, sinistre, recours) → premium
 *   - Mots-clés tarifaires simples (prix, combien, tarif) → fast
 *   - Sinon → standard
 */
export function inferTier(question: string): ModelTier {
  const q = question.toLowerCase()

  const PREMIUM_KEYWORDS = [
    'jurisprudence',
    'cassation',
    'article ',
    'art. l',
    'art. r',
    'contentieux',
    'recours juridique',
    'sinistre majeur',
    'exclusion contractuelle',
    'résiliation contentieuse',
    'litige assureur',
    'loi spinetta',
    'expertise judiciaire',
    'subrogation',
    'délai prescription',
    'forclusion',
  ]
  const FAST_KEYWORDS = [
    'prix',
    'tarif',
    'combien',
    'coût',
    'comparer',
    'best',
    'pas cher',
    'devis',
    'attestation pdf',
    'délai',
    'rapide',
    'immédiat',
  ]

  if (question.length > 200) return 'premium'
  if (PREMIUM_KEYWORDS.some((k) => q.includes(k))) return 'premium'
  if (FAST_KEYWORDS.some((k) => q.includes(k))) return 'fast'
  return 'standard'
}

// ─── Client singletons ──────────────────────────────────────────────────────

let _anthropic: Anthropic | null = null
function getAnthropic(): Anthropic | null {
  if (_anthropic) return _anthropic
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null
  _anthropic = new Anthropic({ apiKey })
  return _anthropic
}

let _openai: OpenAI | null = null
function getOpenAI(): OpenAI | null {
  if (_openai) return _openai
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  _openai = new OpenAI({ apiKey })
  return _openai
}

// ─── Streaming completion (provider-agnostic) ────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface CompletionParams {
  systemPrompt: string
  context: string
  question: string
  history: ChatMessage[]
}

async function* streamAnthropic(
  config: ModelConfig,
  params: CompletionParams
): AsyncGenerator<string, void, unknown> {
  const client = getAnthropic()
  if (!client) throw new Error('ANTHROPIC_API_KEY not configured')

  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = []
  // Inject context as first user message followed by acknowledgment (Claude best practice)
  messages.push({ role: 'user', content: `CONTEXTE :\n${params.context}` })
  messages.push({
    role: 'assistant',
    content: "J'ai bien noté ces informations. Posez votre question.",
  })
  for (const m of params.history) {
    messages.push({ role: m.role, content: m.content })
  }
  messages.push({ role: 'user', content: params.question })

  const stream = await client.messages.stream({
    model: config.model,
    max_tokens: config.maxTokens,
    temperature: config.temperature,
    system: params.systemPrompt,
    messages,
  })

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      yield event.delta.text
    }
  }
}

async function* streamOpenAI(
  config: ModelConfig,
  params: CompletionParams
): AsyncGenerator<string, void, unknown> {
  const client = getOpenAI()
  if (!client) throw new Error('OPENAI_API_KEY not configured')

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: params.systemPrompt },
    { role: 'system', content: `CONTEXTE :\n${params.context}` },
    ...params.history.map((m) => ({ role: m.role, content: m.content }) as const),
    { role: 'user', content: params.question },
  ]

  const stream = await client.chat.completions.create({
    model: config.model,
    messages,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    stream: true,
  })

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
  }
}

/**
 * Stream une completion avec fallback chain.
 * Si le premier modèle échoue, essaie le suivant. Si tous échouent, throw.
 *
 * Yields aussi un événement final indiquant le modèle utilisé (pour logs).
 */
export async function* streamWithFallback(
  tier: ModelTier,
  params: CompletionParams
): AsyncGenerator<
  { delta?: string; meta?: { provider: ModelProvider; model: string } },
  void,
  unknown
> {
  const chain = MODELS[tier]
  const errors: Array<{ model: string; error: unknown }> = []

  for (const config of chain) {
    try {
      const generator =
        config.provider === 'anthropic'
          ? streamAnthropic(config, params)
          : streamOpenAI(config, params)

      // Wrap first chunk in try/catch — if upstream throws before first delta,
      // we silently fail over to next provider.
      let yielded = false
      for await (const delta of generator) {
        if (!yielded) {
          yield { meta: { provider: config.provider, model: config.model } }
          yielded = true
        }
        yield { delta }
      }
      if (yielded) return
    } catch (e) {
      errors.push({ model: config.model, error: e })
      continue
    }
  }

  // All providers failed
  yield {
    delta:
      'Le service de chat est temporairement indisponible. Utilisez le formulaire devis pour être recontacté sous 24h par un courtier ORIAS.',
  }
  console.error('[chat] all providers failed', errors)
}
