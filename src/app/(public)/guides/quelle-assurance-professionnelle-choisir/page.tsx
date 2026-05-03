/**
 * Guide — Quelle assurance professionnelle choisir
 * KW Ahrefs : "quelle assurance professionnelle choisir" 700 vol KD 7 CPC 30€
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'guides/quelle-assurance-professionnelle-choisir'
const TITLE = 'Quelle assurance professionnelle choisir en 2026 — Guide complet'
const TAGLINE = "Le guide pour identifier les assurances professionnelles indispensables selon votre profil : métier, statut juridique, taille entreprise. Méthode en 5 étapes."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description: "Guide quelle assurance professionnelle choisir : méthode en 5 étapes pour identifier les garanties INDISPENSABLES selon votre métier, statut juridique, taille entreprise. Comparatif 8 assureurs. Conseil ORIAS gratuit sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG} title={TITLE} tagline={TAGLINE}
      intro="Choisir les bonnes assurances professionnelles est crucial pour éviter à la fois la SOUS-PROTECTION (sinistre non couvert = ruine personnelle potentielle) et la SUR-ASSURANCE (sur-cotisation inutile). La méthode rigoureuse en 5 étapes : (1) identifier les garanties OBLIGATOIRES selon votre métier et statut juridique, (2) cartographier les RISQUES RÉELS de votre activité (sinistralité secteur, exposition cyber, présence salariés), (3) définir des PLAFONDS proportionnés (RC Pro 1,5 à 10 M€ selon métier), (4) comparer 3-5 ASSUREURS sur EXACTEMENT le même cahier des charges, (5) vérifier les EXCLUSIONS et la qualité du service sinistres. Cette page guide vous aiguille vers les bons piliers selon votre profil et présente la méthode complète."
      legalReference="Recommandation ACPR 2024-R-03 (devoir de conseil tracé du courtier ORIAS)"
      isObligatoire={false}
      benefits={[
        { icon: '🎯', title: 'Méthode 5 étapes', desc: 'Obligations légales → Risques métier → Plafonds → Comparatif → Exclusions' },
        { icon: '⚖️', title: '21 métiers obligatoires', desc: 'BTP, santé, juridique, conseil financier, transport, sport, esthétique, sécurité' },
        { icon: '💰', title: 'Économie 15-30%', desc: 'Comparatif systématique 8 assureurs vs souscription directe sans comparatif' },
        { icon: '⏱️', title: 'Devis 24h', desc: '3-5 propositions personnalisées sous 24h ouvrées via notre cabinet ORIAS' },
      ]}
      sections={[
        {
          h2: 'Quelle assurance choisir selon mon profil ?',
          body: (
            <>
              <h3>Auto-entrepreneur / freelance solo</h3>
              <ul>
                <li>RC Pro adaptée — voir <a href="/rc-pro/auto-entrepreneur" className="text-blue-600 underline">/rc-pro/auto-entrepreneur</a></li>
                <li>Mutuelle santé individuelle (basculer au régime réel pour Madelin si bénéfice ≥ 30k€)</li>
              </ul>
              <h3>Artisan BTP</h3>
              <ul>
                <li><a href="/assurance-decennale" className="text-blue-600 underline">Décennale obligatoire</a> + RC Pro travaux + véhicule pro</li>
                <li><a href="/mutuelle-pro-btp" className="text-blue-600 underline">Mutuelle pro BTP</a> + <a href="/prevoyance-tns" className="text-blue-600 underline">Prévoyance TNS</a></li>
                <li>Pack complet : <a href="/assurance-artisan" className="text-blue-600 underline">/assurance-artisan</a></li>
              </ul>
              <h3>Commerçant en boutique</h3>
              <ul>
                <li><a href="/assurance-local-commercial" className="text-blue-600 underline">Multirisque local</a></li>
                <li><a href="/assurance-commerce" className="text-blue-600 underline">Pack commerce</a> avec stock + bris glace + RC client</li>
              </ul>
              <h3>Restaurateur / hôtelier</h3>
              <ul>
                <li><a href="/assurance-restaurant" className="text-blue-600 underline">Pack HCR</a> avec garantie intoxication alimentaire</li>
              </ul>
              <h3>Cabinet libéral / consulting / agence</h3>
              <ul>
                <li><a href="/assurance-bureau" className="text-blue-600 underline">Multirisque bureau</a> + équipement IT</li>
                <li><a href="/responsabilite-civile-professionnelle" className="text-blue-600 underline">RC Pro</a> avec plafond adapté</li>
                <li><a href="/cyber-assurance" className="text-blue-600 underline">Cyber assurance</a> recommandée</li>
              </ul>
              <h3>VTC / Taxi</h3>
              <ul>
                <li><a href="/assurance-vtc" className="text-blue-600 underline">Pack VTC</a> ou <a href="/assurance-taxi" className="text-blue-600 underline">/assurance-taxi</a> avec garantie ADS-licence</li>
              </ul>
              <h3>PME / ETI avec salariés</h3>
              <ul>
                <li><a href="/assurance-entreprise" className="text-blue-600 underline">Pack TPE/PME/ETI complet</a></li>
                <li><a href="/assurance-sante-entreprise" className="text-blue-600 underline">Mutuelle collective ANI 2013</a> obligatoire</li>
                <li>RCMS pour dirigeant + cyber + flotte si véhicules</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'La méthode complète',
          body: (
            <>
              <p>Voir aussi notre guide <a href="/guides/devis-assurance-professionnelle" className="text-blue-600 underline">/guides/devis-assurance-professionnelle</a> qui détaille la procédure complète de demande de devis en 5 étapes + documents à préparer + 5 pièges à éviter.</p>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'Comment choisir son assurance pro en 2026 ?', a: "Méthode en 5 étapes : (1) identifier les garanties OBLIGATOIRES selon votre métier (21 métiers ont des obligations légales), (2) cartographier les RISQUES RÉELS de votre activité, (3) définir des PLAFONDS proportionnés (1,5 à 10 M€ pour RC Pro), (4) comparer 3-5 ASSUREURS sur le même cahier des charges, (5) vérifier les EXCLUSIONS et la qualité du service sinistres." },
        { q: 'Quelle est l\'assurance pro la plus importante ?', a: "Dépend du métier : DÉCENNALE pour artisans BTP (Loi Spinetta), RC PRO MÉDICALE pour santé (Loi Kouchner), RC PRO pour 21 métiers réglementés. Pour TOUS : RC Pro est le minimum vital + mutuelle santé personnelle. Pour les EMPLOYEURS : mutuelle collective obligatoire ANI 2013." },
        { q: 'Combien d\'assureurs comparer ?', a: "3 à 5 minimum. Notre cabinet ORIAS compare systématiquement 8 assureurs (Allianz Pro, AXA Pro, MMA Pro, MAAF Pro, Hiscox, April Pro, Generali Pro, Wakam) — économies typiques 15-30%. Voir notre <a href='/comparateur-assurance-professionnelle' class='text-blue-600 underline'>comparateur dédié</a>." },
        { q: 'Plus de détails ?', a: "Voir notre pilier RACINE <a href='/assurance-professionnelle' class='text-blue-600 underline'>/assurance-professionnelle</a> pour le guide complet par profil + comparatif 8 assureurs." },
      ]}
    />
  )
}
