/**
 * Rate Limiter Service - Vivos Assurance
 * Uses Redis (Upstash) for distributed rate limiting in production
 * Falls back to in-memory for development
 */

import { logger } from './logger'

// Types
interface RateLimitConfig {
  window: number // Time window in milliseconds
  max: number // Maximum requests in window
  failOpen?: boolean // If true, allow requests when Redis is unavailable (default: false = fail-close)
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  error?: string
}

// Environment detection
const isProduction = process.env.NODE_ENV === 'production'
const hasRedis = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

// In-memory fallback store
const memoryStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Upstash Redis Rate Limiter
 * Uses REST API for serverless compatibility
 */
class UpstashRateLimiter {
  private baseUrl: string
  private token: string

  constructor() {
    this.baseUrl = process.env.UPSTASH_REDIS_REST_URL || ''
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN || ''
  }

  private async redisCommand(command: string[]): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    })

    if (!response.ok) {
      throw new Error(`Redis error: ${response.status}`)
    }

    const data = await response.json()
    return data.result
  }

  async checkRateLimit(key: string, config: RateLimitConfig): Promise<RateLimitResult> {
    const now = Date.now()
    const windowKey = `ratelimit:${key}`
    const windowMs = config.window

    try {
      // Use sliding window algorithm with Redis
      // MULTI/EXEC equivalent using pipeline
      const pipeline = [
        ['ZADD', windowKey, String(now), String(now)],
        ['ZREMRANGEBYSCORE', windowKey, '0', String(now - windowMs)],
        ['ZCARD', windowKey],
        ['PEXPIRE', windowKey, String(windowMs)],
      ]

      // Execute commands
      for (const cmd of pipeline.slice(0, 2)) {
        await this.redisCommand(cmd)
      }

      const count = (await this.redisCommand(['ZCARD', windowKey])) as number
      await this.redisCommand(['PEXPIRE', windowKey, String(windowMs)])

      const allowed = count <= config.max
      const remaining = Math.max(0, config.max - count)
      const resetTime = now + windowMs

      if (!allowed) {
        // Remove the request we just added since it's over limit
        await this.redisCommand(['ZREM', windowKey, String(now)])
      }

      return { allowed, remaining, resetTime }
    } catch (error) {
      logger.error('Redis rate limit error:', error)

      // Fail-close by default: deny requests when Redis is unavailable.
      // Only fall back to allowing requests when failOpen is explicitly true.
      if (config.failOpen === true) {
        logger.warn('Rate limiter: Redis unavailable, failOpen=true — using in-memory fallback')
        return memoryLimiter.checkRateLimit(`fallback:${key}`, config)
      }

      logger.warn('Rate limiter: Redis unavailable, failOpen=false — denying request (fail-close)')
      return {
        allowed: false,
        remaining: 0,
        resetTime: now + config.window,
        error: 'Rate limiter unavailable',
      }
    }
  }

  async cleanup(): Promise<void> {
    // Redis handles TTL automatically
  }
}

/**
 * In-Memory Rate Limiter (development/fallback)
 */
class MemoryRateLimiter {
  checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
    const now = Date.now()
    const record = memoryStore.get(key)

    // Clean up old entries periodically
    if (memoryStore.size > 10000) {
      Array.from(memoryStore.entries()).forEach(([k, v]) => {
        if (now > v.resetTime) {
          memoryStore.delete(k)
        }
      })
    }

    // Reset if window expired
    if (!record || now > record.resetTime) {
      memoryStore.set(key, { count: 1, resetTime: now + config.window })
      return { allowed: true, remaining: config.max - 1, resetTime: now + config.window }
    }

    // Check if over limit
    if (record.count >= config.max) {
      return { allowed: false, remaining: 0, resetTime: record.resetTime }
    }

    // Increment and allow
    record.count++
    return {
      allowed: true,
      remaining: config.max - record.count,
      resetTime: record.resetTime,
    }
  }
}

// Singleton instances
let upstashLimiter: UpstashRateLimiter | null = null
const memoryLimiter = new MemoryRateLimiter()

/**
 * Get the appropriate rate limiter based on environment
 */
