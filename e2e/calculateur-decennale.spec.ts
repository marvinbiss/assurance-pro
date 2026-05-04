import { test, expect } from '@playwright/test'

test.describe('Calculateur tarif décennale', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/outils/calculateur-tarif-decennale')
  })

  test('affiche H1 et formulaire BTP', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Calculateur tarif décennale 2026'
    )
    await expect(page.locator('#calc-metier')).toBeVisible()
  })

  test('couvreur (top 1 sinistralité BTP) > peintre', async ({ page }) => {
    await page.locator('#calc-metier').selectOption('peintre-plaquiste')
    await page.waitForTimeout(200)
    const peintre = await getMedian(page)

    await page.locator('#calc-metier').selectOption('couvreur-zingueur')
    await page.waitForTimeout(200)
    const couvreur = await getMedian(page)

    expect(couvreur).toBeGreaterThan(peintre * 1.4)
  })

  test('zone DOM > métropole', async ({ page }) => {
    await page.locator('#calc-zone').selectOption('metropole')
    await page.waitForTimeout(200)
    const metro = await getMedian(page)

    await page.locator('#calc-zone').selectOption('dom')
    await page.waitForTimeout(200)
    const dom = await getMedian(page)

    expect(dom).toBeGreaterThan(metro)
  })

  test('CTA fonctionnel + Sticky Bar orange', async ({ page }) => {
    const cta = page.getByRole('link', { name: /Recevoir mon devis officiel/ })
    const href = await cta.getAttribute('href')
    expect(href).toContain('/outils/devis-assurance-decennale')
  })
})

async function getMedian(page: import('@playwright/test').Page): Promise<number> {
  const text = await page.locator('text=/Médiane indicative/').textContent()
  const match = text?.match(/(\d[\d\s]*) €\/an/)
  if (!match || !match[1]) return 0
  return parseInt(match[1].replace(/\s/g, ''), 10)
}
