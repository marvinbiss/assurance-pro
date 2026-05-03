/**
 * Pilier — RC Pro SASU
 * KW Ahrefs : "rc pro sasu" 150 vol KD 0 + "assurance professionnelle sasu" 70 vol
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/sasu'
const TITLE = 'RC Pro SASU — Tarifs 2026 (président assimilé salarié)'
const TAGLINE = "L'assurance RC pro pour SASU : couverture président assimilé salarié, plafond adapté CA, RCMS dirigeant. Tous secteurs."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description: "RC Pro SASU : couverture adaptée au statut SASU (président assimilé salarié). Plafonds 1,5-10 M€ selon métier. RCMS dirigeant recommandée. Tarifs 380-2 200€/an. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG} title={TITLE} tagline={TAGLINE}
      intro="La RC Pro SASU est la responsabilité civile professionnelle adaptée au statut SASU (Société par Actions Simplifiée Unipersonnelle). Particularité fiscale et sociale : le PRÉSIDENT de SASU est ASSIMILÉ SALARIÉ (vs gérant majoritaire SARL ou EI qui sont TNS). Pour la RC Pro, cela ne change pas grand-chose au contrat lui-même — la SASU souscrit comme n'importe quelle société. La différence importante est sur la MUTUELLE et la PRÉVOYANCE (régime collectif vs Madelin). Le pack standard SASU combine : RC pro adaptée au métier (3-10 M€), RCMS dirigeant (protection responsabilité personnelle président), cyber assurance, multirisque local si applicable. Tarifs 2026 : 380-2 200€/an selon CA et métier. Voir notre pilier complet <a href='/assurance-sasu' class='text-blue-600 underline'>/assurance-sasu</a> pour le pack global."
      legalReference="Code de commerce L. 227-1 et s. (SASU) + Code des assurances L. 113-1"
      isObligatoire={false}
      benefits={[
        { icon: '👔', title: 'Statut SASU', desc: 'Couverture adaptée président assimilé salarié + société' },
        { icon: '🛡️', title: 'RCMS dirigeant', desc: 'Protection responsabilité personnelle président SASU (faute de gestion)' },
        { icon: '🏥', title: 'Mutuelle collective', desc: 'Régime collectif d\'entreprise possible (vs Madelin TNS)' },
        { icon: '💰', title: 'À partir de 380 €/an', desc: 'SASU freelance solo. SASU consulting senior : 1 480-2 200€/an' },
      ]}
      sections={[
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <ul>
                <li><a href="/assurance-sasu" className="text-blue-600 underline">Pack assurance SASU complet</a> — RC + multirisque + mutuelle + RCMS + cyber</li>
                <li><a href="/responsabilite-civile-professionnelle" className="text-blue-600 underline">Pilier RC Pro complet</a> — 21 métiers + plafonds détaillés</li>
                <li><a href="/assurance-homme-cle" className="text-blue-600 underline">Assurance homme-clé</a> — critique pour SASU avec dirigeant unique</li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'RC Pro SASU : différence avec RC Pro classique ?', a: "Aucune sur le contrat lui-même — la SASU souscrit comme n'importe quelle société. La différence porte sur la MUTUELLE et la PRÉVOYANCE : le président SASU est ASSIMILÉ SALARIÉ (régime collectif possible vs Madelin TNS pour SARL gérant majoritaire). Voir <a href='/assurance-sasu' class='text-blue-600 underline'>/assurance-sasu</a>." },
        { q: 'Combien coûte la RC Pro pour une SASU en 2026 ?', a: "380-580€/an pour SASU freelance digital. 980-1 480€/an pour SASU consulting management. 1 480-2 200€/an pour SASU consulting IT/finance senior. Variables : CA, plafond RC choisi, métier." },
        { q: 'RCMS pour président SASU : utile ?', a: "OUI fortement recommandée. La RC Mandataire Social couvre la responsabilité PERSONNELLE du président SASU en cas de faute de gestion (poursuite par associés futurs, URSSAF, créanciers). Sinistre type : 50-500 k€. Tarif : 600-1 800€/an. Indispensable si levée de fonds prévue." },
      ]}
    />
  )
}
