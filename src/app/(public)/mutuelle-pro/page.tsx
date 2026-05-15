import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Mutuelle TNS / Pro Madelin — Comparez 8 mutuelles',
  description:
    'Comparez votre mutuelle santé pro auprès de 8 mutuelles. TNS, dirigeants, freelances. Loi Madelin déductible.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/mutuelle-pro`,
  },
  openGraph: {
    title: 'Mutuelle TNS / Pro Madelin — Comparez 8 mutuelles',
    description:
      'Comparez votre mutuelle santé pro auprès de 8 mutuelles. TNS, dirigeants, freelances. Loi Madelin déductible.',
    url: `${SITE_URL}/mutuelle-pro`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mutuelle TNS / Pro Madelin — Comparez 8 mutuelles',
    description:
      'Comparez votre mutuelle santé pro auprès de 8 mutuelles. TNS, dirigeants, freelances. Loi Madelin déductible.',
  },
}

export default function MutuelleProPage() {
  return (
    <PilierLayout
      slug="mutuelle-pro"
      title="Mutuelle TNS / Pro — Loi Madelin"
      tagline="Une couverture santé adaptée aux travailleurs non-salariés et dirigeants. Cotisations 100% déductibles fiscalement (Loi Madelin)."
      legalReference="Loi Madelin du 11 février 1994 — art. 154 bis CGI"
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_DEFAULT}
      intro="La mutuelle TNS (Travailleurs Non-Salariés) couvre les frais de santé non remboursés par la Sécurité sociale pour les indépendants, dirigeants, professions libérales et auto-entrepreneurs. Grâce à la Loi Madelin, vos cotisations sont entièrement déductibles de votre revenu imposable, ce qui réduit votre facture de 30 à 45% selon votre tranche d'imposition. Notre cabinet ORIAS compare 8 mutuelles partenaires pour trouver la couverture optimale au meilleur tarif."
      benefits={[
        { icon: '💸', title: 'Déductible Madelin', desc: "30-45% d'économies fiscales" },
        { icon: '👨‍⚕️', title: "Soins jusqu'à 400%", desc: 'Plafonds renforcés' },
        { icon: '👨‍👩‍👧', title: 'Famille incluse', desc: 'Conjoint + enfants' },
        { icon: '⚡', title: 'Sans questionnaire santé', desc: 'Acceptation immédiate' },
      ]}
      sections={[
        {
          h2: 'Qui peut souscrire une mutuelle TNS Madelin ?',
          body: (
            <ul>
              <li>Auto-entrepreneurs (micro-entrepreneurs)</li>
              <li>Entrepreneurs Individuels (EI), EURL en BIC/BNC</li>
              <li>Gérants majoritaires de SARL</li>
              <li>Présidents non rémunérés de SAS / SASU</li>
              <li>Professions libérales (médecins, avocats, consultants…)</li>
              <li>Conjoints collaborateurs</li>
            </ul>
          ),
        },
        {
          h2: 'Quels niveaux de couverture ?',
          body: (
            <table className="my-4 w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Poste</th>
                  <th className="border p-2 text-right">Essentiel</th>
                  <th className="border p-2 text-right">Confort</th>
                  <th className="border p-2 text-right">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Hospitalisation</td>
                  <td className="border p-2 text-right">100% BR</td>
                  <td className="border p-2 text-right">200% BR</td>
                  <td className="border p-2 text-right">400% BR</td>
                </tr>
                <tr>
                  <td className="border p-2">Dentaire</td>
                  <td className="border p-2 text-right">125%</td>
                  <td className="border p-2 text-right">250%</td>
                  <td className="border p-2 text-right">400%</td>
                </tr>
                <tr>
                  <td className="border p-2">Optique (équipement/2 ans)</td>
                  <td className="border p-2 text-right">100€</td>
                  <td className="border p-2 text-right">300€</td>
                  <td className="border p-2 text-right">600€</td>
                </tr>
                <tr>
                  <td className="border p-2">Médecines douces</td>
                  <td className="border p-2 text-right">—</td>
                  <td className="border p-2 text-right">200€/an</td>
                  <td className="border p-2 text-right">400€/an</td>
                </tr>
                <tr>
                  <td className="border p-2">Cotisation mensuelle (40 ans)</td>
                  <td className="border p-2 text-right">35-55€</td>
                  <td className="border p-2 text-right">70-110€</td>
                  <td className="border p-2 text-right">130-200€</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          h2: "Combien j'économise avec la Loi Madelin ?",
          body: (
            <>
              <p>Vos cotisations sont déductibles dans la limite annuelle de&nbsp;:</p>
              <ul>
                <li>
                  <strong>3,75% du PASS</strong> (1 743€ en 2026) + <strong>7% du PASS</strong> (3
                  254€) si bénéfice imposable, soit <strong>4 997€/an maximum</strong>
                </li>
              </ul>
              <p>
                <strong>Exemple chiffré</strong>&nbsp;: vous cotisez 1 800€/an pour votre mutuelle
                TNS. Avec un taux marginal d\'imposition (TMI) de 30%, vous économisez{' '}
                <strong>540€ d\'impôts</strong>. Votre coût réel net est donc de 1 260€/an, soit
                105€/mois.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Quelle différence entre mutuelle TNS et mutuelle d'entreprise ?",
          a: "La mutuelle d'entreprise (collective) est obligatoirement souscrite par l'employeur pour ses salariés (depuis 2016). La mutuelle TNS est une mutuelle INDIVIDUELLE pour les non-salariés (gérants majoritaires, EI, AE), avec déduction Madelin.",
        },
        {
          q: 'Auto-entrepreneur : Madelin est-il intéressant ?',
          a: 'Pour les AE en micro, la Loi Madelin n\'est PAS applicable car vous êtes au régime micro-fiscal (pas de bénéfice imposable). Mieux vaut une mutuelle "santé indépendant" non-Madelin, souvent moins chère.',
        },
        {
          q: 'Puis-je inclure ma famille ?',
          a: "Oui, la plupart des mutuelles TNS Madelin permettent d'inclure conjoint et enfants à charge. Les cotisations restent déductibles dans la limite Madelin (calculée par bénéficiaire dans certains contrats).",
        },
        {
          q: 'Délai de carence ?',
          a: 'Pour les soins courants : aucun délai de carence chez la plupart des mutuelles partenaires. Pour la maternité : 9-10 mois habituellement. Pour le dentaire prothèses : 3-6 mois.',
        },
        {
          q: 'Comment changer de mutuelle ?',
          a: 'Loi Hamon : vous pouvez résilier à tout moment après 1 an avec préavis 1 mois. Notre cabinet gère la résiliation et la nouvelle souscription en parallèle pour éviter toute interruption.',
        },
      ]}
    />
  )
}
