/**
 * Guide juridique — Garantie de parfait achèvement (GPA)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "garantie de parfait achèvement et garantie décennale" → 10 vol KD -
 * - "dommages ouvrage et gpa" → 30 vol
 * - Volume direct faible (< 50/mois sur le KW principal)
 *
 * MAIS — concurrent benchmark (competitor_pages) confirme un potentiel ÉNORME :
 * - pro.april.fr/guide/tout-comprendre-garantie-parfait-achevement → 1 052 vis/mois
 *
 * Mécanique : la GPA est une garantie de 1 an post-réception, distincte de la
 * décennale (10 ans). Confusion fréquente — d'où le trafic concurrent malgré
 * un vol direct faible (concentration de long-tail "qu'est-ce que", "comment",
 * "différence avec décennale", "exemple lettre", "modèle PV").
 *
 * Stratégie : guide éducationnel exhaustif pour capter cette longue traîne.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'guides / parfait-achevement'
const TITLE = 'Garantie de parfait achèvement (GPA) — 1 an, mécanisme, différence décennale'
const TAGLINE =
  "La GPA oblige l'entrepreneur à réparer pendant 1 an tous les désordres signalés à la réception / apparus dans l'année. Guide complet 2026 : déclenchement, exemples, recours."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Garantie de parfait achèvement (GPA) : tout savoir sur cette garantie de 1 an post-réception (art. 1792-6 C. civ.). Désordres couverts, procédure de mise en œuvre, recours en cas de refus de l'artisan, différence avec la décennale.",
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
      intro="La garantie de parfait achèvement (GPA) est une obligation légale qui pèse sur l'entrepreneur de bâtiment pendant 1 an à compter de la réception des travaux. Régie par l'article 1792-6 du Code civil, elle l'oblige à réparer à ses frais TOUS les désordres signalés par le maître d'ouvrage : ceux mentionnés dans les réserves du procès-verbal de réception, et ceux apparus dans l'année qui suit. Contrairement à la garantie décennale (10 ans, dommages structurels) et à la garantie biennale (2 ans, équipements dissociables), la GPA couvre TOUS les désordres sans condition de gravité. C'est la garantie « petits travaux mal finis » : peinture qui s'écaille, joint mal posé, porte qui frotte, prise mal scellée. Cette page détaille son champ d'application, la procédure de mise en œuvre par lettre recommandée, les recours en cas de refus de l'artisan, et clarifie sa relation avec les autres garanties Loi Spinetta."
      legalReference="Article 1792-6 du Code civil + Loi du 4 janvier 1978 (Spinetta)"
      isObligatoire={true}
      benefits={[
        {
          icon: '📅',
          title: '1 an post-réception',
          desc: 'Couvre tous désordres signalés à la réception OU apparus dans les 12 mois suivants',
        },
        {
          icon: '🔧',
          title: 'Tous types de désordres',
          desc: 'Pas de condition de gravité — peinture, finitions, joints, malfaçons mineures incluses',
        },
        {
          icon: '👷',
          title: "Pèse sur l'entrepreneur",
          desc: "Obligation directe de l'artisan, pas une assurance — il doit réparer à ses frais",
        },
        {
          icon: '📜',
          title: 'Article 1792-6 C. civ.',
          desc: 'Cumul possible avec décennale, biennale, dommages-ouvrage et RC pro',
        },
      ]}
      sections={[
        {
          h2: "Qu'est-ce que la garantie de parfait achèvement (GPA) ?",
          body: (
            <>
              <p>
                La GPA est une <strong>obligation légale automatique</strong> qui pèse sur
                l&apos;entrepreneur de bâtiment dès la réception des travaux. Elle ne nécessite
                aucune souscription d&apos;assurance — c&apos;est l&apos;artisan lui-même qui doit
                réparer à ses frais, dans le délai d&apos;un an, tous les désordres qui lui sont
                signalés par le maître d&apos;ouvrage.
              </p>
              <p>
                <strong>Désordres couverts par la GPA</strong> :
              </p>
              <ol>
                <li>
                  Tous les désordres <strong>mentionnés dans les réserves</strong> du procès-verbal
                  de réception (signées le jour de la livraison)
                </li>
                <li>
                  Tous les désordres <strong>apparus dans l&apos;année</strong> suivant la
                  réception, signalés par lettre recommandée AR
                </li>
              </ol>
              <p>
                <strong>Pas de condition de gravité</strong> — contrairement à la décennale qui
                exige une atteinte à la solidité de l&apos;ouvrage. La GPA couvre la peinture qui
                s&apos;écaille, le joint mal posé, la porte qui frotte, la prise mal scellée, le
                carrelage avec un défaut visuel, etc.
              </p>
              <p>
                <strong>Pas de condition de cause</strong> — l&apos;artisan doit réparer même si le
                désordre n&apos;est pas dû à sa faute. Il pourra ensuite se retourner contre le
                sous-traitant ou le fournisseur, mais c&apos;est lui qui doit avancer la réparation
                envers le maître d&apos;ouvrage.
              </p>
            </>
          ),
        },
        {
          h2: 'GPA vs décennale vs biennale vs dommages-ouvrage : les 4 garanties Loi Spinetta',
          body: (
            <>
              <p>
                Le système français de garanties post-construction comporte 4 régimes distincts,
                souvent confondus :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Durée</th>
                    <th className="border p-2 text-left">Couvre quoi</th>
                    <th className="border p-2 text-left">Article</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>GPA</strong> (parfait achèvement)
                    </td>
                    <td className="border p-2">1 an</td>
                    <td className="border p-2">
                      TOUS désordres signalés (sans condition gravité ni cause)
                    </td>
                    <td className="border p-2">1792-6 C. civ.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Biennale</strong> (bon fonctionnement)
                    </td>
                    <td className="border p-2">2 ans</td>
                    <td className="border p-2">
                      Éléments d&apos;équipement DISSOCIABLES (chauffage, volets, portes,
                      robinetterie)
                    </td>
                    <td className="border p-2">1792-3 C. civ.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Décennale</strong>
                    </td>
                    <td className="border p-2">10 ans</td>
                    <td className="border p-2">
                      Dommages compromettant SOLIDITÉ ou rendant l&apos;ouvrage impropre à sa
                      destination
                    </td>
                    <td className="border p-2">1792, 1792-2 C. civ.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Dommages-ouvrage (DO)</strong>
                    </td>
                    <td className="border p-2">10 ans</td>
                    <td className="border p-2">
                      Pré-financement des sinistres décennaux pour le maître d&apos;ouvrage
                    </td>
                    <td className="border p-2">L. 242-1 C. assur.</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>En pratique</strong> : un volet roulant qui ne fonctionne plus 18 mois après
                réception relève de la <strong>biennale</strong>. Une fissure structurelle qui
                apparaît 4 ans après relève de la <strong>décennale</strong>. Une peinture qui
                s&apos;écaille 6 mois après relève de la <strong>GPA</strong>.
              </p>
            </>
          ),
        },
        {
          h2: 'Procédure de mise en œuvre : lettre type GPA',
          body: (
            <>
              <p>La procédure standard pour activer la GPA :</p>
              <ol>
                <li>
                  <strong>Constater le désordre</strong> et le documenter (photos datées, vidéo,
                  témoignages)
                </li>
                <li>
                  <strong>Lettre recommandée AR à l&apos;entrepreneur</strong> dans le délai de 1 an
                  post-réception, mentionnant :
                  <ul>
                    <li>Référence du contrat — devis — facture initial</li>
                    <li>Date de réception des travaux + référence du PV</li>
                    <li>Description précise du désordre + photos</li>
                    <li>Mise en demeure de procéder à la réparation sous 30 jours</li>
                    <li>Référence à l&apos;article 1792-6 du Code civil</li>
                    <li>Réserve d&apos;ester en justice à défaut</li>
                  </ul>
                </li>
                <li>
                  <strong>Délai de 30 jours</strong> à l&apos;entrepreneur pour proposer une
                  intervention
                </li>
                <li>
                  <strong>En cas de refus ou d&apos;absence de réponse</strong> : assignation devant
                  le tribunal judiciaire (anciennement TI ou TGI selon montant) — le maître
                  d&apos;ouvrage peut faire exécuter les travaux par un autre artisan aux frais de
                  l&apos;entrepreneur défaillant
                </li>
              </ol>
              <p className="my-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Conseil</strong> : envoyer la lettre AVANT le 11e mois pour vous laisser une
                marge si l&apos;entrepreneur tarde. Le délai de 1 an est un délai de FORCLUSION
                strict — au-delà, vous perdez vos droits GPA (mais conservez décennale et biennale
                selon la nature du désordre).
              </p>
            </>
          ),
        },
        {
          h2: "Que faire si l'entrepreneur refuse la réparation GPA ?",
          body: (
            <>
              <p>3 voies de recours, à activer par ordre de gradation :</p>
              <h3>1. Médiation amiable (préalable obligatoire en justice civile)</h3>
              <p>
                Saisir le médiateur de la consommation BTP (gratuit, délai 90 jours). Le médiateur
                tente une conciliation entre les parties. En cas d&apos;échec, rapport de médiation
                joint au dossier judiciaire.
              </p>
              <h3>2. Référé-expertise judiciaire</h3>
              <p>
                Demander au juge des référés du tribunal judiciaire la nomination d&apos;un expert
                judiciaire. Coût : 1 500-3 000€ d&apos;avance pour le maître d&apos;ouvrage,
                récupérables auprès de l&apos;entrepreneur si le désordre est constaté. Délai : 4-8
                mois.
              </p>
              <h3>3. Action au fond + faire exécuter par un autre artisan</h3>
              <p>
                Si l&apos;entrepreneur refuse explicitement la réparation, le maître d&apos;ouvrage
                peut, après mise en demeure restée sans suite, faire réaliser les travaux par un
                autre artisan et demander remboursement à l&apos;entrepreneur défaillant (théorie du
                quasi-contrat de l&apos;article 1303 C. civ.). Risqué financièrement — à valider
                avec un avocat.
              </p>
            </>
          ),
        },
        {
          h2: "Cas particulier : entrepreneur en liquidation judiciaire avant l'expiration de la GPA",
          body: (
            <>
              <p>
                Si l&apos;entrepreneur fait faillite avant d&apos;avoir réparé un désordre couvert
                par la GPA :
              </p>
              <ul>
                <li>
                  <strong>Déclaration de créance</strong> auprès du mandataire judiciaire dans les 2
                  mois suivant la publication au BODACC (sinon créance éteinte)
                </li>
                <li>
                  <strong>Recours contre l&apos;assurance RC pro</strong> de l&apos;artisan : la RC
                  pro travaux couvre les dommages causés au maître d&apos;ouvrage pendant le
                  chantier — vérifier si le désordre relève de cette garantie
                </li>
                <li>
                  <strong>Pour les désordres de nature décennale</strong> : recours direct contre
                  l&apos;assureur décennal de l&apos;artisan (subrogation possible via DO du maître
                  d&apos;ouvrage)
                </li>
                <li>
                  <strong>Pour les désordres GPA pure</strong> (non décennaux) : risque réel de
                  non-récupération si pas de RC pro travaux/si l&apos;assurance refuse
                </li>
              </ul>
              <p>
                <strong>Prévention</strong> : exiger AVANT le démarrage du chantier
                l&apos;attestation décennale ET l&apos;attestation RC pro travaux de l&apos;artisan.
                C&apos;est ce qui sécurise vos recours en cas de défaillance.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle est la durée de la garantie de parfait achèvement (GPA) ?',
          a: "1 an à compter de la réception des travaux. C'est un délai de forclusion strict (art. 1792-6 C. civ.) — au-delà, vous perdez vos droits GPA mais conservez la garantie biennale (2 ans pour équipements dissociables) et décennale (10 ans pour dommages structurels).",
        },
        {
          q: 'Quels désordres sont couverts par la GPA ?',
          a: "TOUS les désordres signalés à la réception (réserves dans le PV) ET tous les désordres apparus dans l'année suivante. Pas de condition de gravité ni de cause — contrairement à la décennale qui exige une atteinte à la solidité. Exemples : peinture qui s'écaille, joint défectueux, porte qui frotte, prise mal scellée, carrelage avec défaut visuel.",
        },
        {
          q: 'GPA et garantie décennale : quelle différence ?',
          a: "GPA = 1 an, TOUS désordres (sans condition de gravité), régie par l'art. 1792-6 C. civ. Décennale = 10 ans, dommages compromettant la SOLIDITÉ de l'ouvrage ou le rendant IMPROPRE à sa destination, régie par les art. 1792 et 1792-2 C. civ. Les deux peuvent se cumuler — un désordre grave apparu 6 mois après réception relève à la fois de la GPA ET de la décennale.",
        },
        {
          q: "L'entrepreneur refuse de réparer un désordre GPA, que faire ?",
          a: "1) Lettre recommandée AR de mise en demeure (30 jours pour réagir). 2) Saisine du médiateur consommation BTP (gratuit, 90 jours). 3) Si échec : référé-expertise judiciaire (1 500-3 000€ d'avance) puis action au fond. Possibilité de faire exécuter par un autre artisan aux frais du défaillant (art. 1303 C. civ.) — à valider avec avocat.",
        },
        {
          q: "La GPA s'applique-t-elle aussi aux travaux de rénovation ?",
          a: "Oui, dès lors que les travaux sont soumis à réception. La rénovation lourde (gros œuvre, second œuvre, équipements) est concernée. Les travaux d'entretien courant (peinture rafraîchissement, petite plomberie sans changement d'équipement) ne donnent généralement pas lieu à réception au sens de la Loi Spinetta — la GPA ne s'y applique pas alors.",
        },
        {
          q: "L'entrepreneur doit-il être assuré pour la GPA ?",
          a: "Non — la GPA est une obligation LÉGALE de l'entrepreneur, pas une assurance. C'est lui qui doit réparer à ses frais, sans intermédiation d'une compagnie. La RC pro travaux peut couvrir certains désordres GPA si l'artisan a souscrit une telle garantie, mais ce n'est pas obligatoire — d'où l'importance de vérifier la solidité financière de l'artisan AVANT le chantier.",
        },
        {
          q: 'Modèle de lettre GPA gratuit ?',
          a: "Notre cabinet met à disposition un modèle de lettre recommandée AR conforme à l'article 1792-6 C. civ., téléchargeable gratuitement (à venir). En attendant, contactez-nous pour assistance — nos courtiers ORIAS accompagnent gratuitement nos clients dans la rédaction de mise en demeure GPA.",
        },
      ]}
    />
  )
}
