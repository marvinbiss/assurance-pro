/**
 * Supabase env accessors — runtime-checked.
 *
 * Replaces non-null assertions (`process.env.X!`) with a single explicit
 * boundary that throws a clear error if the variable is missing.
 * Imported by all supabase/* factories.
 */

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `[supabase] Missing required environment variable: ${name}. ` +
        `Set it in .env.local for development or in the hosting environment for production.`
    )
  }
  return value
}

export const supabaseUrl = (): string => required('NEXT_PUBLIC_SUPABASE_URL')
export const supabaseAnonKey = (): string => required('NEXT_PUBLIC_SUPABASE_ANON_KEY')
export const supabaseServiceRoleKey = (): string => required('SUPABASE_SERVICE_ROLE_KEY')
