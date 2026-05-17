/**
 * Guide — Avocat spécialisé en assurance
 * KW Ahrefs : "avocat spécialisé en assurance" 200 vol KD 0 CPC 50€
 * Famille : "avocat en assurance" 150 vol, "avocat assurance" 300 vol
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides / avocat-specialise-assurance'
const TITLE = 'Avocat spécialisé en assurance — Comment trouver et choisir 2026'
const TAGLINE =
  'Le guide pour trouver et choisir un avocat spécialisé en droit des assurances : annuaire officiel, critères de choix, honoraires, alternatives gratuites.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Guide avocat spécialisé en assurance : trouver via avocat.fr (mention de spécialisation), critères de choix (barreau, expérience, honoraires), tarifs 200-450€ par heure. Alternatives gratuites : médiation + PJ Pro. Conseil ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Trouver un avocat spécialisé en droit des assurances est crucial pour gagner un litige avec votre assureur (refus indemnisation, sous-évaluation expertise, déchéance contestée, lenteur procédure). Cette page guide la recherche : annuaire officiel avocat.fr (filtrer par mention de spécialisation « droit des assurances »), critères de choix prioritaires (spécialité confirmée, barreau de proximité, expérience contre votre type d'assureur, honoraires transparents), procédure type d'engagement et alternatives moins coûteuses (médiateur de l'assurance gratuit, PJ Pro qui prend en charge les frais d'avocat, association de consommateurs)."
      legalReference="Loi Macron 2015 (convention d'honoraires obligatoire) + art. 750-1 CPC (médiation préalable)"
      isObligatoire={false}
      benefits={[
        {
          icon: '⚖️',
          title: 'Annuaire officiel avocat.fr',
          desc: 'Filtrer par mention de spécialisation « droit des assurances »',
        },
        {
          icon: '💰',
          title: 'Honoraires 200-450€ par heure',
          desc: 'Forfait possible sur dossiers complexes (1 500-5 000€ TTC)',
        },
        {
          icon: '📞',
          title: 'Alternative GRATUITE',
          desc: 'Médiation gratuite (mediation-assurance.org) résout 70% des litiges sans avocat',
        },
        {
          icon: '🛡️',
          title: 'PJ Pro = frais couverts',
          desc: "Si vous avez une PJ Pro : frais avocat pris en charge jusqu'à 30 000€ par litige",
        },
      ]}
      sections={[
        {
          h2: 'Comment trouver un avocat spécialisé en droit des assurances',
          body: (
            <>
              <ol>
                <li>
                  <strong>Annuaire officiel des avocats</strong> sur avocat.fr — filtrer par mention
                  de spécialisation « droit des assurances » (vérification au Conseil de
                  l&apos;Ordre)
                </li>
                <li>
                  <strong>Barreau de proximité</strong> : avocat du barreau où la procédure aura
                  lieu (siège social ou succursale de l&apos;assureur)
                </li>
                <li>
                  <strong>Expérience confirmée</strong> contre VOTRE type d&apos;assureur (MACSF,
                  SMABTP, MAAF, Generali, AXA — chaque assureur a des stratégies de défense connues)
                </li>
                <li>
                  <strong>Recommandations bouche-à-oreille</strong> de pairs ayant eu litiges
                  similaires (forums pros, associations sectorielles FFB ou CAPEB)
                </li>
                <li>
                  <strong>Avis Google + Trustpilot</strong> + vérification des affaires gagnées
                  récemment
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Honoraires types et alternatives',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Prestation</th>
                    <th className="border p-2 text-right">Coût indicatif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Consultation initiale (1h)</td>
                    <td className="border p-2 text-right">200 € – 450 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Mise en demeure assureur</td>
                    <td className="border p-2 text-right">500 € – 1 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Référé-expertise judiciaire</td>
                    <td className="border p-2 text-right">2 500 € – 5 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Action au fond (jugement 1re instance)</td>
                    <td className="border p-2 text-right">5 800 € – 18 000 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Convention d&apos;honoraires écrite OBLIGATOIRE</strong> depuis Loi Macron
                2015. Forfait recommandé sur dossiers complexes.
              </p>
            </>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <ul>
                <li>
                  <Link
                    href="/guides/avocat-litige-assurance"
                    className="text-primary-600 underline"
                  >
                    Guide litige assurance complet
                  </Link>{' '}
                  — quand engager un avocat, procédure type, alternatives
                </li>
                <li>
                  <Link
                    href="/protection-juridique-professionnelle"
                    className="text-primary-600 underline"
                  >
                    Protection juridique pro
                  </Link>{' '}
                  — couvre les frais avocat jusqu&apos;à 30 000€ par litige
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Comment trouver un avocat spécialisé en droit des assurances ?',
          a: "Via l'annuaire officiel avocat.fr — filtrer par mention de spécialisation « droit des assurances ». Privilégier un barreau de proximité (où l'assureur a son siège social) et une expérience confirmée contre votre type d'assureur. Notre cabinet ORIAS peut vous orienter vers 3-5 avocats partenaires spécialisés selon votre dossier.",
        },
        {
          q: 'Combien coûte un avocat spécialisé en assurance ?',
          a: "Consultation initiale : 200-450€. Mise en demeure : 500-1 200€. Référé-expertise : 2 500-5 800€. Action au fond : 5 800-18 000€. Convention d'honoraires écrite OBLIGATOIRE (Loi Macron 2015). Forfait recommandé sur dossiers complexes.",
        },
        {
          q: 'Faut-il obligatoirement un avocat ?',
          a: 'NON pour la médiation (mediation-assurance.org, gratuite, résout 70% des litiges). NON pour les petits litiges < 5 000€. OUI au-delà de 10 000€ devant le tribunal judiciaire (représentation par avocat OBLIGATOIRE depuis Loi Justice 2019).',
        },
        {
          q: 'PJ Pro couvre-t-elle les frais avocat ?',
          a: "OUI dans 100% des contrats PJ Pro standards : frais d'avocat couverts jusqu'à 30 000€ par litige (50-100k€ en formule étendue). Tarif PJ Pro : 280-1 800€ par an. ROI évident dès 1er litige. Voir <a href='/protection-juridique-professionnelle' class='text-primary-600 underline'>/protection-juridique-professionnelle</a>.",
        },
      ]}
    />
  )
}
