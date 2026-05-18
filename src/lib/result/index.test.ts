import { describe, it, expect } from 'vitest'
import {
  ok,
  err,
  fromPromise,
  type DomainError,
  notFoundError,
  validationError,
  databaseError,
  domainErrorToStatus,
} from './index'

describe('Result pattern', () => {
  it('ok wraps value', () => {
    const r = ok(42)
    expect(r.isOk()).toBe(true)
    expect(r.isErr()).toBe(false)
    expect(r._unsafeUnwrap()).toBe(42)
  })

  it('err wraps error', () => {
    const r = err<number, string>('boom')
    expect(r.isErr()).toBe(true)
    expect(r._unsafeUnwrapErr()).toBe('boom')
  })

  it('map transforms ok values', () => {
    const r = ok(2).map((x) => x * 10)
    expect(r._unsafeUnwrap()).toBe(20)
  })

  it('mapErr transforms err values', () => {
    const r = err<number, string>('boom').mapErr((e) => e.toUpperCase())
    expect(r._unsafeUnwrapErr()).toBe('BOOM')
  })

  it('andThen chains operations on ok', () => {
    const r = ok(5).andThen((n) => (n > 0 ? ok(n * 2) : err('negative')))
    expect(r._unsafeUnwrap()).toBe(10)
  })

  it('andThen short-circuits on err', () => {
    const r = ok(-1).andThen((n) => (n > 0 ? ok(n * 2) : err<number, string>('negative')))
    expect(r._unsafeUnwrapErr()).toBe('negative')
  })

  it('fromPromise converts resolved promise to ok', async () => {
    const r = await fromPromise(Promise.resolve(42), (e) => `failed: ${e}`)
    expect(r._unsafeUnwrap()).toBe(42)
  })

  it('fromPromise converts rejected promise to err', async () => {
    const r = await fromPromise(Promise.reject(new Error('boom')), (e) => `failed: ${String(e)}`)
    expect(r._unsafeUnwrapErr()).toBe('failed: Error: boom')
  })
})

describe('DomainError factories', () => {
  it('notFoundError', () => {
    const e: DomainError = notFoundError('Page', 'rc-pro')
    expect(e.code).toBe('NotFound')
    if (e.code === 'NotFound') {
      expect(e.resource).toBe('Page')
      expect(e.identifier).toBe('rc-pro')
    }
  })

  it('validationError', () => {
    const e: DomainError = validationError('email', 'invalid format')
    expect(e.code).toBe('ValidationFailed')
    if (e.code === 'ValidationFailed') {
      expect(e.field).toBe('email')
      expect(e.reason).toBe('invalid format')
    }
  })

  it('databaseError', () => {
    const e: DomainError = databaseError('SELECT * FROM users', new Error('connection lost'))
    expect(e.code).toBe('Database')
  })
})

describe('domainErrorToStatus', () => {
  it('maps NotFound to 404', () => {
    expect(domainErrorToStatus({ code: 'NotFound', resource: 'X' })).toBe(404)
  })
  it('maps ValidationFailed to 400', () => {
    expect(domainErrorToStatus({ code: 'ValidationFailed', field: 'x', reason: 'y' })).toBe(400)
  })
  it('maps Unauthorized to 401', () => {
    expect(domainErrorToStatus({ code: 'Unauthorized' })).toBe(401)
  })
  it('maps Forbidden to 403', () => {
    expect(domainErrorToStatus({ code: 'Forbidden' })).toBe(403)
  })
  it('maps Conflict to 409', () => {
    expect(domainErrorToStatus({ code: 'Conflict', reason: 'x' })).toBe(409)
  })
  it('maps RateLimited to 429', () => {
    expect(domainErrorToStatus({ code: 'RateLimited', retryAfterMs: 1000 })).toBe(429)
  })
  it('maps Database, External / Internal to 500', () => {
    expect(domainErrorToStatus({ code: 'Database', query: 'x', cause: null })).toBe(500)
    expect(domainErrorToStatus({ code: 'External', service: 'x', cause: null })).toBe(500)
    expect(domainErrorToStatus({ code: 'Internal', cause: null })).toBe(500)
  })
})
