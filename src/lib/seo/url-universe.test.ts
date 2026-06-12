import { describe, it, expect } from 'vitest'
import { buildPriorityUrlPaths } from './url-universe'

describe('buildPriorityUrlPaths', () => {
  const paths = buildPriorityUrlPaths()

  it('includes the homepage and static pillar pages', () => {
    expect(paths).toContain('/')
    expect(paths).toContain('/rc-pro')
    expect(paths).toContain('/assurance-decennale')
  })

  it('derives métier / profession / blog sub-paths', () => {
    expect(paths.some((p) => p.startsWith('/assurance-decennale/'))).toBe(true)
    expect(paths.some((p) => p.startsWith('/rc-pro/'))).toBe(true)
    expect(paths.some((p) => p.startsWith('/blog/'))).toBe(true)
  })

  it('returns no duplicates', () => {
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('returns only root-relative paths', () => {
    expect(paths.every((p) => p.startsWith('/'))).toBe(true)
  })
})
