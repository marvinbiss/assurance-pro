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
import {
  COMPARATIF_SERVICES,
  EXPERT_DEFAULT,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'mutuelle-pro-btp'
const TITLE = 'Mutuelle pro BTP — Comparatif 2026, tarifs et garanties'
const TAGLINE =
  'La complémentaire santé dédiée aux artisans, salariés et dirigeants du BTP. Comparatif des principaux contrats, tarifs négociés et conseil ORIAS.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Mutuelle pro BTP : comparatif des contrats PRO BTP, April Pro, Harmonie BTP. Tarifs négociés à partir de 38€ par mois (formule Madelin TNS). Couverture optique, dentaire, hospitalisation. Devis gratuit sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
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
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🏥',
          title: 'Hospitalisation',
          desc: "Forfait journalier + chambre particulière + dépassements honoraires (jusqu'à 400% BR)",
        },
        {
          icon: '🦷',
          title: 'Dentaire renforcé',
          desc: "Implants, couronnes, orthodontie adulte. Forfait annuel jusqu'à 1 800€ par an",
        },
        {
          icon: '👓',
          title: 'Optique 100% santé +',
          desc: "Verres complexes, lentilles, chirurgie réfractive. Forfait jusqu'à 600€ par 2 ans",
        },
        {
          icon: '💼',
          title: 'Madelin déductible',
          desc: 'Pour les TNS (artisans, EI), cotisations déductibles du résultat imposable',
        },
      ]}
      sections={[
        {
          h2: "Qu'est-ce qu'une mutuelle pro BTP et qui peut y souscrire ?",
          body: (
            <>
              <p>
                La <strong>mutuelle pro BTP</strong> est une complémentaire santé conçue pour
                répondre aux risques spécifiques du secteur Bâtiment et Travaux Publics. Elle peut
                être souscrite par :
              </p>
              <ul>
                <li>
                  Les <strong>artisans BTP</strong> (maçons, plombiers, électriciens, couvreurs,
                  peintres…) en TNS, EI, EURL, SASU
                </li>
                <li>
                  Les <strong>conjoints collaborateurs</strong> du chef d&apos;entreprise BTP
                </li>
                <li>
                  Les <strong>dirigeants assimilés salariés</strong> (gérants minoritaires de SARL,
                  présidents de SAS)
                </li>
                <li>
                  Les <strong>salariés du BTP</strong> via la complémentaire collective
                  d&apos;entreprise (obligation employeur depuis 2016, ANI)
                </li>
                <li>
                  Les <strong>auto-entrepreneurs</strong> du BTP (plus rare, formules light)
                </li>
              </ul>
              <p>
                Le principal opérateur historique est <strong>PRO BTP</strong> (Groupe paritaire de
                protection sociale du BTP — créé par les partenaires sociaux en 1993), qui couvre
                près de 3,4 millions de bénéficiaires en France et qui propose à la fois la mutuelle
                santé, la prévoyance et la retraite complémentaire.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une mutuelle pro BTP en 2026 ? Tarifs indicatifs',
          body: (
            <>
              <p>
                Les cotisations dépendent du profil (statut, âge, composition du foyer) et du niveau
                de garanties. Voici une fourchette indicative basée sur les grilles 2026 de nos 5
                partenaires (PRO BTP, April Pro Santé, Harmonie BTP, Aon Santé Pro, MMA Mutuelle
                Pro) :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border border-sand-300 p-2 text-left">Profil</th>
                    <th className="border border-sand-300 p-2 text-left">Formule</th>
                    <th className="border border-sand-300 p-2 text-right">Cotisation mensuelle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Artisan TNS solo, 35 ans</td>
                    <td className="border p-2">Madelin Confort</td>
                    <td className="border p-2 text-right">38 € – 62 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan TNS + conjoint, 40 ans</td>
                    <td className="border p-2">Madelin Confort</td>
                    <td className="border p-2 text-right">85 € – 130 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan TNS + 2 enfants, 42 ans</td>
                    <td className="border p-2">Madelin Premium</td>
                    <td className="border p-2 text-right">145 € – 210 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Dirigeant SARL ou SAS, 45 ans</td>
                    <td className="border p-2">Cadre Premium</td>
                    <td className="border p-2 text-right">95 € – 180 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Salarié BTP (collectif obligatoire)</td>
                    <td className="border p-2">Selon accord branche</td>
                    <td className="border p-2 text-right">~50% pris en charge employeur</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-charcoal-600">
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
                Si vous êtes <strong>Travailleur Non Salarié (TNS)</strong> — ce qui est le cas de
                la majorité des artisans BTP en EI, EURL ou gérant majoritaire de SARL — la{' '}
                <strong>Loi Madelin (article 154 bis du CGI)</strong> vous permet de déduire vos
                cotisations de mutuelle de votre bénéfice imposable.
              </p>
              <p>
                <strong>Plafond de déduction 2026</strong> : 3,75% du PASS (1 626 €) + 7% du
                bénéfice imposable, dans la limite de 3% de 8 PASS (10 405 €). Pour un artisan
                dégageant 60 k€ de bénéfice, le plafond Madelin santé tourne autour de{' '}
                <strong>5 826 € par an</strong>.
              </p>
              <p>
                Conditions cumulatives à respecter : être à jour de ses cotisations sociales
                obligatoires, le contrat doit être étiqueté « Madelin » par l&apos;assureur, et il
                doit obligatoirement couvrir le minimum « panier de soins » du décret 2014-1025.
              </p>
            </>
          ),
        },
        {
          h2: 'Comparatif des 5 mutuelles pro BTP les plus distribuées en 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Assureur</th>
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-left">Avantage clé</th>
                    <th className="border p-2 text-left">Limite à connaître</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>PRO BTP</strong>
                    </td>
                    <td className="border p-2">Régime historique branche BTP</td>
                    <td className="border p-2">Réseau santé conventionné, prévoyance intégrée</td>
                    <td className="border p-2">
                      Tarifs progressifs avec l&apos;âge, peu modulable
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>April Pro</strong>
                    </td>
                    <td className="border p-2">Multi-secteurs TNS</td>
                    <td className="border p-2">Modulaire à la carte, dématérialisation forte</td>
                    <td className="border p-2">Pas de spécialisation BTP profonde</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Harmonie BTP</strong>
                    </td>
                    <td className="border p-2">Mutuelle santé seule</td>
                    <td className="border p-2">Tarifs compétitifs entrée de gamme</td>
                    <td className="border p-2">Pas de couplage prévoyance natif</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Aon Santé Pro</strong>
                    </td>
                    <td className="border p-2">Cadres + dirigeants</td>
                    <td className="border p-2">Garanties haut de gamme, expat OK</td>
                    <td className="border p-2">Cotisations élevées</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MMA Mutuelle Pro</strong>
                    </td>
                    <td className="border p-2">Multi-secteurs</td>
                    <td className="border p-2">Réseau agences physique fort</td>
                    <td className="border p-2">Délais remboursement 3-5 jours</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                Notre cabinet vous propose un comparatif gratuit et neutre de ces 5 contrats + 3
                alternatives (Generali, MGEN Pro, Allianz Santé Pro) sur votre profil exact. Un
                courtier ORIAS vous rappelle sous 24h.
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
                <li>
                  <strong>Mutuelle santé</strong> = remboursement des frais médicaux courants
                  (consultations, médicaments, hospitalisation, optique, dentaire). Gère le
                  QUOTIDIEN.
                </li>
                <li>
                  <strong>Prévoyance</strong> = versement d&apos;indemnités en cas d&apos;arrêt de
                  travail (IJ), d&apos;invalidité (rente) ou de décès (capital). Gère les COUPS
                  DURS.
                </li>
              </ul>
              <p>
                Pour un artisan BTP, la prévoyance est <strong>encore plus critique</strong>
                que la mutuelle, car le métier expose à des accidents corporels fréquents qui
                peuvent stopper net l&apos;activité et donc les revenus. La Loi Madelin couvre les
                deux types de cotisations dans le même plafond annuel.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Que se passe-t-il pour ma santé si je n'ai pas de mutuelle BTP ?",
          a: "La Sécu rembourse mal le BTP : 70% des frais médicaux courants, mais quasi rien sur l'optique (lunettes ~30 € par 2 ans), le dentaire (1 prothèse = 800-1500 € à votre charge), les dépassements d'honoraires. Une hospitalisation = 1 200-3 000 € de reste à charge sans mutuelle.",
        },
        {
          q: 'La mutuelle BTP est-elle obligatoire pour un artisan TNS ?',
          a: 'Non. La mutuelle est obligatoire UNIQUEMENT pour les salariés du BTP (ANI 2013, effet 1er janvier 2016 — employeur prend en charge 50% minimum). Pour les artisans TNS, dirigeants, conjoints collaborateurs : facultative, mais fortement recommandée vu les coups durs du métier (accidents, hospitalisation).',
        },
        {
          q: 'Que se passe-t-il si je ne mets pas de complémentaire pour mes salariés BTP ?',
          a: 'URSSAF + Inspection du travail peuvent vous sanctionner : amende administrative + rappel des cotisations sur 3 ans + redressement Convention Collective. La loi ANI impose une couverture minimum (panier de soins décret 2014-1025) avec 50% pris en charge employeur, sous peine de redressement social.',
        },
        {
          q: "Suis-je obligé de prendre PRO BTP en tant qu'artisan du Bâtiment ?",
          a: "Non. PRO BTP est l'opérateur historique de la branche mais aucune obligation légale ne vous y rattache. Vous pouvez choisir April Pro Santé, Harmonie BTP, Aon Santé Pro, MMA Mutuelle Pro, Allianz Santé Pro ou Generali — selon vos garanties et votre budget. Notre cabinet compare 8 offres pour vous.",
        },
        {
          q: 'Suis-je couvert dès le 1er jour/y a-t-il des délais de carence ?',
          a: "Oui pour les soins courants (consultations, pharmacie, hospitalisation urgente) : couverture immédiate dès la date d'effet du contrat. Délais de carence classiques : 3 mois sur optique, 6 mois sur dentaire prothétique, 9-12 mois sur orthodontie adulte. À négocier ou contourner via le 1er du mois suivant.",
        },
        {
          q: 'Mes enfants sont-ils couverts par ma mutuelle pro BTP ?',
          a: "Oui en formule famille jusqu'à 21 ans automatiquement, prolongeable jusqu'à 26 ans si étudiant ou apprenti. Vérifier les plafonds enfants (orthodontie souvent plafonnée à 1 000-2 000 € par an, parfois inférieure aux besoins réels). Ajout d'un enfant = ~25 € par mois supplémentaires en moyenne.",
        },
        {
          q: 'Suis-je couvert pour les médecines douces (ostéo, kiné, acupuncture) ?',
          a: 'Oui en formule Confort ou Premium : forfait annuel 150-400 € par an pour ostéopathie, chiropractie, étiopathie, acupuncture. Les artisans BTP ont souvent un fort besoin (TMS lombaires, épaules) — vérifier le nombre de séances remboursées (4 à 8 par an) et le montant par séance (30-50 €).',
        },
        {
          q: 'Mon conjoint collaborateur peut-il être ajouté à ma mutuelle Madelin ?',
          a: "Oui s'il a le statut officiel de « conjoint collaborateur » (immatriculé au RCS ou CMA). Sa cotisation est aussi déductible en Madelin si elle figure sur le contrat à votre nom. Ajout = +50 à +95 € par mois selon âge et formule. Vérifier que ses soins sont rattachés à son propre n° de Sécu.",
        },
        {
          q: 'Combien ça coûte vraiment une mutuelle BTP en 2026 ?',
          a: "Artisan TNS solo 35 ans en formule Confort Madelin : 38-62 € par mois. Famille (artisan + conjoint + 2 enfants) : 145-210 € par mois. Dirigeant SARL ou SAS 45 ans Cadre Premium : 95-180 € par mois. Salarié BTP en collectif : ~50% pris en charge employeur. Tarifs progressifs avec l'âge (~+1,5% par an).",
        },
        {
          q: 'Mon assureur peut-il augmenter ma cotisation chaque année ?',
          a: "Oui, légalement. Hausses fréquentes : +3 à +8% par an liées à l'inflation médicale, l'âge (+1,5% par an), et l'évolution du régime obligatoire. L'assureur doit vous notifier l'augmentation par écrit 2 mois avant échéance. Vous pouvez résilier dans les 30 jours suivant la notification sans frais.",
        },
        {
          q: 'Puis-je résilier ma mutuelle BTP à tout moment ?',
          a: "Oui : depuis la loi du 14 juillet 2019 (résiliation infra-annuelle), résiliation possible à tout moment après 1 an d'engagement, sans frais ni motif. Lettre recommandée / notification dans votre espace adhérent. Mieux : le nouvel assureur peut résilier pour vous (mandat de résiliation).",
        },
        {
          q: 'Puis-je déduire ma mutuelle BTP de mes impôts (Loi Madelin) ?',
          a: 'Oui si TNS (EI, EURL, gérant majoritaire SARL) + contrat étiqueté « Madelin » + à jour des cotisations sociales obligatoires. Plafond 2026 : 3,75% du PASS (1 626 €) + 7% du bénéfice imposable, dans la limite de 3% de 8 PASS (10 405 €). Auto-entrepreneur au micro-fiscal : NON déductible.',
        },
        {
          q: 'Combien de temps pour recevoir mon devis mutuelle BTP ?',
          a: 'Via notre formulaire : comparatif personnalisé sous 24h ouvrées avec 3-5 propositions adaptées à votre profil (PRO BTP, April Pro, Harmonie BTP, Aon, MMA). Souscription effective ensuite : 48-72h (signature électronique + transmission carte tiers payant). Effet possible dès le 1er du mois suivant.',
        },
        {
          q: "Combien de temps pour être remboursé d'une dépense de santé ?",
          a: 'Avec la carte tiers payant : 0 € à avancer chez 95% des médecins, pharmaciens, opticiens. Sans tiers payant : remboursement assureur sous 3-7 jours après réception de la facture (PRO BTP, Harmonie : 3-5 jours en moyenne). Optique ou dentaire avec devis préalable : ~10-15 jours.',
        },
        {
          q: 'Quelle différence entre PRO BTP et une mutuelle BTP classique ?',
          a: 'PRO BTP est un Groupe paritaire de protection sociale (GPS) créé par les partenaires sociaux du Bâtiment en 1993. Couple mutuelle + prévoyance + retraite + action sociale en un seul opérateur. Les autres (April, Harmonie, Aon, MMA) sont assureurs / mutuelles classiques avec offre dédiée BTP — plus modulables mais sans volet retraite intégré.',
        },
        {
          q: 'Faut-il prendre mutuelle + prévoyance ou seulement la mutuelle ?',
          a: 'Les deux, sans hésiter. La mutuelle gère le quotidien (frais médicaux), la prévoyance gère les coups durs (arrêt de travail, invalidité, décès). Pour un artisan BTP : prévoyance est ENCORE plus critique que la mutuelle (accidents fréquents). La Loi Madelin couvre les deux dans le même plafond annuel.',
        },
        {
          q: "Suis-je couvert pour l'hospitalisation et la chambre particulière ?",
          a: "Oui en formule Confort ou Premium : forfait journalier hospitalier intégralement remboursé (20 € par jour), chambre particulière 60-90 € par jour, dépassements honoraires médecins (signataires OPTAM) jusqu'à 300-400% BR. Vérifier le plafond annuel hospi (souvent illimité en Premium, plafonné en Confort).",
        },
        {
          q: 'Que faire si mon employeur BTP ne propose pas de mutuelle collective ?',
          a: "Mettre l'employeur en demeure par lettre recommandée de respecter l'ANI 2013. Sans suite sous 30 jours : saisir l'Inspection du travail et ou ou le Conseil de Prud'hommes. Pendant ce temps, souscrire une mutuelle individuelle Madelin de notre cabinet — le remboursement employeur sera rétroactif.",
        },
      ]}
    />
  )
}
