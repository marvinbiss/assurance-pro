/**
 * Recommandation écrite motivée DDA — art. L. 521-4 du Code des assurances.
 *
 * Cet email constitue la pièce contractuelle envoyée au prospect avant
 * souscription : il liste le produit recommandé, motive le choix par rapport
 * aux exigences déclarées, énumère les alternatives examinées, et atteste
 * du nombre de contrats analysés (preuve d'analyse impartiale art. L. 521-4 II).
 */

import { esc, escSubject } from './_html'

export interface ConseilRecommandationData {
  reference: string
  prenom: string
  nom: string
  garantie: string
  metier?: string
  produitRecommande: string
  partenaireRecommande: string
  motivationChoix: string
  alternativesExaminees: Array<{ partenaire: string; raison_ecart: string }>
  nombreContratsAnalyses: number
  plafondGarantie?: string
  cotisationAnnuelle?: string
  signatureCourtier: string
  oriasCourtier: string
  signatureHash: string
}

export function conseilRecommandationTemplate(d: ConseilRecommandationData): {
  subject: string
  html: string
} {
  const safeRef = esc(d.reference)
  const altRows = d.alternativesExaminees
    .map(
      (a) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#475569;vertical-align:top">${esc(a.partenaire)}</td><td style="padding:6px 0">${esc(a.raison_ecart)}</td></tr>`
    )
    .join('')

  return {
    subject: escSubject(`Recommandation motivée ${d.garantie} — Dossier ${d.reference}`),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
    <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:8px;padding:32px;border:1px solid #e2e8f0">
      <div style="font-size:13px;color:#64748b;margin-bottom:8px">
        Recommandation écrite — art. L. 521-4 du Code des assurances
      </div>
      <h1 style="font-size:22px;margin:0 0 16px">Recommandation motivée pour votre dossier ${safeRef}</h1>

      <p>Bonjour ${esc(d.prenom)} ${esc(d.nom)},</p>

      <p>
        Conformément à notre devoir de conseil (DDA art. L. 521-4 + Recommandation
        ACPR 2024-R-03), nous vous transmettons la recommandation écrite motivée
        relative à votre demande${d.metier ? ` ${esc(d.metier)}` : ''} en
        ${esc(d.garantie)}.
      </p>

      <h2 style="font-size:16px;margin:24px 0 8px">Produit recommandé</h2>
      <table style="border-collapse:collapse;font-size:14px;width:100%">
        <tr><td style="padding:6px 12px 6px 0;color:#475569;width:200px">Produit</td><td style="padding:6px 0"><strong>${esc(d.produitRecommande)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#475569">Compagnie</td><td style="padding:6px 0">${esc(d.partenaireRecommande)}</td></tr>
        ${d.plafondGarantie ? `<tr><td style="padding:6px 12px 6px 0;color:#475569">Plafond de garantie</td><td style="padding:6px 0">${esc(d.plafondGarantie)}</td></tr>` : ''}
        ${d.cotisationAnnuelle ? `<tr><td style="padding:6px 12px 6px 0;color:#475569">Cotisation annuelle</td><td style="padding:6px 0">${esc(d.cotisationAnnuelle)}</td></tr>` : ''}
      </table>

      <h2 style="font-size:16px;margin:24px 0 8px">Motivation du choix</h2>
      <p style="white-space:pre-wrap;line-height:1.55">${esc(d.motivationChoix)}</p>

      <h2 style="font-size:16px;margin:24px 0 8px">Alternatives examinées</h2>
      ${
        altRows
          ? `<table style="border-collapse:collapse;font-size:13px;width:100%">${altRows}</table>`
          : `<p style="font-size:13px;color:#64748b">Aucune alternative pertinente identifiée parmi les contrats analysés.</p>`
      }

      <p style="font-size:13px;color:#475569;margin-top:24px">
        <strong>Analyse impartiale (art. L. 521-4 II)</strong> :
        ${d.nombreContratsAnalyses} contrats ont été analysés sur le marché pour fonder
        cette recommandation. Notre cabinet ne détient aucun lien capitalistique avec
        les compagnies distribuées.
      </p>

      <div style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:8px;padding:16px;margin-top:24px;font-size:12px;color:#475569">
        <strong>Empreinte de traçabilité (Recommandation ACPR 2024-R-03)</strong><br>
        SHA-256 : <code style="font-family:monospace;font-size:11px">${esc(d.signatureHash)}</code><br>
        Conservation : 10 ans à compter de la date d'envoi.
      </div>

      <p style="margin-top:24px">
        Vous pouvez accepter cette recommandation et procéder à la souscription, ou
        nous demander des ajustements (plafond, franchise, garanties additionnelles).
      </p>

      <hr style="border:0;border-top:1px solid #e2e8f0;margin:24px 0">
      <p style="font-size:12px;color:#475569;line-height:1.5">
        ${esc(d.signatureCourtier)}<br>
        Courtier responsable — ORIAS n° ${esc(d.oriasCourtier)}<br>
        <a href="mailto:contact@vivos-assurance.fr" style="color:#1d4ed8">contact@vivos-assurance.fr</a>
      </p>
      <p style="font-size:11px;color:#94a3b8;line-height:1.5;margin-top:16px">
        Cabinet immatriculé ORIAS — soumis au contrôle de l'ACPR.
        Pour toute réclamation : <a href="https://vivos-assurance.fr/reclamation" style="color:#1d4ed8">vivos-assurance.fr/reclamation</a>.
      </p>
    </div>
  </body>
</html>
`,
  }
}
