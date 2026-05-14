import { test, expect } from '@playwright/test'

/**
 * E2E — PWA (manifest, service worker, offline)
 *
 * Vérifie les éléments critiques pour l'installabilité PWA et le mode offline.
 * Note : Lighthouse PWA test à faire séparément en CI pour le score complet.
 */

test.describe('PWA — Manifest', () => {
  test('manifest.json accessible et valide JSON', async ({ request }) => {
    const res = await request.get('/manifest.json')
    expect(res.status()).toBe(200)
    const manifest = (await res.json()) as Record<string, unknown>

    // Champs obligatoires Web App Manifest
    expect(manifest.name).toBeTruthy()
    expect(manifest.short_name).toBeTruthy()
    expect(manifest.start_url).toBe('/')
    expect(manifest.display).toBeTruthy()
    expect(manifest.theme_color).toBeTruthy()
    expect(manifest.background_color).toBeTruthy()
    expect(Array.isArray(manifest.icons)).toBe(true)
    expect((manifest.icons as unknown[]).length).toBeGreaterThan(0)
  })

  test('manifest a au moins 4 shortcuts (raccourcis app)', async ({ request }) => {
    const res = await request.get('/manifest.json')
    const manifest = (await res.json()) as Record<string, unknown>
    expect(Array.isArray(manifest.shortcuts)).toBe(true)
    expect((manifest.shortcuts as unknown[]).length).toBeGreaterThanOrEqual(4)
  })

  test('manifest lang fr-FR + scope /', async ({ request }) => {
    const res = await request.get('/manifest.json')
    const manifest = (await res.json()) as Record<string, unknown>
    expect(manifest.lang).toBe('fr-FR')
    expect(manifest.scope).toBe('/')
  })

  test('lien manifest dans le head HTML', async ({ page }) => {
    await page.goto('/')
    const link = await page.locator('link[rel="manifest"]').getAttribute('href')
    expect(link).toBe('/manifest.json')
  })

  test('theme-color meta présent', async ({ page }) => {
    await page.goto('/')
    const colors = await page.locator('meta[name="theme-color"]').all()
    expect(colors.length).toBeGreaterThan(0)
  })
})

test.describe('PWA — Service Worker', () => {
  test('sw.js accessible (200 + JavaScript valide)', async ({ request }) => {
    const res = await request.get('/sw.js')
    expect(res.status()).toBe(200)
    const contentType = res.headers()['content-type']
    expect(contentType).toMatch(/javascript|text/i)
    const body = await res.text()
    // Contient les éléments-clés
    expect(body).toContain('self.addEventListener')
    expect(body).toContain('install')
    expect(body).toContain('fetch')
    expect(body).toContain('activate')
  })

  test('SW versionné (cache invalidation strategy)', async ({ request }) => {
    const res = await request.get('/sw.js')
    const body = await res.text()
    expect(body).toMatch(/CACHE_VERSION|VERSION/i)
  })
})

test.describe('PWA — Offline', () => {
  test('/offline page accessible', async ({ page }) => {
    await page.goto('/offline')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/hors ligne/i)
    await expect(page.getByRole('link', { name: /Retour à l'accueil/i })).toBeVisible()
  })

  test('/offline pas indexée par les moteurs', async ({ page }) => {
    await page.goto('/offline')
    const robots = await page.locator('meta[name="robots"]').getAttribute('content')
    expect(robots).toMatch(/noindex/i)
  })
})
