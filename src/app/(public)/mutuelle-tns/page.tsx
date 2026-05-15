/**
 * Pilier — Mutuelle TNS (1 400 vol/mois, KD 7)
 * Source data : Ahrefs 2026-04-29, kw_universe['mutuelle tns'] + vert-mutuelle_tns.json (258 KW)
 *
 * Cible : TNS (Travailleurs Non Salariés) — artisans, commerçants, pro libérales,
 * gérants majoritaires de SARL, EI, EURL, micro-entrepreneurs convertis en TNS.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'mutuelle-tns'
const TITLE = 'Mutuelle TNS — Loi Madelin 2026, comparatif et tarifs'
const TAGLINE =
  'La mutuelle santé déductible pour Travailleurs Non Salariés : artisans, commerçants, professions libérales, gérants majoritaires. Économies fiscales et conseil ORIAS.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    "Mutuelle TNS Loi Madelin : déduisez vos cotisations santé du résultat imposable (jusqu'à 5 800€/an). Comparatif April, MMA, Generali, Aon. Tarifs à partir de 32€/mois. Devis gratuit ORIAS sous 24h.",
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
      intro="La mutuelle TNS (Travailleur Non Salarié) est la complémentaire santé spécifiquement conçue pour les indépendants : artisans, commerçants, professions libérales, gérants majoritaires de SARL, entrepreneurs individuels et auto-entrepreneurs (sous conditions). Sa particularité fiscale majeure : les cotisations sont déductibles du bénéfice imposable au titre de la Loi Madelin (article 154 bis du CGI), ce qui peut représenter jusqu'à 5 800€/an d'économie fiscale pour un TNS dégageant 60 k€ de bénéfice. Cette page compare les principales mutuelles TNS distribuées en France (April Pro, MMA Pro, Generali Pro, Aon Santé Pro, Allianz Pro, Harmonie Mutuelle), détaille le mécanisme Madelin et liste les pièges à éviter."
      legalReference="Article 154 bis du CGI — Loi Madelin du 11 février 1994"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      benefits={[
        {
          icon: '💰',
          title: 'Madelin déductible',
          desc: "Jusqu'à 5 800€/an déduits du résultat (bénéfice 60k€). Économie d'impôt réelle",
        },
        {
          icon: '🩺',
          title: 'Garanties calibrées TNS',
          desc: 'Optique premium, dentaire, médecines douces, hospitalisation 100% à 400% BR',
        },
        {
          icon: '⚡',
          title: 'Tiers payant étendu',
          desc: "Pharmacie + spécialistes + hospitalisation. Pas d'avance de frais",
        },
        {
          icon: '🛡️',
          title: 'Couplable prévoyance',
          desc: 'Madelin couvre aussi IJ + invalidité + décès dans le même plafond fiscal',
        },
      ]}
      sections={[
        {
          h2: 'Qui est éligible à la mutuelle TNS Madelin ?',
          body: (
            <>
              <p>
                La mutuelle TNS éligible Madelin s&apos;adresse exclusivement aux travailleurs non
                salariés, à savoir :
              </p>
              <ul>
                <li>
                  <strong>Entrepreneurs individuels (EI)</strong> au régime réel d&apos;imposition
                </li>
                <li>
                  <strong>EURL</strong> dont le gérant est l&apos;associé unique
                </li>
                <li>
                  <strong>Gérants majoritaires de SARL</strong> (détention &gt; 50% des parts, seul
                  ou avec conjoint/enfants mineurs)
                </li>
                <li>
                  <strong>Associés de SNC</strong>
                </li>
                <li>
                  <strong>Professions libérales</strong> en BNC (avocats, médecins, kinés, ostéos,
                  consultants…)
                </li>
                <li>
                  <strong>Conjoints collaborateurs</strong> du chef d&apos;entreprise TNS
                </li>
              </ul>
              <p>
                <strong>Cas particulier auto-entrepreneur (micro-entrepreneur)</strong> : au régime
                micro-fiscal classique (versement libératoire), les cotisations Madelin NE sont PAS
                déductibles (le calcul de l&apos;impôt se fait directement sur le CA). Pour profiter
                de Madelin, il faut basculer au régime réel d&apos;imposition — opportunité à
                étudier dès que le bénéfice dépasse 30 k€/an.
              </p>
              <p>
                <strong>Hors champ</strong> : présidents et DG de SAS/SASU (assimilés salariés —
                relèvent du régime général + ANI), gérants minoritaires de SARL, salariés.
              </p>
            </>
          ),
        },
        {
          h2: 'Calcul du plafond Madelin santé en 2026',
          body: (
            <>
              <p>
                Le plafond annuel de déduction des cotisations Madelin santé est calculé ainsi :
              </p>
              <p className="my-3 border-l-4 border-primary-500 bg-gray-50 p-3">
                <strong>Plafond Madelin santé = 3,75% du PASS + 7% du bénéfice imposable</strong>,
                dans la limite de 3% de 8 PASS.
              </p>
              <p>Avec PASS 2026 = 47 100 € (estimé), cela donne :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Bénéfice imposable</th>
                    <th className="border p-2 text-right">Plafond Madelin santé annuel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">30 000 €</td>
                    <td className="border p-2 text-right">3 866 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">50 000 €</td>
                    <td className="border p-2 text-right">5 266 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">60 000 €</td>
                    <td className="border p-2 text-right">5 826 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">100 000 €</td>
                    <td className="border p-2 text-right">8 626 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">200 000 €</td>
                    <td className="border p-2 text-right">11 304 € (plafond 3% × 8 PASS)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Important : ce plafond est COMMUN à la santé ET à la prévoyance Madelin. Si vous
                cotisez 4 000€/an en prévoyance, il vous reste seulement (plafond − 4 000€) pour la
                santé.
              </p>
            </>
          ),
        },
        {
          h2: 'Comparatif des 6 mutuelles TNS les plus distribuées',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Assureur</th>
                    <th className="border p-2">Tarif entrée 35 ans</th>
                    <th className="border p-2">Atout</th>
                    <th className="border p-2">Limite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>April Pro Santé</strong>
                    </td>
                    <td className="border p-2">32–55 €/mois</td>
                    <td className="border p-2">Modulaire à la carte, app mobile complète</td>
                    <td className="border p-2">Garanties moyennes en formule de base</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>MMA Pro Santé</strong>
                    </td>
                    <td className="border p-2">38–62 €/mois</td>
                    <td className="border p-2">Réseau agences physique, conseiller dédié</td>
                    <td className="border p-2">Délais remboursement 3-5 j</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Generali TNS</strong>
                    </td>
                    <td className="border p-2">42–70 €/mois</td>
                    <td className="border p-2">Garanties optique/dentaire premium</td>
                    <td className="border p-2">Cotisation progresse vite avec l&apos;âge</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Aon Santé Pro</strong>
                    </td>
                    <td className="border p-2">52–95 €/mois</td>
                    <td className="border p-2">Cadres dirigeants, expat compatible</td>
                    <td className="border p-2">Très haut de gamme uniquement</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Allianz Pro</strong>
                    </td>
                    <td className="border p-2">36–58 €/mois</td>
                    <td className="border p-2">Bonne couverture hospitalisation</td>
                    <td className="border p-2">Médecines douces faibles</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Harmonie Mutuelle Pro</strong>
                    </td>
                    <td className="border p-2">35–60 €/mois</td>
                    <td className="border p-2">Mutualiste, pas d&apos;actionnaire à rémunérer</td>
                    <td className="border p-2">Process moins digitalisé</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Les 5 erreurs à éviter avec sa mutuelle TNS Madelin',
          body: (
            <>
              <ol>
                <li>
                  <strong>Sous-estimer la prévoyance</strong> au profit de la santé : pour un
                  indépendant, un arrêt de travail = revenus à zéro. La prévoyance est plus
                  critique. Privilégier 60% santé / 40% prévoyance dans le plafond Madelin.
                </li>
                <li>
                  <strong>Oublier de vérifier le label « Madelin »</strong> sur le contrat : sans ce
                  label précis, pas de déduction fiscale. À demander explicitement à
                  l&apos;assureur.
                </li>
                <li>
                  <strong>Ne pas être à jour des cotisations URSSAF</strong> : c&apos;est une
                  condition cumulative pour bénéficier de Madelin. Un retard URSSAF = redressement
                  fiscal sur les cotisations Madelin déduites.
                </li>
                <li>
                  <strong>Sur-cotiser au-delà du plafond</strong> : la fraction au-delà du plafond
                  Madelin n&apos;est PAS déductible (mais reste valable au titre de la mutuelle).
                  Calibrer ses cotisations chaque année selon son bénéfice prévisionnel.
                </li>
                <li>
                  <strong>Garder PRO BTP par défaut</strong> alors qu&apos;on est TNS hors BTP : PRO
                  BTP est calibré pour le secteur Bâtiment. Un consultant ou un médecin paie souvent
                  moins ailleurs pour des garanties supérieures.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle est la meilleure mutuelle TNS en 2026 ?',
          a: "Il n'existe pas de « meilleure » mutuelle TNS dans l'absolu — le choix dépend de votre profil (âge, composition foyer, secteur, niveau de garanties souhaité). Pour un artisan BTP : PRO BTP. Pour un consultant ou freelance digital : April Pro ou Allianz. Pour un dirigeant haut de gamme : Aon. Notre comparatif gratuit vous donne les 3-5 meilleures options sur VOTRE profil exact.",
        },
        {
          q: 'Combien puis-je déduire de mes impôts avec Madelin santé ?',
          a: "Plafond annuel = 3,75% du PASS (1 766€ en 2026) + 7% de votre bénéfice imposable. Pour un bénéfice de 60 k€, cela fait environ 5 826€/an déductibles, partagés entre santé et prévoyance Madelin. Économie d'impôt nette ≈ 1 750€/an pour un TNS au TMI 30%.",
        },
        {
          q: 'Auto-entrepreneur, puis-je avoir une mutuelle Madelin ?',
          a: "Pas en régime micro-fiscal classique (versement libératoire) — les cotisations Madelin ne sont alors PAS déductibles. Pour bénéficier de Madelin, il faut basculer au régime réel d'imposition (option à activer auprès du SIE). Démarche pertinente dès que votre bénéfice dépasse ~30 k€/an car l'économie fiscale Madelin couvre alors largement le coût additionnel comptable.",
        },
        {
          q: 'Mutuelle TNS ou contrat collectif salarié ? Si je suis dirigeant assimilé salarié.',
          a: "Si vous êtes président ou DG de SAS/SASU, vous êtes assimilé salarié — donc le contrat collectif d'entreprise (avec prise en charge employeur ≥ 50%) est généralement plus avantageux fiscalement et économiquement qu'un contrat TNS individuel Madelin. Pour les gérants majoritaires de SARL ou EI : le TNS Madelin reste la voie standard.",
        },
        {
          q: 'Puis-je résilier ma mutuelle TNS à tout moment ?',
          a: "Depuis la loi du 14 juillet 2019, oui : résiliation infra-annuelle possible après 1 an d'engagement, sans frais, sans motif, par lettre recommandée ou notification dans l'espace adhérent. Le nouvel assureur peut faire la démarche pour vous (mandat). Effet : 1er du mois suivant la réception de la résiliation par l'ancien assureur.",
        },
        {
          q: "Mes cotisations Madelin santé augmentent-elles avec l'âge ?",
          a: "Oui, généralement : ~+1 à +2 %/an chez la plupart des assureurs. Cette progression suit l'évolution moyenne des dépenses de santé par tranche d'âge (statistiques ACPR). Pour limiter cet effet, privilégier les contrats à « tarif lissé » ou les mutualistes (qui mutualisent davantage le risque entre les âges).",
        },
        {
          q: 'Quel délai pour souscrire une mutuelle TNS ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées. Comparatif de 5 contrats avec tarifs et garanties détaillées. Souscription électronique : 48-72h. Effet du contrat : 1er du mois suivant. Carte de tiers payant transmise sous 5 jours ouvrés. Aucune avance de frais à prévoir si tiers payant intégral activé.',
        },
      ]}
    />
  )
}
