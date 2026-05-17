import { describe, it, expect } from 'vitest'
import {
  BLOG_POSTS,
  getAllPosts,
  getAllCategories,
  getCategorySlug,
  getPostsByCategory,
  getPost,
} from './blog-posts'

describe('blog-posts data', () => {
  it('contains at least 4 posts', () => {
    expect(getAllPosts().length).toBeGreaterThanOrEqual(4)
  })

  it('every post has required fields and at least 3 sections', () => {
    for (const post of Object.values(BLOG_POSTS)) {
      expect(post.slug).toBeTruthy()
      expect(post.title).toBeTruthy()
      expect(post.description.length).toBeGreaterThan(50)
      expect(post.body.length).toBeGreaterThanOrEqual(3)
      expect(post.toc.length).toBe(post.body.length)
      expect(post.sources.length).toBeGreaterThan(0)
    }
  })

  it('TOC ids match body ids', () => {
    for (const post of Object.values(BLOG_POSTS)) {
      const tocIds = post.toc.map((t) => t.id)
      const bodyIds = post.body.map((b) => b.id)
      expect(tocIds).toEqual(bodyIds)
    }
  })

  it('returns posts sorted by publication date desc', () => {
    const posts = getAllPosts()
    for (let i = 1; i < posts.length; i++) {
      const prev = posts[i - 1]
      const cur = posts[i]
      if (!prev || !cur) throw new Error('unexpected sparse array')
      expect(prev.publishedAt >= cur.publishedAt).toBe(true)
    }
  })

  it('categorySlug normalizes accents and slashes', () => {
    expect(getCategorySlug('Mutuelle — TNS')).toBe('mutuelle-tns')
    expect(getCategorySlug('RC Pro')).toBe('rc-pro')
    expect(getCategorySlug('BTP')).toBe('btp')
  })

  it('getAllCategories aggregates count correctly', () => {
    const cats = getAllCategories()
    const total = cats.reduce((sum, c) => sum + c.count, 0)
    expect(total).toBe(getAllPosts().length)
  })

  it('getPostsByCategory filters case-insensitively', () => {
    const btpPosts = getPostsByCategory('btp')
    expect(btpPosts.length).toBeGreaterThan(0)
    expect(btpPosts.every((p) => p.category.toLowerCase() === 'btp')).toBe(true)
  })

  it('getPost returns undefined for unknown slug', () => {
    expect(getPost('does-not-exist')).toBeUndefined()
  })
})
