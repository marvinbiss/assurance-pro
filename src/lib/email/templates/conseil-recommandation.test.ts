import { describe, it, expect } from 'vitest'
import { conseilRecommandationTemplate } from './conseil-recommandation'

describe('conseilRecommandationTemplate', () => {
  const base = {
    reference: 'LEAD-20260430-AB12X9',
    prenom: 'Jean',
    nom: 'Dupont',
    garantie: 'Décennale BTP',
    metier: 'plombier',
    produitRecommande: 'Décennale Pack PME',
    partenaireRecommande: 'SMABTP',
    motivationChoix:
      'Plafond et exclusions adaptés à un plombier auto-entrepreneur (CA < 50k€).',
    alternativesExaminees: [
      { partenaire: 'MMA', raison_ecart: 'Tarif 18% plus élevé pour profil équivalent' },
      { partenaire: 'Hiscox', raison_ecart: 'N\'accepte pas les < 2 ans d\'ancienneté' },
    ],
    nombreContratsAnalyses: 8,
    plafondGarantie: '500 000 €',
    cotisationAnnuelle: '850 € HT',
    signatureCourtier: 'Marie Martin',
    oriasCourtier: '07 0XX XXX',
    signatureHash: 'a'.repeat(64),
  }

  it('returns subject including reference and garantie', () => {
    const out = conseilRecommandationTemplate(base)
    expect(out.subject).toContain('LEAD-20260430-AB12X9')
    expect(out.subject).toContain('Décennale BTP')
  })

  it('escapes HTML special chars in payload', () => {
    const dirty = {
      ...base,
      prenom: '<script>alert(1)</script>',
      motivationChoix: 'Comparatif <iframe src="x"></iframe>',
    }
    const html = conseilRecommandationTemplate(dirty).html
    expect(html).not.toContain('<script>alert(1)</script>')
    expect(html).not.toContain('<iframe src="x"></iframe>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&lt;iframe')
  })

  it('renders alternatives table', () => {
    const html = conseilRecommandationTemplate(base).html
    expect(html).toContain('MMA')
    expect(html).toContain('Tarif 18% plus élevé')
    expect(html).toContain('Hiscox')
  })

  it('omits alternatives section gracefully when empty', () => {
    const html = conseilRecommandationTemplate({
      ...base,
      alternativesExaminees: [],
    }).html
    expect(html).toContain('Aucune alternative')
  })

  it('includes signature hash for ACPR 2024-R-03 traceability', () => {
    const html = conseilRecommandationTemplate(base).html
    expect(html).toContain(base.signatureHash)
    expect(html).toContain('SHA-256')
  })

  it('mentions analyse impartiale (art. L. 521-4 II)', () => {
    const html = conseilRecommandationTemplate(base).html
    expect(html).toContain('8 contrats')
    expect(html).toContain('L. 521-4')
  })
})
