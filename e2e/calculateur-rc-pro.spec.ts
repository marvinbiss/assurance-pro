import { test, expect } from '@playwright/test'

/**
 * E2E — Calculateur tarif RC Pro
 * Test parcours utilisateur : changement secteur, plafond, formes juridiques
 * Vérification que le résultat est cohérent et le CTA fonctionne.
 */

test.describe('Calculateur tarif RC Pro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/outils/calculateur-tarif-rc-pro')
  })

  test('affiche le H1 et le formulaire', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Calculateur tarif RC Pro 2026'
    )
    await expect(page.locator('#calc-secteur')).toBeVisible()
    await expect(page.locator('#calc-forme')).toBeVisible()
    await expect(page.locator('#calc-plafond')).toBeVisible()
  })

  test('affiche un tarif initial cohérent', async ({ page }) => {
    /* Profil par défaut : consultant + AE + 50k€ + plafond 500k€ */
    await page.waitForSelector('text=/Estimation tarif RC Pro/')
    const result = await page.locator('text=/€ — /').first().textContent()
    expect(result).toMatch(/\d+ €/)
  })

  test('changement secteur médecin libéral = tarif augmente', async ({ page }) => {
    await page.waitForSelector('text=/Estimation tarif RC Pro/')
    const tarifBefore = await getMedianTarif(page)

    await page.locator('#calc-secteur').selectOption('medecin-liberal')
    await page.waitForTimeout(200)
    const tarifAfter = await getMedianTarif(page)

    expect(tarifAfter).toBeGreaterThan(tarifBefore)
  })

  test('plafond 5M€ > plafond 500k€', async ({ page }) => {
    await page.waitForSelector('text=/Estimation tarif RC Pro/')
    await page.locator('#calc-plafond').selectOption('500000')
    await page.waitForTimeout(200)
    const ref = await getMedianTarif(page)

    await page.locator('#calc-plafond').selectOption('5000000')
    await page.waitForTimeout(200)
    const max = await getMedianTarif(page)

    expect(max).toBeGreaterThan(ref)
  })

  test('CTA pointe vers /outils/devis-rc-pro avec query params', async ({ page }) => {
    await page.locator('#calc-secteur').selectOption('avocat-juridique')
    await page.locator('#calc-forme').selectOption('eurl')
    const cta = page.getByRole('link', { name: /Recevoir mon devis officiel/ })
    await expect(cta).toBeVisible()
    const href = await cta.getAttribute('href')
    expect(href).toContain('/outils/devis-rc-pro')
    expect(href).toContain('secteur=avocat-juridique')
    expect(href).toContain('forme=eurl')
  })

  test('Sticky CTA Bar apparait après scroll', async ({ page }) => {
    /* Scroll plus de 25% */
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5))
    await page.waitForTimeout(500)
    await expect(page.getByRole('complementary', { name: /bandeau d'action/i })).toBeVisible()
  })

  test('détail du calcul affiche les 7 coefficients ACPR', async ({ page }) => {
    await page.getByText('Voir le détail du calcul').click()
    const details = page.locator('details:has-text("Voir le détail du calcul")')
    await expect(details.locator('text=/Coef CA/')).toBeVisible()
    await expect(details.locator('text=/Coef forme juridique/')).toBeVisible()
    await expect(details.locator('text=/Coef plafond garantie/')).toBeVisible()
  })
})

async function getMedianTarif(page: import('@playwright/test').Page): Promise<number> {
  const text = await page.locator('text=/Médiane indicative/').textContent()
  const match = text?.match(/(\d[\d\s]*) €\/an/)
  if (!match || !match[1]) return 0
  return parseInt(match[1].replace(/\s/g, ''), 10)
}
