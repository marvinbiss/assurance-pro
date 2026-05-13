/**
 * Pilier — Assurance santé professionnelle
 * KW Ahrefs : "assurance santé professionnelle" 150 vol KD 0 CPC 450€
 * Distinct de /assurance-sante-entreprise (ANI collective) — focus PERSONNEL pro indépendant.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-sante-professionnelle'
const TITLE = 'Assurance santé professionnelle — Mutuelle pour indépendants 2026'
const TAGLINE =
  "L'assurance santé pour les professionnels indépendants : mutuelle TNS Madelin, panier optique/dentaire renforcé, médecines douces, hospitalisation. Conseil ORIAS."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Assurance santé professionnelle pour indépendants : mutuelle TNS Madelin déductible, optique 100% Santé+, dentaire renforcé, médecines douces, hospitalisation jusqu'à 400% BR. Comparatif April, MMA, Generali, Aon. Tarifs 32-220€/mois. Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance santé professionnelle (mutuelle TNS) est la complémentaire santé spécialisée pour les Travailleurs Non Salariés (TNS) : artisans, commerçants, professions libérales, gérants majoritaires de SARL, EI, EURL. Sa particularité : cotisations DÉDUCTIBLES du bénéfice imposable au titre de la Loi Madelin (article 154 bis CGI), pouvant représenter jusqu'à ~5 800€/an d'économie fiscale pour un TNS dégageant 60 k€ de bénéfice. Distincte de l'assurance santé d'entreprise (mutuelle COLLECTIVE pour SALARIÉS), elle s'adresse au DIRIGEANT et au PRO INDÉPENDANT lui-même. Tarifs 2026 : 32-220 €/mois selon profil. Cette page renvoie vers nos piliers spécialisés selon votre métier."
      legalReference="Article 154 bis du CGI — Loi Madelin du 11 février 1994"
      isObligatoire={false}
      benefits={[
        {
          icon: '💰',
          title: 'Madelin déductible',
          desc: "Jusqu'à 5 800€/an déduits du bénéfice (60k€ bénéfice). Économie nette ~1 750€/an",
        },
        {
          icon: '🩺',
          title: 'Garanties calibrées TNS',
          desc: 'Optique 100% Santé+, dentaire renforcé, médecines douces, hospitalisation 400% BR',
        },
        {
          icon: '⚡',
          title: 'Tiers payant étendu',
          desc: "Pharmacie + spécialistes + hospitalisation. Pas d'avance de frais",
        },
        {
          icon: '🛡️',
          title: 'Couplable prévoyance',
          desc: 'Madelin couvre aussi IJ + invalidité + décès dans le même plafond fiscal',
        },
      ]}
      sections={[
        {
          h2: 'Hub santé pro : nos pages-piliers spécialisées',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    Mutuelle TNS Madelin
                  </Link>{' '}
                  — pilier complet pour indépendants au régime réel
                </li>
                <li>
                  <Link href="/mutuelle-pro-btp" className="text-primary-600 underline">
                    Mutuelle pro BTP
                  </Link>{' '}
                  — comparatif PRO BTP, April BTP, Harmonie BTP (16k vol/mois)
                </li>
                <li>
                  <Link href="/assurance-sante-entreprise" className="text-primary-600 underline">
                    Assurance santé entreprise
                  </Link>{' '}
                  — mutuelle COLLECTIVE obligatoire ANI 2013 (pour les SALARIÉS)
                </li>
                <li>
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    Prévoyance TNS
                  </Link>{' '}
                  — IJ + invalidité + capital décès (couplable Madelin)
                </li>
                <li>
                  <Link href="/assurance-medecin" className="text-primary-600 underline">
                    Assurance médecin
                  </Link>{' '}
                  — pack libéral global pour praticiens santé
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Différence assurance santé pro vs assurance santé entreprise ?',
          a: "ASSURANCE SANTÉ PRO (cette page) = mutuelle TNS pour le DIRIGEANT INDÉPENDANT lui-même (déductible Loi Madelin si régime réel). ASSURANCE SANTÉ ENTREPRISE = mutuelle COLLECTIVE OBLIGATOIRE pour TOUS les SALARIÉS (ANI 2013, 50% pris en charge employeur min). Voir <a href='/assurance-sante-entreprise' class='text-primary-600 underline'>/assurance-sante-entreprise</a>.",
        },
        {
          q: 'Combien coûte une mutuelle TNS en 2026 ?',
          a: "32-220€/mois selon profil. Voir notre pilier complet <a href='/mutuelle-tns' class='text-primary-600 underline'>/mutuelle-tns</a> avec tableau de tarifs détaillé par profil (artisan, consultant, profession libérale, dirigeant).",
        },
        {
          q: 'Plus de détails ?',
          a: "Voir nos piliers spécialisés : <a href='/mutuelle-tns' class='text-primary-600 underline'>/mutuelle-tns</a> (santé), <a href='/prevoyance-tns' class='text-primary-600 underline'>/prevoyance-tns</a> (IJ + invalidité), <a href='/mutuelle-pro-btp' class='text-primary-600 underline'>/mutuelle-pro-btp</a> (secteur BTP).",
        },
      ]}
    />
  )
}
