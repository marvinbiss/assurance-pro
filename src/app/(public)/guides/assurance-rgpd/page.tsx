/**
 * Guide — Assurance RGPD entreprise
 * KW long-tail : "assurance rgpd", "rgpd entreprise assurance", "breach data assurance"
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/assurance-rgpd'
const TITLE = 'Assurance RGPD — Couverture sanctions CNIL et breach 2026'
const TAGLINE =
  "L'assurance RGPD pour entreprises : couverture sanctions CNIL (jusqu'à 4% CA mondial), notification breach 72h, frais juridiques. Cyber assurance dédiée."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    'Assurance RGPD entreprise : couverture sanctions CNIL (4% CA mondial OU 20 M€), notification breach 72h, frais juridiques RGPD, communication crise, restauration données. Cyber assurance dédiée. Tarifs 200-2 800€/an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance RGPD désigne la couverture spécifique des risques liés au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679, en vigueur depuis le 25 mai 2018). Elle est généralement intégrée à la CYBER ASSURANCE (vs un contrat dédié RGPD pur, qui n'existe pas en pratique). Cette assurance couvre 5 grands risques : (1) sanctions CNIL après contrôle ou plainte (jusqu'à 4% du CA mondial OU 20 M€), (2) frais de notification breach (sous 72h à la CNIL + notification individuelle aux personnes concernées si risque élevé), (3) frais juridiques RGPD (avocats, expertise forensique), (4) frais de communication de crise (gestion réputation post-incident), (5) frais de restauration des données. Coût moyen sinistre RGPD pour une PME en 2026 : 80 000-300 000€. Tarif cyber assurance avec volet RGPD : 200-2 800€/an selon taille. ROI évident dès le 1er incident."
      legalReference="Règlement UE 2016/679 (RGPD) + Loi Informatique et Libertés modifiée (1978/2018)"
      isObligatoire={false}
      benefits={[
        {
          icon: '⚖️',
          title: 'Sanctions CNIL couvertes',
          desc: "Jusqu'à 4% du CA mondial OU 20 M€ (le plus élevé) — couverture cyber dédiée",
        },
        {
          icon: '⏱️',
          title: 'Notification breach 72h',
          desc: 'Frais de notification CNIL + individuelle aux personnes concernées si risque élevé',
        },
        {
          icon: '📞',
          title: 'Frais juridiques + crise',
          desc: 'Avocat RGPD, expert forensique, communication crise, gestion réputation',
        },
        {
          icon: '💰',
          title: 'À partir de 200 €/an',
          desc: 'TPE freelance. PME 50 salariés : 1 500-2 800€/an. ETI 100+ : 5 000-15 000€/an',
        },
      ]}
      sections={[
        {
          h2: 'Sanctions CNIL en cas de violation RGPD',
          body: (
            <>
              <p>Le RGPD prévoit 2 niveaux de sanctions financières (art. 83) :</p>
              <ul>
                <li>
                  <strong>Niveau 1</strong> : jusqu&apos;à 2% du CA mondial OU 10 M€ (le plus élevé)
                  — pour violations procédurales (registre traitements, DPO, notification breach
                  tardive)
                </li>
                <li>
                  <strong>Niveau 2</strong> : jusqu&apos;à 4% du CA mondial OU 20 M€ (le plus élevé)
                  — pour violations majeures (consentement non recueilli, transfert hors UE non
                  sécurisé, atteinte aux droits fondamentaux)
                </li>
              </ul>
              <p>
                Sanctions complémentaires : avertissement public CNIL, mise en demeure, restriction
                temporaire ou définitive du traitement, retrait certification, plainte au pénal
                (jusqu&apos;à 5 ans de prison pour le DPO/dirigeant en cas de fraude).
              </p>
            </>
          ),
        },
        {
          h2: 'Procédure post-breach (les 72 premières heures critiques)',
          body: (
            <>
              <ol>
                <li>
                  <strong>Détection + isolation</strong> du système compromis (T+0 à T+1h)
                </li>
                <li>
                  <strong>Notification CNIL OBLIGATOIRE sous 72h</strong> (art. 33 RGPD) —
                  formulaire en ligne sur cnil.fr
                </li>
                <li>
                  <strong>Notification individuelle</strong> aux personnes concernées si risque
                  élevé (art. 34) — courrier ou email
                </li>
                <li>
                  <strong>Expertise forensique</strong> pour identifier l&apos;ampleur du breach
                  (logs, données exfiltrées)
                </li>
                <li>
                  <strong>Communication de crise</strong> (presse, clients, partenaires) si breach
                  public
                </li>
                <li>
                  <strong>Restauration des systèmes</strong> + mesures correctives
                </li>
                <li>
                  <strong>Rapport CNIL</strong> dans les 4 semaines détaillant les mesures
                  correctives
                </li>
              </ol>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Coût moyen 2026</strong> pour une PME : 80 000-300 000€ (sans assurance).
                Avec cyber assurance dédiée : couverture jusqu&apos;à 1-3 M€ selon contrat.
              </p>
            </>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <ul>
                <li>
                  <a href="/cyber-assurance" className="text-primary-600 underline">
                    Cyber assurance complète
                  </a>{' '}
                  — pilier global cyber + RGPD
                </li>
                <li>
                  <a href="/assurance-e-commerce" className="text-primary-600 underline">
                    Assurance e-commerce
                  </a>{' '}
                  — cyber + RGPD pour vente en ligne
                </li>
                <li>
                  <a href="/rc-pro/informatique" className="text-primary-600 underline">
                    RC Pro informatique
                  </a>{' '}
                  — pour freelances IT manipulant données client
                </li>
                <li>
                  <a href="/assurance-medecin" className="text-primary-600 underline">
                    Assurance médecin
                  </a>{' '}
                  — données de santé (sanctions aggravées art. 9 RGPD)
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance RGPD est-elle obligatoire ?",
          a: 'Pas légalement obligatoire — mais le RGPD lui-même impose des MESURES TECHNIQUES ET ORGANISATIONNELLES (art. 32) pour protéger les données. La cyber assurance avec volet RGPD est FORTEMENT RECOMMANDÉE : 1 entreprise sur 4 subit un breach RGPD dans ses 5 premières années (CNIL 2024). Coût moyen sinistre : 80 000-300 000€.',
        },
        {
          q: 'Combien coûte une assurance RGPD pour une PME ?',
          a: 'Démarre à 200€/an pour TPE freelance. 1 500-2 800€/an pour PME 50 salariés. 5 000-15 000€/an pour ETI 100+ salariés. Inclus dans la cyber assurance dédiée. Variables : volume de données traitées, secteur (santé/finance majoré), exposition internationale.',
        },
        {
          q: 'Sanctions CNIL : quel maximum ?',
          a: "Jusqu'à 4% du CA mondial OU 20 M€ (le plus élevé) pour violations majeures. Pour PME à 5M€ CA : sanction max 200 000€. Pour ETI à 100M€ : sanction max 4 M€. Pour grands groupes : sanctions de plusieurs dizaines de millions (cas Google 50M€, Amazon 35M€, etc.).",
        },
        {
          q: 'Notification breach : délai ?',
          a: "OBLIGATOIRE sous 72h à la CNIL (art. 33 RGPD) à partir de la connaissance du breach. Notification individuelle aux personnes concernées si risque élevé (art. 34). Sanction notification tardive : jusqu'à 2% CA mondial.",
        },
      ]}
    />
  )
}
