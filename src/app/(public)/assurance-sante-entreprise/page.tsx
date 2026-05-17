/**
 * Pilier — Assurance santé entreprise (mutuelle collective ANI 2013)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance santé entreprise" → 200 vol, KD 11, CPC 150€
 * Famille connexe : "mutuelle collective", "mutuelle entreprise", "ANI 2013"
 *
 * Distinction avec /mutuelle-pro existant : "mutuelle pro" est ambigu (TNS ou collective).
 * /assurance-sante-entreprise cible spécifiquement la MUTUELLE COLLECTIVE OBLIGATOIRE
 * pour les SALARIÉS depuis l'ANI 2013 — angle EMPLOYEUR.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-sante-entreprise'
const TITLE = 'Assurance santé entreprise — Mutuelle collective obligatoire ANI 2013'
const TAGLINE =
  "L'assurance santé collective obligatoire pour tous les employeurs : conformité ANI 2013, prise en charge employeur 50% min, panier de soins minimum, comparatif assureurs."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance santé entreprise : mutuelle collective OBLIGATOIRE pour tous les employeurs (ANI 2013, prise en charge employeur 50% min). Panier de soins minimum, optique 100% santé, comparatif Alan, April, Generali, Allianz, MMA, AXA. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance santé entreprise (ou mutuelle collective d'entreprise) est OBLIGATOIRE pour TOUS les employeurs du secteur privé en France depuis l'Accord National Interprofessionnel (ANI) du 11 janvier 2013, transcrit dans la loi du 14 juin 2013 (effet 1er janvier 2016). L'employeur doit obligatoirement proposer un contrat collectif de complémentaire santé à TOUS les salariés, prendre en charge AU MINIMUM 50% de la cotisation et garantir AU MINIMUM le « panier de soins » défini par le décret 2014-1025 (consultations, médicaments, dentaire, optique 100% Santé, hospitalisation). L'absence de mise en place expose l'employeur à : redressement URSSAF (rappel des cotisations sociales sur les frais médicaux que les salariés ont dû payer eux-mêmes), dommages-intérêts versés aux salariés non-couverts, refus de l'inspection du travail. Le tarif moyen pour une PME 20 salariés démarre à 1 800 € HT par an de prise en charge employeur. Cette page détaille les obligations exactes, les exemptions possibles, les tarifs 2026 et compare 6 assureurs santé collective."
      legalReference="ANI du 11 janvier 2013 + Loi du 14 juin 2013 + Décret 2014-1025 (panier minimum)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      benefits={[
        {
          icon: '⚖️',
          title: 'OBLIGATOIRE depuis 2016',
          desc: 'Tous employeurs secteur privé. Sanction absence : redressement URSSAF + dommages-intérêts',
        },
        {
          icon: '💰',
          title: 'Employeur 50% min',
          desc: 'Prise en charge employeur minimum 50% (souvent 60-70% pour attirer les talents)',
        },
        {
          icon: '🩺',
          title: 'Panier minimum garanti',
          desc: 'Décret 2014-1025 : consultations, médicaments, dentaire, optique 100% Santé, hospitalisation',
        },
        {
          icon: '👥',
          title: 'À partir de 1 800 € par an',
          desc: 'PME 20 salariés (part employeur 50%). PME 50 salariés : 4 800-7 200€ par an',
        },
      ]}
      sections={[
        {
          h2: "Obligations exactes de l'employeur depuis l'ANI 2013",
          body: (
            <>
              <ol>
                <li>
                  <strong>Mise en place obligatoire</strong> via DUE (Décision Unilatérale
                  Employeur) ou accord de branche ou entreprise. Affichage des conditions dans
                  l&apos;entreprise + remise notice à chaque salarié.
                </li>
                <li>
                  <strong>Prise en charge minimum 50% de la cotisation</strong> par l&apos;employeur
                  (totalité de la part salariée + part éventuelle famille à la charge du salarié).
                </li>
                <li>
                  <strong>Panier de soins minimum</strong> conforme au décret 2014-1025 :
                  <ul>
                    <li>100% de la base de remboursement Sécu pour consultations + médicaments</li>
                    <li>Forfait journalier hospitalier intégral</li>
                    <li>125% de la base Sécu pour soins dentaires</li>
                    <li>Forfait optique 100% Santé (verres + monture jusqu&apos;à 200€)</li>
                  </ul>
                </li>
                <li>
                  <strong>Adhésion obligatoire de tous les salariés</strong> (sauf cas de dispense
                  légale)
                </li>
                <li>
                  <strong>Portabilité</strong> : maintien gratuit des garanties pendant 12 mois
                  après rupture du contrat de travail
                </li>
                <li>
                  <strong>Information CSE</strong> (Comité Social et Économique) si entreprise &gt;
                  11 salariés
                </li>
              </ol>
              <h3>Cas de dispense possibles pour les salariés</h3>
              <ul>
                <li>Salarié déjà couvert en tant qu&apos;ayant droit (conjoint employeur)</li>
                <li>CDD &lt; 12 mois ou contrat à temps partiel &lt; 15h par semaine</li>
                <li>Apprenti — stagiaire</li>
                <li>Salarié bénéficiant déjà d&apos;une CSS (Complémentaire Santé Solidaire)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance santé entreprise 2026',
          body: (
            <>
              <p>
                Coût total annuel HT (employeur + salariés). Part employeur typiquement 50-70% :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil entreprise</th>
                    <th className="border p-2 text-right">Coût total annuel HT</th>
                    <th className="border p-2 text-right">Part employeur 50%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">TPE 5 salariés (formule de base)</td>
                    <td className="border p-2 text-right">1 800 € – 3 200 €</td>
                    <td className="border p-2 text-right">900 € – 1 600 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">TPE 5 salariés (formule confort)</td>
                    <td className="border p-2 text-right">3 200 € – 4 800 €</td>
                    <td className="border p-2 text-right">1 600 € – 2 400 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 20 salariés (formule équilibrée)</td>
                    <td className="border p-2 text-right">7 200 € – 10 800 €</td>
                    <td className="border p-2 text-right">3 600 € – 5 400 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 50 salariés (formule équilibrée)</td>
                    <td className="border p-2 text-right">14 400 € – 24 000 €</td>
                    <td className="border p-2 text-right">7 200 € – 12 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 100 salariés (formule premium)</td>
                    <td className="border p-2 text-right">36 000 € – 60 000 €</td>
                    <td className="border p-2 text-right">18 000 € – 30 000 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : âge moyen salariés (~+1,5% par an), composition famille (option famille
                +50-80%), secteur (BTP ou transport majoré sinistralité), niveau de garanties choisi
                (base ou confort ou premium), région (Paris +15%).
              </p>
            </>
          ),
        },
        {
          h2: 'Comparatif 6 assureurs santé collective distribués en France',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Assureur</th>
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-left">Atout</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Alan</strong>
                    </td>
                    <td className="border p-2">Start-ups, scale-ups, tertiaire</td>
                    <td className="border p-2">
                      100% digital, app mobile, garanties modernes (téléconsultation, mental health)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>April Pro</strong>
                    </td>
                    <td className="border p-2">PME multi-secteurs</td>
                    <td className="border p-2">Modulaire à la carte, gestion à distance fluide</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Allianz Santé</strong>
                    </td>
                    <td className="border p-2">PME — ETI tous secteurs</td>
                    <td className="border p-2">
                      Réseau santé conventionné, gestion sinistre rapide
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Generali Santé</strong>
                    </td>
                    <td className="border p-2">PME haut de gamme + cadres</td>
                    <td className="border p-2">
                      Garanties premium (médecine douce, optique premium)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MMA Santé</strong>
                    </td>
                    <td className="border p-2">TPE — PME locales</td>
                    <td className="border p-2">Réseau agences physique, conseiller dédié</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>AXA Santé Pro</strong>
                    </td>
                    <td className="border p-2">PME + ETI</td>
                    <td className="border p-2">Tarifs compétitifs gros effectifs</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Procédure de mise en place : 5 étapes',
          body: (
            <>
              <ol>
                <li>
                  <strong>Audit du besoin</strong> : recensement de l&apos;effectif, structure
                  familiale moyenne, secteur, budget cible. Notre cabinet vous accompagne.
                </li>
                <li>
                  <strong>Comparatif 3-5 assureurs</strong> sur exactement le même cahier des
                  charges (panier de soins identique, taux de prise en charge employeur identique).
                </li>
                <li>
                  <strong>Information du CSE</strong> (si entreprise &gt; 11 salariés) —
                  consultation obligatoire avant mise en place.
                </li>
                <li>
                  <strong>Choix du véhicule juridique</strong> :
                  <ul>
                    <li>
                      DUE (Décision Unilatérale de l&apos;Employeur) — plus simple, modifiable
                    </li>
                    <li>
                      Accord de branche (si convention collective applicable) — souvent plus
                      avantageux
                    </li>
                    <li>
                      Accord d&apos;entreprise — négocié avec le CSE (plus solide juridiquement)
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Communication aux salariés</strong> : remise de la notice individuelle,
                  affichage des conditions, formulaire d&apos;adhésion (avec dispenses possibles).
                </li>
              </ol>
              <p>
                Notre cabinet ORIAS gère TOUT ce processus pour vous (forfait 850 € HT pour PME &lt;
                50 salariés, 1 800 € HT pour PME 50-200 salariés).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance santé entreprise est-elle obligatoire ?",
          a: "OUI — pour TOUS les employeurs du secteur privé en France depuis l'ANI du 11 janvier 2013 (loi 14 juin 2013, effet 1er janvier 2016). Obligation : proposer une mutuelle collective à TOUS les salariés, prise en charge employeur 50% MIN, panier de soins minimum garanti (décret 2014-1025). Sanctions absence : redressement URSSAF + dommages-intérêts salariés.",
        },
        {
          q: "Combien coûte la mutuelle collective d'une PME 20 salariés ?",
          a: 'Coût total annuel : 7 200-10 800€ (formule équilibrée). Part employeur 50% : 3 600-5 400€ par an. Variables : âge moyen salariés, secteur (BTP ou transport majoré), niveau de garanties (base, confort ou premium), région (Paris +15%). Devis comparatif gratuit chez notre cabinet ORIAS sous 24h.',
        },
        {
          q: 'Quel est le « panier de soins minimum » obligatoire ?',
          a: "Défini par le décret 2014-1025 : 100% de la base Sécu pour consultations et médicaments, forfait journalier hospitalier intégral, 125% de la base Sécu pour soins dentaires, forfait optique 100% Santé (verres + monture jusqu'à 200€). Tout contrat proposé en mutuelle collective doit AU MINIMUM respecter ce panier.",
        },
        {
          q: 'Mutuelle collective vs mutuelle TNS individuelle ?',
          a: "MUTUELLE COLLECTIVE = imposée à tous les SALARIÉS, négociée par l'employeur, 50% pris en charge minimum employeur. MUTUELLE TNS individuelle = pour le DIRIGEANT TNS (gérant majoritaire SARL, EI, EURL) ou le freelance, déductible Loi Madelin si régime réel. Les 2 régimes sont distincts et le dirigeant TNS choisit sa propre mutuelle (séparée de celle des salariés). Voir <a href='/mutuelle-tns' class='text-primary-600 underline'>/mutuelle-tns</a>.",
        },
        {
          q: 'Comment dispenser un salarié de la mutuelle collective ?',
          a: "Cas de dispense possibles : (1) salarié déjà couvert comme ayant droit (conjoint employeur), (2) CDD < 12 mois ou temps partiel < 15h par semaine, (3) apprenti ou stagiaire, (4) bénéficiaire CSS (Complémentaire Santé Solidaire). Demande écrite du salarié + justificatif. Mention dans la notice d'information remise par l'employeur.",
        },
        {
          q: 'Le dirigeant peut-il être couvert par la mutuelle collective ?',
          a: 'DIRIGEANT ASSIMILÉ SALARIÉ (président SAS ou SASU, gérant minoritaire SARL) : OUI, peut être inclus dans le contrat collectif (régime fiscal salarié). DIRIGEANT TNS (gérant majoritaire SARL, EI, EURL) : NON, doit souscrire une mutuelle TNS Madelin individuelle distincte (régime fiscal différent).',
        },
        {
          q: 'Combien de temps pour mettre en place une mutuelle collective ?',
          a: 'Notre cabinet ORIAS gère le processus complet en 4-6 semaines : audit besoin (1 sem) + comparatif 5 assureurs (1 sem) + consultation CSE si applicable (2 sem) + choix véhicule juridique (DUE / accord) + communication salariés + signature contrat. Effet : 1er du mois suivant la signature. Forfait accompagnement : 850-1 800€ HT selon taille.',
        },
      ]}
    />
  )
}
