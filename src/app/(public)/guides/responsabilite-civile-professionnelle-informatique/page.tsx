/**
 * Guide — Responsabilité civile professionnelle informatique (CPC #1 marché)
 * KW Ahrefs : "responsabilité civile professionnelle informatique" 100 vol KD 0 CPC 1 300€ ⭐⭐⭐
 * Le KW avec le CPC LE PLUS ÉLEVÉ de notre base Ahrefs = intent commercial extrême
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/responsabilite-civile-professionnelle-informatique'
const TITLE = 'Responsabilité civile professionnelle informatique 2026 — Guide complet'
const TAGLINE =
  'Tout sur la RC pro informatique : 5 risques spécifiques (RGPD, cyber, propriété intellectuelle, défaut conseil, perte données client). 6 assureurs IT spécialisés.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Responsabilité civile professionnelle informatique 2026 : 5 risques spécifiques IT (breach RGPD, cyberattaque, propriété intellectuelle, défaut conseil tech, perte données client). 6 assureurs spécialisés (Hiscox, Beazley, AIG, AXA Cyber, Allianz, Wakam). Tarifs 180-1 200€/an freelance, 2 800-12 000€/an SSII. Devis ORIAS 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La responsabilité civile professionnelle informatique (RC pro IT) couvre 5 risques très spécifiques au secteur IT, qui n'existent pas sur une RC pro généraliste : (1) breach RGPD entraînant sanctions CNIL et notification massive clients, (2) cyberattaque/ransomware sur l'infrastructure du client suite à une faille introduite par le freelance/SSII, (3) atteinte à la propriété intellectuelle (utilisation code sous licence non conforme, plagiat), (4) défaut de conseil tech (architecture mal dimensionnée, choix techno obsolète), (5) perte/altération de données client (mauvaise migration, bug de prod). Sinistralité ACPR 2024 secteur IT : 2,1% — sinistre moyen 65 000€ (top 5 des sinistres RC pro tous secteurs). Tarifs 2026 : 180-1 200 €/an pour freelance IT, 2 800-12 000 €/an pour SSII PME 5-50 salariés."
      legalReference="RGPD UE 2016/679 + Code propriété intellectuelle + art. 1147 C. civ. (responsabilité contractuelle)"
      isObligatoire={false}
      benefits={[
        {
          icon: '🛡️',
          title: '5 risques IT spécifiques',
          desc: 'RGPD breach + cyberattaque + propriété intellectuelle + défaut conseil + perte données',
        },
        {
          icon: '⚖️',
          title: 'Sanctions CNIL couvertes',
          desc: 'Jusqu&apos;à 4% CA mondial OU 20 M€ (RGPD art. 83) — couverture cyber dédiée',
        },
        {
          icon: '💼',
          title: '6 assureurs IT spécialisés',
          desc: 'Hiscox CyberClear, Beazley, AIG CyberEdge, AXA Cyber, Allianz Cyber Risk, Wakam Tech',
        },
        {
          icon: '💰',
          title: '180-1 200 €/an freelance',
          desc: 'Freelance IT : 180-1 200€. SSII PME 5-50 sal : 2 800-12 000€/an. Plafond mini 1M€ recommandé',
        },
      ]}
      sections={[
        {
          h2: 'Les 5 risques spécifiques IT couverts',
          body: (
            <div>
              <h3 className="mb-2 font-bold">1. Breach RGPD entraînant sanctions CNIL</h3>
              <p className="mb-3 text-sm">
                Sanction max : 4% CA mondial OU 20 M€ (art. 83 RGPD). Sinistre moyen pour SSII PME :
                50-200 000€ (sanction + notification 1k-100k clients + frais juridiques). Couverture
                : sanctions financières + frais notification + frais avocat RGPD spécialisé.
              </p>
              <h3 className="mb-2 font-bold">2. Cyberattaque sur infrastructure client</h3>
              <p className="mb-3 text-sm">
                Sinistre type : freelance déploie code avec faille → ransomware s&apos;infiltre chez
                le client → 80-300k€ de pertes client → recours contre le freelance. Couverture :
                indemnité client + frais expertise forensique + restauration systèmes client.
              </p>
              <h3 className="mb-2 font-bold">3. Atteinte propriété intellectuelle</h3>
              <p className="mb-3 text-sm">
                Sinistre type : utilisation code sous licence GPL non respectée dans logiciel
                commercial (cas Cisco vs Free Software Foundation 2023 — 280 000€ d&apos;amende).
                Couverture : indemnité PI + frais avocat propriété intellectuelle.
              </p>
              <h3 className="mb-2 font-bold">4. Défaut conseil tech</h3>
              <p className="mb-3 text-sm">
                Sinistre type : architecture micro-services sur-dimensionnée pour startup → cloud
                bills 50k€/mois inutiles → recours client. Couverture : indemnité perte chance +
                frais re-conception.
              </p>
              <h3 className="mb-2 font-bold">5. Perte/altération données client</h3>
              <p className="mb-3 text-sm">
                Sinistre type : migration BDD bug → 6 mois de transactions perdues. Couverture :
                restauration données + indemnité perte d&apos;exploitation client + frais experts
                data recovery.
              </p>
            </div>
          ),
        },
        {
          h2: 'Tarifs et plafonds par profil IT',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Profil IT</th>
                    <th className="border p-2 text-right">Tarif/an</th>
                    <th className="border p-2 text-left">Plafond recommandé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Freelance IT (CA &lt;50k€)</td>
                    <td className="border p-2 text-right">180-480 €</td>
                    <td className="border p-2">500 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Freelance senior (CA 50-150k€)</td>
                    <td className="border p-2 text-right">480-1 200 €</td>
                    <td className="border p-2">1 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SSII TPE 1-9 salariés</td>
                    <td className="border p-2 text-right">1 200-3 800 €</td>
                    <td className="border p-2">1 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SSII PME 10-50 salariés</td>
                    <td className="border p-2 text-right">2 800-12 000 €</td>
                    <td className="border p-2">2 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SSII ETI 50+ salariés</td>
                    <td className="border p-2 text-right">12 000-45 000 €</td>
                    <td className="border p-2">5 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Éditeur logiciel SaaS (avec ARR &gt;1M€)</td>
                    <td className="border p-2 text-right">8 500-32 000 €</td>
                    <td className="border p-2">5-10 000 000 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <Link
                  href="/outils/calculateur-tarif-rc-pro"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif RC Pro IT
                </Link>
              </li>
              <li>
                <Link
                  href="/outils/calculateur-tarif-cyber-assurance"
                  className="text-primary-600 underline"
                >
                  Calculateur cyber assurance
                </Link>
              </li>
              <li>
                <Link href="/rc-pro/informatique" className="text-primary-600 underline">
                  RC Pro informatique freelance
                </Link>
              </li>
              <li>
                <Link href="/guides/assurance-rgpd" className="text-primary-600 underline">
                  Guide assurance RGPD entreprise
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro informatique obligatoire ?',
          a: "Pas légalement OBLIGATOIRE pour la majorité des freelances IT, MAIS imposée contractuellement par 95% des donneurs d'ordres B2B (clients grand compte exigent attestation RC Pro avec plafond minimum dans contrat de prestation). Sans RC Pro : impossible de répondre à 95% des appels d'offres B2B.",
        },
        {
          q: 'Différence avec cyber assurance ?',
          a: 'RC Pro IT = couvre votre RESPONSABILITÉ envers les clients (recours clients pour breach/cyber/PI). Cyber assurance = couvre VOS PROPRES pertes (votre infrastructure attaquée, votre rançon, vos données perdues). Les 2 sont complémentaires — pack groupé recommandé pour SSII (économie 8-15%).',
        },
        {
          q: 'Plafond garantie : 500k€ ou 1M€ ?',
          a: '<strong>500 000 €</strong> = freelance IT avec missions <50k€ et clients TPE/PME. <strong>1 000 000 €</strong> = freelance senior avec missions 50-200k€ et/ou clients grand compte (banque, assurance, santé). <strong>2-5 000 000 €</strong> = SSII avec contrats &gt;500k€ ou éditeur SaaS avec ARR significatif.',
        },
        {
          q: 'Tarif RC Pro IT 2026 ?',
          a: 'Voir tableau ci-dessus. Variables : type de mission (développement vs ops vs conseil — ops majoré +30%), exposition RGPD (manipulation données santé/finance majoré +25-50%), géographie clients (international +15%), antécédents 5 ans (relevé propre = -15% bonus).',
        },
      ]}
    />
  )
}
