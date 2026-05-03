import { describe, it, expect } from 'vitest'
import {
  buildExigencesSnapshot,
  hashExigences,
  deriveLegalRequirements,
} from './exigences-capture'

describe('exigences-capture', () => {
  const base = {
    vertical: 'BTP',
    metier_code: 'plombier',
    garantie_code: 'decennale',
    statut_juridique: 'auto_entrepreneur',
    tranche_ca: 'lt_50k',
    anciennete_annees: 3,
    sinistralite_36m: 0,
    sous_traitance: false,
    garanties_demandees: ['decennale', 'rc_pro'],
  }

  it('buildExigencesSnapshot adds collected_at', () => {
    const s = buildExigencesSnapshot(base)
    expect(s.collected_at).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    expect(s.metier_code).toBe('plombier')
  })

  it('hashExigences is deterministic for equal payloads', () => {
    const s1 = { ...base, collected_at: '2026-04-30T00:00:00Z' }
    const s2 = { ...base, collected_at: '2026-04-30T00:00:00Z' }
    expect(hashExigences(s1)).toBe(hashExigences(s2))
  })

  it('hashExigences differs when payload differs', () => {
    const s1 = { ...base, collected_at: '2026-04-30T00:00:00Z' }
    const s2 = { ...base, collected_at: '2026-04-30T00:00:00Z', metier_code: 'electricien' }
    expect(hashExigences(s1)).not.toBe(hashExigences(s2))
  })

  it('hash output is 64 hex chars (SHA-256)', () => {
    const s = buildExigencesSnapshot(base)
    expect(hashExigences(s)).toMatch(/^[a-f0-9]{64}$/)
  })

  it('derives Loi Spinetta for BTP', () => {
    const s = buildExigencesSnapshot(base)
    const reqs = deriveLegalRequirements(s)
    expect(reqs).toContain('decennale_loi_spinetta_art_L241-1')
    expect(reqs).toContain('rc_pro_recommandee')
  })

  it('derives RC circulation for VTC', () => {
    const s = buildExigencesSnapshot({ ...base, vertical: 'VTC_TAXI', metier_code: 'vtc' })
    const reqs = deriveLegalRequirements(s)
    expect(reqs).toContain('rc_circulation_obligatoire_art_L211-1')
    expect(reqs).toContain('inscription_evtc_obligatoire')
  })

  it('derives Loi Kouchner for santé', () => {
    const s = buildExigencesSnapshot({
      ...base,
      vertical: 'SANTE_MEDICAL',
      metier_code: 'medecin_generaliste',
    })
    const reqs = deriveLegalRequirements(s)
    expect(reqs).toContain('rc_medicale_loi_kouchner_art_L1142-2')
  })

  it('flags cyber recommandation for grand compte', () => {
    const s = buildExigencesSnapshot({ ...base, tranche_ca: 'gt_500k' })
    const reqs = deriveLegalRequirements(s)
    expect(reqs).toContain('cyber_recommandee_taille_pme')
  })
})
