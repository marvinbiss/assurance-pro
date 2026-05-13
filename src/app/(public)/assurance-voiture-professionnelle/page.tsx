/**
 * Pilier — Assurance voiture professionnelle (auto pro)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance voiture professionnelle" → 600 vol, KD 1, CPC 500€ ⭐
 * - "assurance auto entreprise"         → 600 vol, KD 7, CPC 300€
 * - "assurance auto professionnelle"    → 450 vol, KD 2, CPC 500€
 * - "pro btp assurance auto"            → 300 vol, KD 0, CPC 150€
 * - "pro btp assurance voiture"         → 150 vol, KD 0, CPC 160€
 * - "assurance auto vtc"                → 350 vol, KD 0, CPC 250€
 * - Famille cumulée : ~2 450 vol/mois
 *
 * Concurrent benchmark : marché VACANT (0 résultat dans le top 10 trackés).
 * Opportunité pure (KD 0-2 sur les KW principaux).
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-voiture-professionnelle'
const TITLE = 'Assurance voiture professionnelle — Tarifs 2026, RC pro + flotte'
const TAGLINE =
  "L'assurance dédiée aux véhicules professionnels : auto-mission, utilitaire, VTC, flotte. Couverture RC obligatoire + tous risques pro + marchandises. Tarifs négociés."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    'Assurance voiture professionnelle : RC pro circulation obligatoire + tous risques pro + marchandises transportées. Auto-mission, utilitaire, VTC, flotte. Tarifs négociés à partir de 580€/an. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance voiture professionnelle (ou « assurance auto pro ») couvre l'ensemble des véhicules utilisés à des fins professionnelles : véhicule personnel utilisé pour des déplacements pro (auto-mission), utilitaire dédié à l'entreprise, véhicule de fonction, flotte automobile, taxi et VTC, camion et poids lourd. La RC circulation est légalement obligatoire (Code des assurances L. 211-1, sanctions 75 000 € + 6 mois prison), mais les véhicules pro nécessitent en plus des garanties spécifiques : RC professionnelle dans le véhicule (passagers professionnels, livraisons, prestation client), garantie marchandises transportées, bris de matériel embarqué, garantie conducteur étendue, véhicule de remplacement 24h/24. Les tarifs 2026 démarrent à 580 € HT/an pour un véhicule auto-mission solo jusqu'à 12 000 € HT/an pour une flotte de 10 utilitaires en BTP. Cette page détaille les obligations selon l'usage (auto-mission vs flotte vs VTC), les tarifs par profil et les pièges à éviter (sous-déclaration km, exclusion usage pro)."
      legalReference="Article L. 211-1 du Code des assurances + L. 421-9 (FGAO) + Code des transports L. 3120-1 (transport public)"
      isObligatoire={true}
      benefits={[
        {
          icon: '🚗',
          title: 'RC circulation obligatoire',
          desc: 'Sanctions absence : 75 000€ + 6 mois prison. Plafond corporel ILLIMITÉ',
        },
        {
          icon: '📦',
          title: 'Marchandises transportées',
          desc: 'Couvre stock + outillage + matériel client en cas de vol ou accident',
        },
        {
          icon: '🔄',
          title: 'Véhicule de remplacement',
          desc: 'Mise à disposition 24h/24 pendant immobilisation pour réparation/sinistre',
        },
        {
          icon: '💰',
          title: 'À partir de 580 €/an',
          desc: 'Auto-mission solo. Flotte 10 utilitaires BTP : 8 000-12 000€/an',
        },
      ]}
      sections={[
        {
          h2: 'Auto-mission vs véhicule pro vs flotte : 3 contrats distincts',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Usage</th>
                    <th className="border p-2 text-left">Définition</th>
                    <th className="border p-2 text-left">Contrat type</th>
                    <th className="border p-2 text-right">Tarif moyen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Auto-mission</strong>
                    </td>
                    <td className="border p-2">
                      Véhicule PERSO utilisé OCCASIONNELLEMENT pour le pro (RDV client, formation)
                    </td>
                    <td className="border p-2">Extension auto perso (+~80-150€/an)</td>
                    <td className="border p-2 text-right">+ 80-150 €/an</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Véhicule de fonction</strong>
                    </td>
                    <td className="border p-2">
                      Véhicule PRO mis à dispo PERMANENT d&apos;un salarié (usage pro + perso)
                    </td>
                    <td className="border p-2">Auto pro tous risques + RC vie privée</td>
                    <td className="border p-2 text-right">680 € – 1 480 €/an</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Utilitaire pro</strong>
                    </td>
                    <td className="border p-2">
                      Véhicule DÉDIÉ à l&apos;exploitation (camion artisan, fourgon livraison)
                    </td>
                    <td className="border p-2">Auto pro + marchandises</td>
                    <td className="border p-2 text-right">880 € – 1 880 €/an</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Flotte automobile</strong>
                    </td>
                    <td className="border p-2">
                      ≥ 4 véhicules ENTREPRISE (utilitaires + voitures cadres)
                    </td>
                    <td className="border p-2">Contrat flotte pro mutualisé</td>
                    <td className="border p-2 text-right">580 €/véhicule (économie 20-30%)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>VTC / taxi</strong>
                    </td>
                    <td className="border p-2">Transport public de personnes (carte VTC ou ADS)</td>
                    <td className="border p-2">RC pro chauffeur dédié</td>
                    <td className="border p-2 text-right">
                      650 – 3 800 €/an (voir{' '}
                      <a href="/assurance-vtc" className="text-primary-600 underline">
                        /assurance-vtc
                      </a>{' '}
                      ou{' '}
                      <a href="/assurance-taxi" className="text-primary-600 underline">
                        /assurance-taxi
                      </a>
                      )
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Les 6 garanties indispensables pour un véhicule pro',
          body: (
            <>
              <ol>
                <li>
                  <strong>RC circulation</strong> (obligatoire L. 211-1) : passagers + tiers +
                  véhicule. Plafond corporel ILLIMITÉ
                </li>
                <li>
                  <strong>Tous risques pro</strong> : vol, incendie, vandalisme, bris glace,
                  événements climatiques. Indispensable pour véhicule récent ou haut de gamme
                </li>
                <li>
                  <strong>Marchandises transportées</strong> : couverture du stock + outillage +
                  matériel client. Calibré sur la valeur déclarée (un fourgon plombier = ~10-25 k€
                  d&apos;outillage)
                </li>
                <li>
                  <strong>Garantie conducteur étendue</strong> : capital décès + invalidité + IJ
                  pour le conducteur (souvent oublié — la RC standard couvre les TIERS, pas le
                  conducteur lui-même)
                </li>
                <li>
                  <strong>Véhicule de remplacement</strong> 24h/24 pendant immobilisation : critique
                  pour un artisan solo qui ne peut pas travailler sans véhicule
                </li>
                <li>
                  <strong>Assistance 0 km</strong> : panne, dépannage, remorquage depuis votre
                  adresse pro (vs assistance perso qui démarre à 50 km)
                </li>
              </ol>
              <p>Garanties optionnelles selon profil :</p>
              <ul>
                <li>Bris du matériel embarqué (PC, GPS pro, terminal CB, instruments de mesure)</li>
                <li>
                  Garantie « chargement » (objets transportés appartenant au client :
                  électroménager, mobilier livraison)
                </li>
                <li>Garantie « conducteur novice » (jeune permis, jeune embauche)</li>
                <li>Garantie « auto-partage » (véhicule utilisé par plusieurs salariés)</li>
              </ul>
            </>
          ),
        },
        {
          h2: "Les 4 erreurs qui font perdre l'indemnisation",
          body: (
            <>
              <ol>
                <li>
                  <strong>Sous-déclarer le kilométrage annuel</strong> : règle proportionnelle
                  appliquée en cas de sinistre. Exemple : forfait déclaré 10 000 km, réel 25 000 km
                  → indemnisation 40% du préjudice. Pour les artisans : forfait pro 30 000 km/an
                  minimum recommandé.
                </li>
                <li>
                  <strong>Utiliser le véhicule en auto-mission sans option pro</strong> : un seul
                  accident causé pendant un déplacement client peut être REJETÉ par l&apos;assurance
                  perso (« usage non déclaré »). Coût option auto-mission : ~80-150€/an. À ne pas
                  négliger.
                </li>
                <li>
                  <strong>Oublier de déclarer les conducteurs occasionnels</strong> (apprenti,
                  intérimaire, conjoint qui dépanne) : exclusion en cas de sinistre causé par un
                  conducteur non listé.
                </li>
                <li>
                  <strong>
                    Ne pas mettre à jour la valeur déclarée des marchandises transportées
                  </strong>{' '}
                  : un fourgon plombier qui rénove avec 25k€ d&apos;outillage à bord, déclaré à 10k€
                  initialement → indemnisation 40% en cas de vol nocturne.
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Cas particulier : flotte automobile pro (≥ 4 véhicules)',
          body: (
            <>
              <p>
                Pour une entreprise gérant 4+ véhicules, le contrat « flotte pro mutualisée » offre
                des économies significatives :
              </p>
              <ul>
                <li>
                  <strong>Économie 20-30%</strong> vs assurance individuelle de chaque véhicule
                </li>
                <li>
                  <strong>Tarification au km global</strong> de la flotte (et non par véhicule
                  individuel) — bonus mutualisé sur l&apos;ensemble
                </li>
                <li>
                  <strong>Gestion sinistres centralisée</strong> par un gestionnaire dédié (vs
                  lignes téléphoniques différentes)
                </li>
                <li>
                  <strong>Échange de véhicule simplifié</strong> : ajouter ou retirer un véhicule
                  sans avenant complexe
                </li>
                <li>
                  <strong>Reporting consolidé</strong> mensuel/annuel pour suivre la sinistralité
                  interne
                </li>
              </ul>
              <p>
                <strong>Tarif moyen 2026</strong> : ~580€/véhicule pour une flotte de 10 utilitaires
                (vs ~880€ en individuel) = économie ~3 000€/an. ROI immédiat à partir de 4
                véhicules.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance auto pro est-elle obligatoire ?",
          a: "Oui — la RC circulation est obligatoire pour TOUT véhicule à moteur (Code des assurances L. 211-1). Sanctions absence : 75 000€ d'amende + 6 mois prison + immobilisation véhicule. Pour un usage professionnel, cette RC standard ne suffit pas — il faut une RC PROFESSIONNELLE adaptée à l'usage (auto-mission, utilitaire pro, VTC, flotte) qui couvre les passagers/marchandises/clients.",
        },
        {
          q: 'Combien coûte une assurance voiture professionnelle ?',
          a: "Démarre à +80-150€/an pour une option auto-mission (extension de l'auto perso). Véhicule de fonction : 680-1 480€/an. Utilitaire pro avec marchandises : 880-1 880€/an. Flotte de 10 utilitaires : ~580€/véhicule (économie 20-30% vs individuel). VTC : 650-1 400€/an. Taxi artisan : 1 280-3 800€/an.",
        },
        {
          q: 'Quelle différence entre auto-mission et véhicule de fonction ?',
          a: "AUTO-MISSION = véhicule PERSO utilisé OCCASIONNELLEMENT pour le pro (~30 jours/an max). Couverture via une OPTION sur l'assurance perso (+80-150€/an). VÉHICULE DE FONCTION = véhicule PRO mis à disposition PERMANENT d'un salarié (usage pro + perso). Couverture par un contrat AUTO PRO TOUS RISQUES + RC vie privée du conducteur (680-1 480€/an).",
        },
        {
          q: 'Mon véhicule pro est volé : suis-je couvert ?',
          a: 'Oui SI la garantie « vol » est souscrite (incluse dans tous les contrats auto pro tous risques). MAIS le vol des EFFETS PERSONNELS du conducteur (PC pro, GPS, terminal CB, téléphone pro) et des MARCHANDISES TRANSPORTÉES sont souvent EN OPTION séparée. À vérifier explicitement à la souscription — coût modeste (~50-150€/an) pour un risque réel.',
        },
        {
          q: "Comment fonctionne l'assurance flotte automobile ?",
          a: "Contrat unique mutualisé pour 4+ véhicules d'une même entreprise. Avantages : économie 20-30% vs assurance individuelle, gestion centralisée des sinistres, tarification au km global de la flotte (et non par véhicule), ajout/retrait de véhicule simplifié, reporting consolidé mensuel. ROI positif dès 4 véhicules.",
        },
        {
          q: 'Auto-mission : suis-je couvert si je transporte mon stock pour livrer un client ?',
          a: "PAS AUTOMATIQUEMENT. L'option auto-mission de votre assurance perso couvre les déplacements PRO de votre PERSONNE (RDV client, formation), mais PAS le transport régulier de marchandises pro. Pour livrer du stock client, il faut un VÉHICULE PRO dédié avec garantie « marchandises transportées » — l'auto-mission seule = exclusion en cas de sinistre.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance auto pro ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos partenaires spécialisés (AXA Pro Auto, Allianz Pro, MMA Pro, MAAF Pro, Wakam, Stello). Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +80€).',
        },
      ]}
    />
  )
}
