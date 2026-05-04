import { test, expect } from '@playwright/test'

/**
 * E2E — 3 forms ORIAS leads
 * Vérification : page accessible, étapes form fonctionnelles.
 * Pas de soumission réelle (éviter pollution Supabase prod).
 */

test.describe('Forms ORIAS — Devis leads', () => {
  test('/outils/devis-rc-pro accessible + form 3 étapes', async ({ page }) => {
    await page.goto('/outils/devis-rc-pro')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Devis RC Pro 2026/)
    /* Au moins 1 indicateur d'étape (Étape 1 sur 3) */
    await expect(page.getByText(/[ÉE]tape\s*1/i).first()).toBeVisible()
  })

  test('/outils/devis-assurance-decennale accessible', async ({ page }) => {
    await page.goto('/outils/devis-assurance-decennale')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Devis assurance décennale/)
  })

  test('/outils/comparateur-mutuelle-pro accessible', async ({ page }) => {
    await page.goto('/outils/comparateur-mutuelle-pro')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('/outils/devis-rc-pro accepte query params (prefill secteur)', async ({ page }) => {
    await page.goto('/outils/devis-rc-pro?secteur=transport-vtc')
    await page.waitForLoadState('networkidle')
    /* La page doit toujours être fonctionnelle avec query params */
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
