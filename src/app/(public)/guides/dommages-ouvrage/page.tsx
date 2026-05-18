/**
 * Guide juridique — Assurance dommages-ouvrage (Loi Spinetta côté maître d'ouvrage)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance dommages ouvrage"        → 400 vol/mois, KD 19, CPC 140€
 * - "dommages ouvrage"                  → 150 vol, KD  0, CPC 130€
 * - "assurances dommages ouvrage"       → 150 vol, KD 10
 * - "assurance dommage ouvrage et garantie décennale" → 150 vol, KD 1, CPC 110€
 * - "dommages ouvrage april"            →  80 vol
 * - "comparateur assurance dommages ouvrage" → 70 vol
 * - "prix assurance dommages ouvrage"   →  60 vol, CPC 70€
 * - "assurance dommages ouvrage obligatoire" → 60 vol, KD 11
 * - Famille "dommages ouvrage" cumulé : ~1 200 vol/mois
 *
 * Concurrent benchmark (competitor_pages) :
 * - pro.april.fr/guide/difference-decennale-dommages-ouvrage → 329 vis/mois
 *
 * Stratégie : guide éducationnel orienté maître d'ouvrage (le souscripteur de la DO,
 * différent de l'artisan qui souscrit la décennale). Distinguer les 2 produits est
 * un sujet récurrent (vol cumulé "vs / et garantie décennale" = ~200/mois).
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'guides / dommages-ouvrage'
const TITLE = 'Assurance dommages-ouvrage — Obligation, prix et différence avec la décennale'
const TAGLINE =
  "L'assurance dommages-ouvrage (DO) protège le maître d'ouvrage en pré-financant la réparation des sinistres décennaux, sans attendre l'identification du responsable. Guide complet 2026."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Assurance dommages-ouvrage : obligation pour tout maître d'ouvrage faisant construire (Loi Spinetta art. L. 242-1). Prix moyen 2-5% du coût des travaux, différence avec la garantie décennale, sanctions absence. Guide expert.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'article',
  },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance dommages-ouvrage (DO) est la garantie obligatoire que doit souscrire tout maître d'ouvrage (particulier qui fait construire, promoteur, copropriété, syndic, entreprise propriétaire) AVANT le démarrage de travaux de construction (Loi Spinetta du 4 janvier 1978, art. L. 242-1 du Code des assurances). Son but : pré-financer immédiatement la réparation des sinistres relevant de la garantie décennale, sans attendre la résolution juridique du litige sur l'identité du responsable. C'est l'assurance qui paie la réparation pendant que les avocats déterminent qui doit rembourser au final. Prix moyen : 2 à 5% du coût total HT des travaux. Cette page distingue clairement la DO de la garantie décennale (point de confusion #1 chez les particuliers), détaille les obligations, les sanctions et les pièges à éviter à la souscription."
      legalReference="Article L. 242-1 du Code des assurances + Loi Spinetta du 4 janvier 1978"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation maître ouvrage',
          desc: 'Toute personne faisant construire doit la souscrire AVANT démarrage travaux (L. 242-1)',
        },
        {
          icon: '⚡',
          title: 'Pré-financement immédiat',
          desc: "L'assureur paie la réparation sans attendre la décision de justice sur le responsable",
        },
        {
          icon: '💰',
          title: '2-5% du coût travaux',
          desc: 'Prime unique versée à la signature, calculée sur le montant HT total des travaux',
        },
        {
          icon: '🏗️',
          title: 'Couvre 10 ans',
          desc: "Période identique à la garantie décennale de l'artisan — maintien automatique en cas de revente",
        },
      ]}
      sections={[
        {
          h2: 'Différence cruciale entre dommages-ouvrage et garantie décennale',
          body: (
            <>
              <p>
                C&apos;est <strong>la confusion #1</strong> chez les particuliers et même chez
                certains pros du BTP. Pourtant, ces deux garanties sont distinctes, souscrites par
                des personnes différentes, dans des buts différents :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Garantie décennale</th>
                    <th className="border p-2 text-left">Assurance dommages-ouvrage (DO)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Souscripteur</strong>
                    </td>
                    <td className="border p-2">L&apos;artisan — l&apos;entreprise BTP</td>
                    <td className="border p-2">
                      Le maître d&apos;ouvrage (particulier, promoteur, copro)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Quand souscrire</strong>
                    </td>
                    <td className="border p-2">Avant chaque chantier</td>
                    <td className="border p-2">Avant le démarrage des travaux</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>But</strong>
                    </td>
                    <td className="border p-2">
                      Couvrir la responsabilité civile décennale de l&apos;artisan
                    </td>
                    <td className="border p-2">
                      Pré-financer immédiatement la réparation des sinistres
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Bénéficiaire</strong>
                    </td>
                    <td className="border p-2">Le maître d&apos;ouvrage (indirect)</td>
                    <td className="border p-2">Le maître d&apos;ouvrage (direct)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Délai indemnisation</strong>
                    </td>
                    <td className="border p-2">Long (procédure judiciaire si litige)</td>
                    <td className="border p-2">Rapide (60 à 90 jours après déclaration)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Prix</strong>
                    </td>
                    <td className="border p-2">480-1 540€ par an pour un AE BTP</td>
                    <td className="border p-2">2-5% du coût HT des travaux (prime unique)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Sanction absence</strong>
                    </td>
                    <td className="border p-2">
                      75 000€ + 6 mois prison + interdiction d&apos;exercer
                    </td>
                    <td className="border p-2">
                      75 000€ + 6 mois prison (art. L. 243-3) — sauf personnes physiques bâtissant
                      pour eux-mêmes
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>En pratique</strong> : si une fissure structurelle apparaît 3 ans après
                réception, la DO indemnise le maître d&apos;ouvrage immédiatement, puis se retourne
                contre l&apos;assureur de l&apos;artisan responsable (subrogation légale, art. L.
                121-12 C. assur.). Sans DO, le maître d&apos;ouvrage doit attendre 2-5 ans de
                procédure pour récupérer son argent.
              </p>
            </>
          ),
        },
        {
          h2: 'Qui doit obligatoirement souscrire la dommages-ouvrage ?',
          body: (
            <>
              <p>
                L&apos;article L. 242-1 du Code des assurances impose la DO à toute personne
                physique ou morale qui fait réaliser pour son compte des travaux de construction.
                Sont concernés :
              </p>
              <ul>
                <li>
                  <strong>Promoteurs immobiliers</strong> (particulier qui revend, SCI promotion,
                  programme neuf)
                </li>
                <li>
                  <strong>Maîtres d&apos;ouvrage privés</strong> (entreprise faisant construire ses
                  locaux)
                </li>
                <li>
                  <strong>Maîtres d&apos;ouvrage publics</strong> (collectivités, État, hôpitaux)
                </li>
                <li>
                  <strong>Vendeurs immobiliers d&apos;un bien neuf</strong> (vente avant 10 ans)
                </li>
                <li>
                  <strong>Mandataires</strong> (constructeurs de maisons individuelles, MOE délégué)
                </li>
                <li>
                  <strong>Syndics de copropriété</strong> faisant des travaux de gros œuvre
                </li>
              </ul>
              <p>
                <strong>Exception majeure</strong> : les{' '}
                <strong>personnes physiques bâtissant pour leur propre usage</strong> (et celui de
                leur famille — conjoint, ascendants, descendants) sont DISPENSÉES de la sanction
                pénale en cas d&apos;absence de DO. MAIS attention : la DO reste juridiquement
                obligatoire, et son absence rend la revente du bien quasi-impossible avant 10 ans
                (refus bancaire systématique pour l&apos;acquéreur en l&apos;absence de DO).
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une assurance dommages-ouvrage en 2026 ?',
          body: (
            <>
              <p>
                Tarifs indicatifs 2026 basés sur les barèmes des principaux assureurs DO (SMABTP,
                MAAF Pro, Generali Construction, Axa Construction, Groupama Bâtiment) :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de chantier</th>
                    <th className="border p-2 text-right">Coût HT travaux</th>
                    <th className="border p-2 text-right">Prime DO unique</th>
                    <th className="border p-2 text-right">% du coût</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Maison individuelle (CMI)</td>
                    <td className="border p-2 text-right">200 000 €</td>
                    <td className="border p-2 text-right">5 000 € – 10 000 €</td>
                    <td className="border p-2 text-right">2,5-5%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Extension — rénovation lourde</td>
                    <td className="border p-2 text-right">80 000 €</td>
                    <td className="border p-2 text-right">2 400 € – 4 800 €</td>
                    <td className="border p-2 text-right">3-6%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Programme immobilier 12 lots</td>
                    <td className="border p-2 text-right">2 500 000 €</td>
                    <td className="border p-2 text-right">37 500 € – 75 000 €</td>
                    <td className="border p-2 text-right">1,5-3%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Bureaux ETI</td>
                    <td className="border p-2 text-right">1 200 000 €</td>
                    <td className="border p-2 text-right">22 000 € – 50 000 €</td>
                    <td className="border p-2 text-right">1,8-4%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables qui font monter la prime : zone sismique (+30%), terrain argileux ou
                instable (+20-50%), présence de nappe phréatique (+15%), architecture complexe
                (porte-à-faux, sous-sol immergé), assurance pas souscrite « avant ouverture chantier
                » (+10-30%).
              </p>
            </>
          ),
        },
        {
          h2: "Procédure d'indemnisation : comment ça marche en cas de sinistre ?",
          body: (
            <>
              <p>
                C&apos;est l&apos;avantage clé de la DO :{' '}
                <strong>indemnisation rapide sans recherche préalable du responsable</strong>.
                Procédure standardisée :
              </p>
              <ol>
                <li>
                  <strong>Déclaration du sinistre</strong> par le maître d&apos;ouvrage à son
                  assureur DO (lettre recommandée + preuves photos ou vidéos), sous 5 jours après la
                  découverte
                </li>
                <li>
                  <strong>Désignation d&apos;un expert</strong> par l&apos;assureur sous 60 jours
                </li>
                <li>
                  <strong>Rapport d&apos;expertise préliminaire</strong> + offre
                  d&apos;indemnisation sous 90 jours
                </li>
                <li>
                  <strong>Versement de l&apos;indemnité</strong> à l&apos;acceptation de
                  l&apos;offre, ou en cas de litige : avance de 50% sous 15 jours
                </li>
                <li>
                  <strong>Réalisation des travaux de réparation</strong> par les artisans de votre
                  choix (ou ceux désignés par l&apos;assureur)
                </li>
                <li>
                  <strong>Subrogation</strong> : l&apos;assureur DO se retourne ensuite contre
                  l&apos;assureur décennal de l&apos;artisan responsable (art. L. 121-12)
                </li>
              </ol>
              <p>
                <strong>Important</strong> : le maître d&apos;ouvrage n&apos;a JAMAIS à identifier
                l&apos;artisan responsable lui-même ni à engager une procédure judiciaire.
                C&apos;est l&apos;assureur DO qui le fait après indemnisation.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance dommages-ouvrage est-elle obligatoire pour un particulier qui fait construire sa maison ?",
          a: "Oui en théorie (art. L. 242-1 C. assur.) mais SANS sanction pénale pour les personnes physiques bâtissant pour leur propre usage. En pratique, son absence rend la revente du bien quasi-impossible avant 10 ans (refus systématique de la banque pour l'acquéreur). Pour un investissement locatif ou une vente : OBLIGATOIRE avec sanction pénale (75 000€ + 6 mois prison).",
        },
        {
          q: 'Quelle est la différence entre dommages-ouvrage et garantie décennale ?',
          a: "La DÉCENNALE est souscrite par L'ARTISAN qui réalise les travaux et couvre SA responsabilité. La DOMMAGES-OUVRAGE est souscrite par LE MAÎTRE D'OUVRAGE (particulier, promoteur) et lui permet d'être INDEMNISÉ RAPIDEMENT en cas de sinistre, sans attendre la décision de justice sur la responsabilité. Les deux sont complémentaires et toutes les deux obligatoires.",
        },
        {
          q: 'Combien coûte la dommages-ouvrage en 2026 ?',
          a: '2 à 5% du coût total HT des travaux. Pour une maison à 200 000€ HT : prime DO entre 5 000 et 10 000€ (versement unique à la signature). Pour un programme immobilier de 2,5M€ HT : 37 500 à 75 000€. Variables : zone sismique, terrain argileux, complexité architecturale, souscription tardive.',
        },
        {
          q: 'Quand souscrire la dommages-ouvrage : avant ou pendant les travaux ?',
          a: "OBLIGATOIREMENT AVANT l'ouverture du chantier (avant la déclaration d'ouverture en mairie pour les CMI). Souscription pendant les travaux : prime majorée de 10-30%, parfois refus de l'assureur. Souscription après réception : généralement refusée — la garantie démarrerait alors qu'un sinistre a peut-être déjà commencé à se former.",
        },
        {
          q: "La DO couvre-t-elle les sinistres dûs à un défaut d'entretien ?",
          a: "Non. La DO ne couvre QUE les sinistres relevant de la garantie décennale, c'est-à-dire les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination, dûs à un VICE DE CONSTRUCTION. Les sinistres dûs à un défaut d'entretien, à l'usure normale ou à un cas de force majeure (catastrophe naturelle, vandalisme) sont exclus.",
        },
        {
          q: 'Que se passe-t-il en cas de revente du bien avant 10 ans ?',
          a: "L'assurance DO est ATTACHÉE AU BIEN (et non à la personne) et se transmet automatiquement au nouvel acquéreur sans démarche particulière (art. L. 242-1 C. assur.). Le notaire vérifie systématiquement la souscription d'une DO en cours de validité avant tout acte de vente d'un bien de moins de 10 ans — son absence est un bloquant à la vente.",
        },
        {
          q: 'Existe-t-il un comparateur assurance dommages-ouvrage en ligne ?',
          a: 'Oui — notre cabinet propose un comparatif gratuit et neutre des 5 principaux assureurs DO (SMABTP, MAAF Pro, Generali Construction, AXA Construction, Groupama Bâtiment). Devis sous 24h ouvrées sur la base de votre dossier (descriptif des travaux + plans + DTU).',
        },
      ]}
    />
  )
}
