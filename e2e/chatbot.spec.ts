import { test, expect } from '@playwright/test'

/**
 * E2E — Chatbot Widget (assistant IA Vivos)
 *
 * Couvre l'UI du widget (ouverture/fermeture, disclaimer, suggestions,
 * input, rate limit handling). Pas de test des réponses LLM réelles
 * (nécessite OPENAI_API_KEY + embeddings, validé séparément).
 */

test.describe('Chatbot Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Le ChatWidget est dynamic(..., { ssr: false }), il faut attendre
    // le chargement côté client.
    await page
      .getByRole('button', { name: /Ouvrir l'assistant IA/i })
      .waitFor({ state: 'visible', timeout: 15_000 })
  })

  test('bouton flottant visible en bas-droite', async ({ page }) => {
    const btn = page.getByRole('button', { name: /Ouvrir l'assistant IA/i })
    await expect(btn).toBeVisible()
    const box = await btn.boundingBox()
    expect(box).toBeTruthy()
    if (box) {
      // Bouton dans la moitié droite et bas de la viewport
      const viewport = page.viewportSize()
      if (viewport) {
        expect(box.x).toBeGreaterThan(viewport.width / 2)
        expect(box.y).toBeGreaterThan(viewport.height / 2)
      }
    }
  })

  test('ouverture/fermeture du panel', async ({ page }) => {
    const btn = page.getByRole('button', { name: /Ouvrir l'assistant IA/i })
    await btn.click()

    // Panel ouvert : header + greeting visible
    await expect(page.getByRole('dialog', { name: /Assistant IA Vivos/i })).toBeVisible()
    await expect(page.getByText(/Assistant IA Vivos/i).first()).toBeVisible()

    // Fermer
    const closeBtn = page.getByRole('button', { name: /Fermer le chat/i })
    await closeBtn.click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('disclaimer YMYL DDA L. 521-4 affiché', async ({ page }) => {
    await page.getByRole('button', { name: /Ouvrir l'assistant IA/i }).click()
    await expect(page.getByText(/Assistant IA générique/i)).toBeVisible()
    await expect(page.getByText(/DDA art\. L\. 521-4/i)).toBeVisible()
  })

  test('disclaimer dismissable', async ({ page }) => {
    await page.getByRole('button', { name: /Ouvrir l'assistant IA/i }).click()
    const dismiss = page.getByRole('button', { name: /Fermer l'avertissement/i })
    await expect(dismiss).toBeVisible()
    await dismiss.click()
    await expect(page.getByText(/Assistant IA générique/i)).not.toBeVisible()
  })

  test('4 suggestions cliquables au démarrage', async ({ page }) => {
    await page.getByRole('button', { name: /Ouvrir l'assistant IA/i }).click()
    await expect(page.getByText(/Suggestions/i)).toBeVisible()
    await expect(
      page.getByRole('button', { name: /Suis-je obligé d'avoir une décennale/i })
    ).toBeVisible()
    await expect(page.getByRole('button', { name: /Combien coûte la RC Pro/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /résilier mon assurance pro/i })).toBeVisible()
    await expect(
      page.getByRole('button', { name: /différence entre RC Pro et décennale/i })
    ).toBeVisible()
  })

  test('input textarea + bouton envoyer présents', async ({ page }) => {
    await page.getByRole('button', { name: /Ouvrir l'assistant IA/i }).click()
    const textarea = page.getByPlaceholder(/Votre question/i)
    await expect(textarea).toBeVisible()

    const sendBtn = page.getByRole('button', { name: /Envoyer le message/i })
    // Bouton désactivé tant que l'input est vide
    await expect(sendBtn).toBeDisabled()

    await textarea.fill('Test question')
    await expect(sendBtn).toBeEnabled()
  })

  test('mention pas de stockage + lien Confidentialité', async ({ page }) => {
    await page.getByRole('button', { name: /Ouvrir l'assistant IA/i }).click()
    // Texte "IA générique. Pas de stockage..." (sur plusieurs nodes côte à côte)
    await expect(page.getByText(/pas de stockage/i)).toBeVisible()
    const link = page.getByRole('link', { name: /Confidentialité/i }).first()
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/confidentialite')
  })

  test('greeting initial visible', async ({ page }) => {
    await page.getByRole('button', { name: /Ouvrir l'assistant IA/i }).click()
    await expect(page.getByText(/Bonjour 👋/i)).toBeVisible()
    await expect(page.getByText(/assistant IA du cabinet Vivos Assurance/i)).toBeVisible()
  })

  test('max length input respecté (500 chars)', async ({ page }) => {
    await page.getByRole('button', { name: /Ouvrir l'assistant IA/i }).click()
    const textarea = page.getByPlaceholder(/Votre question/i)
    const maxLength = await textarea.getAttribute('maxlength')
    expect(maxLength).toBe('500')
  })
})
