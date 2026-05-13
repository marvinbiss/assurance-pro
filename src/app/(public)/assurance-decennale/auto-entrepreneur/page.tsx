/**
 * Pilier — Décennale auto-entrepreneur (800 vol/mois, KD 11)
 * Source data : Ahrefs 2026-04-29, kw_universe['assurance décennale auto entrepreneur'] +
 * KW connexes : 'tarif assurance décennale auto entrepreneur' (200), 'devis assurance
 * décennale auto entrepreneur' (100, CPC 1000€), 'décennale auto entrepreneur' (500).
 *
 * Concurrent direct : pro.april.fr/guide/garantie-decennale-auto-entrepreneur — 238 vis/mois.
 *
 * Note routing : route statique prioritaire sur /assurance-decennale/[slug] dynamique.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-decennale/auto-entrepreneur'
const TITLE = 'Assurance décennale auto-entrepreneur — Tarifs 2026 et obligation Loi Spinetta'
const TAGLINE =
  'La décennale obligatoire pour micro-entrepreneurs et auto-entrepreneurs du BTP. Tarifs négociés à partir de 480 €/an, attestation 24h, conseil ORIAS spécialisé artisans.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance décennale auto-entrepreneur BTP : obligatoire (Loi Spinetta), tarifs négociés à partir de 480 €/an, attestation immédiate. 8 assureurs comparés (Hiscox, April, MMA, AXA Pro, SMABTP, Wakam, Stello, Generali). Devis gratuit ORIAS sous 24h.',
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
      intro="L'assurance décennale est légalement obligatoire pour TOUS les auto-entrepreneurs et micro-entrepreneurs du BTP, sans exception : maçons, plombiers, électriciens, peintres, couvreurs, carreleurs, menuisiers, charpentiers, etc. Imposée par la Loi Spinetta du 4 janvier 1978 (article L. 241-1 du Code des assurances), elle couvre pendant 10 ans à compter de la réception des travaux les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination. Le défaut d'assurance est sanctionné par 75 000 € d'amende, 6 mois d'emprisonnement et l'interdiction d'exercer (art. L. 243-3 C. assur.). Cette page détaille les tarifs 2026 par métier, les pièges à éviter (sous-estimation du CA, exclusion d'activités) et compare 8 assureurs partenaires spécialisés artisans."
      legalReference="Loi Spinetta — Article L. 241-1 du Code des assurances + Article 1792 du Code civil"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation légale',
          desc: "Loi Spinetta 1978. Sanctions : 75 000€ + 6 mois prison + interdiction d'exercer",
        },
        {
          icon: '💰',
          title: 'À partir de 480 €/an',
          desc: 'AE BTP plomberie, électricité, peinture. Maçonnerie/couverture : 700-1 200€/an',
        },
        {
          icon: '⚡',
          title: 'Attestation 24h',
          desc: 'Téléchargeable sous 24h. Mention obligatoire devis et factures depuis 2024',
        },
        {
          icon: '🏗️',
          title: 'Spécialiste BTP',
          desc: '8 assureurs comparés (Hiscox, April, MMA, AXA Pro, SMABTP, Wakam, Stello, Generali)',
        },
      ]}
      sections={[
        {
          h2: "Décennale auto-entrepreneur : qui est concerné par l'obligation Loi Spinetta ?",
          body: (
            <>
              <p>
                <strong>Tous les auto-entrepreneurs réalisant des travaux de construction</strong>
                susceptibles d&apos;affecter la solidité de l&apos;ouvrage ou de le rendre impropre
                à sa destination sont concernés. Liste non exhaustive :
              </p>
              <ul>
                <li>Maçons (gros œuvre + finition)</li>
                <li>
                  Plombiers / chauffagistes (canalisations encastrées, chauffe-eau, chauffage
                  central)
                </li>
                <li>Électriciens (tableau électrique, courant fort)</li>
                <li>Couvreurs / zingueurs / étancheurs</li>
                <li>Peintres en bâtiment (façades extérieures, peintures techniques)</li>
                <li>Carreleurs (sols + murs salles d&apos;eau)</li>
                <li>Menuisiers extérieurs (portes, fenêtres, vérandas)</li>
                <li>Charpentiers (bois, métallique)</li>
                <li>Plaquistes / plâtriers (cloisons sèches)</li>
                <li>Installateurs photovoltaïque / pompe à chaleur (RGE)</li>
                <li>Désamianteurs SS3/SS4</li>
                <li>Pisciniers</li>
                <li>
                  Maîtres d&apos;œuvre / architectes / BET (responsabilité décennale du concepteur)
                </li>
              </ul>
              <p>
                Les activités de pure prestation intellectuelle BTP (économiste de la construction,
                géomètre-expert dans certaines missions) peuvent être exclues — vérifiez avec votre
                courtier.
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs décennale auto-entrepreneur 2026 par métier',
          body: (
            <>
              <p>
                Fourchettes 2026 pour un auto-entrepreneur sans antécédent sinistre, CA &lt; 50 k€,
                exerçant en France métropolitaine. Basées sur les barèmes 2026 de nos 8 assureurs
                partenaires :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Métier</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                    <th className="border p-2 text-left">Sinistralité AQC 2024</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Plombier</td>
                    <td className="border p-2 text-right">540 € – 980 €</td>
                    <td className="border p-2">7,2 % (dégâts eaux encastrés)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Électricien</td>
                    <td className="border p-2 text-right">490 € – 880 €</td>
                    <td className="border p-2">5,8 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Peintre</td>
                    <td className="border p-2 text-right">480 € – 760 €</td>
                    <td className="border p-2">3,1 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Carreleur</td>
                    <td className="border p-2 text-right">560 € – 920 €</td>
                    <td className="border p-2">6,5 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Menuisier extérieur</td>
                    <td className="border p-2 text-right">580 € – 1 020 €</td>
                    <td className="border p-2">7,8 % (étanchéité)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Maçon</td>
                    <td className="border p-2 text-right">720 € – 1 380 €</td>
                    <td className="border p-2">11,4 % (fissures structurelles)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Couvreur-zingueur</td>
                    <td className="border p-2 text-right">820 € – 1 540 €</td>
                    <td className="border p-2">13,2 % (étanchéité toiture)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Charpentier bois</td>
                    <td className="border p-2 text-right">680 € – 1 240 €</td>
                    <td className="border p-2">8,6 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Plaquiste / plâtrier</td>
                    <td className="border p-2 text-right">510 € – 820 €</td>
                    <td className="border p-2">3,8 %</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Installateur photovoltaïque (RGE)</td>
                    <td className="border p-2 text-right">880 € – 1 680 €</td>
                    <td className="border p-2">9,2 % (dommages électriques)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Sources : AQC SYCODÉS 2024 + barèmes 2026 Hiscox / April Pro / SMABTP / MMA / AXA
                Pro / Wakam / Stello / Generali. Tarifs majorés en cas d&apos;antécédent sinistre
                (+30 à +80 % la 1re année).
              </p>
            </>
          ),
        },
        {
          h2: 'Comment souscrire une décennale auto-entrepreneur en 24h',
          body: (
            <>
              <p>Procédure standard avec notre cabinet ORIAS :</p>
              <ol>
                <li>
                  <strong>Formulaire de devis en ligne</strong> (5 minutes) — métier(s), CA
                  prévisionnel, ancienneté, antécédents, RGE
                </li>
                <li>
                  <strong>Comparatif personnalisé</strong> envoyé par mail sous 24h ouvrées — 3 à 5
                  propositions adaptées
                </li>
                <li>
                  <strong>Signature électronique</strong> du contrat retenu (DocuSign) — 5 minutes
                </li>
                <li>
                  <strong>Paiement de la 1re cotisation</strong> (CB ou virement) — effet immédiat
                </li>
                <li>
                  <strong>Attestation décennale téléchargeable</strong> dans les 24h suivant le
                  paiement
                </li>
                <li>
                  <strong>Carte de tiers payant déclaratif</strong> envoyée par mail dans les 5
                  jours
                </li>
              </ol>
              <p>
                Pour les chantiers urgents (réception sous 7 jours), nous proposons un parcours «
                Express 6h » avec attestation provisoire le jour même (surcoût 80 € HT, inclus dans
                certaines formules pack BTP).
              </p>
            </>
          ),
        },
        {
          h2: 'Les 5 erreurs à éviter à la souscription',
          body: (
            <>
              <ol>
                <li>
                  <strong>Sous-déclarer son CA prévisionnel</strong> pour économiser sur la prime :
                  règle proportionnelle appliquée en cas de sinistre. Mieux vaut déclarer un peu
                  haut et ajuster en N+1.
                </li>
                <li>
                  <strong>Oublier de mentionner les activités secondaires</strong> (plombier qui
                  fait aussi un peu d&apos;électricité = 2 garanties à activer, sinon exclusion).
                </li>
                <li>
                  <strong>Souscrire sans la garantie « rétroactivité »</strong> : critique si vous
                  avez exercé quelques mois sans assurance avant souscription.
                </li>
                <li>
                  <strong>Ne pas activer la « garantie subséquente »</strong> à la cessation
                  d&apos;activité : sans elle, vous restez personnellement responsable des dommages
                  décennaux pendant 10 ans après vos derniers travaux.
                </li>
                <li>
                  <strong>Confondre décennale et RC Pro travaux</strong> : ce sont 2 garanties
                  distinctes mais souvent regroupées dans un « pack BTP ». La décennale couvre 10
                  ans après réception ; la RC Pro couvre pendant le chantier.
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance décennale est-elle obligatoire pour un auto-entrepreneur du BTP ?",
          a: "Oui, sans exception. Loi Spinetta du 4 janvier 1978 — article L. 241-1 du Code des assurances. Le statut juridique (AE, EI, EURL, SARL, SAS) ne dispense pas de l'obligation. Sanctions : 75 000 € d'amende + 6 mois d'emprisonnement + interdiction d'exercer (art. L. 243-3 C. assur.).",
        },
        {
          q: 'Combien coûte la décennale pour un auto-entrepreneur en 2026 ?',
          a: 'Démarre à 480 €/an pour un peintre AE sans antécédent. Médiane : 640-820 €/an pour un plombier ou électricien. Plafond pratique : 1 540 €/an pour un couvreur-zingueur AE. Tarif fonction du métier (sinistralité AQC), du CA prévisionnel, des antécédents et du label RGE éventuel.',
        },
        {
          q: 'Comment obtenir une attestation décennale en 24h ?',
          a: "Devis via formulaire (5 min) → comparatif sous 24h → signature électronique → paiement 1re cotisation → attestation téléchargeable dans les 24h suivantes. Procédure « Express 6h » disponible pour chantiers urgents (surcoût 80€ HT). Mention obligatoire de l'assureur + n° police sur tous vos devis et factures depuis le décret 2024.",
        },
        {
          q: 'Que se passe-t-il à la cessation de mon auto-entreprise ?',
          a: 'Vous devez activer la « garantie subséquente » qui maintient la décennale pendant 10 ans après la fin de votre activité (durée légale de la garantie). Sans elle, votre patrimoine personnel reste exposé en cas de sinistre tardif. Coût : ~50 à 200€/an selon métier (vs 540-1 540€ pour le contrat actif).',
        },
        {
          q: "Puis-je changer d'assureur décennale en cours de chantier ?",
          a: "Oui depuis la loi Hamon, après 1 an d'engagement. Mais ATTENTION : il y a un risque de discontinuité de couverture si le nouvel assureur n'inclut pas la « reprise du passé » (rétroactivité). À vérifier IMPÉRATIVEMENT avant de résilier l'ancien contrat. Notre cabinet gère cette transition pour vous.",
        },
        {
          q: 'La décennale couvre-t-elle les dommages causés à mes outils ou à mon véhicule pro ?',
          a: "Non. La décennale ne couvre QUE les dommages causés à l'OUVRAGE LIVRÉ pendant 10 ans. Pour vos outils, il faut une garantie « bris de machines » ou « tous risques outillage ». Pour votre véhicule pro, une assurance auto pro (souvent groupée dans un pack BTP).",
        },
        {
          q: 'Auto-entrepreneur RGE photovoltaïque : la décennale est-elle plus chère ?',
          a: "Oui, +40 à +90% vs un électricien classique. Tarif 2026 : 880 à 1 680 €/an. Raison : sinistralité AQC élevée (9,2 %) sur les installations PV — incendies dus aux onduleurs, défauts d'étanchéité de toiture, malfaçons sur les fixations. Garantie obligatoire pour conserver la qualification RGE et bénéficier de la prime à l'autoconsommation.",
        },
      ]}
    />
  )
}
