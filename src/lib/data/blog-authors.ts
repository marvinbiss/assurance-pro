import type { BlogAuthor } from './blog-blocks'

export const AUTHORS: Record<string, BlogAuthor> = {
  'cabinet-vivos': {
    name: 'Cabinet Vivos Assurance',
    role: 'Courtier ORIAS spécialiste BTP & RC Pro',
    bio: 'Cabinet de courtage indépendant spécialisé en assurance professionnelle BTP, RC Pro et mutuelle TNS. Conseil motivé conforme art. L. 521-4 du Code des assurances.',
  },
}

const DEFAULT_AUTHOR: BlogAuthor = AUTHORS['cabinet-vivos'] as BlogAuthor

export function getAuthorByName(name: string): BlogAuthor {
  for (const a of Object.values(AUTHORS)) {
    if (a.name === name) return a
  }
  return DEFAULT_AUTHOR
}
