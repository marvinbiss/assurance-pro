// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type {
  LeadCanonicalRecord,
  LegacyLeadRecord,
  ConseilRecordInput,
} from './lead-persistence'

// Mock du client admin avant import du module testé.
const rpcMock = vi.fn()

vi.mock('@/lib/supabase/admin', () => ({
  createPiiAdminClient: () => ({ rpc: rpcMock }),
}))

vi.mock('@/lib/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}))

// vitest hoists vi.mock() au-dessus de l'import, donc l'import statique
// reçoit déjà les mocks (pas besoin de top-level await).
import { persistLead } from './lead-persistence'

const legacyClientStub = {} as never

const baseLegacy: LegacyLeadRecord = {
  vertical: 'BTP',
  metier_code: 'plombier',
  garantie_code: 'decennale',
  statut_juridique: 'auto_entrepreneur',
  tranche_ca_code: 'lt_50k',
  postal_code: '75001',
  anciennete_annees: 3,
  sinistralite_36m: 0,
  sous_traitance: false,
  prenom: 'Jean',
  nom: 'Dupont',
  email: 'jean@example.com',
  telephone: '0612345678',
  consent_rgpd: true,
  consent_marketing: false,
  score: 75,
  segment: 'warm',
}

const baseCanonical: LeadCanonicalRecord = {
  reference: 'LEAD-20260430-ABCDEF0123',
  vertical: 'BTP',
  forme_juridique: 'auto_entrepreneur',
  ville_cp: '75001',
  contact_prenom: 'Jean',
  contact_nom: 'Dupont',
  contact_email: 'jean@example.com',
  contact_telephone: '0612345678',
  scoring: 'warm',
  scoring_score: 75,
  utm: {},
  ip: '1.2.3.4',
  user_agent: 'Mozilla/5.0',
  consent_dda: true,
  consent_marketing: false,
  conseil_hash: 'a'.repeat(64),
  fic_acknowledged_at: '2026-04-30T10:00:00Z',
}

const baseConseil: Omit<ConseilRecordInput, 'lead_id'> = {
  reference: 'LEAD-20260430-ABCDEF0123',
  besoins: { vertical: 'BTP' },
  signature_hash: 'a'.repeat(64),
}

describe('persistLead — RPC atomic', () => {
  beforeEach(() => {
    rpcMock.mockReset()
  })

  it('calls persist_lead_atomic RPC with the 3 payloads', async () => {
    rpcMock.mockResolvedValue({
      data: [{ legacy_lead_id: 'lead-uuid-1', canonical_reference: baseCanonical.reference }],
      error: null,
    })

    const result = await persistLead(legacyClientStub, baseLegacy, baseCanonical, baseConseil)

    expect(rpcMock).toHaveBeenCalledOnce()
    expect(rpcMock).toHaveBeenCalledWith('persist_lead_atomic', expect.objectContaining({
      p_legacy: expect.objectContaining({ vertical: 'BTP', metier_code: 'plombier' }),
      p_canonical: expect.objectContaining({
        reference: baseCanonical.reference,
        fic_acknowledged_ip: '1.2.3.4',
        fic_acknowledged_ua: 'Mozilla/5.0',
      }),
      p_conseil: expect.objectContaining({ signature_hash: 'a'.repeat(64) }),
    }))

    expect(result.legacyLeadId).toBe('lead-uuid-1')
    expect(result.canonical.ok).toBe(true)
    expect(result.conseil.ok).toBe(true)
  })

  it('throws when RPC returns an error (atomic rollback in DB)', async () => {
    rpcMock.mockResolvedValue({
      data: null,
      error: { message: 'duplicate key value violates unique constraint' },
    })

    await expect(
      persistLead(legacyClientStub, baseLegacy, baseCanonical, baseConseil)
    ).rejects.toThrow(/Lead atomic persist failed/)
  })

  it('throws when RPC returns empty data', async () => {
    rpcMock.mockResolvedValue({ data: [], error: null })

    await expect(
      persistLead(legacyClientStub, baseLegacy, baseCanonical, baseConseil)
    ).rejects.toThrow(/Lead atomic persist failed/)
  })

  it('handles non-array data shape (single row)', async () => {
    rpcMock.mockResolvedValue({
      data: { legacy_lead_id: 'lead-uuid-2', canonical_reference: baseCanonical.reference },
      error: null,
    })

    const result = await persistLead(legacyClientStub, baseLegacy, baseCanonical, baseConseil)
    expect(result.legacyLeadId).toBe('lead-uuid-2')
  })

  it('throws when no legacy_lead_id is returned', async () => {
    rpcMock.mockResolvedValue({
      data: [{ canonical_reference: 'no-id' }],
      error: null,
    })

    await expect(
      persistLead(legacyClientStub, baseLegacy, baseCanonical, baseConseil)
    ).rejects.toThrow(/no legacy_lead_id/)
  })
})
