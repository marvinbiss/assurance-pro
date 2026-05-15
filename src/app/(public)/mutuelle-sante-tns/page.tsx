/**
 * Pilier — Mutuelle santé TNS
 * KW Ahrefs : "mutuelle santé tns" 200 vol KD 4 CPC 600€ ⭐ (CPC élevé = money KW)
 * Variante de /mutuelle-tns existant — focus santé pure (vs mutuelle TNS qui inclut prévoyance).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'mutuelle-sante-tns'
const TITLE = 'Mutuelle santé TNS — Loi Madelin 2026, comparatif Madelin santé'
const TAGLINE =
  'La mutuelle santé pour Travailleurs Non Salariés (TNS) : remboursements optique/dentaire renforcés, hospitalisation, médecines douces. Loi Madelin déductible.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Mutuelle santé TNS Loi Madelin : remboursements optique/dentaire, hospitalisation 100-400% BR, médecines douces. Comparatif April Pro Santé, MMA Pro, Generali, Aon. Tarifs 32-180€/mois. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La mutuelle santé TNS (Travailleur Non Salarié) est la complémentaire santé spécialisée pour les indépendants : artisans, commerçants, professions libérales, gérants majoritaires de SARL, EI, EURL. Elle couvre les frais médicaux non pris en charge par l'Assurance Maladie obligatoire (Sécu artisans-commerçants régime général unifié depuis 2020) : consultations spécialistes, dépassements d'honoraires, optique, dentaire, hospitalisation, médecines douces. Sa particularité fiscale : éligible Loi Madelin (art. 154 bis CGI) — cotisations DÉDUCTIBLES du bénéfice imposable au régime réel. Cette page distingue mutuelle santé TNS pure de notre pilier <a href='/mutuelle-tns' class='text-primary-600 underline'>/mutuelle-tns</a> qui couvre santé + prévoyance combinées."
      legalReference="Article 154 bis du CGI (Loi Madelin) + Code de la Sécurité Sociale"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      benefits={[
        {
          icon: '💰',
          title: 'Madelin déductible',
          desc: 'Cotisations déductibles du bénéfice imposable au régime réel (économie ~1 750€/an pour 60k€)',
        },
        {
          icon: '🩺',
          title: 'Optique 100% Santé+',
          desc: 'Verres complexes, lentilles, chirurgie réfractive, montures haut de gamme',
        },
        {
          icon: '🦷',
          title: 'Dentaire renforcé',
          desc: "Implants, couronnes, orthodontie adulte (forfait jusqu'à 1 800€/an)",
        },
        {
          icon: '🏥',
          title: 'Hospitalisation 400%',
          desc: "Forfait journalier + chambre particulière + dépassements honoraires (jusqu'à 400% BR)",
        },
      ]}
      sections={[
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <p>
                Cette page est complémentaire à notre pilier{' '}
                <Link href="/mutuelle-tns" className="text-primary-600 underline">
                  /mutuelle-tns
                </Link>{' '}
                qui détaille en profondeur :
              </p>
              <ul>
                <li>
                  Tableau de tarifs par profil (consultant, artisan BTP, profession libérale,
                  dirigeant)
                </li>
                <li>Calcul détaillé du plafond Madelin (santé + prévoyance combinés)</li>
                <li>
                  Comparatif 6 mutuelles TNS (April Pro, MMA Pro, Generali, Aon, Allianz, Harmonie)
                </li>
                <li>5 erreurs à éviter avec sa mutuelle TNS Madelin</li>
                <li>FAQ détaillée 7 questions</li>
              </ul>
              <p>
                Voir aussi{' '}
                <Link href="/prevoyance-tns" className="text-primary-600 underline">
                  /prevoyance-tns
                </Link>{' '}
                (IJ + invalidité + capital décès, complément critique pour TNS).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Mutuelle santé TNS : Madelin déductible ?',
          a: "OUI au régime réel d'imposition. Plafond annuel commun santé + prévoyance Madelin : 3,75% du PASS + 7% du bénéfice imposable. Pour 60k€ de bénéfice : ~5 826€/an déductibles. Économie d'impôt nette ~1 750€/an à TMI 30%.",
        },
        {
          q: 'Combien coûte une mutuelle santé TNS en 2026 ?',
          a: "32-180€/mois selon profil. Voir <a href='/mutuelle-tns' class='text-primary-600 underline'>/mutuelle-tns</a> pour tableau détaillé par profil (consultant, artisan, profession libérale, dirigeant).",
        },
        {
          q: 'Quelle différence avec /mutuelle-tns ?',
          a: "/mutuelle-tns = pilier complet (santé + prévoyance + comparatif 6 assureurs + FAQ détaillée 7 questions). Cette page (mutuelle-sante-tns) = focus santé pure. Pour la prévoyance TNS : <a href='/prevoyance-tns' class='text-primary-600 underline'>/prevoyance-tns</a>.",
        },
      ]}
    />
  )
}
