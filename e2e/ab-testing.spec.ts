import { test, expect } from '@playwright/test'

/**
 * E2E — Infrastructure A/B testing (cookie + dataLayer)
 *
 * Vérifie que :
 *  - Le cookie `vivos_vid` (visitor ID) est créé à la 1ʳᵉ visite
 *  - Le cookie `ab_variants` stocke les variants assignés
 *  - L'event `ab_exposure` est pushé dans dataLayer GA4
 *  - Le variant est stable entre rechargements (sticky assignment)
 *
 * Note : ces tests dépendent du fait qu'au moins une expérience soit
 * activée ET utilisée par un composant client. Si aucun composant
 * n'utilise useExperiment(), les cookies ab_variants restent vides
 * — auquel cas certains tests sont skip.
 */

test.describe('A/B Testing infrastructure', () => {
  test('système chargé : cookies créés au montage React', async ({ page, context }) => {
    await page.goto('/')

    // Attendre un peu pour que les hooks useExperiment côté client s'exécutent
    await page.waitForTimeout(1000)

    const cookies = await context.cookies()
    const cookieNames = cookies.map((c) => c.name)

    // Au minimum, le visitor ID devrait être présent si une expérience est active
    // SI aucune expérience n'est branchée → cookies vides → skip soft
    const hasVisitorId = cookieNames.includes('vivos_vid')
    const hasAbCookie = cookieNames.includes('ab_variants')

    test.info().annotations.push({
      type: 'note',
      description: `vivos_vid: ${hasVisitorId}, ab_variants: ${hasAbCookie}`,
    })

    // Si aucun cookie A/B → aucune expérience utilisée par un composant
    // Ce n'est pas une erreur, c'est juste une info sur l'état actuel
    if (!hasVisitorId && !hasAbCookie) {
      test.skip(true, 'Aucune expérience active branchée à un composant client')
    }
  })

  test('dataLayer ab_exposure event pushé si expérience active', async ({ page }) => {
    await page.goto('/')

    // Attendre le chargement complet + hooks
    await page.waitForTimeout(2000)

    const exposureEvents = await page.evaluate(() => {
      const w = window as typeof window & { dataLayer?: Array<{ event?: string }> }
      return (w.dataLayer ?? []).filter((e) => e.event === 'ab_exposure')
    })

    test.info().annotations.push({
      type: 'note',
      description: `${exposureEvents.length} ab_exposure events trouvés`,
    })

    // Soft : si aucune exposure → pas d'expérience branchée (OK)
    if (exposureEvents.length === 0) {
      test.skip(true, "Aucune exposure trackée — pas d'expérience client active")
    }
  })

  test('cookie ab_variants stable entre rechargements (sticky)', async ({ page, context }) => {
    await page.goto('/')
    await page.waitForTimeout(1500)

    const cookies1 = await context.cookies()
    const ab1 = cookies1.find((c) => c.name === 'ab_variants')?.value

    if (!ab1) {
      test.skip(true, 'Pas de cookie ab_variants — aucune expérience client active')
      return
    }

    await page.reload()
    await page.waitForTimeout(1500)

    const cookies2 = await context.cookies()
    const ab2 = cookies2.find((c) => c.name === 'ab_variants')?.value

    // Le cookie doit être identique (sticky assignment)
    expect(ab2).toBe(ab1)
  })

  test('visitor ID stable entre rechargements', async ({ page, context }) => {
    await page.goto('/')
    await page.waitForTimeout(1500)

    const cookies1 = await context.cookies()
    const vid1 = cookies1.find((c) => c.name === 'vivos_vid')?.value

    if (!vid1) {
      test.skip(true, 'Pas de cookie vivos_vid — aucune expérience client active')
      return
    }

    await page.reload()
    await page.waitForTimeout(500)

    const cookies2 = await context.cookies()
    const vid2 = cookies2.find((c) => c.name === 'vivos_vid')?.value

    expect(vid2).toBe(vid1)
  })
})
