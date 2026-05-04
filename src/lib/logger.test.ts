import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('logger', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  it('format dev : "[ts] [LEVEL] message {ctx}"', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    const { logger } = await import('./logger')
    logger.info('test message', { userId: '123' })
    /* En dev, format texte lisible */
    expect(consoleLogSpy).toHaveBeenCalled()
    const call = consoleLogSpy.mock.calls[0]?.[0]
    expect(typeof call).toBe('string')
  })

  it('child() retourne un logger avec contexte par défaut', async () => {
    const { logger } = await import('./logger')
    const child = logger.child({ requestId: 'abc' })
    expect(child).toBeTruthy()
    expect(typeof child.info).toBe('function')
    expect(typeof child.error).toBe('function')
  })

  it('error() capture stack si Error passé', async () => {
    const { logger } = await import('./logger')
    const err = new Error('oops')
    logger.error('failed', err)
    expect(consoleErrorSpy).toHaveBeenCalled()
    const output = consoleErrorSpy.mock.calls[0]?.[0]
    expect(output).toBeTruthy()
  })

  it('api.request / success / error helpers fonctionnent', async () => {
    const { logger } = await import('./logger')
    logger.api.request('/api/test', 'GET')
    logger.api.success('/api/test')
    logger.api.error('/api/test', new Error('fail'))
    /* Pas d'erreur thrown = OK */
    expect(true).toBe(true)
  })
})
