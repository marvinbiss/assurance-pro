/**
 * Pilier — "responsabilité civile professionnelle informatique" (100 vol, KD 0, CPC 1 300€)
 * 🥇 LE PLUS HAUT CPC du marché Ahrefs assurance pro
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'responsabilite-civile-professionnelle-informatique'
const TITLE = 'Responsabilité Civile Professionnelle Informatique — Guide complet'
const TAGLINE =
  'RC Pro informatique : guide complet pour développeurs, consultants IT, agences web, cybersécurité. Plafonds, sinistres, cyber-assurance combinée, comparatif assureurs.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Responsabilité Civile Professionnelle informatique : guide expert pour pros IT. Plafond 1-10M€, postériorité 10 ans, cyber-assurance combinée. Tarifs 95-15 000€/an.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La Responsabilité Civile Professionnelle informatique est l'assurance la plus stratégique pour les pros du numérique : freelance dev, consultant IT, agence web, ESN, cybersécurité, hébergeur, data scientist. Le CPC Google Ads le plus élevé du marché assurance pro (1 300€) reflète la valeur client : un sinistre informatique peut coûter de 30k€ à 5M€+ (bug critique production, fuite de données, violation RGPD). Ce guide complet détaille les obligations, plafonds, exclusions cachées et bonnes pratiques pour choisir sa RC Pro IT."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi 78-17 RGPD + RGPD européen"
      benefits={[
        {
          icon: '💻',
          title: 'Pros numérique couverts',
          desc: 'Dev, consultant IT, agence web, ESN, cybersécurité, hébergeur, data',
        },
        {
          icon: '🔐',
          title: 'Cyber-assurance combinée',
          desc: 'Indispensable si données client : couvre ransomware + RGPD + restauration',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1-10M€',
          desc: 'AE 1M€ • SARL/SAS 2-5M€ • ESN PME 5-10M€ • cybersécurité spé 10M€+',
        },
        {
          icon: '⏰',
          title: 'Postériorité 10 ans',
          desc: 'Critique en IT (sinistres tardifs fréquents). Hiscox seul propose 10 ans',
        },
      ]}
      sections={[
        {
          h2: 'Pourquoi RC Pro IT a le CPC le plus élevé',
          body: (
            <>
              <p>
                La RC Pro informatique génère <strong>1 300€/clic Google Ads</strong> — le CPC le
                plus élevé du marché assurance pro. Raisons :
              </p>
              <ul>
                <li>
                  <strong>Sinistres potentiellement catastrophiques</strong> : 30k-5M€ par incident
                </li>
                <li>
                  <strong>Marché très concurrentiel</strong> : 50+ assureurs ciblent ce segment
                </li>
                <li>
                  <strong>LTV client élevée</strong> : pros IT renouvellent + souscrivent
                  cyber-assurance combinée
                </li>
                <li>
                  <strong>Conversion forte</strong> : pros IT décident vite, achat en ligne sans
                  friction
                </li>
                <li>
                  <strong>Volume modéré mais qualifié</strong> : 100 recherches/mois mais quasi-100%
                  intent commercial fort
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Activités IT couvertes par RC Pro',
          body: (
            <ul>
              <li>
                <strong>Développement</strong> : web (frontend + backend), mobile, embarqué, IA/ML,
                jeux vidéo
              </li>
              <li>
                <strong>Conseil IT</strong> : architecture SI, transformation digitale, audit,
                DevOps
              </li>
              <li>
                <strong>Cybersécurité</strong> : audit, pentest, SOC, gestion incidents
              </li>
              <li>
                <strong>Hébergement</strong> : web, SaaS, IaaS, cloud privé
              </li>
              <li>
                <strong>Data</strong> : data engineering, data science, IA, big data, business
                intelligence
              </li>
              <li>
                <strong>Agence web</strong> : sites e-commerce, sites vitrines, refonte, SEO, ads
              </li>
              <li>
                <strong>Design</strong> : UX/UI, design system, prototypage
              </li>
              <li>
                <strong>Formation IT</strong> : bootcamps, formations sur-mesure, certifications
              </li>
              <li>
                <strong>ESN / SSII</strong> : prestations multi-clients, régie, forfait
              </li>
            </ul>
          ),
        },
        {
          h2: 'Exclusions à connaître absolument',
          body: (
            <ul>
              <li>
                <strong>Cyber-attaques contre votre infrastructure</strong> : ransomware, DDoS
                contre vos serveurs → EXCLU RC Pro standard. Nécessite cyber-assurance dédiée.
              </li>
              <li>
                <strong>Amendes administratives</strong> : CNIL (RGPD), AMF, ACPR → EXCLUES par
                principe (ordre public). Frais de défense restent couverts.
              </li>
              <li>
                <strong>Faute intentionnelle</strong> : exclusion absolue (fraude, malveillance
                assuré).
              </li>
              <li>
                <strong>Code open source mal licencié</strong> : si vous utilisez GPL/AGPL sans
                respecter conditions → exclusion possible.
              </li>
              <li>
                <strong>Données médicales / financières spécifiques</strong> : extensions dédiées
                requises (souvent activité réglementée).
              </li>
              <li>
                <strong>Pertes commerciales pures</strong> du client (sans dommage matériel) :
                couverture variable, à vérifier.
              </li>
              <li>
                <strong>Crypto-monnaies</strong> : exclusion fréquente (sauf extension blockchain
                spécifique).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs RC Pro IT 2026',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : leader services intellectuels IT. Best price AE
                (95-220€/an), postériorité 10 ans (unique), plafond jusqu&apos;à 10M€.
                Cyber-assurance combinée excellente.
              </li>
              <li>
                <strong>Stello</strong> : challenger digital pure. Best AE (90-200€/an), 100%
                online, postériorité 5 ans. Cyber-assurance limitée.
              </li>
              <li>
                <strong>Generali Pro</strong> : programme &quot;Generali Vitality&quot;, fort sur
                cyber combinée. Tarif moyen.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture large multi-secteurs, postériorité 5 ans.
                Bon rapport prix/garanties SARL/SAS.
              </li>
              <li>
                <strong>Beazley</strong> : spécialiste cybersécurité haut de gamme. Pour ESN /
                hébergeurs / data players avec besoins 5M€+. Cher mais best of class.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Pourquoi la RC Pro IT a-t-elle le CPC le plus élevé en France ?',
          a: 'Combinaison : 1) Sinistres potentiellement catastrophiques (30k-5M€ par incident), 2) Marché ultra-concurrentiel (50+ assureurs), 3) LTV client élevée (renouvellements + cyber-assurance combinée), 4) Pros IT décident vite (conversion forte). CPC Google Ads atteint 1 300€/clic.',
        },
        {
          q: 'Quelle est la meilleure RC Pro pour un freelance dev ?',
          a: 'Hiscox = best pour AE dev (95-180€/an, postériorité 10 ans, plafond 1M€). Stello = challenger digital pure 100% en ligne (90-200€/an, postériorité 5 ans). Pour SARL/SAS &gt; 100k€ CA : Allianz Pro ou Generali Pro souvent mieux placés.',
        },
        {
          q: 'Cyber-assurance vraiment indispensable pour un pro IT ?',
          a: 'OUI quasi-systématiquement. La RC Pro standard EXCLUT les cyber-attaques contre votre propre infrastructure, les frais notification CNIL (obligatoire RGPD &lt; 72h), les frais de restauration de données. Sans cyber-assurance, un ransomware vous expose à 30-300k€ de pertes non couvertes.',
        },
        {
          q: 'Combien coûte une RC Pro pour une ESN de 20 consultants ?',
          a: 'ESN moyenne (20 consultants, CA 2-5M€) : 2 500-8 000€/an RC Pro chez Hiscox ou Allianz Pro, plafond 3-5M€. Ajouter cyber-assurance : +2 000-10 000€/an. Pack global négocié : -15-25% via courtier ORIAS spécialisé IT.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro Informatique (vue résumée)', slug: 'rc-pro-informatique' },
        { name: 'RC Pro freelance informatique', slug: 'rc-pro-freelance-informatique' },
        {
          name: 'Assurance RC Pro Informatique (souscription)',
          slug: 'assurance-rc-pro-informatique',
        },
        { name: 'Cyber assurance', slug: 'cyber-assurance' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'RC Pro consultant', slug: 'rc-pro-consultant' },
      ]}
    />
  )
}
