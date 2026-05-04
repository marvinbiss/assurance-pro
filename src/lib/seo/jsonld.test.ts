import { describe, it, expect } from 'vitest'
import {
  getHowToSchema,
  getPersonSchema,
  getDefinedTermSchema,
  getServiceSchema,
  getFAQPageSchema,
  getArticleSchema,
  getBreadcrumbSchema,
} from './jsonld'

describe('Schema.org JSON-LD helpers', () => {
  describe('getHowToSchema', () => {
    it('produit Schema HowTo avec étapes numérotées', () => {
      const schema = getHowToSchema({
        name: 'Comment résilier',
        description: 'Procédure Loi Hamon',
        steps: [
          { name: 'Étape 1', text: 'Rédiger lettre' },
          { name: 'Étape 2', text: 'Envoyer LRAR' },
        ],
      })
      expect(schema['@type']).toBe('HowTo')
      expect(schema.step).toHaveLength(2)
      expect(schema.step[0]?.position).toBe(1)
      expect(schema.step[1]?.position).toBe(2)
    })

    it('inclut totalTime ISO 8601 si fourni', () => {
      const schema = getHowToSchema({
        name: 'Test',
        description: 'D',
        totalTimeIso: 'PT15M',
        steps: [],
      })
      expect(schema.totalTime).toBe('PT15M')
    })

    it('inclut estimatedCost en EUR si fourni', () => {
      const schema = getHowToSchema({
        name: 'T',
        description: 'D',
        estimatedCostEur: 80,
        steps: [],
      }) as { estimatedCost?: { currency: string; value: string } }
      expect(schema.estimatedCost?.currency).toBe('EUR')
      expect(schema.estimatedCost?.value).toBe('80')
    })
  })

  describe('getPersonSchema', () => {
    it('produit Schema Person avec worksFor org', () => {
      const schema = getPersonSchema({
        name: 'Sarah Smith',
        jobTitle: 'Experte courtage',
        url: 'https://x/sarah',
        sameAs: ['https://linkedin.com/in/sarah'],
      })
      expect(schema['@type']).toBe('Person')
      expect(schema.name).toBe('Sarah Smith')
      expect(schema.sameAs).toContain('https://linkedin.com/in/sarah')
      expect(schema.worksFor).toBeTruthy()
    })

    it('inclut alumniOf comme EducationalOrganization', () => {
      const schema = getPersonSchema({
        name: 'X',
        jobTitle: 'Y',
        url: 'https://x/y',
        alumniOf: ['HEC Paris', 'Sciences Po'],
      }) as { alumniOf?: Array<{ '@type': string; name: string }> }
      expect(schema.alumniOf).toHaveLength(2)
      expect(schema.alumniOf?.[0]?.['@type']).toBe('EducationalOrganization')
    })
  })

  describe('getDefinedTermSchema', () => {
    it('produit Schema DefinedTerm avec inDefinedTermSet', () => {
      const schema = getDefinedTermSchema({
        name: 'ORIAS',
        description: 'Registre des intermédiaires',
        url: 'https://x/glossaire#orias',
        inDefinedTermSet: 'https://x/glossaire',
      })
      expect(schema['@type']).toBe('DefinedTerm')
      expect(schema.name).toBe('ORIAS')
      expect(schema.inDefinedTermSet).toBeTruthy()
    })
  })

  describe('Schemas existants régression', () => {
    it('getServiceSchema OK', () => {
      expect(getServiceSchema({ name: 'X', description: 'D', url: 'https://x' })['@type']).toBe(
        'Service'
      )
    })

    it('getFAQPageSchema OK', () => {
      expect(getFAQPageSchema([{ q: 'Q?', a: 'R.' }])['@type']).toBe('FAQPage')
    })

    it('getArticleSchema OK', () => {
      expect(getArticleSchema({ headline: 'X', description: 'D', url: 'https://x' })['@type']).toBe(
        'Article'
      )
    })

    it('getBreadcrumbSchema OK', () => {
      expect(getBreadcrumbSchema([{ name: 'X', url: '/x' }])['@type']).toBe('BreadcrumbList')
    })
  })
})
