/**
 * Professional Logger - Assurance Pro
 * Centralized logging with environment-aware output
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogContext {
  userId?: string
  reference?: string
  ticket?: string
  leadId?: string
  action?: string
  [key: string]: unknown
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

// Only log warnings and errors in production
const MIN_LOG_LEVEL: LogLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug'

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LOG_LEVEL]
}

/**
 * Format de log :
 * - DEV : `[timestamp] [LEVEL] message {ctx}` (lisible terminal)
 * - PROD : JSON structuré (parseable par Datadog/Vercel Logs/Loki/etc.)
 */
function formatMessage(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString()

  if (process.env.NODE_ENV === 'production') {
    /* JSON structuré : 1 ligne = 1 event */
    return JSON.stringify({
      timestamp,
      level,
      msg: message,
      env: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      service: 'assurance-pro',
      ...(context ?? {}),
    })
  }

  /* Format dev lisible */
  const contextStr = context ? ` ${JSON.stringify(context)}` : ''
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
}

interface AppLogger {
  debug(message: string, context?: LogContext): void
  debug(context: LogContext, message?: string): void
  info(message: string, context?: LogContext): void
  info(context: LogContext, message?: string): void
  warn(message: string, context?: LogContext): void
  warn(context: LogContext, message?: string): void
  error(message: string, error?: unknown, context?: LogContext): void
  error(context: LogContext, message?: string): void
  child(defaultContext: LogContext): AppLogger
  api: {
    request(route: string, method: string, context?: LogContext): void
    success(route: string, context?: LogContext): void
    error(route: string, error: unknown, context?: LogContext): void
  }
}

function createLogger(defaultContext?: LogContext): AppLogger {
  const mergeContext = (context?: LogContext): LogContext | undefined => {
    if (!defaultContext && !context) return undefined
    return { ...defaultContext, ...context }
  }

  // Normalise (msg, ctx) ou (ctx, msg) — supporte le pattern pino-like
  const normaliseArgs = (
    a?: string | LogContext,
    b?: string | LogContext | unknown
  ): { message: string; context?: LogContext } => {
    if (typeof a === 'string') {
      return { message: a, context: b as LogContext | undefined }
    }
    if (a && typeof a === 'object') {
      return { message: typeof b === 'string' ? b : '', context: a }
    }
    return { message: '', context: undefined }
  }

  const instance: AppLogger = {
    debug(a?: string | LogContext, b?: string | LogContext): void {
      if (shouldLog('debug')) {
        const { message, context } = normaliseArgs(a, b)
        // eslint-disable-next-line no-console -- this IS the structured logger sink
        console.log(formatMessage('debug', message, mergeContext(context)))
      }
    },

    info(a?: string | LogContext, b?: string | LogContext): void {
      if (shouldLog('info')) {
        const { message, context } = normaliseArgs(a, b)
        // eslint-disable-next-line no-console -- this IS the structured logger sink
        console.log(formatMessage('info', message, mergeContext(context)))
      }
    },

    warn(a?: string | LogContext, b?: string | LogContext): void {
      if (shouldLog('warn')) {
        const { message, context } = normaliseArgs(a, b)
        console.warn(formatMessage('warn', message, mergeContext(context)))
      }
    },

    error(a?: string | LogContext, b?: unknown, c?: LogContext): void {
      if (shouldLog('error')) {
        let message = ''
        let error: unknown
        let context: LogContext | undefined

        if (typeof a === 'string') {
          message = a
          error = b
          context = c
        } else if (a && typeof a === 'object') {
          message = typeof b === 'string' ? b : ''
          context = a as LogContext
        }

        const errorDetails =
          error instanceof Error
            ? { name: error.name, message: error.message, stack: error.stack }
            : error
        console.error(
          formatMessage('error', message, { ...mergeContext(context), error: errorDetails })
        )
      }
    },

    child(childContext: LogContext): AppLogger {
      return createLogger({ ...defaultContext, ...childContext })
    },

    api: {
      request(route: string, method: string, context?: LogContext): void {
        instance.debug(`API ${method} ${route}`, context)
      },

      success(route: string, context?: LogContext): void {
        instance.info(`API success: ${route}`, context)
      },

      error(route: string, error: unknown, context?: LogContext): void {
        instance.error(`API error: ${route}`, error, context)
      },
    },
  }

  return instance
}

export const logger = createLogger()

export default logger
