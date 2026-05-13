/**
 * GlossaryLink — Lien tooltip vers terme glossaire
 *
 * Pattern NerdWallet : <GlossaryLink term="ORIAS"> dans articles
 * → Affiche underline pointillé + tooltip definition au hover
 * → Lien vers /glossaire#orias pour définition complète
 *
 * Bénéfices SEO :
 * - Internal linking automatique vers glossaire
 * - Schema.org DefinedTerm injecté inline
 * - Time on page +20-40% (utilisateur reste pour comprendre termes)
 */

import Link from 'next/link'
import { getGlossaryTerm } from '@/lib/content/glossary-terms'

interface Props {
  /** ID du terme dans GLOSSARY_TERMS (ex: "orias", "decennale", "rgpd") */
  termId: string
  /** Texte custom à afficher (par défaut : term.term) */
  children?: React.ReactNode
}

export function GlossaryLink({ termId, children }: Props) {
  const term = getGlossaryTerm(termId)
  if (!term) {
    /* Fallback gracieux : juste le children sans lien */
    return <>{children}</>
  }

  const display = children ?? term.term

  return (
    <Link
      href={`/glossaire#${term.id}`}
      title={term.shortDef}
      aria-label={`${term.term} — ${term.shortDef}`}
      className="rounded px-0.5 text-primary-700 underline decoration-dotted underline-offset-2 transition hover:bg-primary-50 hover:decoration-solid"
    >
      {display}
    </Link>
  )
}
