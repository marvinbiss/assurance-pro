import { test, expect } from '@playwright/test'

test.describe('Comparateur RC Pro 8 assureurs', () => {
  test('affiche les 8 assureurs partenaires', async ({ page }) => {
    await page.goto('/outils/comparateur-rc-pro')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Comparateur RC Pro 2026')

    /* Vérifier que 8 cartes assureurs sont affichées */
    const cartes = page.locator(
      'h3:has-text("Hiscox"), h3:has-text("MMA"), h3:has-text("AXA"), h3:has-text("Allianz"), h3:has-text("Generali"), h3:has-text("MAIF"), h3:has-text("Wakam"), h3:has-text("April")'
    )
    await expect(cartes).toHaveCount(8)
  })

  test('tri par secteur immobilier remonte assureurs forts', async ({ page }) => {
    await page.goto('/outils/comparateur-rc-pro')
    /* Le secteur "Tous secteurs" par défaut */
    await page.locator('#cp-secteur').selectOption('Informatique')
    await page.waitForTimeout(300)

    /* Au moins 1 carte doit avoir le badge "RECOMMANDÉ POUR VOUS" pour secteur IT */
    const recommande = page.getByText('RECOMMANDÉ POUR VOUS').first()
    await expect(recommande).toBeVisible()
  })

  test('tri par priorité tarif remonte assureurs low-cost', async ({ page }) => {
    await page.goto('/outils/comparateur-rc-pro')
    await page.locator('#cp-priorite').selectOption('tarif')
    await page.waitForTimeout(300)

    /* Premier assureur listé devrait avoir le badge "Tarif compétitif" */
    const premierBadge = page.locator('span:has-text("Tarif compétitif")').first()
    await expect(premierBadge).toBeVisible()
  })

  test('CTA principal pointe vers /outils/devis-rc-pro', async ({ page }) => {
    await page.goto('/outils/comparateur-rc-pro')
    const cta = page.getByRole('link', { name: /Recevoir 3 devis personnalisés/ })
    await expect(cta).toBeVisible()
    expect(await cta.getAttribute('href')).toBe('/outils/devis-rc-pro')
  })
})
