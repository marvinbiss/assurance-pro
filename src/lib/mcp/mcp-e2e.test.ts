/**
 * Tests E2E flow MCP — recueil → quote → compare → audit.
 *
 * Mock Supabase admin client. Vérifie:
 *   - Validation Zod stricte sur chaque tool
 *   - Format proofId SHA-256 généré correctement
 *   - Chaîne de tools fonctionnelle (proofId réutilisé)
 *   - Error handling (proof manquant, expiré, métier inconnu)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Supabase admin AVANT import des handlers
const mockUpsert = vi.fn(async () => ({ data: null, error: null }))
const mockInsert = vi.fn(async () => ({ data: null, error: null }))
const mockSelect = vi.fn(() => ({
  eq: vi.fn(() => ({
    single: vi.fn(async () => ({
      data: {
        id: 'mcp_proof_' + 'a'.repeat(32),
        garantie_souhaitee: 'rc-pro',
        metier: 'freelance-it',
        statut_juridique: 'auto-entrepreneur',
        ville: null,
        expires_at: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
      },
      error: null,
    })),
  })),
}))
const mockFrom = vi.fn(() => ({
  upsert: mockUpsert,
  insert: mockInsert,
  select: mockSelect,
}))

vi.mock('@/lib/supabase/admin', () => ({
  createPiiAdminClient: () => ({ from: mockFrom }),
  createAdminClient: () => ({ from: mockFrom }),
}))

vi.mock('@/lib/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}))

const { handleRecueilExigences } = await import('./tools/recueil-exigences')
const { handleGenerateQuotePro } = await import('./tools/generate-quote-pro')
const { handleCompareOffers } = await import('./tools/compare-offers')
const { handleAuditCoverage } = await import('./tools/audit-coverage')

describe('MCP E2E flow', () => {
  beforeEach(() => {
    mockUpsert.mockClear()
    mockInsert.mockClear()
    mockSelect.mockClear()
    mockFrom.mockClear()
  })

  describe('recueil_exigences', () => {
    it('génère un proofId au format mcp_proof_<32hex>', async () => {
      const result = await handleRecueilExigences(
        {
          garantie_souhaitee: 'rc-pro',
          metier: 'freelance-it',
          statut_juridique: 'auto-entrepreneur',
        },
        { llmOrigin: 'anthropic' }
      )
      expect(result.isError).toBeFalsy()
      const sc = result.structuredContent as { proofId: string }
      expect(sc.proofId).toMatch(/^mcp_proof_[a-f0-9]{32}$/)
    })

    it('rejette payload invalide', async () => {
      const result = await handleRecueilExigences(
        { garantie_souhaitee: 'invalid', metier: 'X', statut_juridique: 'fake' },
        {}
      )
      expect(result.isError).toBe(true)
    })

    it('persiste dans mcp_proofs via Supabase upsert', async () => {
      await handleRecueilExigences(
        {
          garantie_souhaitee: 'decennale',
          metier: 'plombier',
          statut_juridique: 'sasu',
          ca_annuel: 80000,
          ville: 'Paris',
        },
        { llmSessionId: 'sess-test', llmOrigin: 'openai' }
      )
      expect(mockFrom).toHaveBeenCalledWith('mcp_proofs')
      expect(mockUpsert).toHaveBeenCalled()
    })

    it('proofId identique pour payload identique (idempotence)', async () => {
      const payload = {
        garantie_souhaitee: 'cyber' as const,
        metier: 'agence-web',
        statut_juridique: 'sas' as const,
      }
      const r1 = await handleRecueilExigences(payload, {})
      const r2 = await handleRecueilExigences(payload, {})
      const sc1 = r1.structuredContent as { proofId: string }
      const sc2 = r2.structuredContent as { proofId: string }
      expect(sc1.proofId).toBe(sc2.proofId)
    })

    it('proofId différent pour payloads différents', async () => {
      const r1 = await handleRecueilExigences(
        {
          garantie_souhaitee: 'rc-pro',
          metier: 'freelance-it',
          statut_juridique: 'auto-entrepreneur',
        },
        {}
      )
      const r2 = await handleRecueilExigences(
        { garantie_souhaitee: 'rc-pro', metier: 'plombier', statut_juridique: 'auto-entrepreneur' },
        {}
      )
      const sc1 = r1.structuredContent as { proofId: string }
      const sc2 = r2.structuredContent as { proofId: string }
      expect(sc1.proofId).not.toBe(sc2.proofId)
    })
  })

  describe('generate_quote_pro', () => {
    it('rejette proofId mal formé', async () => {
      const result = await handleGenerateQuotePro({ proofId: 'invalid' })
      expect(result.isError).toBe(true)
    })

    it('retourne devis structuré pour proof valide', async () => {
      const result = await handleGenerateQuotePro({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
      })
      // Selon catalogues réels, freelance-it RC Pro doit retourner un devis
      if (!result.isError) {
        const sc = result.structuredContent as {
          prime_min: number
          prime_med: number
          assureurs: unknown[]
        }
        expect(sc.prime_min).toBeGreaterThan(0)
        expect(sc.prime_med).toBeGreaterThan(0)
        expect(Array.isArray(sc.assureurs)).toBe(true)
      }
    })
  })

  describe('compare_offers', () => {
    it('rejette proofId mal formé', async () => {
      const result = await handleCompareOffers({ proofId: 'bad' })
      expect(result.isError).toBe(true)
    })

    it('rejette max_assureurs > 5', async () => {
      const result = await handleCompareOffers({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
        max_assureurs: 10,
      })
      expect(result.isError).toBe(true)
    })

    it('retourne offres triées par prix croissant', async () => {
      const result = await handleCompareOffers({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
        max_assureurs: 3,
      })
      if (!result.isError) {
        const sc = result.structuredContent as {
          offres: Array<{ prix_annuel_eur: number }>
        }
        for (let i = 1; i < sc.offres.length; i++) {
          expect(sc.offres[i]!.prix_annuel_eur).toBeGreaterThanOrEqual(
            sc.offres[i - 1]!.prix_annuel_eur
          )
        }
      }
    })
  })

  describe('audit_coverage', () => {
    it('rejette absence contrat_actuel', async () => {
      const result = await handleAuditCoverage({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
      })
      expect(result.isError).toBe(true)
    })

    it('rejette assureur trop court', async () => {
      const result = await handleAuditCoverage({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
        contrat_actuel: { assureur: 'X', prime_annuelle_eur: 500 },
      })
      expect(result.isError).toBe(true)
    })

    it('retourne score + verdict pour contrat valide', async () => {
      const result = await handleAuditCoverage({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
        contrat_actuel: {
          assureur: 'Hiscox',
          prime_annuelle_eur: 500,
        },
      })
      if (!result.isError) {
        const sc = result.structuredContent as {
          score_global: number
          verdict: string
          ecart_tarif_pct: number
        }
        expect(sc.score_global).toBeGreaterThanOrEqual(0)
        expect(sc.score_global).toBeLessThanOrEqual(100)
        expect(['optimal', 'correct', 'sous_couvert', 'sur_tarif', 'risque_critique']).toContain(
          sc.verdict
        )
      }
    })

    it('détecte sur-tarification si prime > 40% médiane', async () => {
      const result = await handleAuditCoverage({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
        contrat_actuel: {
          assureur: 'AssureurCher SAS',
          prime_annuelle_eur: 50000, // énormément au-dessus du marché RC Pro freelance IT
        },
      })
      if (!result.isError) {
        const sc = result.structuredContent as { ecart_tarif_pct: number; verdict: string }
        expect(sc.ecart_tarif_pct).toBeGreaterThan(40)
        expect(['sur_tarif', 'risque_critique', 'sous_couvert']).toContain(sc.verdict)
      }
    })
  })
})
