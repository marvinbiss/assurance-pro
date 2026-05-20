/**
 * Admin auth — protection des pages /admin/*.
 *
 * MVP: token Bearer dans cookie 'admin_token' ou query ?token=.
 * Token = ADMIN_DASHBOARD_TOKEN env var.
 *
 * Future: Supabase Auth + RBAC + 2FA obligatoire.
 */

import { cookies } from 'next/headers'

export async function isAdminAuthenticated(searchToken?: string | null): Promise<boolean> {
  const expected = process.env.ADMIN_DASHBOARD_TOKEN
  if (!expected) return false
  const cookieStore = await cookies()
  const cookieToken = cookieStore.get('admin_token')?.value
  return cookieToken === expected || searchToken === expected
}

export function ADMIN_UNAUTHORIZED_HTML(): string {
  return `<!DOCTYPE html><html><head><title>401 — Admin</title>
<style>body{font-family:system-ui;max-width:480px;margin:6rem auto;padding:2rem;color:#111}</style></head>
<body>
<h1>401 — Admin access required</h1>
<p>Use cookie <code>admin_token</code> or <code>?token=...</code> query string.</p>
<form method="GET"><input name="token" type="password" placeholder="Admin token" style="padding:.6rem;width:100%"/><button style="margin-top:.6rem;padding:.6rem 1rem">Submit</button></form>
</body></html>`
}
