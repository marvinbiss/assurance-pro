/**
 * Guide — Franchise assurance pro (Couche B transversal)
 * KW Ahrefs : "franchise assurance pro" + "franchise rc pro" + "franchise décennale" → 200+ vol/m cumul
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/franchise-assurance-pro'
const TITLE = 'Franchise assurance pro 2026 — Comment bien la choisir ?'
const TAGLINE =
  "La franchise assurance pro : montant à votre charge en cas de sinistre. Choisir 300€ vs 5 000€ peut faire varier votre cotisation de 30%. Stratégie d'optimisation."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Franchise assurance pro 2026 : guide complet pour bien choisir sa franchise (RC Pro, décennale, multirisque). Impact tarifaire jusqu'à -30%. 4 paliers standard 300€/750€/1500€/3000€/5000€. Stratégie selon profil sinistralité.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La franchise en assurance professionnelle est le montant qui RESTE À VOTRE CHARGE en cas de sinistre, déduit de l'indemnité versée par l'assureur. Plus la franchise est élevée, plus votre cotisation annuelle baisse (jusqu'à -30%). Plus elle est basse, plus vous êtes protégé en cas de petit sinistre mais plus vous payez de cotisation. Cette page détaille les 5 paliers standard du marché (300€/750€/1500€/3000€/5000€), leur impact tarifaire et la stratégie d'optimisation selon votre profil de sinistralité (artisan/commerçant/profession libérale)."
      legalReference="Art. L. 113-1 C. assur. (clauses contractuelles d'assurance)"
      isObligatoire={false}
      benefits={[
        {
          icon: '💰',
          title: 'Impact tarifaire ±30%',
          desc: 'Franchise 5000€ = -30% cotisation vs 300€. Économie réelle 200-2 000€/an selon contrat',
        },
        {
          icon: '⚖️',
          title: '5 paliers standard marché',
          desc: '300€ (sur-prime) / 750€ / 1500€ (standard) / 3000€ (rabais) / 5000€ (rabais maximum)',
        },
        {
          icon: '🎯',
          title: 'Stratégie selon profil',
          desc: 'Artisan AE faible CA : franchise basse. PME forte capacité auto-assurance : franchise élevée',
        },
        {
          icon: '🔍',
          title: 'Variable selon garantie',
          desc: 'Franchise différente possible par garantie (RC ≠ dommages aux biens ≠ perte exploitation)',
        },
      ]}
      sections={[
        {
          h2: 'Les 5 paliers standard du marché 2026',
          body: (
            <div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border p-2 text-left">Franchise</th>
                    <th className="border p-2 text-left">Coef tarif</th>
                    <th className="border p-2 text-left">Profil idéal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>300 €</strong>
                    </td>
                    <td className="border p-2">×1,15 (sur-prime)</td>
                    <td className="border p-2">
                      AE solo activité à forte sinistralité (BTP couvreur, plombier)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>750 €</strong>
                    </td>
                    <td className="border p-2">×1,05</td>
                    <td className="border p-2">AE/EI activité standard</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>1 500 €</strong>
                    </td>
                    <td className="border p-2">×1,00 (référence)</td>
                    <td className="border p-2">EI/EURL/SARL standard — choix par défaut marché</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>3 000 €</strong>
                    </td>
                    <td className="border p-2">×0,92 (rabais)</td>
                    <td className="border p-2">
                      SARL/SAS avec trésorerie — peut absorber petits sinistres
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>5 000 €</strong>
                    </td>
                    <td className="border p-2">×0,85 (rabais maximum)</td>
                    <td className="border p-2">
                      PME/ETI 50+ salariés — forte capacité auto-assurance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          h2: "Stratégie d'optimisation selon profil",
          body: (
            <div>
              <h3 className="mb-2 font-bold">Profil 1 : AE solo CA &lt;50k€</h3>
              <p className="text-sm">
                Franchise <strong>750€</strong>. Économie cotisation marginale (-50€/an), mais
                protection préservée pour petits sinistres fréquents (chute outils, dégât matériel
                client). À éviter : franchise 3 000€+ qui pourrait vous mettre en difficulté de
                trésorerie.
              </p>
              <h3 className="mb-2 mt-4 font-bold">Profil 2 : EURL/SARL CA 100-300k€</h3>
              <p className="text-sm">
                Franchise <strong>1 500€</strong> (standard) OU <strong>3 000€</strong> si
                trésorerie &gt;6 mois charges. Économie 200-450€/an avec franchise 3000€ =
                équivalent 2 mois cotisation économisée.
              </p>
              <h3 className="mb-2 mt-4 font-bold">Profil 3 : SARL/SAS 5-20 salariés</h3>
              <p className="text-sm">
                Franchise <strong>3 000€</strong>. Économie significative (~500-1500€/an) avec
                capacité d&apos;absorber petits sinistres sur fonds propres. Pour grands sinistres
                (&gt;3 000€), l&apos;assurance prend le relais sans question.
              </p>
              <h3 className="mb-2 mt-4 font-bold">Profil 4 : PME 50+ salariés</h3>
              <p className="text-sm">
                Franchise <strong>5 000€</strong> ou plus (parfois jusqu&apos;à 25 000€ négociable).
                Stratégie d&apos;auto-assurance partielle : payer en cash les sinistres &lt;5 000€ +
                assurer uniquement les sinistres majeurs. Économie cotisation 2 000-8 000€/an.
              </p>
            </div>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <ul>
              <li>
                <a href="/outils/calculateur-tarif-rc-pro" className="text-primary-600 underline">
                  Calculateur RC Pro avec sélection franchise
                </a>
              </li>
              <li>
                <a
                  href="/outils/calculateur-tarif-decennale"
                  className="text-primary-600 underline"
                >
                  Calculateur décennale avec franchise
                </a>
              </li>
              <li>
                <a
                  href="/guides/quelle-assurance-professionnelle-choisir"
                  className="text-primary-600 underline"
                >
                  Quelle assurance professionnelle choisir ?
                </a>
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Franchise élevée = mauvaise idée ?',
          a: "Pas du tout, c'est même souvent la bonne stratégie pour PME avec trésorerie. La franchise 3 000-5 000€ économise 8-15% de cotisation chaque année. Si vous n'avez pas de petits sinistres, vous économisez. Si vous avez 1 sinistre &gt;5 000€ tous les 5 ans, vous payez 5 000€ × 1 = 5 000€ vs 200-450€ × 5 ans = 1 000-2 250€ économisés en cotisations. Calcul ROI à faire selon votre historique.",
        },
        {
          q: 'Franchise différente par garantie : possible ?',
          a: "OUI sur la plupart des contrats RC Pro/multirisque. Exemple typique : franchise 750€ sur RC dommages corporels (rare mais coûteux), 1 500€ sur dommages matériels (fréquent), 5 000€ sur perte d'exploitation (rare et lourd). Notre cabinet ORIAS calibre ces 3 franchises au cas par cas pour optimiser tarif/protection.",
        },
        {
          q: 'Franchise nulle (zéro) : ça existe ?',
          a: 'TRÈS RARE et toujours déconseillé. Sur-prime de +30 à +50%. Justifié uniquement pour : médecins libéraux haute responsabilité (sinistres systématiquement &gt;100k€), avocats fiscalistes affaires (idem). Pour 99% des autres profils : franchise 750-1 500€ minimum est l&apos;optimum tarif/protection.',
        },
        {
          q: 'Puis-je négocier la franchise après souscription ?',
          a: "OUI à chaque échéance annuelle (anniversaire contrat). Demande écrite à l'assureur ou via votre courtier. Modification effective au prochain renouvellement. Notre cabinet ORIAS révise systématiquement les franchises de ses clients chaque année pour optimiser selon évolution profil (CA, salariés, sinistralité).",
        },
      ]}
    />
  )
}
