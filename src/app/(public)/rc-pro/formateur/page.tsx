/**
 * Pilier — RC Pro formateur
 * KW Ahrefs : "rc pro formateur" 70 vol KD 0 + "formation professionnelle assurance" 50 vol + famille
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/formateur'
const TITLE = 'RC Pro formateur — Tarifs 2026 (formateur indépendant, organisme formation)'
const TAGLINE =
  "L'assurance RC pro pour formateurs indépendants : RC pédagogique, casse matériel salle, dommages stagiaires. Tarifs accessibles. Conseil ORIAS."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro formateur indépendant : couvre RC pédagogique (formation inadaptée), casse matériel salle louée, dommages stagiaires. Conformité Qualiopi (audit qualité formation). Tarifs 220-580€/an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro formateur couvre l'activité de formation professionnelle indépendante : formateur en présentiel, formateur en distanciel (e-learning, classes virtuelles), organisme de formation enregistré (déclaration auprès de la DREETS + référencement Qualiopi pour mobiliser les financements OPCO/CPF). Sinistres typiques : RC pédagogique (formation jugée inadaptée par le commanditaire OPCO/CPF, demande de remboursement), casse de matériel dans salle louée (vidéoprojecteur, mobilier), dommages causés à un stagiaire (chute, allergie déjeuner inclus dans la formation), litige avec stagiaire mécontent (mauvaise évaluation, certification non délivrée). Conformité QUALIOPI obligatoire depuis 2022 pour percevoir des financements OPCO. Tarifs 2026 : 220-580€/an pour formateur indépendant solo, 580-1 200€/an pour organisme de formation 3-5 salariés."
      legalReference="Code des assurances L. 113-1 + Code du travail L. 6313-1 (formation pro) + Décret Qualiopi 2019-565"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🎓',
          title: 'RC pédagogique',
          desc: 'Formation jugée inadaptée par OPCO/CPF — remboursement exigé du commanditaire',
        },
        {
          icon: '📺',
          title: 'Matériel salle louée',
          desc: "Casse vidéoprojecteur, mobilier, climatisation pendant l'animation",
        },
        {
          icon: '👨‍🎓',
          title: 'Dommages stagiaires',
          desc: 'Chute, allergie déjeuner, accident pendant exercices pratiques',
        },
        {
          icon: '💰',
          title: 'À partir de 220 €/an',
          desc: 'Formateur indépendant solo. Organisme 3-5 salariés : 580-1 200€/an',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs RC Pro formateur 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      AE formateur soft skills (managementcoaching com)
                    </td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE formateur IT / digital</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">AE formateur métiers à risque (BTP, conduite)</td>
                    <td className="border p-2 text-right">380 € – 680 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">EI organisme formation 1 salarié</td>
                    <td className="border p-2 text-right">480 € – 780 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL organisme formation 3-5 salariés</td>
                    <td className="border p-2 text-right">680 € – 1 200 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Conformité Qualiopi : obligatoire pour financements OPCO',
          body: (
            <>
              <p>
                Depuis le 1er janvier 2022, la <strong>certification Qualiopi</strong> (Décret
                2019-565) est OBLIGATOIRE pour tout organisme de formation souhaitant bénéficier des
                financements OPCO, CPF, Pôle Emploi, FAF. Audit indépendant tous les 3 ans.
              </p>
              <ul>
                <li>
                  <strong>Coût audit Qualiopi</strong> : 1 200-3 800€ (tous les 3 ans)
                </li>
                <li>
                  <strong>RC Pro EXIGÉE</strong> par l&apos;auditeur Qualiopi pour la certification
                </li>
                <li>
                  <strong>Indispensable</strong> pour activité financée par fonds publics ou OPCO
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro formateur est-elle obligatoire ?',
          a: 'Pas légalement obligatoire stricto sensu (sauf formation à acte invasif type secourisme PSE1/PSE2). MAIS EXIGÉE par : (1) Qualiopi (certification obligatoire pour financements OPCO depuis 2022), (2) la majorité des OPCO et clients institutionnels, (3) certaines plateformes formation (Maformation.fr, Pole-Emploi.fr).',
        },
        {
          q: 'Combien coûte la RC Pro formateur en 2026 ?',
          a: 'AE formateur soft skills : 220-380€/an. AE formateur IT/digital : 280-480€/an. AE formateur métiers à risque : 380-680€/an. EI organisme formation 1 salarié : 480-780€/an. SARL 3-5 salariés : 680-1 200€/an.',
        },
        {
          q: 'Qualiopi : RC Pro requise ?',
          a: "OUI obligatoire — l'auditeur Qualiopi vérifie la souscription d'une RC Pro en cours de validité comme l'un des critères de certification. Sans RC Pro = pas de Qualiopi = pas de financement OPCO/CPF/Pôle Emploi.",
        },
      ]}
    />
  )
}
