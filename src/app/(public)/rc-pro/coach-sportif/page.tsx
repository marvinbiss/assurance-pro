/**
 * Pilier — RC Pro coach sportif
 * KW Ahrefs : "rc pro coach sportif" 100 vol KD - + "assurance professionnelle coach sportif" 100 vol KD 0
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/coach-sportif'
const TITLE = 'RC Pro coach sportif — OBLIGATOIRE 2026 (Code du sport L. 321-7)'
const TAGLINE = "L'assurance RC pro OBLIGATOIRE pour coachs sportifs : Code du sport. Couvre blessures clients, malaise cardiaque, dommages matériel salle. Tarifs 220-580€/an."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description: "RC Pro coach sportif OBLIGATOIRE (Code du sport L. 321-7). Couvre blessures clients pendant séance, malaise cardiaque, dommages matériel salle. Coach à domicile, en salle, en plein air. Tarifs 220-580€/an. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG} title={TITLE} tagline={TAGLINE}
      intro="La RC Pro coach sportif est LÉGALEMENT OBLIGATOIRE en France selon l'article L. 321-7 du Code du sport, pour TOUT éducateur sportif (coach personnel, prof yoga/pilates/crossfit, moniteur de fitness, coach running). Sanction absence : retrait de la carte professionnelle d'éducateur sportif + interdiction d'exercer + sanctions pénales. Elle couvre les sinistres typiques du métier : blessure du client pendant la séance (faux mouvement, surentraînement, mauvaise consigne), malaise cardiaque (prévention par questionnaire de santé obligatoire avant 1re séance), dommages au matériel de la salle/du domicile client (mur fissuré, miroir cassé). Tarifs 2026 accessibles : 220-580€/an pour un coach indépendant. Conditions cumulatives : carte professionnelle d'éducateur sportif + diplôme reconnu (BPJEPS, DEUST, DEJEPS) + RC Pro en cours de validité."
      legalReference="Article L. 321-7 du Code du sport + L. 212-1 (qualification éducateur sportif)"
      isObligatoire={true}
      benefits={[
        { icon: '🏋️', title: 'OBLIGATION Code du sport', desc: 'Sans RC Pro : retrait carte pro + interdiction d\'exercer + sanctions pénales' },
        { icon: '❤️', title: 'Malaise cardiaque client', desc: 'Couverture si questionnaire de santé préalable rempli (obligation)' },
        { icon: '🤕', title: 'Blessures clients', desc: 'Faux mouvement, surentraînement, mauvaise consigne — sinistre 5-50k€' },
        { icon: '💰', title: 'À partir de 220 €/an', desc: 'Coach indépendant solo. Salle de sport 5 coachs : 880-1 480€/an' },
      ]}
      sections={[
        {
          h2: 'Tarifs RC Pro coach sportif 2026',
          body: (
            <>
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-gray-100"><th className="border p-2 text-left">Profil</th><th className="border p-2 text-right">Tarif annuel HT</th></tr></thead>
                <tbody>
                  <tr><td className="border p-2">AE coach personnel à domicile (BPJEPS)</td><td className="border p-2 text-right">220 € – 380 €</td></tr>
                  <tr><td className="border p-2">AE prof yoga/pilates studio loué</td><td className="border p-2 text-right">280 € – 480 €</td></tr>
                  <tr><td className="border p-2">AE coach crossfit / fonctionnel</td><td className="border p-2 text-right">380 € – 580 €</td></tr>
                  <tr><td className="border p-2">EI moniteur sport (escalade, équitation, ski)</td><td className="border p-2 text-right">480 € – 980 €</td></tr>
                  <tr><td className="border p-2">SARL salle de sport 5 coachs + 100m²</td><td className="border p-2 text-right">880 € – 1 480 €</td></tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'La RC Pro coach sportif est-elle obligatoire ?', a: "OUI, ABSOLUMENT — Code du sport L. 321-7. Pour TOUT éducateur sportif déclaré (carte pro). Sans RC Pro : retrait de la carte professionnelle d'éducateur sportif + interdiction d'exercer + sanctions pénales (75 000€ + 6 mois prison)." },
        { q: 'Combien coûte la RC Pro coach sportif en 2026 ?', a: "AE coach personnel : 220-380€/an. AE prof yoga/pilates : 280-480€/an. AE crossfit : 380-580€/an. Moniteur sport spécialisé : 480-980€/an. Salle de sport 5 coachs : 880-1 480€/an." },
        { q: 'Malaise cardiaque client : suis-je couvert ?', a: "OUI SI vous avez fait remplir le QUESTIONNAIRE DE SANTÉ OBLIGATOIRE avant la 1re séance (modèle PARQ ou similaire — obligation Code du sport depuis 2017). Sans questionnaire = exclusion de garantie. Faire signer aussi un certificat médical pour activités à risque (haltérophilie, sports de combat)." },
        { q: 'Coach à domicile client : extension habitation client ?', a: "Non — c'est VOUS (le coach) qui devez être assuré, pas le client. Votre RC Pro couvre les dommages que vous causez chez le client (faute professionnelle, blessure du client, dommage à son matériel)." },
      ]}
    />
  )
}
