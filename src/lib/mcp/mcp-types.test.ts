/**
 * Tests unitaires types + helpers MCP.
 *
 * Vérifie: schemas Zod validation, helpers rpcSuccess/rpcError,
 * constantes RPC_ERRORS, format proofId.
 */

import { describe, it, expect } from 'vitest'
import {
  recueilExigencesSchema,
  generateQuoteSchema,
  rpcSuccess,
  rpcError,
  RPC_ERRORS,
  GARANTIES_SUPPORTED,
  STATUTS_SUPPORTED,
} from './types'

describe('MCP types', () => {
  describe('recueilExigencesSchema', () => {
    it('accepte un payload minimal valide', () => {
      const result = recueilExigencesSchema.safeParse({
        garantie_souhaitee: 'rc-pro',
        metier: 'freelance-it',
        statut_juridique: 'auto-entrepreneur',
      })
      expect(result.success).toBe(true)
    })

    it('rejette une garantie inconnue', () => {
      const result = recueilExigencesSchema.safeParse({
        garantie_souhaitee: 'pizza-insurance',
        metier: 'plombier',
        statut_juridique: 'sasu',
      })
      expect(result.success).toBe(false)
    })

    it('rejette un statut inconnu', () => {
      const result = recueilExigencesSchema.safeParse({
        garantie_souhaitee: 'decennale',
        metier: 'plombier',
        statut_juridique: 'mafia',
      })
      expect(result.success).toBe(false)
    })

    it('rejette un métier vide', () => {
      const result = recueilExigencesSchema.safeParse({
        garantie_souhaitee: 'rc-pro',
        metier: 'a',
        statut_juridique: 'sasu',
      })
      expect(result.success).toBe(false)
    })

    it('accepte tous les champs optionnels', () => {
      const result = recueilExigencesSchema.safeParse({
        garantie_souhaitee: 'cyber',
        metier: 'agence-web',
        statut_juridique: 'sas',
        ca_annuel: 250000,
        nb_salaries: 4,
        anciennete_activite_annees: 5,
        sinistres_5_derniers_ans: 0,
        ville: 'Paris',
      })
      expect(result.success).toBe(true)
    })

    it('clamp nb_salaries 0 par défaut', () => {
      const result = recueilExigencesSchema.parse({
        garantie_souhaitee: 'rc-pro',
        metier: 'consultant',
        statut_juridique: 'sasu',
      })
      expect(result.nb_salaries).toBe(0)
    })

    it('rejette CA négatif', () => {
      const result = recueilExigencesSchema.safeParse({
        garantie_souhaitee: 'rc-pro',
        metier: 'consultant',
        statut_juridique: 'sasu',
        ca_annuel: -1000,
      })
      expect(result.success).toBe(false)
    })

    it('rejette CA > 50M€ (hors scope TPE)', () => {
      const result = recueilExigencesSchema.safeParse({
        garantie_souhaitee: 'rc-pro',
        metier: 'consultant',
        statut_juridique: 'sas',
        ca_annuel: 100_000_000,
      })
      expect(result.success).toBe(false)
    })
  })

  describe('generateQuoteSchema', () => {
    it('accepte un proofId valide format mcp_proof_<32hex>', () => {
      const result = generateQuoteSchema.safeParse({
        proofId: 'mcp_proof_' + 'a'.repeat(32),
      })
      expect(result.success).toBe(true)
    })

    it('rejette proofId mal formé', () => {
      const result = generateQuoteSchema.safeParse({
        proofId: 'invalid_format',
      })
      expect(result.success).toBe(false)
    })

    it('rejette proofId avec mauvaise longueur', () => {
      const result = generateQuoteSchema.safeParse({
        proofId: 'mcp_proof_short',
      })
      expect(result.success).toBe(false)
    })

    it('rejette proofId avec caractères non hex', () => {
      const result = generateQuoteSchema.safeParse({
        proofId: 'mcp_proof_' + 'z'.repeat(32),
      })
      expect(result.success).toBe(false)
    })
  })

  describe('GARANTIES_SUPPORTED', () => {
    it('couvre les 14 verticales Vivos', () => {
      expect(GARANTIES_SUPPORTED.length).toBe(14)
      expect(GARANTIES_SUPPORTED).toContain('rc-pro')
      expect(GARANTIES_SUPPORTED).toContain('decennale')
      expect(GARANTIES_SUPPORTED).toContain('cyber')
      expect(GARANTIES_SUPPORTED).toContain('mutuelle-pro')
      expect(GARANTIES_SUPPORTED).toContain('homme-cle')
    })
  })

  describe('STATUTS_SUPPORTED', () => {
    it('couvre les 8 statuts juridiques principaux', () => {
      expect(STATUTS_SUPPORTED.length).toBe(8)
      expect(STATUTS_SUPPORTED).toContain('auto-entrepreneur')
      expect(STATUTS_SUPPORTED).toContain('sasu')
      expect(STATUTS_SUPPORTED).toContain('profession-liberale')
    })
  })

  describe('rpcSuccess', () => {
    it('forme une réponse JSON-RPC 2.0 valide', () => {
      const res = rpcSuccess(42, { ok: true })
      expect(res).toEqual({
        jsonrpc: '2.0',
        id: 42,
        result: { ok: true },
      })
    })

    it('accepte id null', () => {
      const res = rpcSuccess(null, {})
      expect(res.id).toBe(null)
    })
  })

  describe('rpcError', () => {
    it('forme une erreur JSON-RPC 2.0', () => {
      const res = rpcError(7, RPC_ERRORS.INVALID_PARAMS, 'bad params')
      expect(res).toEqual({
        jsonrpc: '2.0',
        id: 7,
        error: {
          code: -32602,
          message: 'bad params',
        },
      })
    })

    it('inclut data si fourni', () => {
      const res = rpcError(1, RPC_ERRORS.INTERNAL_ERROR, 'oops', { detail: 'foo' })
      expect(res.error.data).toEqual({ detail: 'foo' })
    })
  })

  describe('RPC_ERRORS catalogue', () => {
    it('expose les codes JSON-RPC standards', () => {
      expect(RPC_ERRORS.PARSE_ERROR).toBe(-32700)
      expect(RPC_ERRORS.INVALID_REQUEST).toBe(-32600)
      expect(RPC_ERRORS.METHOD_NOT_FOUND).toBe(-32601)
      expect(RPC_ERRORS.INVALID_PARAMS).toBe(-32602)
      expect(RPC_ERRORS.INTERNAL_ERROR).toBe(-32603)
    })

    it('expose les codes Vivos custom (-32000 range)', () => {
      expect(RPC_ERRORS.COMPLIANCE_DDA_REQUIRED).toBe(-32001)
      expect(RPC_ERRORS.PROOF_EXPIRED).toBe(-32002)
      expect(RPC_ERRORS.PROOF_NOT_FOUND).toBe(-32003)
      expect(RPC_ERRORS.ORIAS_PENDING).toBe(-32004)
    })
  })
})
