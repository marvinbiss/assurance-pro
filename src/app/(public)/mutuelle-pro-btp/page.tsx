/**
 * Pilier — Mutuelle pro BTP (le plus gros KW du marché : 16 000 vol/mois, KD 4)
 * Source data : Ahrefs 2026-04-29, kw_universe['pro btp mutuelle'] + kw-mutuelle_pro_BTP.json
 *
 * Stratégie : pilier vertical premium pour capter "pro btp mutuelle", "mutuelle pro btp",
 * "pro btp mutuelle tarif", "pro btp mutuelle mon compte", etc. (~30 000 vol cumulé sur la
 * famille de KW Pro BTP). Concurrent direct : pro.april.fr (DR 74) — sur ce KW spécifique
 * la marque PRO BTP n'a PAS de site dédié à cette requête, donc fenêtre d'opportunité.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'mutuelle-pro-btp'
const TITLE = 'Mutuelle pro BTP — Comparatif 2026, tarifs et garanties'
const TAGLINE = "La complémentaire santé dédiée aux artisans, salariés et dirigeants du BTP. Comparatif des principaux contrats, tarifs négociés et conseil ORIAS."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Mutuelle pro BTP : comparatif des contrats PRO BTP, April Pro, Harmonie BTP. Tarifs négociés à partir de 38€/mois (formule Madelin TNS). Couverture optique, dentaire, hospitalisation. Devis gratuit sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La mutuelle pro BTP est la complémentaire santé spécialisée pour les professionnels du Bâtiment et des Travaux Publics : artisans, conjoints collaborateurs, salariés et dirigeants. Elle couvre les frais médicaux non pris en charge par l'Assurance Maladie obligatoire (Sécurité sociale + régime des artisans), avec des garanties calibrées sur la sinistralité spécifique au secteur (accidents du travail BTP fréquents, hospitalisation, optique, dentaire, médecines douces). Les contrats les plus connus sont PRO BTP (le régime historique de la branche), April Pro Santé, Harmonie Mutuelle BTP, Aon Santé Pro et MMA Mutuelle Pro."
      legalReference="Loi Madelin (art. 154 bis CGI) pour les TNS — déductibilité fiscale possible"
      isObligatoire={false}
      benefits={[
        { icon: '🏥', title: 'Hospitalisation', desc: 'Forfait journalier + chambre particulière + dépassements honoraires (jusqu\'à 400% BR)' },
        { icon: '🦷', title: 'Dentaire renforcé', desc: 'Implants, couronnes, orthodontie adulte. Forfait annuel jusqu\'à 1 800€/an' },
        { icon: '👓', title: 'Optique 100% santé +', desc: 'Verres complexes, lentilles, chirurgie réfractive. Forfait jusqu\'à 600€/2 ans' },
        { icon: '💼', title: 'Madelin déductible', desc: 'Pour les TNS (artisans, EI), cotisations déductibles du résultat imposable' },
      ]}
      sections={[
        {
          h2: 'Qu\'est-ce qu\'une mutuelle pro BTP et qui peut y souscrire ?',
          body: (
            <>
              <p>
                La <strong>mutuelle pro BTP</strong> est une complémentaire santé conçue
                pour répondre aux risques spécifiques du secteur Bâtiment et Travaux Publics.
                Elle peut être souscrite par :
              </p>
              <ul>
                <li>Les <strong>artisans BTP</strong> (maçons, plombiers, électriciens, couvreurs, peintres…) en TNS, EI, EURL, SASU</li>
                <li>Les <strong>conjoints collaborateurs</strong> du chef d&apos;entreprise BTP</li>
                <li>Les <strong>dirigeants assimilés salariés</strong> (gérants minoritaires de SARL, présidents de SAS)</li>
                <li>Les <strong>salariés du BTP</strong> via la complémentaire collective d&apos;entreprise (obligation employeur depuis 2016, ANI)</li>
                <li>Les <strong>auto-entrepreneurs</strong> du BTP (plus rare, formules light)</li>
              </ul>
              <p>
                Le principal opérateur historique est <strong>PRO BTP</strong> (Groupe paritaire
                de protection sociale du BTP — créé par les partenaires sociaux en 1993),
                qui couvre près de 3,4 millions de bénéficiaires en France et qui propose
                à la fois la mutuelle santé, la prévoyance et la retraite complémentaire.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une mutuelle pro BTP en 2026 ? Tarifs indicatifs',
          body: (
            <>
              <p>
                Les cotisations dépendent du profil (statut, âge, composition du foyer)
                et du niveau de garanties. Voici une fourchette indicative basée sur les
                grilles 2026 de nos 5 partenaires (PRO BTP, April Pro Santé, Harmonie BTP,
                Aon Santé Pro, MMA Mutuelle Pro) :
              </p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Profil</th>
                    <th className="border border-gray-300 p-2 text-left">Formule</th>
                    <th className="border border-gray-300 p-2 text-right">Cotisation mensuelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Artisan TNS solo, 35 ans</td><td className="border p-2">Madelin Confort</td><td className="border p-2 text-right">38 € – 62 €</td></tr>
                  <tr><td className="border p-2">Artisan TNS + conjoint, 40 ans</td><td className="border p-2">Madelin Confort</td><td className="border p-2 text-right">85 € – 130 €</td></tr>
                  <tr><td className="border p-2">Artisan TNS + 2 enfants, 42 ans</td><td className="border p-2">Madelin Premium</td><td className="border p-2 text-right">145 € – 210 €</td></tr>
                  <tr><td className="border p-2">Dirigeant SARL/SAS, 45 ans</td><td className="border p-2">Cadre Premium</td><td className="border p-2 text-right">95 € – 180 €</td></tr>
                  <tr><td className="border p-2">Salarié BTP (collectif obligatoire)</td><td className="border p-2">Selon accord branche</td><td className="border p-2 text-right">~50% pris en charge employeur</td></tr>
                </tbody>
              </table>
              <p className="text-xs italic text-gray-600 mt-2">
                Tarifs indicatifs hors sur-complémentaires (médecines douces, optique premium).
                Devis personnalisé recommandé via notre formulaire — gratuit, sans engagement,
                conseil ORIAS sous 24h.
              </p>
            </>
          ),
        },
        {
          h2: 'Loi Madelin : la déductibilité fiscale qui change tout pour les TNS',
          body: (
            <>
              <p>
                Si vous êtes <strong>Travailleur Non Salarié (TNS)</strong> — ce qui est le cas
                de la majorité des artisans BTP en EI, EURL ou gérant majoritaire de SARL —
                la <strong>Loi Madelin (article 154 bis du CGI)</strong> vous permet de
                déduire vos cotisations de mutuelle de votre bénéfice imposable.
              </p>
              <p>
                <strong>Plafond de déduction 2026</strong> :
                3,75% du PASS (1 626 €) + 7% du bénéfice imposable, dans la limite de 3% de
                8 PASS (10 405 €). Pour un artisan dégageant 60 k€ de bénéfice, le plafond
                Madelin santé tourne autour de <strong>5 826 €/an</strong>.
              </p>
              <p>
                Conditions cumulatives à respecter : être à jour de ses cotisations sociales
                obligatoires, le contrat doit être étiqueté « Madelin » par l&apos;assureur,
                et il doit obligatoirement couvrir le minimum « panier de soins » du décret 2014-1025.
              </p>
            </>
          ),
        },
        {
          h2: 'Comparatif des 5 mutuelles pro BTP les plus distribuées en 2026',
          body: (
            <>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Assureur</th>
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-left">Avantage clé</th>
                    <th className="border p-2 text-left">Limite à connaître</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2"><strong>PRO BTP</strong></td><td className="border p-2">Régime historique branche BTP</td><td className="border p-2">Réseau santé conventionné, prévoyance intégrée</td><td className="border p-2">Tarifs progressifs avec l&apos;âge, peu modulable</td></tr>
                  <tr><td className="border p-2"><strong>April Pro</strong></td><td className="border p-2">Multi-secteurs TNS</td><td className="border p-2">Modulaire à la carte, dématérialisation forte</td><td className="border p-2">Pas de spécialisation BTP profonde</td></tr>
                  <tr><td className="border p-2"><strong>Harmonie BTP</strong></td><td className="border p-2">Mutuelle santé seule</td><td className="border p-2">Tarifs compétitifs entrée de gamme</td><td className="border p-2">Pas de couplage prévoyance natif</td></tr>
                  <tr><td className="border p-2"><strong>Aon Santé Pro</strong></td><td className="border p-2">Cadres + dirigeants</td><td className="border p-2">Garanties haut de gamme, expat OK</td><td className="border p-2">Cotisations élevées</td></tr>
                  <tr><td className="border p-2"><strong>MMA Mutuelle Pro</strong></td><td className="border p-2">Multi-secteurs</td><td className="border p-2">Réseau agences physique fort</td><td className="border p-2">Délais remboursement 3-5 jours</td></tr>
                </tbody>
              </table>
              <p className="mt-3">
                Notre cabinet vous propose un comparatif gratuit et neutre de ces 5 contrats
                + 3 alternatives (Generali, MGEN Pro, Allianz Santé Pro) sur votre profil
                exact. Un courtier ORIAS vous rappelle sous 24h.
              </p>
            </>
          ),
        },
        {
          h2: 'Mutuelle pro BTP vs prévoyance pro BTP : ne pas confondre',
          body: (
            <>
              <p>
                Beaucoup d&apos;artisans BTP confondent ces deux contrats, qui sont pourtant
                complémentaires :
              </p>
              <ul>
                <li><strong>Mutuelle santé</strong> = remboursement des frais médicaux courants (consultations, médicaments, hospitalisation, optique, dentaire). Gère le QUOTIDIEN.</li>
                <li><strong>Prévoyance</strong> = versement d&apos;indemnités en cas d&apos;arrêt de travail (IJ), d&apos;invalidité (rente) ou de décès (capital). Gère les COUPS DURS.</li>
              </ul>
              <p>
                Pour un artisan BTP, la prévoyance est <strong>encore plus critique</strong>
                que la mutuelle, car le métier expose à des accidents corporels fréquents
                qui peuvent stopper net l&apos;activité et donc les revenus. La Loi Madelin
                couvre les deux types de cotisations dans le même plafond annuel.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle est la différence entre PRO BTP et une mutuelle BTP classique ?',
          a: "PRO BTP est un Groupe paritaire de protection sociale (GPS) créé par les partenaires sociaux du Bâtiment en 1993. Il couple mutuelle, prévoyance, retraite et action sociale en un seul opérateur. Les autres mutuelles BTP (April, Harmonie, Aon, MMA) sont des assureurs ou mutuelles classiques avec une offre dédiée au BTP — souvent plus modulables mais sans le volet retraite.",
        },
        {
          q: 'Combien coûte la mutuelle PRO BTP pour un artisan ?',
          a: "Pour un artisan TNS de 35 ans en formule Madelin Confort, la cotisation mensuelle PRO BTP démarre autour de 42 €. Elle augmente avec l'âge (~+1,5 %/an), la composition du foyer (+~50 € par adulte ajouté, +~25 € par enfant) et le niveau de garanties choisi (jusqu'à 130 € en formule Premium famille).",
        },
        {
          q: 'La mutuelle pro BTP est-elle obligatoire ?',
          a: "Pour les SALARIÉS du BTP, oui : depuis l'ANI 2013 et la loi de sécurisation de l'emploi (effet 1er janvier 2016), tout employeur du BTP doit proposer une complémentaire santé collective avec au moins 50 % de prise en charge. Pour les ARTISANS TNS et dirigeants, elle reste facultative — mais fortement recommandée car la Sécu seule rembourse mal sur l'optique, le dentaire et le dépassement d'honoraires.",
        },
        {
          q: 'Comment résilier sa mutuelle pro BTP ?',
          a: "Depuis la loi du 14 juillet 2019 (résiliation infra-annuelle), vous pouvez résilier votre mutuelle santé à tout moment après la 1re année d'engagement, sans frais ni motif. Lettre recommandée ou notification dans votre espace adhérent. Le nouvel assureur peut effectuer la résiliation pour vous (mandat).",
        },
        {
          q: 'Les indépendants peuvent-ils déduire fiscalement leur mutuelle BTP ?',
          a: "Oui, sous conditions : être TNS (EI, EURL, gérant majoritaire SARL), souscrire un contrat étiqueté Madelin, et être à jour des cotisations sociales obligatoires. Plafond 2026 : ~5 800 €/an pour 60 k€ de bénéfice. Les auto-entrepreneurs au régime micro-fiscal NE peuvent PAS déduire (ils sont sous le régime du versement forfaitaire libératoire).",
        },
        {
          q: 'Mutuelle famille ou contrat individuel pour un artisan BTP ?',
          a: "Si conjoint et enfants, le contrat famille est presque toujours plus avantageux que 2-3 contrats individuels (économie typique 15-25 %). Vérifiez toutefois que les garanties dentaires/optiques sont au niveau souhaité pour CHAQUE bénéficiaire, et que le contrat couvre bien les soins des enfants au-delà de 16 ans (prolongation jusqu'à 26 ans en cas d'études).",
        },
        {
          q: 'Combien de temps pour obtenir un devis mutuelle pro BTP ?',
          a: "Via notre formulaire, vous recevez un comparatif personnalisé sous 24h ouvrées avec 3 à 5 propositions adaptées à votre profil. La souscription effective prend ensuite 48-72h (signature électronique + transmission carte tiers payant). Effet du contrat possible dès le 1er du mois suivant.",
        },
      ]}
    />
  )
}
