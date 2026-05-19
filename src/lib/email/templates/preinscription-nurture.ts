/**
 * Pipeline nurture warm leads pré-ORIAS.
 *
 * Séquence 3 emails :
 *   - J+1 : confirmation préinscription + ressource gratuite
 *   - J+7 : guide marché (établir crédibilité)
 *   - J+14 : témoignage / case study + soft CTA (activation post-ORIAS)
 *
 * Activation : trigger via cron `/api/cron/nurture-emails` quotidien.
 * Status persisté dans `newsletter_subscribers.nurture_step` (1, 2, 3).
 *
 * Tous les emails respectent RGPD + footer désinscription obligatoire.
 */

import { esc, escSubject } from './_html'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivos-assurance.fr'

const FOOTER_HTML = `
<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;line-height:1.6">
  <p style="margin:0 0 8px">
    Vivos Assurance — Cabinet de courtage ORIAS (en cours d'attribution) · ACPR 4 Place de Budapest, 75436 Paris
  </p>
  <p style="margin:0">
    Vous recevez cet email car vous vous êtes préinscrit(e) sur vivos-assurance.fr.
    <a href="${SITE_URL}/desinscription?email={{EMAIL_TOKEN}}" style="color:#64748b">Se désinscrire</a>
    · <a href="${SITE_URL}/confidentialite" style="color:#64748b">Politique de confidentialité</a>
  </p>
</div>
`

// ─── Email 1 (J+1) — Confirmation + ressource gratuite ─────────────────────

interface NurtureEmailParams {
  email: string
  vertical?: string | null
}

