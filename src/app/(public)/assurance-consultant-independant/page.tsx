/**
 * Pilier — Assurance consultant indépendant
 * KW Ahrefs : "assurance consultant indépendant" 150 vol KD 0 CPC 200€ (vacant)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-consultant-independant'
const TITLE = 'Assurance consultant indépendant — Pack 2026 (RC pro 5 M€, mutuelle, prévoyance)'
const TAGLINE =
  "L'assurance pour consultants indépendants : RC pro avec plafond élevé (5 M€), mutuelle TNS, prévoyance, protection juridique. Tous statuts (EI, EURL, SASU, portage)."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Assurance consultant indépendant : pack RC Pro 5 M€ (clients institutionnels) + mutuelle TNS Madelin + prévoyance + cyber + protection juridique. Tarifs 880-2 200€/an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance consultant indépendant désigne le pack standard pour un consultant exerçant en cabinet personnel : conseil management, marketing, RH, finance, IT, transformation digitale, stratégie. Particularité du métier : interventions chez des CLIENTS INSTITUTIONNELS (grands groupes, ETI, collectivités) qui exigent des plafonds RC Pro élevés (3-5 M€ minimum, parfois 10 M€) et des certifications spécifiques (ISO 9001, ISO 27001 pour conseil IT). Le pack standard combine 5 garanties : RC Pro 3-5 M€ (couvre les conséquences d'un mauvais conseil ou d'une recommandation erronée), mutuelle TNS Madelin (régime réel), prévoyance Madelin (IJ + invalidité — critique car revenu dépendant de la présence physique), cyber assurance (manipulation données client) et protection juridique (litige client, contrôle URSSAF). Les tarifs 2026 démarrent à 880 € HT/an pour un consultant junior solo jusqu'à 4 800 € HT/an pour un consultant senior IT/finance."
      legalReference="Code des assurances + Loi Madelin + RGPD (manipulation données client)"
      isObligatoire={false}
      benefits={[
        {
          icon: '💼',
          title: 'RC Pro 3-5 M€',
          desc: "Plafond standard pour clients institutionnels (jusqu'à 10 M€ pour conseil IT systèmes critiques)",
        },
        {
          icon: '🛡️',
          title: 'Madelin déductible',
          desc: 'Mutuelle + prévoyance déductibles BNC au régime réel (économie ~2 700€/an pour 80k€ bénéfice)',
        },
        {
          icon: '🔒',
          title: 'Cyber RGPD client',
          desc: 'Manipulation de données sensibles → cyber assurance dédiée recommandée (200-600€/an)',
        },
        {
          icon: '💰',
          title: 'À partir de 880 €/an',
          desc: 'Junior solo. Senior IT/finance : 2 800-4 800€/an (plafond RC 5-10 M€)',
        },
      ]}
      sections={[
        {
          h2: 'Tarifs assurance consultant 2026 par spécialité',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-right">RC Pro</th>
                    <th className="border p-2 text-right">Pack complet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Consultant management junior solo</td>
                    <td className="border p-2 text-right">3 M€</td>
                    <td className="border p-2 text-right">880 € – 1 400 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant marketing / RH senior</td>
                    <td className="border p-2 text-right">5 M€</td>
                    <td className="border p-2 text-right">1 480 € – 2 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant finance / business</td>
                    <td className="border p-2 text-right">5 M€</td>
                    <td className="border p-2 text-right">1 800 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant IT / SI / DevOps</td>
                    <td className="border p-2 text-right">5-10 M€</td>
                    <td className="border p-2 text-right">2 200 € – 3 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant cybersécurité (audit, pentest)</td>
                    <td className="border p-2 text-right">10 M€</td>
                    <td className="border p-2 text-right">2 800 € – 4 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Coach professionnel / formateur (sans audit)</td>
                    <td className="border p-2 text-right">1,5 M€</td>
                    <td className="border p-2 text-right">580 € – 980 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Hub consultant : pages-piliers connexes',
          body: (
            <>
              <ul>
                <li>
                  <Link
                    href="/responsabilite-civile-professionnelle"
                    className="text-primary-600 underline"
                  >
                    RC Pro complet
                  </Link>
                </li>
                <li>
                  <Link href="/rc-pro/informatique" className="text-primary-600 underline">
                    RC Pro informatique
                  </Link>{' '}
                  — pour consultants IT (CPC 1 300€)
                </li>
                <li>
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    Mutuelle TNS Madelin
                  </Link>
                </li>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS
                  </Link>
                </li>
                <li>
                  <Link href="/assurance-freelance" className="text-primary-600 underline">
                    Assurance freelance
                  </Link>{' '}
                  — pour consultants en portage/AE
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Un consultant indépendant a-t-il besoin d'une RC Pro ?",
          a: "OUI absolument — exigée par 100% des clients institutionnels (grands groupes, ETI, collectivités) et 78% des plateformes B2B (Malt, Crème de la Crème). Sans RC Pro : exclusion des appels d'offres + responsabilité personnelle illimitée en cas de mauvais conseil. Tarif accessible : 880-1 400€/an pour consultant junior solo (plafond 3 M€).",
        },
        {
          q: 'Quel plafond RC Pro pour un consultant ?',
          a: "Junior solo : 3 M€ minimum. Senior management/marketing/RH : 5 M€. Consultant IT/finance/cybersécurité : 5-10 M€ (un mauvais conseil sur SI critique d'un grand client peut générer 1-3 M€ de dommages). Conseil financier homologué (CGP/CIF) : 5 M€ OBLIGATOIRE ACPR.",
        },
        {
          q: "Combien coûte l'assurance d'un consultant indépendant en 2026 ?",
          a: 'Démarre à 880€/an pour consultant management junior solo (pack RC + mutuelle + prévoyance). Médiane marché : 1 480-2 800€/an pour consultant senior. Consultant IT senior avec cyber : 2 800-4 800€/an. Variables : spécialité, CA, plafond RC, présence cyber assurance.',
        },
        {
          q: "Madelin pour consultant : combien d'économie d'impôt ?",
          a: "Plafond Madelin santé + prévoyance pour consultant BNC dégageant 80 k€ : ~6 626€/an déductibles. À TMI 41% : économie nette ~2 700€/an + économie cotisations sociales ~24%. Pour consultant à 150 k€ : plafond ~10 305€/an, économie ~4 200€/an d'impôts. ROI immédiat sur le coût des assurances.",
        },
        {
          q: 'Consultant en portage salarial : quelle couverture ?',
          a: 'La société de portage salarial vous couvre pour la RC Pro et la mutuelle (régime collectif salarié). MAIS vérifier le PLAFOND RC PRO de votre société de portage — souvent 1,5 M€ standard, INSUFFISANT pour clients institutionnels. Si insuffisant : souscrire une RC Pro complémentaire individuelle (+580-1 200€/an pour passer à 5 M€).',
        },
        {
          q: 'Cyber assurance : utile pour un consultant ?',
          a: 'OUI si vous manipulez des données sensibles client (CRM, code source, plans stratégiques, documents financiers). Coût moyen sinistre cyber freelance/consultant : 25 000-80 000€. Cyber dédiée : 200-600€/an supplémentaires. ROI évident dès le 1er incident.',
        },
        {
          q: 'Combien de temps pour obtenir un devis ?',
          a: '24h ouvrées via notre formulaire avec 3 propositions de nos partenaires (Hiscox, April Pro, MMA Pro, Allianz Pro, AXA Pro). Souscription 24-48h. Effet contrat : 1er du mois suivant ou immédiat (procédure express +80€).',
        },
      ]}
    />
  )
}
