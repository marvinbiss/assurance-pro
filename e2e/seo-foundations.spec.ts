import { test, expect } from '@playwright/test'

/**
 * E2E — Fondations SEO (sitemap, robots, JSON-LD Organization, meta)
 *
 * Couvre les éléments structurels SEO critiques que le crawler Google
 * regarde en premier.
 */

test.describe('Fondations SEO', () => {
  test('robots.txt accessible', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.status()).toBe(200)
    const body = await res.text()
    // Doit contenir au minimum une directive Sitemap
    expect(body).toContain('Sitemap')
  })

  test('sitemap.xml accessible et valide', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    const body = await res.text()
    expect(body).toContain('<?xml')
    expect(body).toMatch(/<urlset|<sitemapindex/)
  })

  test('home — JSON-LD Organization + WebSite', async ({ page }) => {
    await page.goto('/')
    const scripts = await page.locator('script[type="application/ld+json"]').all()
    let foundOrg = false
    let foundWebSite = false
    // Schema.org Organization a plusieurs sous-types valides (Corporation, NGO,
    // InsuranceAgency, LocalBusiness, etc.) — Vivos utilise InsuranceAgency.
    const ORG_TYPES = new Set([
      'Organization',
      'InsuranceAgency',
      'LocalBusiness',
      'Corporation',
      'NGO',
    ])
    for (const s of scripts) {
      const content = await s.textContent()
      if (!content) continue
      try {
        const data = JSON.parse(content)
        const items = Array.isArray(data) ? data : [data]
        for (const item of items) {
          if (ORG_TYPES.has(item['@type'])) foundOrg = true
          if (item['@type'] === 'WebSite') foundWebSite = true
        }
      } catch {
        /* ignore */
      }
    }
    expect(foundOrg).toBe(true)
    expect(foundWebSite).toBe(true)
  })

  test('home — meta description + OG image présents', async ({ page }) => {
    await page.goto('/')
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(50)
    expect(description!.length).toBeLessThan(200)

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(ogImage).toBeTruthy()
  })

  test('home — canonical URL définie', async ({ page }) => {
    await page.goto('/')
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBeTruthy()
    expect(canonical).toMatch(/^https?:\/\//)
  })

  test('home — lang fr-FR', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'fr')
  })

  test('skip to main content link (a11y)', async ({ page }) => {
    await page.goto('/')
    const skip = page.getByRole('link', { name: /Aller au contenu principal/i })
    await expect(skip).toBeAttached()
    const href = await skip.getAttribute('href')
    expect(href).toBe('#main-content')
  })

  test('header navigation principale visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible()
  })

  test('footer mentions ORIAS + ACPR + Médiation', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('contentinfo')).toBeVisible()
    await expect(page.getByText(/ORIAS/i).first()).toBeVisible()
    await expect(page.getByText(/ACPR/i).first()).toBeVisible()
    await expect(page.getByText(/Médiation/i).first()).toBeVisible()
  })

  test('footer contient lien Simulateur (nouveau)', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Simulateur' }).first()).toHaveAttribute(
      'href',
      '/simulateur'
    )
  })

  test('llms.txt accessible pour LLM discovery', async ({ request }) => {
    const res = await request.get('/llms.txt')
    expect([200, 404]).toContain(res.status())
    // Si présent, doit être text/plain ou similaire
    if (res.status() === 200) {
      const body = await res.text()
      expect(body.length).toBeGreaterThan(50)
    }
  })
})