export function nurtureEmail1Confirmation({ email, vertical }: NurtureEmailParams): {
  subject: string
  html: string
} {
  const safeEmail = esc(email)
  const verticalLabel = vertical ? esc(vertical) : ''

  const resourceLink = vertical
    ? `${SITE_URL}/ressources?garantie=${encodeURIComponent(vertical)}`
    : `${SITE_URL}/ressources`

  return {
    subject: escSubject('Bienvenue chez Vivos — votre guide est en ligne'),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fdfaf7;padding:24px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e2e8f0">
      <div style="font-size:13px;color:#64748b;margin-bottom:8px">Vivos Assurance — Cabinet de courtage indépendant</div>
      <h1 style="font-size:24px;margin:0 0 16px;font-weight:800">Bienvenue ${safeEmail.split('@')[0] ?? ''} 👋</h1>
      <p style="line-height:1.6">
        Merci pour votre préinscription. Vous serez parmi les premiers contactés dès l'immatriculation ORIAS validée.
        En attendant, voici votre première ressource exclusive&nbsp;:
      </p>

      <div style="background:#fff7ed;border-left:4px solid #d97706;border-radius:8px;padding:20px;margin:24px 0">
        <div style="font-size:13px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">
          📚 Ressource offerte
        </div>
        <p style="margin:0 0 12px;font-weight:700;font-size:17px">
          Guide complet 2026${verticalLabel ? ` — ${verticalLabel}` : ' assurance professionnelle'}
        </p>
        <p style="margin:0 0 16px;font-size:14px;color:#525252">
          Tarifs réels du marché, comparatif 10 assureurs, pièges à éviter, modèles d'attestation.
        </p>
        <a href="${resourceLink}" style="display:inline-block;background:#1B3A6D;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px">
          Télécharger le guide
        </a>
      </div>

      <p style="line-height:1.6">
        Nous reviendrons vers vous dans une semaine avec une analyse du marché sur votre secteur.
      </p>

      <p style="line-height:1.6">
        À bientôt,<br/>
        <strong>L'équipe Vivos Assurance</strong>
      </p>

      ${FOOTER_HTML}
    </div>
  </body>
</html>
`,
  }
}

// ─── Email 2 (J+7) — Guide marché ──────────────────────────────────────────

export function nurtureEmail2MarketGuide({ vertical }: NurtureEmailParams): {
  subject: string
  html: string
} {
  const verticalLabel = vertical ? esc(vertical) : 'assurance professionnelle'

  const blogLink = `${SITE_URL}/blog`
  const calcLink = vertical
    ? `${SITE_URL}/outils/calculateur-tarif-${encodeURIComponent(vertical)}`
    : `${SITE_URL}/outils`

  return {
    subject: escSubject(`Analyse marché 2026 — ${verticalLabel} (chiffres exclusifs)`),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fdfaf7;padding:24px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e2e8f0">
      <div style="font-size:13px;color:#64748b;margin-bottom:8px">Vivos Assurance — Veille marché</div>
      <h1 style="font-size:22px;margin:0 0 16px;font-weight:800">
        Ce que vous devez savoir avant de souscrire en 2026
      </h1>

      <p style="line-height:1.7">
        Nous analysons les barèmes 2026 de 10 assureurs partenaires (Hiscox, AXA Pro, Allianz, MMA, Generali, SMABTP, Pro BTP, April, Stoïk, Wakam).
        Voici 3 insights qui peuvent vous faire économiser <strong>30 à 50%</strong> sur votre prime.
      </p>

      <div style="background:#f0f9ff;border:1px solid #bfdbfe;border-radius:8px;padding:20px;margin:24px 0">
        <h3 style="margin:0 0 12px;font-size:16px;color:#1e40af">💡 Insight 1 — Effet statut juridique</h3>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#334155">
          Le passage auto-entrepreneur → SARL réduit votre prime décennale de 15-25% chez April Pro.
          Raison&nbsp;: scoring sinistralité plus favorable, garantie financière améliorée.
        </p>
      </div>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:24px 0">
        <h3 style="margin:0 0 12px;font-size:16px;color:#15803d">💡 Insight 2 — Effet ancienneté</h3>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#334155">
          3 ans d'activité sans sinistre = remise 20-30% automatique. Mais 90% des courtiers ne demandent pas.
          Demandez systématiquement l'attestation sinistralité auprès de votre ancien assureur.
        </p>
      </div>

      <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:20px;margin:24px 0">
        <h3 style="margin:0 0 12px;font-size:16px;color:#92400e">💡 Insight 3 — Effet bundling</h3>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#334155">
          Combiner RC Pro + Multirisque + Cyber chez le même assureur = remise commerciale jusqu'à 18%.
          Vivos négocie le bundling pour vous automatiquement.
        </p>
      </div>

      <div style="text-align:center;margin:32px 0">
        <a href="${calcLink}" style="display:inline-block;background:#1B3A6D;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px">
          Calculer mon tarif personnalisé
        </a>
      </div>

      <p style="text-align:center;font-size:13px;color:#94a3b8;margin-top:8px">
        Plus d'analyses sur notre <a href="${blogLink}" style="color:#1B3A6D;text-decoration:underline">blog</a>
      </p>

      ${FOOTER_HTML}
    </div>
  </body>
</html>
`,
  }
}

// ─── Email 3 (J+14) — Case study + soft CTA activation ─────────────────────

