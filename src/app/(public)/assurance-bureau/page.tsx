/**
 * Pilier — Assurance bureau (TPE/PME, coworking, indépendants)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance bureau"            → 250 vol, KD 0, CPC 700€ ⭐
 * - "assurance bureau professionnel" → 350 vol, KD 0, CPC 600€
 * - Famille cumulée : ~600 vol/mois
 *
 * Concurrent benchmark (competitor_pages) :
 * - Aucun résultat dans le top 10 des concurrents trackés sur ce KW
 * - Marché 100% vacant — opportunité maximale
 *
 * Stratégie : pilier dédié au format de local le plus standard (bureau) — distinct
 * de /assurance-local-commercial qui cible les commerces avec stock/clientèle.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-bureau'
const TITLE = 'Assurance bureau professionnel — Multirisque TPE/PME 2026'
const TAGLINE =
  "L'assurance multirisque pour bureaux professionnels : TPE, PME, coworking, indépendants. Couverture incendie, vol, dégâts des eaux, RC exploitation, perte d'exploitation. À partir de 220 €/an."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Assurance bureau professionnel : multirisque TPE/PME (incendie, vol, dégâts eaux, RC exploitation), équipement informatique, perte d'exploitation. Tarifs négociés à partir de 220 €/an. Devis gratuit ORIAS sous 24h.",
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
      intro="L'assurance bureau professionnel est une multirisque pro adaptée au format de local le plus répandu pour les TPE, PME, indépendants en local séparé, agences (web, communication, immobilière), cabinets (avocats, comptables, conseil) et espaces de coworking. Elle couvre les principaux risques pour un local sans clientèle reçue de masse ni stock significatif : incendie, vol, dégâts des eaux, événements climatiques, bris de glace, ainsi que l'équipement informatique (postes de travail, serveurs, écrans, périphériques) qui représente souvent l'essentiel de la valeur du contenu. Les tarifs 2026 démarrent à 220 € HT/an pour un bureau indépendant de 30 m² jusqu'à 1 200 € HT/an pour un cabinet de 200 m² avec serveur informatique. Distincte de l'assurance local commercial (qui cible les commerces avec vitrine et stock) et de la multirisque pro générique (qui couvre tous secteurs sans spécialisation), l'assurance bureau optimise la prime pour ce profil de risque modéré."
      legalReference="Article 1733 du Code civil (bail commercial) + clauses standard MRP bureaux"
      isObligatoire={true}
      benefits={[
        {
          icon: '💼',
          title: 'Multirisque bureau',
          desc: 'Incendie, dégâts eaux, vol, vandalisme, événements climatiques, bris glace',
        },
        {
          icon: '💻',
          title: 'Équipement informatique',
          desc: 'Couverture poste travail, serveur, écran, imprimante. Garantie « tous risques » optionnelle',
        },
        {
          icon: '💰',
          title: 'À partir de 220 €/an',
          desc: 'Bureau 30 m² indépendant, couverture standard. Optimisé pour profil risque modéré',
        },
        {
          icon: '🏢',
          title: 'Coworking compatible',
          desc: 'Contrats spécifiques pour résidents permanents en espace partagé (clause partage local)',
        },
      ]}
      sections={[
        {
          h2: "Pourquoi un bureau pro a-t-il besoin d'une assurance dédiée ?",
          body: (
            <>
              <p>Trois raisons principales :</p>
              <ol>
                <li>
                  <strong>Obligation contractuelle du bail commercial</strong> : 100% des baux
                  signés en France imposent au locataire de souscrire une assurance multirisque
                  couvrant a minima incendie, dégâts des eaux, vol, RC. Défaut d&apos;assurance =
                  motif de résiliation du bail (art. 1733 C. civ.).
                </li>
                <li>
                  <strong>Protection de l&apos;équipement informatique</strong> : pour la majorité
                  des activités tertiaires (consulting, agence web, cabinet comptable, freelance),
                  l&apos;équipement informatique représente 60-90% de la valeur du contenu — un
                  bureau de 5 personnes a typiquement 25-40 k€ de matériel IT (postes, écrans 4K,
                  serveur NAS, imprimantes, mobilier, serveurs).
                </li>
                <li>
                  <strong>Responsabilité civile vis-à-vis des visiteurs</strong> : client qui se
                  blesse en venant à un RDV, livreur qui glisse dans le hall, visite de
                  fournisseurs. La RC exploitation incluse dans l&apos;assurance bureau couvre ces
                  risques.
                </li>
              </ol>
              <p>
                Pour les <strong>indépendants en télétravail à domicile</strong>, la situation est
                différente : l&apos;assurance habitation classique ne couvre PAS le matériel pro ni
                la RC professionnelle. Il faut souscrire soit une « extension activité pro à
                domicile » sur l&apos;habitation, soit une assurance bureau dédiée pour le local pro
                situé chez vous.
              </p>
            </>
          ),
        },
        {
          h2: "Combien coûte l'assurance d'un bureau professionnel en 2026 ?",
          body: (
            <>
              <p>
                Tarifs indicatifs 2026 basés sur les barèmes de nos 8 partenaires (Allianz Pro, AXA
                Pro, MMA Pro, MAAF Pro, Generali, Hiscox, April Pro, Wakam) :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Surface / capacité</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Indépendant en bureau séparé (province)</td>
                    <td className="border p-2 text-right">25 m² / 1 personne</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">TPE conseil / consulting</td>
                    <td className="border p-2 text-right">50 m² / 3 personnes</td>
                    <td className="border p-2 text-right">320 € – 540 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Agence web / communication</td>
                    <td className="border p-2 text-right">80 m² / 6 personnes</td>
                    <td className="border p-2 text-right">480 € – 780 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Cabinet d&apos;expertise comptable</td>
                    <td className="border p-2 text-right">120 m² / 8 personnes</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 15 collaborateurs avec serveur on-premise</td>
                    <td className="border p-2 text-right">200 m²</td>
                    <td className="border p-2 text-right">980 € – 1 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Espace coworking (résident permanent)</td>
                    <td className="border p-2 text-right">poste fixe</td>
                    <td className="border p-2 text-right">180 € – 320 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Bureau Paris zone tertiaire (Défense, La Défense)
                    </td>
                    <td className="border p-2 text-right">100 m²</td>
                    <td className="border p-2 text-right">820 € – 1 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Bureau à domicile (extension habitation)</td>
                    <td className="border p-2 text-right">N/A</td>
                    <td className="border p-2 text-right">
                      120 € – 240 € (en supplément habitation)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : valeur du matériel informatique déclaré, présence d&apos;un serveur
                on-premise, zone géographique (Paris +20-40% vs province), présence d&apos;alarme +
                vidéosurveillance (-10 à -20%), antécédents sinistres.
              </p>
            </>
          ),
        },
        {
          h2: 'Les 6 garanties indispensables pour un bureau pro',
          body: (
            <>
              <ol>
                <li>
                  <strong>Multirisque local</strong> (incendie, dégâts eaux, vol, vandalisme,
                  événements climatiques, bris de glace)
                </li>
                <li>
                  <strong>Garantie « équipement informatique tous risques »</strong> — couvre les
                  ordinateurs portables même hors local (déplacement client, télétravail), bris
                  accidentel, panne électrique, surtension, vol par effraction. Plafond recommandé :
                  valeur de remplacement à neuf, sans franchise, idéalement
                </li>
                <li>
                  <strong>RC exploitation</strong> — dommages causés aux visiteurs (clients,
                  fournisseurs, livreurs)
                </li>
                <li>
                  <strong>Pertes d&apos;exploitation</strong> — perte de marge pendant la durée
                  d&apos;indisponibilité du bureau suite à sinistre. Critique si vous ne pouvez pas
                  télétravailler depuis chez vous (ex: cabinet d&apos;expert avec dossiers
                  physiques, agence créative avec studio dédié)
                </li>
                <li>
                  <strong>Cyber pro</strong> (RECOMMANDÉE pour 100% des bureaux) — fuite de données,
                  ransomware, phishing CEO. Coût moyen d&apos;un sinistre cyber TPE : 25 000-80 000€
                  (frais notification CNIL, rétablissement, perte d&apos;activité)
                </li>
                <li>
                  <strong>Protection juridique</strong> — assistance en cas de litige avec bailleur,
                  fournisseur, salarié, client
                </li>
              </ol>
              <p>Garanties optionnelles selon profil :</p>
              <ul>
                <li>Garantie « valeur à neuf » (sans déduction de vétusté)</li>
                <li>Couverture des données sauvegardées (frais de récupération, reconstitution)</li>
                <li>Garantie « surtension électrique » (importante pour serveurs on-premise)</li>
                <li>
                  Garantie « pertes financières indirectes » (clients perdus suite à interruption)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Cas particulier : assurance bureau en coworking',
          body: (
            <>
              <p>Le coworking pose des questions spécifiques :</p>
              <ul>
                <li>
                  <strong>Qui couvre quoi ?</strong> Le gestionnaire du coworking assure le local
                  (multirisque immeuble + RC exploitation pour les espaces communs). MAIS chaque
                  résident permanent doit assurer SON équipement perso (laptop, écrans, mobilier
                  perso) ET sa propre responsabilité civile pro.
                </li>
                <li>
                  <strong>Vol entre résidents</strong> : exclusion fréquente dans les contrats
                  standards (« vol non commis par effraction depuis l&apos;extérieur »). À vérifier
                  explicitement — privilégier un contrat avec garantie « vol simple ».
                </li>
                <li>
                  <strong>Données sensibles</strong> : dans un environnement partagé, le risque de
                  fuite de données est élevé. Garantie cyber + protection écrans (filtres
                  confidentialité) recommandées.
                </li>
                <li>
                  <strong>Tarif</strong> : très accessible, démarre à 180€/an pour un poste fixe
                  avec laptop + écran + petit matériel.
                </li>
              </ul>
              <p>
                Notre cabinet propose un contrat dédié « Coworking Pro » négocié avec Hiscox et
                Wakam, calibré sur ce format spécifique (formulaire simplifié, preuve
                d&apos;adhésion au coworking suffit).
              </p>
            </>
          ),
        },
        {
          h2: 'Cas particulier : bureau à domicile (télétravail indépendant)',
          body: (
            <>
              <p>
                Pour les indépendants exerçant depuis leur domicile (consultants, freelances,
                avocats en cabinet à domicile, traducteurs…), 2 options :
              </p>
              <h3>Option 1 : Extension de l&apos;assurance habitation</h3>
              <p>
                La plupart des assureurs habitation (MAAF, MAIF, MMA, Allianz, AXA) proposent une
                option « activité professionnelle à domicile » à ajouter au contrat existant. Coût :
                ~80-150 €/an supplémentaires. Avantage : simple, pas de nouveau contrat. Limite :
                couverture de la RC pro souvent plafonnée à 200-500 k€ (insuffisant pour des
                activités à risque comme le conseil financier ou IT).
              </p>
              <h3>Option 2 : Assurance bureau dédiée (recommandée pour activités à risque)</h3>
              <p>
                Souscrire un contrat « bureau pro à domicile » distinct, qui couvre spécifiquement
                l&apos;équipement pro, la RC pro à plafond élevé (1-2 M€) et les visiteurs reçus à
                domicile. Coût : 220-380 €/an. Indispensable pour avocats, conseillers financiers,
                consultants IT à fort CA.
              </p>
              <p>
                <strong>Attention</strong> : si vous recevez des CLIENTS à votre domicile,
                l&apos;option 1 est insuffisante (la RC habitation ne couvre PAS la responsabilité
                professionnelle envers les visiteurs business).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance bureau professionnel est-elle obligatoire ?",
          a: "Pas légalement (sauf cas particuliers : copropriété, ICPE), mais OBLIGATOIRE CONTRACTUELLEMENT dans 100% des baux commerciaux. Pour les indépendants en bureau à domicile : pas d'obligation légale, mais l'assurance habitation classique ne couvre PAS le matériel pro ni la RC professionnelle — il faut soit étendre l'habitation soit souscrire un contrat bureau dédié.",
        },
        {
          q: "Combien coûte l'assurance d'un bureau de 30 m² pour un indépendant ?",
          a: "Démarre à 220€/an pour une couverture standard en province (incendie, vol, dégâts eaux, RC exploitation). Médiane marché : 280-380€/an. Variables : valeur de l'équipement informatique déclaré, zone géographique (Paris +20-40%), présence d'alarme/vidéosurveillance (-10 à -20%), antécédents sinistres.",
        },
        {
          q: 'Mon assurance bureau couvre-t-elle mon ordinateur portable utilisé en déplacement ?',
          a: "Pas automatiquement. La garantie standard couvre uniquement le matériel à l'INTÉRIEUR du local. Pour couvrir les laptops utilisés en déplacement (RDV client, télétravail occasionnel, conférences), il faut souscrire l'option « équipement informatique nomade » ou « tous risques informatique » (+50-120€/an typique). FORTEMENT recommandée pour 100% des activités tertiaires.",
        },
        {
          q: 'Quelle différence entre assurance bureau et assurance local commercial ?',
          a: "Même produit (multirisque pro) mais calibration différente : ASSURANCE BUREAU optimisée pour profil risque modéré (pas de stock, peu de visiteurs, valeur principale = matériel IT). ASSURANCE LOCAL COMMERCIAL calibrée pour commerce avec vitrine, stock, clientèle reçue (risque vol, casse, perte d'exploitation plus élevés). Le tarif bureau est ~30-40% moins cher à surface équivalente.",
        },
        {
          q: 'Coworking : qui assure quoi entre le gestionnaire et le résident ?',
          a: 'Gestionnaire = assure le local (multirisque immeuble + RC espaces communs). Résident permanent = assure SON équipement perso (laptop, écrans, mobilier) ET sa RC pro. Vérifier la couverture du « vol entre résidents » (souvent EXCLU dans les contrats standards). Tarif accessible : 180-320€/an pour un poste fixe en coworking.',
        },
        {
          q: 'Faut-il une garantie cyber pour un bureau pro ?',
          a: "OUI — fortement recommandée pour 100% des bureaux. Coût moyen d'un sinistre cyber pour une TPE/PME en 2026 : 25 000-80 000€ (notification CNIL, rétablissement systèmes, perte d'exploitation, frais juridiques RGPD). Tarif d'une garantie cyber pro : 80-280€/an supplémentaire. ROI évident dès qu'on stocke des données clients (RGPD).",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance bureau ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos 8 assureurs partenaires. Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +80€) pour les emménagements urgents.',
        },
      ]}
    />
  )
}
