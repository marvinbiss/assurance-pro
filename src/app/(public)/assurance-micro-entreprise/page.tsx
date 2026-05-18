/**
 * Pilier — Assurance micro-entreprise
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance micro entreprise"      → 1 100 vol, KD 4, CPC 300€ ⭐
 * - "assurance professionnelle micro-entreprise" → 100 vol, KD 0
 * Famille cumulée : ~1 300 vol/mois
 *
 * Concurrent benchmark : marché vacant — top concurrent à 2 vis/mois
 * (assurup.com / coover.fr ne ciblent pas ce KW spécifique).
 *
 * Distinction critique : "micro-entreprise" est un cousin de "auto-entrepreneur"
 * (terme légal officiel depuis 2016) mais avec intent légèrement différent —
 * souvent utilisé par les TPE en SARL/SAS de < 10 salariés cherchant des assurances
 * adaptées à leur taille.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-micro-entreprise'
const TITLE = 'Assurance micro-entreprise — Pack 2026 (RC Pro, multirisque, mutuelle)'
const TAGLINE =
  "L'assurance dédiée aux micro-entreprises (TPE < 10 salariés) et micro-entrepreneurs : RC Pro, multirisque, mutuelle TNS, prévoyance. Tarifs ajustés à la taille."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance micro-entreprise : pack adapté aux TPE et micro-entrepreneurs (RC Pro, multirisque local, mutuelle TNS, prévoyance Madelin). Tarifs négociés à partir de 220 € par an. Comparatif 8 assureurs. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance micro-entreprise désigne l'ensemble des contrats adaptés aux structures de petite taille : micro-entrepreneurs (anciennement auto-entrepreneurs, dénomination légale depuis 2016), entrepreneurs individuels (EI) et TPE de moins de 10 salariés en EURL, SARL, SASU ou SAS. Sa particularité : les assureurs proposent des packs SIMPLIFIÉS et MOINS CHERS que pour les PME (formulaire de souscription allégé, plafonds calibrés sur le CA, gestion 100% digitale possible). Le tarif d'un pack RC Pro + multirisque démarre à 220 € HT par an pour un freelance solo, jusqu'à 1 200 € HT par an pour une TPE 5 salariés en local. Cette page détaille les garanties indispensables par profil micro-entreprise (digital, services, commerce, BTP), les tarifs 2026 et la fiscalité Madelin pour les TNS au régime réel."
      legalReference="Code des assurances + statut micro-entrepreneur (Loi 9 août 2016) + Loi Madelin (art. 154 bis CGI)"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚡',
          title: 'Souscription 100% digitale',
          desc: 'Formulaire allégé pour micro-structures, signature électronique, attestation 24h',
        },
        {
          icon: '💰',
          title: 'À partir de 220 € par an',
          desc: 'Pack RC Pro + multirisque pour freelance solo. TPE 5 salariés : 980-1 480€ par an',
        },
        {
          icon: '📋',
          title: 'Madelin déductible (réel)',
          desc: "Pour TNS au régime réel d'imposition — mutuelle + prévoyance déductibles",
        },
        {
          icon: '🛡️',
          title: 'Garanties calibrées',
          desc: 'Plafonds proportionnés à votre CA réel, pas de sur-couverture inutile',
        },
      ]}
      sections={[
        {
          h2: 'Quelle assurance pour une micro-entreprise selon le statut ?',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Statut</th>
                    <th className="border p-2 text-left">RC Pro</th>
                    <th className="border p-2 text-left">Multirisque local</th>
                    <th className="border p-2 text-left">Mutuelle — Prévoyance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Micro-entrepreneur</strong> (régime micro-fiscal)
                    </td>
                    <td className="border p-2">Selon métier (obligatoire 21 métiers)</td>
                    <td className="border p-2">Si local pro</td>
                    <td className="border p-2">Mutuelle individuelle (Madelin NON applicable)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Micro-entrepreneur</strong> (régime réel sur option)
                    </td>
                    <td className="border p-2">Selon métier</td>
                    <td className="border p-2">Si local pro</td>
                    <td className="border p-2">Madelin déductible ✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>EI</strong> (entrepreneur individuel)
                    </td>
                    <td className="border p-2">Selon métier</td>
                    <td className="border p-2">Si local pro</td>
                    <td className="border p-2">Madelin déductible ✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>EURL</strong> (gérant unique)
                    </td>
                    <td className="border p-2">Recommandée</td>
                    <td className="border p-2">Si local pro</td>
                    <td className="border p-2">Madelin déductible ✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>SARL</strong> (gérant majoritaire)
                    </td>
                    <td className="border p-2">Recommandée</td>
                    <td className="border p-2">Bail commercial</td>
                    <td className="border p-2">Madelin déductible ✅</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>SASU</strong> (président)
                    </td>
                    <td className="border p-2">Recommandée</td>
                    <td className="border p-2">Bail commercial</td>
                    <td className="border p-2">Régime salarié — pas Madelin</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>SAS</strong> avec salariés
                    </td>
                    <td className="border p-2">Recommandée + RC Mandataire</td>
                    <td className="border p-2">Bail commercial</td>
                    <td className="border p-2">Mutuelle salariés ANI 2013 obligatoire</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance micro-entreprise 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Profil micro-entreprise</th>
                    <th className="border p-2 text-right">Pack annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Freelance digital solo (RC Pro 1,5 M€)</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant management solo (RC Pro 2 M€)</td>
                    <td className="border p-2 text-right">320 € – 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Esthéticienne — coiffeur à domicile</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan AE BTP (décennale + RC + véhicule)</td>
                    <td className="border p-2 text-right">980 € – 1 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      TPE 3 salariés bureau (RC + multirisque + mutuelle col.)
                    </td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      TPE 5 salariés boutique (RC + multirisque + mutuelle col.)
                    </td>
                    <td className="border p-2 text-right">980 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Cabinet libéral 2 associés (RC Pro 5 M€ + cyber)</td>
                    <td className="border p-2 text-right">1 200 € – 2 200 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Micro-entrepreneur : passer au régime réel pour activer Madelin',
          body: (
            <>
              <p>
                Au régime micro-fiscal classique (versement libératoire), les cotisations Madelin
                (mutuelle + prévoyance) NE sont PAS déductibles. Pour bénéficier de Madelin, il faut{' '}
                <strong>basculer au régime réel d&apos;imposition</strong>.
              </p>
              <p>
                Démarche pertinente dès que votre bénéfice dépasse <strong>~30 k€ par an</strong> :
              </p>
              <ul>
                <li>
                  <strong>Procédure</strong> : option à activer auprès du SIE (Service Impôt
                  Entreprise) avant le 31/12 de l&apos;année N pour application en N+1
                </li>
                <li>
                  <strong>Coût additionnel</strong> : comptable obligatoire (~80-150€ par mois pour
                  micro-comptabilité simplifiée)
                </li>
                <li>
                  <strong>Économie d&apos;impôts</strong> : ~1 200-1 800€ par an pour 50k€ de
                  bénéfice (Madelin santé+prévoyance ~5 800€ déductibles + frais réels)
                </li>
                <li>
                  <strong>ROI</strong> : positif dès 30 k€ de bénéfice, fortement positif au-delà de
                  50 k€
                </li>
              </ul>
              <p>
                Plus de détails sur{' '}
                <Link href="/mutuelle-tns" className="text-primary-600 underline">
                  /mutuelle-tns
                </Link>{' '}
                et{' '}
                <Link href="/prevoyance-tns" className="text-primary-600 underline">
                  /prevoyance-tns
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          h2: 'Hub par profil micro-entreprise : nos pages dédiées',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/rc-pro/auto-entrepreneur" className="text-primary-600 underline">
                    RC Pro auto-entrepreneur
                  </Link>{' '}
                  — 21 métiers obligatoires + plateformes B2B
                </li>
                <li>
                  <Link
                    href="/assurance-decennale/auto-entrepreneur"
                    className="text-primary-600 underline"
                  >
                    Décennale auto-entrepreneur BTP
                  </Link>{' '}
                  — pour artisans BTP en AE
                </li>
                <li>
                  <Link href="/assurance-bureau" className="text-primary-600 underline">
                    Assurance bureau
                  </Link>{' '}
                  — pour TPE en local séparé ou bureau à domicile
                </li>
                <li>
                  <Link href="/assurance-local-commercial" className="text-primary-600 underline">
                    Assurance local commercial
                  </Link>{' '}
                  — pour micro-commerces en boutique
                </li>
                <li>
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    Mutuelle TNS Madelin
                  </Link>{' '}
                  — santé pour indépendants au régime réel
                </li>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS Madelin
                  </Link>{' '}
                  — IJ + invalidité + capital décès
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles assurances sont obligatoires pour un micro-entrepreneur ?',
          a: 'Légalement obligatoire pour 21 métiers réglementés : BTP (décennale + RC travaux), santé, juridique, conseil financier, transport (VTC, taxi), sport encadré, esthétique invasive, sécurité privée. Pour les autres : pas obligatoire mais EXIGÉE par 78% des plateformes B2B (Malt, Crème de la Crème, Comeup Pro, Upwork).',
        },
        {
          q: "Combien coûte l'assurance d'une micro-entreprise ?",
          a: 'Démarre à 220€ par an pour un freelance digital solo (RC Pro 1,5 M€). Médiane marché : 280-480€ par an pour un solo. TPE 5 salariés en boutique : 980-1 480€ par an pour pack complet RC + multirisque + mutuelle collective. Variables : métier, statut juridique, présence local pro, nombre de salariés.',
        },
        {
          q: 'Différence entre micro-entrepreneur et auto-entrepreneur ?',
          a: "Aucune en pratique — c'est le MÊME statut juridique, juste 2 noms différents. « Auto-entrepreneur » est la dénomination historique (créée en 2009). « Micro-entrepreneur » est devenue la dénomination LÉGALE OFFICIELLE depuis la Loi du 9 août 2016. Les médias et les particuliers continuent d'utiliser les 2 termes de manière interchangeable. Côté assurance, mêmes contrats.",
        },
        {
          q: 'Micro-entrepreneur : peut-on déduire ses assurances Madelin ?',
          a: "PAS au régime micro-fiscal classique (versement libératoire). OUI au régime réel d'imposition (option à activer auprès du SIE avant 31/12 de l'année N). Démarche pertinente dès 30 k€ par an de bénéfice — économie d'impôts ~1 200-1 800€ par an pour 50k€ de bénéfice.",
        },
        {
          q: 'TPE 5 salariés : quelle mutuelle obligatoire ?',
          a: "Mutuelle collective d'entreprise OBLIGATOIRE depuis l'ANI 2013 (effet 1er janvier 2016) — 50% pris en charge par l'employeur minimum. Choix d'un contrat conforme au minimum « panier de soins » (décret 2014-1025) auprès d'un assureur agréé. Procédure : DUE (Décision Unilatérale de l'Employeur) ou accord de branche. Notre cabinet accompagne sur ce volet (forfait 850€ HT).",
        },
        {
          q: 'EURL ou SASU : quel statut pour optimiser les assurances ?',
          a: "EURL = gérant unique TNS → cotisations sociales 30-45% du bénéfice + Madelin déductible (santé + prévoyance + retraite Madelin). SASU = président assimilé salarié → cotisations sociales ~70% du salaire (lourd) MAIS contrats collectifs accessibles + couverture chômage. Choix dépend du niveau de revenu visé : EURL plus rentable jusqu'à ~80k€ de bénéfice, SASU au-delà.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance micro-entreprise ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3-5 propositions de nos 8 assureurs partenaires. Souscription : 24h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +80€) pour démarrage urgent.',
        },
      ]}
    />
  )
}
