/**
 * Pilier — Assurance e-commerce
 *
 * KW Ahrefs (snapshot 2026-04-29) : "assurance e commerce" 150 vol KD 0 CPC 200€
 * Famille connexe : "rc pro e commerce" 80 vol, "cyber e-commerce" 70 vol
 * Marché vacant.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-e-commerce'
const TITLE = 'Assurance e-commerce — Pack 2026 (RC pro, cyber, marchandises, RGPD)'
const TAGLINE =
  "L'assurance dédiée aux e-commerçants : RC pro produit + cyber assurance RGPD + assurance marchandises stockées + responsabilité expéditions. Tarifs négociés."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance e-commerce : pack RC pro produits + cyber assurance (breach RGPD, fraude paiement) + assurance marchandises stockées + responsabilité livraison. Tous statuts (AE, EI, SARL, SAS). Tarifs à partir de 380€/an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance e-commerce désigne le pack de garanties indispensables à toute activité de vente en ligne (boutique Shopify, WooCommerce, Magento, marketplace Amazon/Etsy/Cdiscount, dropshipping, pure player digital). Elle se distingue de l'assurance commerce traditionnelle par la prédominance des risques cyber (breach RGPD, fraude au paiement, ransomware sur le back-office), des risques produit (responsabilité civile produit en cas de défaut), des risques marchandises (stockage en entrepôt + transport vers le client), et des risques juridiques transverses (litige client B2C, droit de rétractation, garantie légale de conformité). Le pack standard combine 5 garanties : RC pro produits (1,5-3 M€), cyber assurance RGPD (200-1 M€), assurance marchandises stockées + transportées, RC client + responsabilité livraison, et protection juridique B2C. Les tarifs 2026 démarrent à 380 € HT/an pour un AE e-commerce solo (CA &lt; 30k€) jusqu'à 8 800 € HT/an pour une PME e-commerce 5 salariés avec entrepôt."
      legalReference="Code de la consommation + RGPD + LCEN art. 6-III + Loi Hamon (rétractation 14 jours)"
      isObligatoire={false}
      benefits={[
        {
          icon: '🛒',
          title: 'RC produits 1,5-3 M€',
          desc: 'Couvre les dommages causés par un produit vendu (intoxication, blessure, dommage matériel client)',
        },
        {
          icon: '🔒',
          title: 'Cyber + RGPD',
          desc: "Breach base clients, ransomware back-office, fraude paiement (sanctions CNIL jusqu'à 4% CA)",
        },
        {
          icon: '📦',
          title: 'Marchandises stockées',
          desc: 'Stock en entrepôt + transport vers le client + retours',
        },
        {
          icon: '💰',
          title: 'À partir de 380 €/an',
          desc: 'AE e-commerce solo. PME 5 salariés avec entrepôt : 4 800-8 800 €/an',
        },
      ]}
      sections={[
        {
          h2: 'Les 5 risques spécifiques au e-commerce',
          body: (
            <>
              <ol>
                <li>
                  <strong>Cyber RGPD</strong> : 1 e-commerçant sur 4 subit un breach base clients
                  dans ses 5 premières années (CNIL 2024). Sanctions : jusqu&apos;à 4% du CA mondial
                  OU 20 M€.
                </li>
                <li>
                  <strong>Fraude au paiement</strong> : carding, phishing, chargebacks abusifs. Coût
                  moyen 2026 : 2,8% du CA pour les e-commerces non protégés (étude Stripe 2024).
                </li>
                <li>
                  <strong>Litiges client B2C</strong> : droit de rétractation (14 jours - Loi
                  Hamon), garantie légale de conformité (2 ans), garantie vices cachés (5 ans). 1
                  commande sur 8 fait l&apos;objet d&apos;un litige (FEVAD 2024).
                </li>
                <li>
                  <strong>Pertes marchandises</strong> : vol entrepôt, transport, perte par
                  transporteur, retour client endommagé.
                </li>
                <li>
                  <strong>Responsabilité produit</strong> : produit défectueux causant un dommage au
                  client (intoxication alimentaire, blessure jouet, incendie appareil électronique).
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance e-commerce 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-right">Pack annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">AE e-commerce solo (CA &lt; 30k€) — pack base</td>
                    <td className="border p-2 text-right">380 € – 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">EI e-commerce (CA 30-77k€) — pack standard</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SARL e-commerce 2-3 salariés</td>
                    <td className="border p-2 text-right">1 480 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME e-commerce 5 salariés + entrepôt</td>
                    <td className="border p-2 text-right">4 800 € – 8 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Pure player CA 1M€+ multi-pays</td>
                    <td className="border p-2 text-right">8 800 € – 18 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Marketplace dropshipping (sans stock)</td>
                    <td className="border p-2 text-right">280 € – 680 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : CA, type de produits (alimentaire/cosmétique/électronique majorés),
                volume commandes/mois, présence stock physique, multi-pays UE/monde, certifications
                (PCI-DSS, ISO 27001).
              </p>
            </>
          ),
        },
        {
          h2: 'Hub e-commerce : pages-piliers connexes',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/cyber-assurance" className="text-primary-600 underline">
                    Cyber assurance
                  </Link>{' '}
                  — protection breach RGPD + ransomware
                </li>
                <li>
                  <Link
                    href="/responsabilite-civile-professionnelle"
                    className="text-primary-600 underline"
                  >
                    RC Pro
                  </Link>{' '}
                  — pilier complet RC pro
                </li>
                <li>
                  <Link
                    href="/protection-juridique-professionnelle"
                    className="text-primary-600 underline"
                  >
                    PJ Pro
                  </Link>{' '}
                  — défense litiges client B2C
                </li>
                <li>
                  <Link
                    href="/assurance-transport-marchandises"
                    className="text-primary-600 underline"
                  >
                    Transport marchandises
                  </Link>{' '}
                  — si volume livraison important
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance e-commerce est-elle obligatoire ?",
          a: "Pas légalement obligatoire (sauf RC pro sur certains produits réglementés : alimentaire, cosmétique, jouets, médicaments). MAIS fortement recommandée : 1 e-commerçant sur 4 subit un breach RGPD dans ses 5 premières années (sanctions CNIL jusqu'à 4% CA), 1 commande sur 8 génère un litige client. Sans cyber + RC produits : exposition patrimoine personnel illimitée.",
        },
        {
          q: "Combien coûte l'assurance d'un e-commerce en 2026 ?",
          a: 'Démarre à 380€/an pour AE e-commerce solo CA < 30k€ (pack base). Médiane marché : 680-1 100€/an pour EI CA 30-77k€. PME 5 salariés avec entrepôt : 4 800-8 800€/an. Pure player CA 1M€+ multi-pays : 8 800-18 000€/an. Variables : type de produits, volume commandes, présence stock, multi-pays.',
        },
        {
          q: 'Cyber assurance : indispensable pour un e-commerce ?',
          a: 'OUI absolument — TOP risque du e-commerce 2026. Coût moyen sinistre cyber e-commerce : 80 000-300 000€ (notification CNIL 72h, frais juridiques RGPD, perte exploitation, restauration de données, communication crise). Cyber dédiée : 200-1 200€/an supplémentaires selon CA. ROI évident dès le 1er incident.',
        },
        {
          q: 'Dropshipping : assurance différente ?',
          a: "OUI plus simple car pas de stock physique. Pack standard dropshipping : 280-680€/an. Couvre RC produits (responsabilité revendeur même sans stock), cyber RGPD, litiges client. À NÉGLIGER ABSOLUMENT : la responsabilité produit n'est PAS transférée au fournisseur (Aliexpress, etc.) — c'est VOUS qui répondez devant le client final en France.",
        },
        {
          q: 'Marketplace (Amazon, Etsy, Cdiscount) : qui assure quoi ?',
          a: "La PLATEFORME assure son propre fonctionnement (fraude carte, panne site). VOUS DEVEZ assurer : RC produits que vous vendez, cyber sur votre back-office, marchandises stockées (chez Amazon FBA ou chez vous), litiges client direct. Ne PAS croire que la marketplace vous protège — c'est VOUS le vendeur juridiquement.",
        },
        {
          q: 'RGPD pour e-commerce : quelles obligations ?',
          a: "Notification CNIL sous 72h en cas de breach, notification individuelle aux clients concernés si risque élevé, registre des traitements (art. 30), DPO si traitement massif, mentions RGPD claires sur le site, droit d'accès/suppression/portabilité. Sanctions : jusqu'à 4% CA mondial OU 20 M€. Cyber assurance dédiée e-commerce inclut généralement les frais de mise en conformité post-incident.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance e-commerce ?',
          a: 'Devis personnalisé via notre formulaire : 24-48h ouvrées avec 3 propositions de nos partenaires spécialisés digital (Hiscox e-commerce, Wakam, AXA Pro Digital, Allianz Cyber). Souscription : 24h. Effet du contrat : 1er du mois suivant ou immédiat (procédure express +60€).',
        },
      ]}
    />
  )
}
