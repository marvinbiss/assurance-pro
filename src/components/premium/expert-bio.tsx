import { Linkedin } from 'lucide-react'
import Image from 'next/image'

interface ExpertBioProps {
  name: string
  role: string
  orias?: string
  linkedin?: string
  bio: string
  avatar?: string
  className?: string
}

function getInitials(name: string): string {
  const parts = name
    .split(/\s+/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0]?.charAt(0) ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : ''
  return (first + last).toUpperCase() || '?'
}

export function ExpertBio({
  name,
  role,
  orias,
  linkedin,
  bio,
  avatar,
  className = '',
}: ExpertBioProps) {
  const initials = getInitials(name)
  const oriasText = orias ? ` · ORIAS n°${orias}` : ''

  return (
    <article
      className={`flex flex-col gap-5 rounded-2xl border border-sand-300 bg-white p-8 shadow-soft sm:flex-row sm:items-start ${className}`}
      aria-label={`Expert : ${name}`}
    >
      <div className="shrink-0">
        {avatar ? (
          <Image
            src={avatar}
            alt={`Portrait de ${name}`}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full border border-sand-300 object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-20 w-20 items-center justify-center rounded-full border border-primary-200 bg-primary-100 font-heading text-2xl font-semibold text-primary-700"
          >
            {initials}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <header className="flex flex-col gap-1">
          <h3
            className="text-2xl font-medium text-charcoal-900"
            style={{ fontFamily: 'var(--font-fraunces), Fraunces, serif' }}
          >
            {name}
          </h3>
          <p className="font-heading text-sm text-charcoal-600">
            {role}
            {oriasText}
          </p>
        </header>

        <p className="max-w-prose font-sans text-base leading-relaxed text-charcoal-700">{bio}</p>

        {linkedin ? (
          <div>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Profil LinkedIn de ${name} (nouvelle fenêtre)`}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal-300 bg-white px-4 py-2 font-heading text-sm font-semibold text-charcoal-800 outline-none hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 motion-safe:transition-colors"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
              <span>LinkedIn</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  )
}
