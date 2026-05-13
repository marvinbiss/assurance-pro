/**
 * Pilier — Assurance freelance
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance freelance"             → 250 vol, KD 1, CPC 350€ ⭐
 * - "assurance freelance informatique" → 100 vol, KD 0, CPC 450€
 * - "assurance freelance maif"        →  60 vol, KD 1
 * - Famille cumulée : ~410 vol/mois
 *
 * Concurrent benchmark :
 * - assurup.com/.../travailleur-independant → 86 vis/mois
 * - simplis.fr/.../formateur-independant → 38 vis/mois
 *
 * Distinction avec /rc-pro/auto-entrepreneur :
 * - Auto-entrepreneur = STATUT JURIDIQUE (régime micro-fiscal)
 * - Freelance = MODE DE TRAVAIL (peut être en EI, EURL, SASU, portage salarial)
 * Cette page cible les freelances QUEL QUE SOIT le statut.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-freelance'
const TITLE = 'Assurance freelance — Tarifs 2026 (RC Pro, mutuelle, prévoyance, cyber)'
const TAGLINE =
  'Le pack assurance complet pour freelances : RC Pro adaptée à votre métier, mutuelle TNS Madelin, prévoyance dès J0, cyber. Tous statuts (EI, EURL, SASU, portage).'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance freelance : RC Pro adaptée (3 à 10 M€), mutuelle TNS Madelin, prévoyance dès J0, cyber assurance. Tous statuts (EI, EURL, SASU, AE, portage salarial). Tarifs négociés à partir de 220 €/an. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance freelance désigne l'ensemble des garanties indispensables à un travailleur indépendant exerçant à son compte, quel que soit son statut juridique : auto-entrepreneur (micro-entrepreneur), entrepreneur individuel (EI), EURL, SASU, ou en portage salarial. Le pack standard freelance combine 4 garanties principales : la RC Pro (responsabilité civile professionnelle vis-à-vis des clients — exigée par 78% des plateformes B2B et indispensable pour signer avec des clients institutionnels), la mutuelle santé TNS (Loi Madelin déductible si régime réel), la prévoyance TNS (IJ + invalidité + capital décès — critique car la Sécu verse mal pour les indépendants), et la cyber assurance (de plus en plus exigée par les grands comptes). Selon votre métier (digital, conseil, créatif, formation, coaching), les plafonds RC Pro à viser varient de 1,5 M€ (freelance digital low-risk) à 10 M€ (freelance IT systèmes critiques, conseil financier homologué). Cette page présente le pack adapté à chaque type de freelance et compare les 6 assureurs spécialisés (Hiscox, April Pro, Wakam, Stello, AXA Pro Freelance, Allianz Pro)."
      legalReference="Code des assurances + Loi Madelin (TNS) + Code de la consommation B2C / B2B"
      isObligatoire={false}
      benefits={[
        {
          icon: '💼',
          title: 'Tous statuts',
          desc: 'AE, EI, EURL, SASU, portage salarial, CAE — pack adapté à chaque structure',
        },
        {
          icon: '🛡️',
          title: 'RC Pro 1,5 à 10 M€',
          desc: 'Plafond adapté au métier : 1,5 M€ standard, 5 M€ IT/conseil financier, 10 M€ cybersécurité',
        },
        {
          icon: '💰',
          title: 'À partir de 220 €/an',
          desc: 'Pack RC Pro de base pour freelance digital. Pack complet (RC + mutuelle + prévoyance) : 480-980€/an',
        },
        {
          icon: '⚡',
          title: 'Souscription 100% digitale',
          desc: 'Formulaire allégé, signature électronique, attestation sous 24h',
        },
      ]}
      sections={[
        {
          h2: "Freelance vs auto-entrepreneur : la distinction utile pour l'assurance",
          body: (
            <>
              <p>
                Ces 2 termes sont souvent confondus, alors qu&apos;ils désignent des réalités
                différentes :
              </p>
              <ul>
                <li>
                  <strong>Auto-entrepreneur (= micro-entrepreneur)</strong> = un STATUT JURIDIQUE
                  spécifique (régime micro-fiscal, plafond CA 77 700 € en BNC pour 2026)
                </li>
                <li>
                  <strong>Freelance</strong> = un MODE DE TRAVAIL (travailler à son compte sans
                  salariat) — peut être en AE, EI, EURL, SASU, portage salarial, CAE
                </li>
              </ul>
              <p>Conséquences pour l&apos;assurance :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Statut freelance</th>
                    <th className="border p-2 text-left">Régime social</th>
                    <th className="border p-2 text-left">Madelin déductible ?</th>
                    <th className="border p-2 text-left">Page dédiée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Auto-entrepreneur (régime micro-fiscal)</td>
                    <td className="border p-2">TNS</td>
                    <td className="border p-2">❌ NON</td>
                    <td className="border p-2">
                      <Link href="/rc-pro/auto-entrepreneur" className="text-primary-600 underline">
                        /rc-pro/auto-entrepreneur
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Auto-entrepreneur (régime réel sur option)</td>
                    <td className="border p-2">TNS</td>
                    <td className="border p-2">✅ OUI</td>
                    <td className="border p-2">
                      <Link href="/mutuelle-tns" className="text-primary-600 underline">
                        /mutuelle-tns
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">EI / EURL gérant unique</td>
                    <td className="border p-2">TNS</td>
                    <td className="border p-2">✅ OUI</td>
                    <td className="border p-2">
                      <Link
                        href="/assurance-micro-entreprise"
                        className="text-primary-600 underline"
                      >
                        /assurance-micro-entreprise
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">SASU président</td>
                    <td className="border p-2">Assimilé salarié</td>
                    <td className="border p-2">❌ Régime collectif</td>
                    <td className="border p-2">Mutuelle individuelle</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Portage salarial</td>
                    <td className="border p-2">Salarié de la société de portage</td>
                    <td className="border p-2">❌ Couvert collectivement</td>
                    <td className="border p-2">Voir société de portage</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance freelance 2026 par métier',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil freelance</th>
                    <th className="border p-2 text-right">RC Pro</th>
                    <th className="border p-2 text-right">
                      Pack complet (+ mutuelle + prévoyance)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Freelance dev web junior solo</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Freelance dev senior / fullstack</td>
                    <td className="border p-2 text-right">380 € – 580 €</td>
                    <td className="border p-2 text-right">980 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Freelance DevOps / SRE</td>
                    <td className="border p-2 text-right">580 € – 980 €</td>
                    <td className="border p-2 text-right">1 280 € – 2 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant management / marketing</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                    <td className="border p-2 text-right">820 € – 1 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Designer graphique / UX/UI</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Photographe / vidéaste</td>
                    <td className="border p-2 text-right">280 € – 480 €</td>
                    <td className="border p-2 text-right">780 € – 1 280 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Coach / formateur indépendant</td>
                    <td className="border p-2 text-right">220 € – 420 €</td>
                    <td className="border p-2 text-right">680 € – 1 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Rédacteur web / copywriter</td>
                    <td className="border p-2 text-right">220 € – 320 €</td>
                    <td className="border p-2 text-right">580 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Traducteur / interprète</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Community manager / SEO/SEA</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Pack complet = RC Pro + mutuelle TNS Madelin (entrée de gamme) + prévoyance TNS (IJ
                100€/jour). Ne comprend pas la cyber assurance (+200-400€/an option) ni le
                multirisque bureau si applicable.
              </p>
            </>
          ),
        },
        {
          h2: 'Garanties prioritaires selon votre stade de freelance',
          body: (
            <>
              <h3>Démarrage (0-12 mois, CA &lt; 30 k€)</h3>
              <ul>
                <li>
                  <strong>RC Pro de base</strong> (1,5 M€) — exigée par les plateformes B2B
                </li>
                <li>Mutuelle individuelle non-Madelin (au régime micro-fiscal AE)</li>
                <li>Reporter prévoyance et cyber jusqu&apos;à stabilisation revenue</li>
              </ul>
              <h3>Croissance (1-3 ans, CA 30-77 k€)</h3>
              <ul>
                <li>
                  Bascule au régime réel d&apos;imposition pour activer Madelin (si bénéfice ≥ 30k€)
                </li>
                <li>
                  <strong>Mutuelle TNS Madelin</strong> + <strong>prévoyance TNS Madelin</strong>{' '}
                  couplées
                </li>
                <li>RC Pro plafond 3-5 M€ (si clients institutionnels)</li>
                <li>Cyber assurance si manipulation de données client</li>
              </ul>
              <h3>Maturité (3+ ans, CA &gt; 77 k€ — bascule SASU/EURL)</h3>
              <ul>
                <li>
                  Pack complet : RC Pro 5-10 M€ + multirisque bureau + prévoyance + mutuelle + cyber
                </li>
                <li>RCMS si SASU/SARL avec engagement passé sur dossiers complexes</li>
                <li>Garantie homme-clé si dépendance forte à votre personne</li>
                <li>Protection juridique pour litiges client/URSSAF</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Hub freelance : nos pages spécialisées',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/rc-pro/auto-entrepreneur" className="text-primary-600 underline">
                    RC Pro auto-entrepreneur
                  </Link>{' '}
                  — pour AE / micro-entrepreneurs
                </li>
                <li>
                  <Link href="/rc-pro/informatique" className="text-primary-600 underline">
                    RC Pro informatique
                  </Link>{' '}
                  — freelance IT, dev, DevOps, cybersécurité
                </li>
                <li>
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    Mutuelle TNS Madelin
                  </Link>{' '}
                  — santé déductible
                </li>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS
                  </Link>{' '}
                  — IJ + invalidité + capital décès
                </li>
                <li>
                  <Link href="/assurance-bureau" className="text-primary-600 underline">
                    Assurance bureau / coworking
                  </Link>{' '}
                  — si local pro
                </li>
                <li>
                  <Link href="/cyber-assurance" className="text-primary-600 underline">
                    Cyber assurance
                  </Link>{' '}
                  — protection données client
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Un freelance a-t-il besoin d'une assurance ?",
          a: "OUI — la RC Pro est exigée par 78% des plateformes B2B (Malt, Crème de la Crème, Comeup Pro, Upwork) à l'inscription. Sans elle, accès limité aux missions B2B. Au-delà du contractuel : un seul sinistre client peut détruire votre activité (responsabilité personnelle illimitée sans RC Pro). Tarif accessible : 220-580€/an pour la RC Pro seule.",
        },
        {
          q: 'Différence entre freelance et auto-entrepreneur côté assurance ?',
          a: 'AUTO-ENTREPRENEUR = statut juridique spécifique (régime micro-fiscal). FREELANCE = mode de travail, peut être en AE, EI, EURL, SASU, portage. Côté assurance : un freelance en SASU doit prendre une mutuelle COLLECTIVE (régime salarié), un freelance en AE au régime réel peut activer Madelin (déductibilité), un freelance en portage est COUVERT par la société de portage.',
        },
        {
          q: 'Combien coûte une assurance freelance complète ?',
          a: 'Démarre à 680€/an pour pack RC + mutuelle + prévoyance pour freelance digital junior. Médiane marché : 980-1 480€/an pour freelance senior. Variables : métier (IT > conseil > créatif), CA déclaré, plafond RC choisi (1,5 à 10 M€), stade de carrière, options (cyber, multirisque bureau).',
        },
        {
          q: 'Puis-je déduire mes assurances freelance fiscalement ?',
          a: "RC PRO : déductible intégralement du bénéfice imposable au régime réel (charges générales d'exploitation, art. 39 CGI). MUTUELLE + PRÉVOYANCE : déductibles via Loi Madelin SI régime réel d'imposition (TNS) ET contrat étiqueté Madelin. Au régime micro-fiscal AE : NON déductibles (mais non assujetties non plus).",
        },
        {
          q: 'Cyber assurance : utile pour un freelance ?',
          a: "OUI dès que vous manipulez des données client (90% des freelances en 2026 : CRM, base prospects, code client, design propriétaire). Coût moyen sinistre cyber freelance : 25 000-80 000€ (notification CNIL, frais juridiques, perte d'exploitation). Cyber assurance dédiée : 200-400€/an supplémentaires. ROI évident dès le 1er incident.",
        },
        {
          q: 'Plateforme B2B : quelle attestation RC Pro fournir ?',
          a: "Une attestation RC Pro CONFORME 2026 (arrêté du 23 janvier 2024) avec : plafond minimum 1,5 M€/sinistre, activité couverte clairement libellée, période de validité précise, mention assureur + n° police. Pas de validité minimale exigée par les plateformes (acceptable dès le 1er jour du contrat). Pour modèle conforme : voir <a href='/guides/attestation-rc-pro' class='text-primary-600 underline'>/guides/attestation-rc-pro</a>.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance freelance ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3-5 propositions de nos partenaires spécialisés freelance (Hiscox, April Pro, Wakam, Stello, AXA Pro, Allianz Pro). Souscription : 24h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +80€) pour démarrage de mission urgent.',
        },
      ]}
    />
  )
}
