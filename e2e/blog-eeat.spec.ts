import { test, expect } from '@playwright/test'

/**
 * E2E — Blog & E-E-A-T
 *
 * Couvre :
 *   - Index blog accessible avec articles
 *   - Article individuel : JSON-LD BlogPosting + FAQPage, breadcrumb,
 *     auteur Vivos, articles connexes (maillage sémantique), sources Légifrance
 *     pointent vers search (pas accueil ni faux articles)
 *   - Pages E-E-A-T : /a-propos, /equipe
 */

test.describe('Blog — index', () => {
  test('liste les articles avec catégories', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Décryptages|guides/i)
    // Au moins quelques articles publiés
    const articles = page.locator('article, [role="article"], a[href^="/blog/"]')
    expect(await articles.count()).toBeGreaterThan(5)
  })
})

test.describe('Blog — article RC Pro auto-entrepreneur (article top KW)', () => {
  const SLUG = 'rc-pro-auto-entrepreneur-guide-2026'

  test.beforeEach(async ({ page }) => {
    await page.goto(`/blog/${SLUG}`)
  })

  test('JSON-LD BlogPosting présent et bien structuré', async ({ page }) => {
    const scripts = await page.locator('script[type="application/ld+json"]').all()
    let foundBlogPosting = false
    for (const s of scripts) {
      const content = await s.textContent()
      if (!content) continue
      try {
        const data = JSON.parse(content)
        const items = Array.isArray(data) ? data : [data]
        for (const item of items) {
          if (item['@type'] === 'BlogPosting') {
            foundBlogPosting = true
            expect(item.headline).toBeTruthy()
            expect(item.datePublished).toBeTruthy()
            expect(item.author).toBeTruthy()
            expect(item.publisher).toBeTruthy()
            expect(item.inLanguage).toBe('fr-FR')
          }
        }
      } catch {
        /* ignore parse errors */
      }
    }
    expect(foundBlogPosting).toBe(true)
  })

  test('JSON-LD FAQPage généré si article a une FAQ', async ({ page }) => {
    // Le JSON-LD FAQPage n'est généré que si l'article contient une section
    // id="faq" avec list.items au format "Question ? Réponse." (heuristique).
    // Si l'article courant ne génère pas de FAQPage, le test est soft-skip.
    const scripts = await page.locator('script[type="application/ld+json"]').all()
    let foundFaq = false
    for (const s of scripts) {
      const content = await s.textContent()
      if (!content) continue
      try {
        const data = JSON.parse(content)
        const items = Array.isArray(data) ? data : [data]
        for (const item of items) {
          if (item['@type'] === 'FAQPage') {
            foundFaq = true
            expect(item.mainEntity).toBeTruthy()
            expect(Array.isArray(item.mainEntity)).toBe(true)
            expect(item.mainEntity.length).toBeGreaterThan(0)
          }
        }
      } catch {
        /* ignore */
      }
    }
    // Pour cet article spécifique, on s'attend à avoir une FAQ
    expect(foundFaq).toBe(true)
  })

  test('breadcrumb Blog > Catégorie > Article', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: /Fil d'Ariane/i })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible()
  })

  test('auteur Cabinet Vivos Assurance visible', async ({ page }) => {
    await expect(page.getByText('Cabinet Vivos Assurance').first()).toBeVisible()
  })

  test('section "Articles connexes recommandés" (maillage sémantique)', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Articles connexes recommandés/i })
    ).toBeVisible()
    // Au moins 2 articles liés (le scoring sémantique devrait trouver des matchs)
    const relatedLinks = page.locator('a[href^="/blog/"]').filter({
      hasText: /./,
    })
    expect(await relatedLinks.count()).toBeGreaterThan(1)
  })

  test('sources Légifrance pointent vers search/all (pas accueil ni faux article)', async ({
    page,
  }) => {
    const legifranceLinks = page.locator('a[href*="legifrance.gouv.fr"]')
    const count = await legifranceLinks.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < Math.min(count, 3); i++) {
      const href = await legifranceLinks.nth(i).getAttribute('href')
      // Vraies URLs : /search/all?query=...  (audit fix)
      // INTERDIT : LEGIARTI inventés
      expect(href).toMatch(/legifrance\.gouv\.fr\/(search\/all\?query=|$|\/$)/)
      expect(href).not.toMatch(/legifrance\.gouv\.fr\/codes\/article_lc\/LEGIARTI/)
    }
  })
})

test.describe('Pages E-E-A-T', () => {
  test('/a-propos affiche ORIAS + ACPR + DDA', async ({ page }) => {
    await page.goto('/a-propos')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Notre cabinet|cabinet/i)
    await expect(page.getByText(/ORIAS/i).first()).toBeVisible()
    await expect(page.getByText(/ACPR/i).first()).toBeVisible()
    await expect(page.getByText(/DDA|L\. 521-4/i).first()).toBeVisible()
  })

  test("/equipe affiche pôles d'expertise", async ({ page }) => {
    await page.goto('/equipe')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/Tous nos courtiers ORIAS/i)).toBeVisible()
    await expect(page.getByText(/IAS Niveau I/i).first()).toBeVisible()
  })

  test('/glossaire liste les termes', async ({ page }) => {
    await page.goto('/glossaire')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    // Termes clés présents
    await expect(page.getByText(/ACPR/i).first()).toBeVisible()
    await expect(page.getByText(/Décennale/i).first()).toBeVisible()
    await expect(page.getByText(/DDA/i).first()).toBeVisible()
  })
})
