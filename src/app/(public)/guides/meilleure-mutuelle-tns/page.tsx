/**
 * Guide — Meilleure mutuelle TNS comparatif (Couche B)
 * KW Ahrefs : "meilleure mutuelle tns" 300 vol KD 5 CPC 500€ + tail "comparatif mutuelle tns" 80 → 380 vol/m
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides / meilleure-mutuelle-tns'
const TITLE = 'Meilleure mutuelle TNS 2026 — Comparatif 7 organismes (avis cabinet)'
const TAGLINE =
  'Quelle est la meilleure mutuelle santé pour Travailleur Non Salarié en 2026 ? Comparatif honnête de 7 organismes : Apicil, Pro BTP, Malakoff Humanis, AG2R, Allianz, Generali, MAAF Pro.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Meilleure mutuelle TNS 2026 : comparatif 7 organismes (Apicil, Pro BTP, Malakoff Humanis, AG2R La Mondiale, Allianz, Generali, MAAF Pro). Avis cabinet ORIAS basé sur 800+ adhésions 2024-2025. Tarifs 32-145€ par mois adulte. Loi Madelin déductible.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Choisir la meilleure mutuelle TNS (Travailleur Non Salarié) en 2026 dépend principalement de 4 critères : (1) votre profession et son taux de sinistralité santé, (2) votre âge et composition foyer, (3) votre niveau de couverture souhaité (essentiel, standard, confort ou premium), (4) votre stratégie fiscale Loi Madelin. Notre cabinet ORIAS a accompagné 800+ adhésions TNS en 2024-2025 chez 7 organismes partenaires (Apicil, Pro BTP, Malakoff Humanis, AG2R La Mondiale, Allianz, Generali, MAAF Pro). Cette page synthétise notre retour d'expérience honnête : qui excelle pour qui, qui est à éviter selon votre profil. Tarifs 2026 : 32 € par mois adulte (socle minimum) à 145 € par mois (premium tous risques)."
      legalReference="Loi Madelin (CGI art. 154 bis) — déductibilité 3,75% PASS + 7% au-delà"
      isObligatoire={false}
      benefits={[
        {
          icon: '🏆',
          title: 'Top 3 par profil cabinet',
          desc: 'Recommandation cabinet ORIAS basée sur 800+ adhésions TNS 2024-2025',
        },
        {
          icon: '⚖️',
          title: 'Comparaison 7 organismes',
          desc: 'Apicil, Pro BTP, Malakoff Humanis, AG2R, Allianz, Generali, MAAF Pro',
        },
        {
          icon: '💰',
          title: 'Loi Madelin maximisée',
          desc: 'Stratégie déduction CGI 154 bis intégrée (économie 15-30% TMI)',
        },
        {
          icon: '🎯',
          title: 'Recommandation par métier',
          desc: 'TNS BTP — médecin — consultant — commerçant — chacun son organisme optimal',
        },
      ]}
      sections={[
        {
          h2: 'Top 3 mutuelles TNS par profil (2026)',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Profil TNS</th>
                    <th className="border p-2 text-left">#1 Recommandé</th>
                    <th className="border p-2 text-left">#2 Alternative</th>
                    <th className="border p-2 text-left">#3 Backup</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Artisan BTP TNS</strong>
                    </td>
                    <td className="border p-2">
                      <strong>Pro BTP</strong> (mutualiste sectoriel)
                    </td>
                    <td className="border p-2">Malakoff Humanis</td>
                    <td className="border p-2">MAAF Pro</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Profession libérale médicale</strong>
                    </td>
                    <td className="border p-2">
                      <strong>Apicil</strong> (spécialiste pro santé)
                    </td>
                    <td className="border p-2">Generali Pro</td>
                    <td className="border p-2">Malakoff Humanis</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Consultant — IT freelance</strong>
                    </td>
                    <td className="border p-2">
                      <strong>AG2R La Mondiale</strong>
                    </td>
                    <td className="border p-2">Apicil</td>
                    <td className="border p-2">Allianz</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Commerçant TPE</strong>
                    </td>
                    <td className="border p-2">
                      <strong>MAAF Pro</strong> (réseau agences)
                    </td>
                    <td className="border p-2">AG2R La Mondiale</td>
                    <td className="border p-2">Generali</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Agriculteur (MSA)</strong>
                    </td>
                    <td className="border p-2">
                      <strong>Malakoff Humanis</strong> (forfait MSA)
                    </td>
                    <td className="border p-2">AG2R</td>
                    <td className="border p-2">Pro BTP</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>TNS 55+ ans</strong>
                    </td>
                    <td className="border p-2">
                      <strong>Apicil</strong> (acceptation seniors)
                    </td>
                    <td className="border p-2">Generali Premium</td>
                    <td className="border p-2">Allianz</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: 'Avis cabinet par organisme (basé sur 800+ adhésions)',
          body: (
            <div>
              <h3 className="mb-2 font-bold">Apicil ⭐⭐⭐⭐⭐</h3>
              <p className="mb-3 text-sm">
                Spécialiste prévoyance + mutuelle TNS depuis 1938. Force : couverture pro santé
                exhaustive (kiné, ostéo ou médecines douces dès formule standard). Faiblesse : tarif
                premium pour familles 3+ enfants.
              </p>
              <h3 className="mb-2 font-bold">Pro BTP ⭐⭐⭐⭐⭐ (uniquement BTP)</h3>
              <p className="mb-3 text-sm">
                Mutualiste sectoriel BTP. Force : connaissance fine des risques BTP, tarif
                compétitif artisans. Limite : réservé profils BTP (refus consultants ou professions
                libérales).
              </p>
              <h3 className="mb-2 font-bold">Malakoff Humanis ⭐⭐⭐⭐</h3>
              <p className="mb-3 text-sm">
                Force : très bon réseau de soins, accepte tous profils TNS. Faiblesse : peu de
                différenciation tarifaire selon profil (tarif uniforme = pas optimal pour profils
                peu sinistrés).
              </p>
              <h3 className="mb-2 font-bold">AG2R La Mondiale ⭐⭐⭐⭐</h3>
              <p className="mb-3 text-sm">
                Force : excellent rapport qualité ou prix pour consultants ou IT freelances,
                prévoyance complémentaire intégrable. Faiblesse : moins fort sur médecines douces
                qu’Apicil.
              </p>
              <h3 className="mb-2 font-bold">Allianz Pro ⭐⭐⭐⭐</h3>
              <p className="mb-3 text-sm">
                Force : couverture internationale standard (utile expatriés), service premium.
                Faiblesse : tarifs +15-25% vs concurrents pour profils standards.
              </p>
              <h3 className="mb-2 font-bold">Generali ⭐⭐⭐⭐</h3>
              <p className="mb-3 text-sm">
                Force : excellence professions libérales médicales, pack mutuelle + prévoyance +
                retraite Madelin avantageux. Faiblesse : moins compétitif sur BTP.
              </p>
              <h3 className="mb-2 font-bold">MAAF Pro ⭐⭐⭐</h3>
              <p className="mb-3 text-sm">
                Force : réseau d&apos;agences physiques dense (utile commerçants), tarifs
                compétitifs profils standards. Faiblesse : couverture pro santé moins exhaustive que
                Apicil ou Pro BTP.
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <Link
                  href="/outils/calculateur-tarif-mutuelle-pro"
                  className="text-primary-600 underline"
                >
                  Calculateur tarif mutuelle TNS
                </Link>
              </li>
              <li>
                <Link
                  href="/outils/comparateur-mutuelle-pro"
                  className="text-primary-600 underline"
                >
                  Comparateur officiel mutuelle pro
                </Link>
              </li>
              <li>
                <Link href="/mutuelle-sante-tns" className="text-primary-600 underline">
                  Pilier mutuelle santé TNS
                </Link>
              </li>
              <li>
                <Link
                  href="/outils/calculateur-tarif-prevoyance-tns"
                  className="text-primary-600 underline"
                >
                  Calculateur prévoyance TNS Madelin
                </Link>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle est LA meilleure mutuelle TNS ?',
          a: "Il n'existe pas UNE meilleure mutuelle TNS — la meilleure dépend de votre profil (profession, âge, foyer, couverture souhaitée). Les TOP 3 par profil sont détaillés ci-dessus. Notre cabinet ORIAS recommande toujours de comparer 3 propositions officielles avant souscription, ce que nous faisons gratuitement sous 24h.",
        },
        {
          q: 'Pro BTP : ouvert aux non-BTP ?',
          a: 'NON, Pro BTP est un mutualiste sectoriel réservé aux entreprises et indépendants du BTP (codes NAF 41-43 + métiers connexes architectes, géomètres). Si vous êtes consultant, médecin, commerçant : choisir Apicil, Malakoff ou AG2R ou Generali à la place.',
        },
        {
          q: 'Comment économiser sur ma mutuelle TNS ?',
          a: '4 leviers : (1) <strong>Loi Madelin</strong> = déduction fiscale 3,75% PASS + 7% au-delà (-15-30% TMI), (2) <strong>Pack mutuelle + prévoyance</strong> chez le même organisme (-8-15% rabais pack), (3) <strong>Augmenter franchise</strong> (-5-12%), (4) <strong>Choisir formule standard</strong> au lieu de premium si famille jeune sans pathologie chronique. Notre cabinet optimise ces 4 leviers à chaque devis.',
        },
        {
          q: 'Tarif moyen mutuelle TNS 2026 ?',
          a: 'Référence adulte 40 ans non-fumeur, métropole, formule standard : <strong>78 € par mois</strong>. Variations : profil consultant (-15%) à BTP (+18%) à médecin libéral (+32%). Famille 2 adultes + 2 enfants : multiplier par 2,55 (gratuité partielle enfants chez la plupart des organismes).',
        },
      ]}
    />
  )
}
