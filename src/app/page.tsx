/**
 * Homepage — Assurance Pro France
 * Courtier ORIAS multi-vertical (BTP / RC Pro / Mutuelle / VTC / etc.)
 */

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assurance Pro — Comparez et économisez en 2 minutes',
  description:
    'Courtier ORIAS spécialiste assurance professionnelle. Comparez les offres de 10+ assureurs partenaires. Décennale, RC Pro, Multirisque, Mutuelle, VTC, Cyber. Devis gratuit et sans engagement.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr',
  },
}

const VERTICALS = [
  {
    code: 'decennale',
    title: 'Décennale BTP',
    desc: 'Maçon, plombier, électricien, couvreur, peintre… Garantie obligatoire selon la Loi Spinetta.',
    href: '/assurance-decennale',
    icon: '🏗️',
    examples: '52 métiers BTP couverts',
  },
  {
    code: 'rc-pro',
    title: 'RC Pro',
    desc: 'Consultants, freelances, services aux entreprises, agences digitales, coachs.',
    href: '/rc-pro',
    icon: '💼',
    examples: '32 professions couvertes',
  },
  {
    code: 'multirisque-pro',
    title: 'Multirisque Pro',
    desc: 'Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d’exploitation.',
    href: '/multirisque-pro',
    icon: '🏢',
    examples: '30 secteurs d’activité',
  },
  {
    code: 'mutuelle-pro',
    title: 'Mutuelle Pro / TNS',
    desc: 'Travailleurs non-salariés, dirigeants, freelances. Loi Madelin déductible.',
    href: '/mutuelle-pro',
    icon: '🏥',
    examples: 'Comparatif 8 mutuelles',
  },
  {
    code: 'assurance-vtc',
    title: 'VTC / Taxi',
    desc: 'Chauffeur privé, location avec chauffeur, plateformes Uber / Bolt / Heetch.',
    href: '/assurance-vtc',
    icon: '🚗',
    examples: 'Auto-entrepreneur ou SARL',
  },
  {
    code: 'cyber-assurance',
    title: 'Cyber Assurance',
    desc: 'E-commerce, ESN, agences digitales. Ransomware, RGPD breach, fuite de données.',
    href: '/cyber-assurance',
    icon: '🔒',
    examples: 'Couverture jusqu’à 5 M€',
  },
]

const TRUST_INDICATORS = [
  { value: '10+', label: 'Assureurs partenaires' },
  { value: '17', label: 'Verticaux couverts' },
  { value: '24h', label: 'Délivrance attestation' },
  { value: '0€', label: 'Frais de courtage' },
]

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-sm font-semibold tracking-wider uppercase opacity-90 mb-4">
            Courtier en assurance professionnelle ORIAS n°
            {process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Votre assurance pro,<br />comparée et négociée en 2&nbsp;minutes
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-3xl">
            Décennale, RC&nbsp;Pro, Multirisque, Mutuelle TNS, VTC, Cyber. Recevez 3&nbsp;devis personnalisés
            en moins de 24&nbsp;heures auprès de nos partenaires assureurs reconnus.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/devis"
              className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Obtenir mon devis gratuit →
            </Link>
            <a
              href="#verticaux"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Découvrir les garanties
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
            {TRUST_INDICATORS.map((t) => (
              <div key={t.label}>
                <div className="text-3xl md:text-4xl font-bold">{t.value}</div>
                <div className="text-sm opacity-90 mt-1">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="verticaux" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Une assurance adaptée à votre métier
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Notre cabinet de courtage spécialiste de l’assurance pro intervient
            sur l’ensemble des verticaux professionnels en France.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERTICALS.map((v) => (
              <Link
                key={v.code}
                href={v.href}
                className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition border border-gray-200"
              >
                <div className="text-4xl mb-3" aria-hidden="true">{v.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-600 mb-4">{v.desc}</p>
                <p className="text-sm text-blue-600 font-medium">{v.examples} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            3 étapes pour souscrire votre assurance pro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: 1, title: 'Vos besoins', desc: 'Décrivez votre activité, votre profil et vos garanties souhaitées. 2 minutes chrono.' },
              { n: 2, title: 'Comparaison', desc: 'Notre équipe interroge nos 10 assureurs partenaires et négocie pour vous. Réponse sous 24 heures.' },
              { n: 3, title: 'Souscription', desc: 'Vous choisissez l’offre la plus adaptée. Attestation délivrée sous 24 heures après souscription.' },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                  {s.n}
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Nos partenaires assureurs</h2>
          <p className="text-gray-600 mb-8">
            Nous comparons les offres de plus de 10 compagnies d’assurance reconnues.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-gray-700 font-medium">
            {['Hiscox', 'April Pro', 'Allianz Pro', 'MMA Pro', 'Generali Pro', 'AXA Pro', 'MAAF Pro', 'SMABTP', 'Wakam', 'Stello'].map((p) => (
              <span key={p} className="px-4 py-2 bg-white rounded border border-gray-200">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-700 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à comparer votre assurance pro&nbsp;?</h2>
          <p className="text-lg mb-8 opacity-95">
            Devis gratuit, sans engagement. Recevez vos premières offres en moins de 24&nbsp;heures.
          </p>
          <Link href="/devis" className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            Démarrer mon devis →
          </Link>
        </div>
      </section>

      <section className="py-6 bg-gray-100 text-xs text-gray-600">
        <div className="container mx-auto px-4 max-w-5xl">
          <p>
            <strong>Information précontractuelle —</strong> Ce contenu est informatif et ne
            constitue pas un conseil personnalisé au sens de l’article L.&nbsp;521-4 du Code des
            assurances. Pour un conseil adapté à votre situation, un courtier ORIAS vous
            recontactera après réception de votre demande de devis. Aucune commission n’est
            facturée à nos clients ; nous sommes rémunérés par les compagnies d’assurance
            partenaires.
          </p>
        </div>
      </section>
    </>
  )
}
