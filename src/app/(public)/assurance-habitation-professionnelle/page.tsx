/**
 * Pilier — Assurance habitation professionnelle (pour pros à domicile)
 * KW Ahrefs : "assurance habitation professionnelle" 150 vol KD 0 CPC 300€ (vacant)
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-habitation-professionnelle'
const TITLE = 'Assurance habitation professionnelle — Pro à domicile 2026'
const TAGLINE =
  "L'assurance pour professionnels exerçant à domicile : extension habitation pro, RC pro à domicile, équipement pro, accueil clients. Tarifs négociés."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Assurance habitation professionnelle : extension de l'habitation pour activité pro à domicile. Couvre équipement pro, RC visiteurs business, multirisque local pro à domicile. Tarifs 120-380 €/an supplémentaires. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance habitation professionnelle est l'extension de votre contrat habitation classique pour couvrir une activité professionnelle exercée à votre DOMICILE : freelance, consultant, professions libérales (médecin remplaçant, avocat à domicile, kiné, ostéo), artisans réparateurs (couture, retouches, bijouterie atelier), enseignants/coachs particuliers, e-commerce stocké à domicile. Particularité critique : votre assurance HABITATION CLASSIQUE (MAAF, MAIF, MMA, Allianz, AXA Habitation) NE COUVRE PAS l'activité professionnelle — équipement pro, visiteurs business, stock pro stocké chez vous, RC pro. Sans extension, un sinistre est REJETÉ pour « usage non déclaré » (art. L. 113-2 C. assur.). 2 options : extension habitation (+80-150€/an) pour activité légère sans visiteur, ou contrat pro à domicile dédié (220-380€/an) pour activité avec visiteurs ou stock significatif. Cette page détaille les 2 options et leurs limites."
      legalReference="Article L. 113-2 du Code des assurances + Code de la consommation (visiteurs business)"
      isObligatoire={false}
      benefits={[
        {
          icon: '🏡',
          title: 'Extension ou dédié',
          desc: '2 options : extension habitation (+80-150€/an) ou contrat pro à domicile dédié (220-380€/an)',
        },
        {
          icon: '💼',
          title: 'Équipement pro couvert',
          desc: 'PC pro, mobilier bureau, instruments métier, stock — séparé du contenu perso',
        },
        {
          icon: '👥',
          title: 'RC visiteurs business',
          desc: 'Client qui se blesse en RDV à votre domicile (chute escalier, allergie, etc.)',
        },
        {
          icon: '⚠️',
          title: 'OBLIGATION déclaration',
          desc: 'Sans déclaration : exclusion garantie en cas de sinistre lié au pro',
        },
      ]}
      sections={[
        {
          h2: "Pourquoi l'habitation classique ne suffit pas pour un pro à domicile",
          body: (
            <>
              <p>4 cas où votre assurance habitation perso refusera l&apos;indemnisation :</p>
              <ol>
                <li>
                  <strong>Vol de matériel pro</strong> (PC, instruments, stock) — couvert seulement
                  à hauteur du « contenu perso » déclaré (~5 000€ standard), insuffisant pour
                  matériel pro
                </li>
                <li>
                  <strong>Incendie causé par activité pro</strong> (court-circuit machine pro,
                  atelier) — exclusion fréquente
                </li>
                <li>
                  <strong>Dommage causé à un visiteur business</strong> (client qui glisse,
                  allergie) — la RC habitation perso ne couvre PAS la responsabilité PROFESSIONNELLE
                  envers les visiteurs business
                </li>
                <li>
                  <strong>Stock marchandises e-commerce</strong> stocké à domicile — généralement
                  EXCLU des contrats habitation perso (limite stock perso 2 000-3 000€)
                </li>
              </ol>
              <p className="my-3 border-l-4 border-primary-500 bg-primary-50 p-3">
                <strong>Article L. 113-2 du Code des assurances</strong> : tout changement de
                situation (notamment l&apos;exercice d&apos;une activité pro à domicile) doit être
                déclaré à l&apos;assureur sous 15 jours. Défaut de déclaration = NULLITÉ DU CONTRAT.
              </p>
            </>
          ),
        },
        {
          h2: 'Option 1 vs Option 2 : laquelle choisir ?',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Option 1 — Extension habitation</th>
                    <th className="border p-2 text-left">Option 2 — Contrat pro à domicile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Tarif</strong>
                    </td>
                    <td className="border p-2">+80 à 150€/an</td>
                    <td className="border p-2">220-380€/an (séparé)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Équipement pro</strong>
                    </td>
                    <td className="border p-2">Plafond 5-10k€</td>
                    <td className="border p-2">Plafond 30-50k€ à valeur déclarée</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Visiteurs business</strong>
                    </td>
                    <td className="border p-2">❌ Non couvert</td>
                    <td className="border p-2">✅ Couvert</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC pro</strong>
                    </td>
                    <td className="border p-2">❌ À souscrire séparément</td>
                    <td className="border p-2">⚠️ Variable (parfois inclus)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Stock pro</strong>
                    </td>
                    <td className="border p-2">Limité 5k€</td>
                    <td className="border p-2">Jusqu&apos;à 30k€</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Idéal pour</strong>
                    </td>
                    <td className="border p-2">Freelance digital sans visiteur</td>
                    <td className="border p-2">Pro libérale, artisan domicile, e-commerce stock</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pro à domicile : assurance habitation classique suffit-elle ?',
          a: "NON — l'assurance habitation classique ne couvre PAS l'activité pro à domicile (équipement pro, RC visiteurs business, stock pro). Sans extension ou contrat dédié, un sinistre lié au pro est REJETÉ pour « usage non déclaré » (art. L. 113-2 C. assur.). Pire : la NULLITÉ du contrat habitation peut être prononcée pour défaut de déclaration.",
        },
        {
          q: 'Combien coûte une extension habitation pour usage pro ?',
          a: "Option 1 (extension habitation) : +80-150€/an supplémentaires. Couvre équipement pro jusqu'à 5-10k€, mais EXCLUT visiteurs business et RC pro. Option 2 (contrat pro à domicile dédié) : 220-380€/an séparé, couverture étendue jusqu'à 30-50k€ + visiteurs business. Option 1 OK pour freelance digital sans RDV. Option 2 indispensable pour profession libérale (médecin, avocat, kiné, ostéo) recevant des clients.",
        },
        {
          q: "Visiteurs business à mon domicile : qui paie en cas d'accident ?",
          a: 'Sans extension pro à domicile : VOUS PERSONNELLEMENT (la RC habitation perso ne couvre pas la responsabilité PROFESSIONNELLE). Avec extension Option 2 : votre assureur paie. Critique pour profession libérale recevant 5+ clients/semaine à domicile.',
        },
        {
          q: 'E-commerce stocké à domicile : couvert ?',
          a: "Pas par l'habitation classique (limite stock perso 2-3k€). Avec extension habitation pro : couvert jusqu'à 5-10k€. Avec contrat pro à domicile dédié : jusqu'à 30k€. Au-delà : louer un espace de stockage commercial (entrepôt) avec assurance dédiée.",
        },
        {
          q: 'Combien de temps pour souscrire ?',
          a: "24h via notre formulaire ou directement chez votre assureur habitation actuel (avenant). Effet : 1er du mois suivant. À NE PAS retarder — chaque jour sans déclaration expose à l'exclusion en cas de sinistre.",
        },
      ]}
    />
  )
}
