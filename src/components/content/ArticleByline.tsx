/**
 * ArticleByline — Signal E-E-A-T en haut de chaque article (pattern NerdWallet/Investopedia).
 *
 * Affiche :
 * - Auteur expert (lien vers /equipe/[slug])
 * - Reviewer (optionnel, pour articles techniques)
 * - Date publication + dernière mise à jour
 * - Temps de lecture estimé
 *
 * Best practice E-E-A-T (Google Search Quality Guidelines 2024) :
 * - Authorship visible = signal expertise
 * - dateModified visible = signal freshness
 * - reviewer = signal accuracy
 */

import Link from 'next/link'
import { formatReadingTime } from '@/lib/content/reading-time'

export interface BylinePerson {
  name: string
  slug?: string /* /equipe/[slug] */
  role?: string
}

interface ArticleBylineProps {
  author: BylinePerson
  reviewer?: BylinePerson
  factCheckedBy?: BylinePerson
  datePublished: string /* ISO date "2025-01-15" */
  dateModified?: string /* ISO date "2025-12-04" */
  readingTimeMinutes?: number
  className?: string
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function PersonLink({ person, prefix }: { person: BylinePerson; prefix: string }) {
  const display = (
    <span className="font-semibold text-gray-900">
      {person.name}
      {person.role ? <span className="font-normal text-gray-600"> ({person.role})</span> : null}
    </span>
  )
  return (
    <span className="text-sm text-gray-600">
      {prefix}{' '}
      {person.slug ? (
        <Link href={`/equipe/${person.slug}`} className="hover:text-blue-700 hover:underline">
          {display}
        </Link>
      ) : (
        display
      )}
    </span>
  )
}

export function ArticleByline({
  author,
  reviewer,
  factCheckedBy,
  datePublished,
  dateModified,
  readingTimeMinutes,
  className = '',
}: ArticleBylineProps) {
  const showUpdate = dateModified && dateModified !== datePublished

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-gray-200 py-3 text-sm text-gray-600 ${className}`}
      role="contentinfo"
    >
      <PersonLink person={author} prefix="Par" />

      {reviewer && (
        <>
          <span className="text-gray-300" aria-hidden="true">
            ·
          </span>
          <PersonLink person={reviewer} prefix="Relu par" />
        </>
      )}

      {factCheckedBy && (
        <>
          <span className="text-gray-300" aria-hidden="true">
            ·
          </span>
          <PersonLink person={factCheckedBy} prefix="Vérifié par" />
        </>
      )}

      <span className="text-gray-300" aria-hidden="true">
        ·
      </span>
      <time dateTime={datePublished} className="text-gray-600">
        Publié le <strong className="font-semibold">{formatDate(datePublished)}</strong>
      </time>

      {showUpdate && (
        <>
          <span className="text-gray-300" aria-hidden="true">
            ·
          </span>
          <time dateTime={dateModified} className="inline-flex items-center gap-1">
            <span className="text-emerald-600" aria-hidden="true">
              ↻
            </span>
            <span>
              Mis à jour le <strong className="font-semibold">{formatDate(dateModified!)}</strong>
            </span>
          </time>
        </>
      )}

      {readingTimeMinutes && (
        <>
          <span className="text-gray-300" aria-hidden="true">
            ·
          </span>
          <span className="text-gray-600">
            ⏱ {formatReadingTime(readingTimeMinutes)} de lecture
          </span>
        </>
      )}
    </div>
  )
}
