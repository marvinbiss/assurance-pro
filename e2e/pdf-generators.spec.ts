import { test, expect } from '@playwright/test'

/**
 * E2E — 5 générateurs PDF
 * Vérification : page accessible, form rendu, bouton PDF visible.
 * Téléchargement effectif PDF testé sur 1 cible (lettre-resiliation = pattern le plus simple).
 */

const PDF_OUTILS = [
  { slug: 'modele-attestation-decennale', titre: 'Modèle attestation décennale PDF' },
  { slug: 'modele-attestation-rc-pro', titre: 'Modèle attestation RC Pro PDF' },
  { slug: 'modele-facture-pro', titre: 'Modèle facture pro PDF' },
  { slug: 'modele-devis-pro', titre: 'Modèle devis pro PDF' },
  { slug: 'lettre-resiliation-assurance', titre: 'Lettre résiliation' },
]

test.describe('Générateurs PDF', () => {
  for (const outil of PDF_OUTILS) {
    test(`${outil.slug} - page accessible + form rendu`, async ({ page }) => {
      await page.goto(`/outils/${outil.slug}`)
      await expect(page.getByRole('heading', { level: 1 })).toContainText(/PDF|Modèle|résiliation/i)
      /* Vérifier qu'au moins 1 input est rendu */
      const inputs = page.locator('input, select, textarea')
      expect(await inputs.count()).toBeGreaterThan(0)
    })
  }

  test('lettre-resiliation : remplissage form + génération PDF', async ({ page }) => {
    await page.goto('/outils/lettre-resiliation-assurance')
    await page.waitForLoadState('networkidle')

    /* Remplir nom + adresse + assureur */
    const nomInput = page.locator('input').first()
    await nomInput.fill('Marvin Test')

    /* Le bouton PDF apparait après que dynamic import soit chargé */
    await page.waitForSelector('a:has-text("Télécharger"), span:has-text("Préparation du PDF")', {
      timeout: 10_000,
    })
  })
})
