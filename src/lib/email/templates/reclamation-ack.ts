interface ReclamationAckParams {
  ticket: string
  prenom: string
  nom: string
  objet: string
  categorie: string
}

import { esc, escSubject } from './_html'

const CATEGORY_LABELS: Record<string, string> = {
  conseil: 'Devoir de conseil',
  souscription: 'Souscription / Tarif',
  sinistre: 'Gestion sinistre',
  resiliation: 'Résiliation',
  facturation: 'Facturation / Cotisation',
  rgpd: 'Données personnelles (RGPD)',
  autre: 'Autre',
}

export function reclamationAckTemplate({
  ticket,
  prenom,
  nom,
  objet,
  categorie,
}: ReclamationAckParams): {
  subject: string
  html: string
} {
  const civCat = esc(CATEGORY_LABELS[categorie] ?? categorie)
  const safeTicket = esc(ticket)
  const safePrenom = esc(prenom)
  const safeNom = esc(nom)
  const safeObjet = esc(objet)
  return {
    subject: escSubject(`Accusé de réception — Réclamation ${ticket}`),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #e2e8f0">
      <h1 style="font-size:20px;margin:0 0 16px">Accusé de réception de votre réclamation</h1>
      <p>Bonjour ${safePrenom} ${safeNom},</p>
      <p>
        Nous accusons réception de votre réclamation enregistrée sous le numéro
        <strong style="font-family:monospace">${safeTicket}</strong>.
      </p>
      <table style="border-collapse:collapse;margin:16px 0;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Catégorie</td><td>${civCat}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Objet</td><td>${safeObjet}</td></tr>
      </table>
      <p>
        Conformément à la <strong>Recommandation ACPR 2024-R-02</strong>, nous nous engageons à&nbsp;:
      </p>
      <ul>
        <li>Accuser réception sous <strong>10 jours ouvrés</strong> (présent email).</li>
        <li>Vous répondre sur le fond sous <strong>2 mois maximum</strong>.</li>
      </ul>
      <p>
        Si la réponse apportée ne vous satisfait pas, vous pourrez saisir gratuitement le
        <a href="https://www.mediation-assurance.org" style="color:#1d4ed8">Médiateur de l&apos;Assurance</a>
        — TSA 50110, 75441 Paris cedex 09.
      </p>
      <p style="margin-top:24px;color:#475569;font-size:13px">
        Service Réclamations — Assurance Pro<br>
        <a href="mailto:reclamations@vivos-assurance.fr" style="color:#1d4ed8">reclamations@vivos-assurance.fr</a>
      </p>
    </div>
  </body>
</html>
`,
  }
}

export function reclamationInternalNotificationTemplate({
  ticket,
  payload,
}: {
  ticket: string
  payload: Record<string, string | undefined>
}): { subject: string; html: string } {
  const rows = Object.entries(payload)
    .filter(([, v]) => v && String(v).trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748b;vertical-align:top">${k}</td><td style="white-space:pre-wrap">${String(
          v
        )
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')}</td></tr>`
    )
    .join('')
  return {
    subject: escSubject(`[Réclamation ${ticket}] ${payload.objet ?? ''}`),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;padding:24px;color:#0f172a">
    <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #e2e8f0">
      <h1 style="font-size:18px;margin:0 0 12px">Nouvelle réclamation — ${ticket}</h1>
      <p style="color:#dc2626;font-weight:600">Délai accusé réception : 10 jours ouvrés. Délai réponse fond : 2 mois.</p>
      <table style="border-collapse:collapse;font-size:13px;margin-top:12px">${rows}</table>
    </div>
  </body>
</html>
`,
  }
}
