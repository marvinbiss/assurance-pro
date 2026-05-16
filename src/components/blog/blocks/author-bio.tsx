import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, ShieldCheck } from 'lucide-react'
import type { BlogAuthor } from '@/lib/data/blog-blocks'

export type AuthorBioProps = BlogAuthor

export function AuthorBio({ name, role, avatar, oriasN, linkedinUrl, bio }: AuthorBioProps) {
  return (
    <section
      aria-labelledby="author-bio-heading"
      className="mt-16 overflow-hidden rounded-3xl bg-sand-100 p-8 md:p-10"
    >
      <h2 id="author-bio-heading" className="sr-only">
        À propos de l’auteur
      </h2>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={96}
            height={96}
            className="h-24 w-24 flex-shrink-0 rounded-full object-cover shadow-soft ring-2 ring-sand-300"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-3xl font-extrabold text-white shadow-soft ring-2 ring-sand-300"
          >
            {name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <p className="m-0 font-heading text-xl font-extrabold tracking-tight text-charcoal-900">
            {name}
          </p>
          <p className="m-0 mt-1 text-xs font-bold uppercase tracking-wider text-charcoal-600">
            {role}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {oriasN && oriasN !== '...' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-secondary-800">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                ORIAS n° {oriasN}
              </span>
            )}
            {linkedinUrl && (
              <Link
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 transition-colors hover:text-primary-900"
              >
                <Linkedin className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                LinkedIn
              </Link>
            )}
          </div>
          {bio && <p className="mt-4 text-[15px] leading-relaxed text-charcoal-700">{bio}</p>}
        </div>
      </div>
    </section>
  )
}