function getRateLimiter(): UpstashRateLimiter | MemoryRateLimiter {
  if (isProduction && hasRedis) {
    if (!upstashLimiter) {
      upstashLimiter = new UpstashRateLimiter()
    }
    return upstashLimiter
  }
  return memoryLimiter
}

// Configurations alignées sur les routes courtage existantes uniquement.
const RATE_LIMITS_INTERNAL = {
  api: { window: 60 * 1000, max: 60 }, // général
  devis: { window: 60 * 1000, max: 10 }, // /api/devis-assurance
  reclamation: { window: 300 * 1000, max: 3 }, // /api/reclamation (anti-spam)
  contact: { window: 300 * 1000, max: 3 }, // /api/contact (sends email)
  newsletter: { window: 300 * 1000, max: 3 }, // /api/newsletter (sends email)
  gdpr: { window: 300 * 1000, max: 5 }, // /api/gdpr/* (DB export/delete)
  admin: { window: 60 * 1000, max: 30 }, // /api/admin/*
  cron: { window: 60 * 1000, max: 10, failOpen: true }, // /api/cron/* (fail-open)
  webhook: { window: 60 * 1000, max: 200, failOpen: true }, // /api/revalidate, indexnow callbacks
  default: { window: 60 * 1000, max: 100 },
} as const satisfies Record<string, RateLimitConfig>

export const RATE_LIMITS: typeof RATE_LIMITS_INTERNAL = RATE_LIMITS_INTERNAL

/**
 * Renvoie la config rate-limit pour un pathname donné.
 * Ordre : préfixes spécifiques avant génériques.
 */
export function getRateLimitConfig(pathname: string): RateLimitConfig {
  if (pathname.startsWith('/api/cron')) return RATE_LIMITS.cron
  if (pathname.startsWith('/api/admin')) return RATE_LIMITS.admin
  if (pathname.startsWith('/api/devis-assurance')) return RATE_LIMITS.devis
  if (pathname.startsWith('/api/reclamation')) return RATE_LIMITS.reclamation
  if (pathname.startsWith('/api/contact')) return RATE_LIMITS.contact
  if (pathname.startsWith('/api/newsletter')) return RATE_LIMITS.newsletter
  if (pathname.startsWith('/api/gdpr')) return RATE_LIMITS.gdpr
  if (pathname.startsWith('/api/revalidate') || pathname.startsWith('/api/indexnow')) {
    return RATE_LIMITS.webhook
  }
  if (pathname.startsWith('/api/')) return RATE_LIMITS.api
  return RATE_LIMITS.default
}

/**
 * Generate rate limit key from request
 */
export function getRateLimitKey(ip: string, pathname: string): string {
  return `${ip}:${pathname}`
}

/**
 * Check rate limit for a request
 */
export async function checkRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const limiter = getRateLimiter()

  if (limiter instanceof UpstashRateLimiter) {
    return limiter.checkRateLimit(key, config)
  }

  return limiter.checkRateLimit(key, config)
}

/**
 * Extract trusted client IP — résiste au spoofing X-Forwarded-For.
 *
 * Priorité :
 *   1. x-vercel-forwarded-for  → set par Vercel edge proxy, NON spoofable
 *   2. cf-connecting-ip        → set par Cloudflare, NON spoofable derrière CF
 *   3. x-forwarded-for[0]      → fallback dev/self-hosted (peut être spoofé)
 *
 * Note : x-forwarded-for est ignoré en production sur Vercel pour empêcher
 * le bypass de rate limits. En dev local sans proxy, fallback dégradé OK.
 */
export function getClientIp(headers: Headers): string {
  // Vercel edge proxy — header le plus sûr, set après edge auth
  const vercelIp = headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  if (vercelIp) return vercelIp

  // Cloudflare proxy
  const cfIp = headers.get('cf-connecting-ip')
  if (cfIp) return cfIp

  // Production : ne JAMAIS faire confiance à x-forwarded-for sans proxy connu
  if (process.env.NODE_ENV === 'production' && !process.env.TRUST_PROXY) {
    return 'unknown'
  }

  // Dev / self-hosted : fallback x-forwarded-for puis x-real-ip
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
  )
}

export default {
  checkRateLimit,
  getRateLimitConfig,
  getRateLimitKey,
  getClientIp,
  RATE_LIMITS,
}