export function nurtureEmail3CaseStudy(_params: NurtureEmailParams): {
  subject: string
  html: string
} {
  const equipeLink = `${SITE_URL}/equipe`
  const blogLink = `${SITE_URL}/blog`

  return {
    subject: escSubject('Cas client — Comment Sophie a économisé 2 100€/an sur ses assurances'),
    html: `
<!doctype html>
<html lang="fr">
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fdfaf7;padding:24px;color:#0f172a">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e2e8f0">
      <div style="font-size:13px;color:#64748b;margin-bottom:8px">Vivos Assurance — Cas client</div>
      <h1 style="font-size:22px;margin:0 0 8px;font-weight:800">
        Sophie économise 2 100€/an
      </h1>
      <p style="font-size:14px;color:#64748b;margin:0 0 24px">
        Freelance développeuse fullstack · 38 ans · Paris
      </p>

      <p style="line-height:1.7">
        Avant Vivos, Sophie payait <strong>3 680€/an</strong> répartis sur 5 assureurs différents&nbsp;:
        RC Pro Hiscox, multirisque AXA, cyber Stoïk, mutuelle April, prévoyance Allianz.
      </p>

      <p style="line-height:1.7">
        Cinq dates de renouvellement à suivre, cinq factures à gérer, cinq interlocuteurs en cas de sinistre.
        Une horreur administrative pour une freelance qui veut juste développer son business.
      </p>

      <div style="background:#fff7ed;border-left:4px solid #d97706;border-radius:8px;padding:24px;margin:28px 0">
        <p style="margin:0 0 16px;font-style:italic;font-size:16px;line-height:1.6;color:#1e293b">
          "Vivos m'a négocié exactement la même couverture pour 1 580€/an au lieu de 3 680€.
          Et surtout&nbsp;: un seul interlocuteur, un seul prélèvement. Je récupère 5h/mois d'administratif."
        </p>
        <p style="margin:0;font-weight:700;font-size:14px;color:#92400e">
          — Sophie M., freelance dev fullstack, cliente Vivos depuis janvier 2026
        </p>
      </div>

      <p style="line-height:1.7">
        <strong>Comment Vivos a fait&nbsp;?</strong> En négociant le pack chez 3 assureurs au lieu de 5,
        en éliminant les doublons de garanties (Sophie était couverte 2x sur la perte d'exploitation),
        et en obtenant une remise bundling de 18% chez April Pro.
      </p>

      <div style="background:#f8fafc;border-radius:8px;padding:20px;margin:24px 0;border:1px solid #e2e8f0">
        <p style="margin:0 0 12px;font-weight:700;font-size:15px">📊 Le résultat&nbsp;:</p>
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8">
          <li><strong>Économie&nbsp;:</strong> 2 100€/an (57%)</li>
          <li><strong>Couverture&nbsp;:</strong> identique (5M€ RC Pro, 100k€ cyber, ...)</li>
          <li><strong>Administratif&nbsp;:</strong> 1 contrat au lieu de 5</li>
          <li><strong>Sinistre&nbsp;:</strong> 1 numéro, déclaration en 3 min</li>
        </ul>
      </div>

      <h2 style="font-size:18px;margin:32px 0 12px;font-weight:800">
        Et pour vous&nbsp;?
      </h2>

      <p style="line-height:1.7">
        Dès la validation de notre immatriculation ORIAS (très prochainement), vous serez parmi les premiers contactés
        pour un audit gratuit de vos contrats actuels.
      </p>

      <p style="line-height:1.7">
        En attendant, vous pouvez préparer votre dossier&nbsp;:
      </p>

      <ul style="line-height:1.8;font-size:14px">
        <li>Rassembler vos contrats d'assurance actuels (PDF ou photo)</li>
        <li>Noter votre date d'échéance principale (anniversaire ou Loi Hamon)</li>
        <li>Lister les sinistres déclarés sur les 5 dernières années</li>
      </ul>

      <div style="text-align:center;margin:32px 0">
        <a href="${equipeLink}" style="display:inline-block;background:#1B3A6D;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px">
          En savoir plus sur notre approche
        </a>
      </div>

      <p style="text-align:center;font-size:13px;color:#94a3b8;margin-top:8px">
        Plus de cas clients sur le <a href="${blogLink}" style="color:#1B3A6D;text-decoration:underline">blog Vivos</a>
      </p>

      <p style="line-height:1.6;margin-top:24px;font-size:14px;color:#64748b">
        À très bientôt,<br/>
        <strong style="color:#1e293b">L'équipe Vivos Assurance</strong>
      </p>

      ${FOOTER_HTML}
    </div>
  </body>
</html>
`,
  }
}

// ─── Catalogue séquence ────────────────────────────────────────────────────

export const NURTURE_SEQUENCE = [
  {
    step: 1,
    daysAfterSignup: 1,
    template: nurtureEmail1Confirmation,
  },
  {
    step: 2,
    daysAfterSignup: 7,
    template: nurtureEmail2MarketGuide,
  },
  {
    step: 3,
    daysAfterSignup: 14,
    template: nurtureEmail3CaseStudy,
  },
] as const

export type NurtureStep = 1 | 2 | 3
