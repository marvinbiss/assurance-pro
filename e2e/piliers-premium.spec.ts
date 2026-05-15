import { test, expect, type Page } from '@playwright/test'

/**
 * E2E — Piliers premium (assurance-decennale, rc-pro, cyber-assurance).
 *
 * Vérifie qu'un pilier premium expose tous les composants attendus dans le bon
 * ordre : trust badges, social proof stats, calculateur tarif, comparatif
 * assureurs, expert bio, FAQ, CTA devis final, et que les interactions
 * critiques fonctionnent (FAQ accordion, calculateur change, skip-link).
 */

interface PilierFixture {
  readonly path: string
  readonly title: RegExp
  readonly calculatorTitle: RegExp
}

const PILIERS: readonly PilierFixture[] = [
  {
    path: '/assurance-decennale',
    title: /Assurance décennale|décennale BTP/i,
    calculatorTitle: /Décennale BTP — votre fourchette/i,
  },
  {
    path: '/rc-pro',
    title: /RC Pro|Responsabilité civile/i,
    calculatorTitle: /RC Pro — votre fourchette/i,
  },
  {
    path: '/cyber-assurance',
    title: /Cyber|cyber-assurance/i,
    calculatorTitle: /Cyber-assurance — votre fourchette/i,
  },
]

async function dismissOverlays(page: Page) {
  // Cookie banner / consent overlays peuvent bloquer les interactions.
  for (const label of [/Accepter/i, /Tout accepter/i, /OK/i]) {
    const btn = page.getByRole('button', { name: label }).first()
    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {})
      break
    }
  }
}

test.describe('Piliers premium — composants présents', () => {
  for (const pilier of PILIERS) {
    test(`${pilier.path} expose tous les blocs premium`, async ({ page }) => {
      await page.goto(pilier.path)
      await dismissOverlays(page)

      // 1. Titre principal du pilier
      await expect(page.locator('h1').first()).toBeVisible()
      await expect(page.locator('h1').first()).toContainText(pilier.title)

      // 2. Trust badges ACPR — liste avec aria-label dédié
      await expect(page.getByLabel(/Badges de conformité réglementaire/i).first()).toBeVisible()

      // 3. Social proof stats — au moins une stat affichée (indicateurs de confiance)
      await expect(page.getByLabel(/Indicateurs de confiance/i).first()).toBeVisible()

      // 4. Calculateur tarif — heading dédié par garantie
      await expect(page.getByText(pilier.calculatorTitle).first()).toBeVisible()

      // 5. Comparatif assureurs — soit table desktop soit liste mobile
      const comparatifCaption = page.getByText(/Comparatif des assureurs/i).first()
      await expect(comparatifCaption).toBeAttached()

      // 6. Expert bio — article avec aria-label "Expert : ..."
      await expect(page.locator('article[aria-label^="Expert"]').first()).toBeVisible()

      // 7. FAQ section avec ancre #faq
      await expect(page.locator('#faq')).toBeVisible()
      await expect(page.locator('#faq details').first()).toBeAttached()

      // 8. CTA devis final — Link href=/devis?garantie=...
      const devisLinks = page.locator('a[href^="/devis"]')
      expect(await devisLinks.count()).toBeGreaterThan(0)
    })
  }
})

test.describe('Piliers premium — interactions critiques', () => {
  test('FAQ accordion : ouvrir la première question révèle la réponse', async ({ page }) => {
    await page.goto('/assurance-decennale')
    await dismissOverlays(page)

    const firstDetails = page.locator('#faq details').first()
    await firstDetails.scrollIntoViewIfNeeded()

    // Avant ouverture : ne doit pas être open
    const initialOpen = await firstDetails.evaluate((el) => (el as HTMLDetailsElement).open)
    expect(initialOpen).toBe(false)

    // Click sur summary → ouvre l'accordion
    await firstDetails.locator('summary').click()

    const isOpen = await firstDetails.evaluate((el) => (el as HTMLDetailsElement).open)
    expect(isOpen).toBe(true)
  })

  test('Calculateur tarif : changer le métier met à jour la fourchette', async ({ page }) => {
    await page.goto('/assurance-decennale')
    await dismissOverlays(page)

    const select = page.getByLabel(/Sélection du métier/i).first()
    await select.scrollIntoViewIfNeeded()
    await expect(select).toBeVisible()

    // Le résultat est rendu dans un container aria-live="polite"
    const result = page.locator('[aria-live="polite"]').first()
    const before = await result.textContent()

    // Sélectionne couvreur (base 2000) — devrait élargir le range
    await select.selectOption('couvreur')

    const after = await result.textContent()
    expect(after).not.toBe(before)
    expect(after).toMatch(/€/)
  })

  test('Skip-link est le 1er élément focusable au Tab', async ({ page }) => {
    await page.goto('/assurance-decennale')

    // Press Tab et vérifie focus sur skip-link
    await page.keyboard.press('Tab')

    const focused = await page.evaluate(() => {
      const el = document.activeElement
      return el ? { tag: el.tagName, text: el.textContent?.trim() ?? '' } : null
    })

    // Skip-link doit pointer vers contenu principal
    expect(focused?.text).toMatch(/contenu principal|main content/i)
  })
})
