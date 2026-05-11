/**
 * Pilier — "assurance décennale maitre d'oeuvre" (150 vol, KD 0, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-maitre-d-oeuvre'
const TITLE = "Assurance Décennale Maître d'Oeuvre — MOE, BET, architecte"
const TAGLINE =
  "Le maître d'oeuvre (MOE), BET et architecte sont soumis à la décennale (Loi Spinetta). Spécificités, plafonds élevés requis, tarifs 1 800-8 000€/an."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Décennale maître d'œuvre : MOE, BET, architecte couverts Loi Spinetta. Tarif AE 1 800-2 800€/an, SARL 3 500-8 000€/an. Plafond 3-5M€ recommandé.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le maître d'œuvre (MOE), le bureau d'études techniques (BET), l'architecte DPLG/ENSA et l'économiste de la construction sont des constructeurs au sens de la Loi Spinetta (art. 1792-1 Code civil). Ils sont donc soumis à l'obligation décennale comme les artisans BTP, mais avec des spécificités : responsabilité de conception (vs exécution), plafonds élevés requis (jusqu'à 5M€), et risques aggravés en cas de coordination défaillante entre corps d'état."
      legalReference="Loi Spinetta + art. 1792-1 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      benefits={[
        {
          icon: '🏗️',
          title: 'MOE + BET + architecte',
          desc: 'Tous les acteurs de la conception/coordination concernés',
        },
        {
          icon: '🛡️',
          title: 'Plafond 3-5M€ recommandé',
          desc: 'MOE engage sa responsabilité sur l&apos;ensemble du projet',
        },
        {
          icon: '💰',
          title: '1 800-8 000€/an',
          desc: 'AE MOE 1 800-2 800€ • SARL 3 500-5 500€ • SAS PME 5 000-8 000€',
        },
        {
          icon: '⚖️',
          title: 'Responsabilité conception',
          desc: 'Plans, choix techniques, coordination corps d&apos;état',
        },
      ]}
      sections={[
        {
          h2: 'Sinistres typiques MOE / BET / architecte',
          body: (
            <ul>
              <li>
                <strong>Erreur conception structure</strong> : poutre sous-dimensionnée →
                effondrement partiel après réception. Indemnisation 100k-1M€.
              </li>
              <li>
                <strong>Défaut coordination corps d&apos;état</strong> : plomberie/électricité
                incompatibles → reprise complète 50-200k€.
              </li>
              <li>
                <strong>Erreur étude thermique</strong> : RT 2012/RE 2020 non respectée →
                non-conformité réglementaire 30-150k€.
              </li>
              <li>
                <strong>Mauvaise étude sol</strong> : fondation inadaptée → fissures structurelles
                100-500k€.
              </li>
              <li>
                <strong>Plan masse incorrect</strong> : non-respect PLU, retrait imposé → démolition
                partielle 200k-1M€.
              </li>
              <li>
                <strong>Choix matériaux inadapté</strong> : matériau non conforme normes → reprise
                façade 50-300k€.
              </li>
              <li>
                <strong>Suivi chantier défaillant</strong> : malfaçons non-détectées en cours →
                multiplication sinistres N+1 à N+5.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Pourquoi plafond 3-5M€ recommandé',
          body: (
            <>
              <p>
                Le MOE engage sa responsabilité sur <strong>l&apos;ensemble du projet</strong> (vs
                un artisan responsable de son lot uniquement). Cumul potentiel des sinistres :
              </p>
              <ul>
                <li>Sinistre 1 : structure mal calculée (200k€)</li>
                <li>Sinistre 2 : coordination CVC défaillante (150k€)</li>
                <li>Sinistre 3 : étanchéité mal spécifiée (300k€)</li>
                <li>Sinistre 4 : matériau non conforme (100k€)</li>
                <li>
                  <strong>Cumul possible</strong> : 750k€ — dépasse rapidement un plafond de 1M€
                </li>
              </ul>
              <p>
                Plafond recommandé : <strong>3M€ minimum</strong> pour MOE AE,{' '}
                <strong>5M€ pour SARL/SAS</strong> opérant sur projets importants (logements
                collectifs, ERP).
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs décennale MOE / BET / architecte 2026',
          body: (
            <ul>
              <li>
                <strong>AE maître d&apos;œuvre (CA &lt; 80k€)</strong> : 1 800-2 800€/an, plafond
                1-2M€
              </li>
              <li>
                <strong>AE BET généraliste</strong> : 2 200-3 500€/an, plafond 2-3M€
              </li>
              <li>
                <strong>AE architecte DPLG/ENSA</strong> : 2 500-4 500€/an, plafond 3-5M€ (ordre des
                architectes minimum)
              </li>
              <li>
                <strong>SARL MOE 1-5 salariés</strong> : 3 500-6 500€/an
              </li>
              <li>
                <strong>SARL/SAS BET technique 5-15 salariés</strong> : 5 000-12 000€/an
              </li>
              <li>
                <strong>Cabinet architecture PME 10-30 architectes</strong> : 8 000-25 000€/an
              </li>
              <li>
                <strong>Cabinet architecture grosse structure ERP/hôpital</strong> : 25 000-100
                000€/an+
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Un maître d&apos;œuvre AE doit-il avoir une décennale ?',
          a: 'OUI obligatoire (Loi Spinetta art. 1792-1). Aucune exception. Le MOE engage sa responsabilité sur la conception ET la coordination des travaux pendant 10 ans après réception. Tarif AE MOE : 1 800-2 800€/an minimum.',
        },
        {
          q: 'Quelle différence MOE vs entrepreneur principal ?',
          a: "MOE = conçoit et coordonne (responsabilité conception). Entrepreneur principal = exécute (responsabilité exécution). Tous deux soumis à décennale mais le MOE engage sa responsabilité sur l'ensemble du projet (cumul possible des sinistres).",
        },
        {
          q: 'Architecte DPLG : quelle assurance Ordre exige ?',
          a: "L'Ordre des Architectes exige une décennale + RC Pro avec plafond minimum 3M€ pour exercer en libéral. Sans cette assurance : suspension de l&apos;inscription à l&apos;Ordre, interdiction d&apos;exercer.",
        },
        {
          q: 'Comment réduire la prime décennale MOE ?',
          a: '1) Comparer 5 assureurs spécialisés MOE (MAF, MMA Pro Architectes, AXA Pro, Allianz Pro, SMABTP). 2) Augmenter franchise (-15-20%). 3) Qualifications OPQIBI, OPQTECC (-5-10%). 4) Pack RC Pro + Décennale + Multirisque (-15-25%).',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale obligatoire', slug: 'assurance-decennale-obligatoire' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Dommages-Ouvrage', slug: 'assurance-dommages-ouvrage' },
      ]}
    />
  )
}
