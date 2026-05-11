/**
 * robots.txt — Vivos Assurance / Assurance Pro France
 *
 * Stratégie LLM-first 2026 :
 *   - SEO bots traditionnels : full allow (sauf /api, /admin, /devis/merci)
 *   - LLM crawlers : full allow explicite (être citable par ChatGPT/Claude/Perplexity/Gemini)
 *   - Scraping bots agressifs : blocked
 *
 * Bots couverts : OpenAI, Anthropic, Google AI (Gemini/Bard), Perplexity, Bing/Copilot,
 *                 Mistral, Cohere, You.com, Common Crawl, Apple AI, Meta AI.
 *
 * Sources :
 *   - https://platform.openai.com/docs/gptbot
 *   - https://docs.anthropic.com/en/docs/build-with-claude/web-search-tool
 *   - https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers
 */

import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'

const COMMON_DISALLOW = [
  '/api/',
  '/devis/merci',
  '/_next/',
  '/private/',
  '/admin/',
  '*?token=*',
  '*?utm_*=*',
  '*?fbclid=*',
  '*?gclid=*',
]

const LLM_BOTS = [
  // OpenAI — GPTBot (indexation), OAI-SearchBot (ChatGPT search), ChatGPT-User (browse)
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic — ClaudeBot (indexation), claude-web (browse), anthropic-ai (legacy)
  'ClaudeBot',
  'claude-web',
  'anthropic-ai',
  'Claude-Web',
  // Google — Gemini/Bard via Google-Extended (séparé de Googlebot pour opt-in IA)
  'Google-Extended',
  'GoogleOther',
  // Microsoft — Bing/Copilot
  'bingbot',
  'msnbot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Apple Intelligence
  'Applebot',
  'Applebot-Extended',
  // Meta AI (Llama)
  'Meta-ExternalAgent',
  'FacebookBot',
  // Mistral / Cohere / autres
  'MistralAI-User',
  'cohere-ai',
  'CohereBot',
  // You.com
  'YouBot',
  // Common Crawl (utilisé pour training datasets)
  'CCBot',
  // DuckAssist (DuckDuckGo AI)
  'DuckAssistBot',
  // Diffbot (utilisé par plusieurs LLM)
  'Diffbot',
  // Amazonbot (Alexa/AI)
  'Amazonbot',
  // Bytedance (Doubao AI)
  'Bytespider',
]

// Bots de scraping commercial / spam — bloqués
const BLOCKED_BOTS = [
  'AhrefsBot',
  'SemrushBot',
  'DotBot',
  'MJ12bot',
  'PetalBot',
  'BLEXBot',
  'SeznamBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default policy (humans + standard crawlers)
      {
        userAgent: '*',
        allow: '/',
        disallow: COMMON_DISALLOW,
      },
      // LLM bots — explicit allow for AI visibility
      ...LLM_BOTS.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: COMMON_DISALLOW,
      })),
      // Aggressive scrapers — blocked
      ...BLOCKED_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/llms.txt`, `${BASE_URL}/llms-full.txt`],
    host: BASE_URL,
  }
}
