'use server'

import { z } from 'zod'

const NewsletterSchema = z.object({
  email: z.string().email("L'email n'est pas valide").max(254),
  honeypot: z.string().max(0).optional(),
})

export interface NewsletterResult {
  ok: boolean
  message: string
}

export async function subscribeNewsletter(formData: FormData): Promise<NewsletterResult> {
  const raw = {
    email: String(formData.get('email') ?? ''),
    honeypot: String(formData.get('company') ?? ''),
  }
  const parsed = NewsletterSchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? 'Email invalide' }
  }
  if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
    // Honeypot triggered — silent success.
    return { ok: true, message: 'Inscription enregistrée. Merci !' }
  }

  // Best-effort persistence : insère dans `newsletter_subscribers` si la table existe,
  // sinon log seulement (table à créer côté Supabase ; ne pas bloquer la conversion).
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (url && key) {
      const res = await fetch(`${url}/rest / v1/newsletter_subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: 'resolution=ignore-duplicates',
        },
        body: JSON.stringify({ email: parsed.data.email, source: 'blog-footer' }),
      })
      if (!res.ok && res.status !== 409) {
        console.warn('[newsletter] supabase insert failed', res.status)
      }
    }
  } catch (err) {
    console.error('[newsletter] persistence error', err)
  }

  return { ok: true, message: 'Inscription enregistrée. À très bientôt.' }
}
