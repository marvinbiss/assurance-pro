/**
 * Pilier — Assurance auto entreprise
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance auto entreprise" → 600 vol, KD 7, CPC 300€ ⭐
 * Famille connexe (auto pro déjà couverte par /assurance-voiture-professionnelle).
 *
 * Distinction : /assurance-voiture-professionnelle = générique tous usages pro.
 * Cette page cible spécifiquement « auto ENTREPRISE » (véhicule détenu par
 * personne morale, vs auto-mission véhicule personnel).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-auto-entreprise'
const TITLE = 'Assurance auto entreprise — Véhicule de société 2026 (RC pro + tous risques)'
const TAGLINE =
  "L'assurance dédiée aux véhicules détenus par votre société : voiture de société, véhicule de fonction, voiture de direction. Couverture RC pro + tous risques + conducteur."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance auto entreprise : véhicule de société (carte grise au nom de la SARL/SAS/SCI), véhicule de fonction salarié, voiture direction. RC pro + tous risques + conducteur étendue. Tarifs 680-1 480€/an. Comparatif 6 assureurs. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance auto entreprise couvre les véhicules détenus directement par une société (SARL, SAS, SCI à objet commercial, EURL) — carte grise au nom de la personne morale. Distincte de l'auto-mission (véhicule personnel utilisé pour le pro) et de l'assurance flotte (≥ 4 véhicules), elle s'applique principalement aux : véhicules de fonction mis à disposition d'un salarié (usage pro + perso), voiture de direction (dirigeant + déplacements clients), véhicule utilitaire isolé (1-3 véhicules), voiture de société (CG société, usage exclusivement pro). Les garanties standard combinent la RC professionnelle circulation, la garantie tous risques (vol, incendie, vandalisme, bris de glace), la garantie conducteur étendue et le véhicule de remplacement. Les tarifs 2026 démarrent à 680 € HT/an pour un véhicule de fonction province jusqu'à 2 200 € HT/an pour un véhicule haut de gamme parisien à usage mixte intensif. Cette page distingue les usages, détaille les tarifs et compare 6 assureurs."
      legalReference="Article L. 211-1 du Code des assurances + Code général des impôts (avantage en nature)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
      benefits={[
        {
          icon: '🚙',
          title: 'CG société',
          desc: 'Spécifique aux véhicules dont la carte grise est au nom de la personne morale',
        },
        {
          icon: '👨‍💼',
          title: 'Usage mixte couvert',
          desc: 'Pro (RDV client, déplacements pro) + perso (week-end, vacances) du salarié bénéficiaire',
        },
        {
          icon: '🛡️',
          title: 'Tous risques + conducteur',
          desc: 'Vol, incendie, vandalisme, bris glace + capital décès/invalidité conducteur',
        },
        {
          icon: '💰',
          title: 'À partir de 680 €/an',
          desc: 'Véhicule de fonction province. Haut de gamme Paris : 1 480-2 200€/an',
        },
      ]}
      sections={[
        {
          h2: "Distinguer les 4 types d'usage : auto-mission vs fonction vs société vs flotte",
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Usage</th>
                    <th className="border p-2 text-left">CG au nom de</th>
                    <th className="border p-2 text-left">Bénéficiaire usage</th>
                    <th className="border p-2 text-left">Page dédiée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Auto-mission</strong>
                    </td>
                    <td className="border p-2">Salarié / dirigeant (perso)</td>
                    <td className="border p-2">Lui-même + occasionnel pro</td>
                    <td className="border p-2">
                      <Link
                        href="/assurance-voiture-professionnelle"
                        className="text-primary-600 underline"
                      >
                        /assurance-voiture-professionnelle
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Véhicule de fonction</strong>
                    </td>
                    <td className="border p-2">Société</td>
                    <td className="border p-2">Salarié bénéficiaire (pro + perso)</td>
                    <td className="border p-2">
                      <strong>Cette page (/assurance-auto-entreprise)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Véhicule de société</strong>
                    </td>
                    <td className="border p-2">Société</td>
                    <td className="border p-2">Tous salariés autorisés (pro uniquement)</td>
                    <td className="border p-2">
                      <strong>Cette page</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Flotte automobile</strong>
                    </td>
                    <td className="border p-2">Société (≥ 4 véhicules)</td>
                    <td className="border p-2">Tous salariés autorisés</td>
                    <td className="border p-2">
                      <Link
                        href="/assurance-flotte-automobile"
                        className="text-primary-600 underline"
                      >
                        /assurance-flotte-automobile
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance auto entreprise 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      Véhicule de fonction citadine (Clio, 208) — province
                    </td>
                    <td className="border p-2 text-right">680 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Véhicule de fonction berline moyenne (308, Mégane) — province
                    </td>
                    <td className="border p-2 text-right">880 € – 1 280 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Véhicule de fonction berline cadre (Audi A4, BMW Série 3) — Paris
                    </td>
                    <td className="border p-2 text-right">1 280 € – 1 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Véhicule de direction haut de gamme (Mercedes Classe E, BMW Série 5)
                    </td>
                    <td className="border p-2 text-right">1 580 € – 2 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Voiture électrique de fonction (Tesla Model 3, Polestar)
                    </td>
                    <td className="border p-2 text-right">
                      1 100 € – 1 800 € (assurance batterie incluse)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Véhicule de société utilitaire isolé (1-3 véhicules)
                    </td>
                    <td className="border p-2 text-right">880 € – 1 480 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : km annuels (forfait 15k / 25k / 40k+), antécédents conducteur(s), profil
                (jeune permis, dirigeant expérimenté), zone (Paris IDF +20-40%), modèle haut de
                gamme.
              </p>
            </>
          ),
        },
        {
          h2: 'Garanties indispensables pour un véhicule entreprise',
          body: (
            <>
              <ol>
                <li>
                  <strong>RC pro circulation</strong> (obligatoire L. 211-1) : passagers + tiers +
                  véhicule. Plafond corporel ILLIMITÉ
                </li>
                <li>
                  <strong>Tous risques</strong> : vol, incendie, vandalisme, événements climatiques,
                  bris glace
                </li>
                <li>
                  <strong>Garantie conducteur étendue</strong> : capital décès + invalidité + IJ
                  pour le bénéficiaire (la RC standard couvre les TIERS, pas le conducteur)
                </li>
                <li>
                  <strong>Véhicule de remplacement</strong> 24h/24 pendant immobilisation pour
                  réparation/sinistre
                </li>
                <li>
                  <strong>Assistance 0 km</strong> : panne, dépannage, remorquage depuis
                  l&apos;adresse pro/perso
                </li>
                <li>
                  <strong>Garantie « auto-partage »</strong> si plusieurs salariés utilisent le
                  véhicule
                </li>
                <li>
                  <strong>Garantie « expatriation temporaire »</strong> si déplacements
                  UE/internationaux fréquents
                </li>
              </ol>
              <p>Optionnel pour véhicules de fonction haut de gamme :</p>
              <ul>
                <li>Garantie « valeur à neuf 24 mois » (utile pour véhicules &lt; 2 ans)</li>
                <li>Garantie « contenu » (matériel pro, GPS, terminal CB embarqué)</li>
                <li>Garantie « vol des effets personnels » du conducteur</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Aspects fiscaux : avantage en nature et TVS',
          body: (
            <>
              <h3>Avantage en nature (véhicule de fonction)</h3>
              <p>
                Lorsqu&apos;un véhicule de société est mis à disposition d&apos;un salarié pour un
                usage MIXTE (pro + perso), il constitue un AVANTAGE EN NATURE imposable. Calcul :
                forfait 9% du prix d&apos;achat TTC (12% si +5 ans) OU réel sur la base des frais
                d&apos;exploitation. À déclarer sur le bulletin de salaire + cotisations sociales
                URSSAF.
              </p>
              <h3>TVS — Taxe sur les véhicules de société</h3>
              <p>
                Remplacée depuis 2022 par les <strong>2 nouvelles taxes</strong> :
              </p>
              <ul>
                <li>Taxe annuelle sur les émissions de CO₂</li>
                <li>Taxe annuelle sur les émissions de polluants atmosphériques</li>
              </ul>
              <p>
                Calcul fonction de l&apos;année de mise en circulation, du type de motorisation et
                des émissions WLTP. Véhicules électriques + hybrides rechargeables : exonération
                totale.
              </p>
              <h3>Récupération TVA</h3>
              <p>
                Récupération TVA sur l&apos;assurance (20%) si véhicule détenu par société et
                facturé HT à la société. Pas de récupération sur les véhicules à usage mixte au taux
                de TVA standard (mais possible sur les véhicules utilitaires).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelle différence entre auto-mission, véhicule de fonction et véhicule de société ?',
          a: "AUTO-MISSION : véhicule PERSONNEL utilisé OCCASIONNELLEMENT pour le pro (option +80-150€/an sur l'auto perso). VÉHICULE DE FONCTION : véhicule SOCIÉTÉ mis à disposition PERMANENT d'un salarié (usage pro + perso, génère un avantage en nature imposable). VÉHICULE DE SOCIÉTÉ : véhicule SOCIÉTÉ utilisé par tous les salariés autorisés UNIQUEMENT pour le pro (pas d'avantage en nature).",
        },
        {
          q: "Combien coûte l'assurance d'un véhicule de fonction citadine en 2026 ?",
          a: '680-980€/an pour une citadine (Clio, 208) en province. 880-1 280€/an pour une berline moyenne (308, Mégane). 1 280-1 880€/an pour une berline cadre (Audi A4, BMW Série 3) en Paris. Variables : km annuels, antécédents, profil conducteur, zone géographique.',
        },
        {
          q: 'Voiture électrique de fonction : assurance plus chère ?',
          a: "Pas systématiquement. Tarif moyen 1 100-1 800€/an pour Tesla Model 3 / Polestar. Inclus généralement : assurance batterie (composant le plus cher du véhicule électrique, 8 000-15 000€), assistance recharge spécifique, dépannage électrique. Les véhicules électriques bénéficient aussi d'EXONÉRATION de la nouvelle taxe CO₂ qui remplace la TVS.",
        },
        {
          q: 'Avantage en nature véhicule de fonction : comment ça marche ?',
          a: "Lorsqu'un véhicule de société est mis à disposition d'un salarié pour usage MIXTE (pro + perso), il constitue un avantage en nature IMPOSABLE. Calcul : forfait 9% du prix d'achat TTC du véhicule (12% si véhicule de +5 ans) OU réel basé sur frais d'exploitation. À déclarer sur bulletin de salaire + cotisations sociales URSSAF. Plus de précisions dans notre page <a href='/assurance-entreprise' class='text-primary-600 underline'>/assurance-entreprise</a>.",
        },
        {
          q: "Véhicule de société : qui est responsable en cas d'accident ?",
          a: "RC PRO de la société pour les dommages aux tiers (passagers, autres véhicules, infrastructure). Si conducteur salarié sous l'emprise d'alcool/stupéfiants ou commettant une faute lourde personnelle : responsabilité personnelle pénale du conducteur engagée + recours possible de l'assureur. Pour le dirigeant : responsabilité personnelle si conduite sans permis valide ou en infraction délibérée.",
        },
        {
          q: "Récupération TVA sur l'assurance véhicule entreprise ?",
          a: "OUI à 100% sur l'assurance d'un véhicule UTILITAIRE détenu par société (TVA récupérable au taux 20%). Pour les véhicules de tourisme à usage mixte : non récupérable (sauf si véhicule à 100% professionnel justifié). À facturer HT à la société.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance auto entreprise ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos partenaires (AXA Pro, Allianz Pro, MMA Pro, MAAF Pro, Wakam, Stello). Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +80€) pour livraison véhicule urgente.',
        },
      ]}
    />
  )
}
