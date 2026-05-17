interface LeadConfirmationParams {
  reference: string
  prenom: string
  nom: string
  garantie: string
  metier?: string
  segment: 'hot' | 'warm' | 'cold'
}

const SLA_BY_SEGMENT: Record<'hot' | 'warm' | 'cold', string> = {
  hot: 'sous 2 heures ouvrées',
  warm: 'sous 24 heures ouvrées',
  cold: 'sous 72 heures ouvrées',
}

import { esc, escSubject } from './_html'

export function leadConfirmationTemplate({
  reference,
  prenom,
  nom,
  garantie,
  metier,
  segment,
}: LeadConfirmationParams): { subject: string; html: string } {
  const sla = SLA_BY_SEGMENT[segment]
  const safeRef = esc(reference)
  const safePrenom = esc(prenom)
  const safeNom = esc(nom)
  const safeGarantie = esc(garantie)
  const safeMetier = metier ? esc(metier) : ''
  return {
    subject: escSubject(`Demande de devis ${garantie} reçue — ${reference}`),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:28px;border:1px solid #e2e8f0">
      <div style="font-size:13px;color:#64748b;margin-bottom:8px">Vivos Assurance — Cabinet de courtage ORIAS</div>
      <h1 style="font-size:22px;margin:0 0 16px">Votre demande de devis est bien reçue</h1>
      <p>Bonjour ${safePrenom} ${safeNom},</p>
      <p>
        Merci pour votre demande de devis <strong>${safeGarantie}</strong>${safeMetier ? ` (${safeMetier})` : ''}.
        Votre dossier est enregistré sous la référence
        <strong style="font-family:monospace">${safeRef}</strong>.
      </p>

      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0">
        <p style="margin:0 0 8px;font-weight:600">Prochaines étapes</p>
        <ol style="margin:0;padding-left:18px">
          <li>Notre équipe analyse votre profil et identifie les assureurs les plus adaptés (${sla}).</li>
          <li>Nous vous contactons par téléphone ou email pour valider vos besoins (devoir de conseil DDA).</li>
          <li>Nous vous présentons une recommandation écrite motivée + 2 à 3 propositions tarifées.</li>
          <li>Vous choisissez librement — aucun engagement.</li>
        </ol>
      </div>

      <p style="font-size:14px;color:#475569">
        En tant que courtier ORIAS, nous sommes rémunérés exclusivement par les commissions des
        compagnies d&apos;assurance partenaires. <strong>Aucun frais ne vous est facturé.</strong>
      </p>

      <p style="font-size:13px;color:#64748b;margin-top:24px">
        Une question avant&nbsp;? Répondez à cet email ou écrivez-nous à
        <a href="mailto:contact@vivos-assurance.fr" style="color:#1d4ed8">contact@vivos-assurance.fr</a>.
      </p>

      <hr style="border:0;border-top:1px solid #e2e8f0;margin:24px 0">

      <p style="font-size:11px;color:#94a3b8;line-height:1.5">
        Vivos Assurance — Courtier en assurance immatriculé ORIAS sous le n° ${
          process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? "En cours d'attribution"
        }.
        Soumis au contrôle de l&apos;ACPR. Pour toute réclamation&nbsp;:
        <a href="https://vivos-assurance.fr/reclamation" style="color:#1d4ed8">vivos-assurance.fr/reclamation</a>.
      </p>
    </div>
  </body>
</html>
`,
  }
}

interface InternalLeadAlertParams {
  reference: string
  segment: 'hot' | 'warm' | 'cold'
  score: number
  payload: Record<string, string | number | boolean | undefined>
}

export function internalLeadAlertTemplate({
  reference,
  segment,
  score,
  payload,
}: InternalLeadAlertParams): { subject: string; html: string } {
  const segLabel = { hot: '🔥 HOT', warm: '🟠 WARM', cold: '🔵 COLD' }[segment]
  const safeRef = esc(reference)
  const rows = Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748b;vertical-align:top;font-size:12px">${esc(k)}</td><td style="font-size:13px">${String(
          v
        )
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</td></tr>`
    )
    .join('')
  return {
    subject: escSubject(`[Lead ${segLabel}] ${reference} — score ${score}`),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
    <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #e2e8f0">
      <h1 style="font-size:18px;margin:0 0 8px">Nouveau lead — ${safeRef}</h1>
      <p style="margin:0 0 16px">Segment : <strong>${segLabel}</strong> · Score : <strong>${score}/100</strong></p>
      <table style="border-collapse:collapse">${rows}</table>
    </div>
  </body>
</html>
`,
  }
}
