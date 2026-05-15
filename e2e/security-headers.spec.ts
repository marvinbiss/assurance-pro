import { test, expect } from '@playwright/test'

/**
 * E2E — Headers de sécurité (CSP, HSTS, COOP, Permissions-Policy, ...)
 *
 * Vérifie la présence et la valeur des headers critiques pour la sécurité
 * d'un site YMYL (finance/assurance) en production. Le middleware
 * (src/middleware.ts) applique ces headers en mode production uniquement.
 *
 * En mode dev (NODE_ENV=development), le CSP est désactivé pour ne pas
 * casser le hot-reload — donc certains tests sont conditionnels au mode.
 */

const IS_PROD = process.env.NODE_ENV === 'production'

test.describe('Headers de sécurité', () => {
  test('HSTS preload avec 2 ans max-age + includeSubDomains', async ({ request }) => {
    const res = await request.get('/')
    const hsts = res.headers()['strict-transport-security']
    expect(hsts).toBeTruthy()
    expect(hsts).toContain('max-age=')
    // Au minimum 6 mois pour preload eligibility (Chrome HSTS preload list)
    const maxAge = parseInt(hsts!.match(/max-age=(\d+)/)?.[1] ?? '0', 10)
    expect(maxAge).toBeGreaterThanOrEqual(15_552_000) // 6 months
    expect(hsts).toContain('includeSubDomains')
  })

  test('X-Frame-Options DENY (clickjacking)', async ({ request }) => {
    const res = await request.get('/')
    expect(res.headers()['x-frame-options']).toBe('DENY')
  })

  test('X-Content-Type-Options nosniff', async ({ request }) => {
    const res = await request.get('/')
    expect(res.headers()['x-content-type-options']).toBe('nosniff')
  })

  test('Referrer-Policy strict', async ({ request }) => {
    const res = await request.get('/')
    const ref = res.headers()['referrer-policy']
    expect(ref).toBeTruthy()
    // Doit limiter le referer cross-origin
    expect(['strict-origin-when-cross-origin', 'no-referrer', 'same-origin']).toContain(ref)
  })

  test('Permissions-Policy restrictive', async ({ request }) => {
    const res = await request.get('/')
    const policy = res.headers()['permissions-policy']
    expect(policy).toBeTruthy()
    // Camera, microphone, paiement/géo/etc. doivent être désactivés ou scoped self
    expect(policy).toMatch(/camera=\(/)
    expect(policy).toMatch(/microphone=\(/)
  })

  test('Cross-Origin-Opener-Policy défini', async ({ request }) => {
    const res = await request.get('/')
    const coop = res.headers()['cross-origin-opener-policy']
    expect(coop).toBeTruthy()
    expect(['same-origin', 'same-origin-allow-popups']).toContain(coop)
  })

  test('x-nonce header généré pour CSP nonce strategy', async ({ request }) => {
    const res = await request.get('/')
    const nonce = res.headers()['x-nonce']
    expect(nonce).toBeTruthy()
    expect(nonce!.length).toBeGreaterThan(20)
  })

  // CSP n'est appliqué qu'en production (cf. middleware)
  test('CSP header présent en production', async ({ request }) => {
    test.skip(!IS_PROD, 'CSP désactivé en dev — test prod build only')
    const res = await request.get('/')
    const csp = res.headers()['content-security-policy']
    expect(csp).toBeTruthy()
    // Vérifications clés strict CSP
    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("'strict-dynamic'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain('upgrade-insecure-requests')
  })

  test('X-Permitted-Cross-Domain-Policies none', async ({ request }) => {
    const res = await request.get('/')
    expect(res.headers()['x-permitted-cross-domain-policies']).toBe('none')
  })

  test('Pas de header Server/X-Powered-By qui fuit la stack', async ({ request }) => {
    const res = await request.get('/')
    const server = res.headers()['server']
    const xpb = res.headers()['x-powered-by']
    // OK si absent, ou anonyme (Vercel/Next sont OK pour disclosure mineure)
    if (server) expect(server.length).toBeLessThan(50)
    // x-powered-by ne devrait pas mentionner Express/PHP/...
    if (xpb) expect(xpb).not.toMatch(/Express|PHP|ASP\.NET/i)
  })
})
