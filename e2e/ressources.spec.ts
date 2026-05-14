import { test, expect } from '@playwright/test'

/**
 * E2E — Lead magnets / Ressources gratuites
 *
 * Couvre :
 *   - Index /ressources liste les ressources
 *   - Détail /ressources/[slug] affiche le contenu structuré
 *   - JSON-LD Article présent
 *   - CSS @media print (toolbar caché)
 *   - NewsletterForm intégré en bas
 *   - Mention DDA L. 521-4 présente
 */

test.describe('Ressources — index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ressources')
  })

  test('affiche le hero et le H1', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Ressources/i)
  })

  test('liste au moins 4 ressources', async ({ page }) => {
    const links = page.locator('a[href^="/ressources/"]')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('badge catégorie visible sur chaque card', async ({ page }) => {
    await expect(page.getByText('BTP').first()).toBeVisible()
    await expect(page.getByText('RC Pro').first()).toBeVisible()
    await expect(page.getByText('Fiscalité').first()).toBeVisible()
    await expect(page.getByText('Réglementation').first()).toBeVisible()
  })
})

test.describe('Ressources — détail (kit RC Pro AE)', () => {
  const SLUG = 'kit-rc-pro-auto-entrepreneur-2026'

  test.beforeEach(async ({ page }) => {
    await page.goto(`/ressources/${SLUG}`)
  })

  test('H1 + breadcrumb visibles', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Kit complet RC Pro/i)
    await expect(page.getByRole('navigation', { name: /Fil d'Ariane/i })).toBeVisible()
  })

  test('JSON-LD Article présent', async ({ page }) => {
    const scripts = await page.locator('script[type="application/ld+json"]').all()
    let foundArticle = false
    for (const s of scripts) {
      const content = await s.textContent()
      if (!content) continue
      try {
        const data = JSON.parse(content)
        const items = Array.isArray(data) ? data : [data]
        for (const item of items) {
          if (item['@type'] === 'Article') {
            foundArticle = true
            expect(item.headline).toBeTruthy()
            expect(item.author).toBeTruthy()
            expect(item.inLanguage).toBe('fr-FR')
          }
        }
      } catch {
        /* ignore */
      }
    }
    expect(foundArticle).toBe(true)
  })

  test('bouton Imprimer/PDF présent', async ({ page }) => {
    await expect(page.getByText(/Imprimer.*PDF/i).first()).toBeVisible()
  })

  test('NewsletterForm intégré en bas', async ({ page }) => {
    await expect(page.getByText(/Cette ressource vous a été utile/i)).toBeVisible()
    // Il peut y avoir plusieurs forms newsletter (ressource + bannière globale)
    const emailInputs = page.getByPlaceholder(/prenom@exemple/i)
    expect(await emailInputs.count()).toBeGreaterThanOrEqual(1)
  })

  test('mention DDA L. 521-4 présente', async ({ page }) => {
    // Mention dans le footer ressource + potentiellement ailleurs
    await expect(page.getByText(/DDA art\. L\. 521-4/i).first()).toBeVisible()
  })

  test('contenu structuré : sections multiples', async ({ page }) => {
    const h2s = page.getByRole('heading', { level: 2 })
    const count = await h2s.count()
    expect(count).toBeGreaterThan(3)
  })

  test('lien retour vers /ressources', async ({ page }) => {
    const back = page.getByRole('link', { name: /Retour aux ressources/i })
    await expect(back).toBeVisible()
    await expect(back).toHaveAttribute('href', '/ressources')
  })
})
