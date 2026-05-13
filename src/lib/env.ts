import { z } from 'zod'

/**
 * Validation runtime des variables d'environnement Vivos Assurance.
 * Importé uniquement par /api/health pour la sonde infrastructure.
 */

const envSchema = z.object({
  // Core infra
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Identité publique
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_ORIAS_NUMBER: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),

  // Email transactionnel
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),
  COURTIER_INBOX: z.string().email().optional(),
  RECLAMATIONS_INBOX: z.string().email().optional(),

  // Sécurité
  CRON_SECRET: z.string().min(16).optional(),
  ADMIN_API_TOKEN: z.string().min(32).optional(),
  CROSS_DOMAIN_JWT_SECRET: z.string().min(32).optional(),
  GDPR_DELETE_TOKEN_SECRET: z.string().min(32).optional(),
  GDPR_EXPORT_TOKEN_SECRET: z.string().min(32).optional(),
  REVALIDATE_SECRET: z.string().min(16).optional(),

  // Rate-limiting
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // APIs externes (optionnelles)
  LEGIFRANCE_CLIENT_ID: z.string().optional(),
  LEGIFRANCE_CLIENT_SECRET: z.string().optional(),
  INSEE_API_TOKEN: z.string().optional(),
  AHREFS_API_TOKEN: z.string().optional(),

  // Indexation
  INDEXNOW_API_KEY: z.string().optional(),

  // Identité légale (mentions, FIC, IPID)
  COMPANY_LEGAL_NAME: z.string().optional(),
  COMPANY_FORME_JURIDIQUE: z.string().optional(),
  COMPANY_CAPITAL_SOCIAL: z.string().optional(),
  COMPANY_SIRET: z.string().optional(),
  COMPANY_RCS: z.string().optional(),
  COMPANY_TVA: z.string().optional(),
  COMPANY_ADDRESS: z.string().optional(),
  COMPANY_PHONE: z.string().optional(),
  COMPANY_DIRECTEUR_PUBLICATION: z.string().optional(),
  COMPANY_FOUNDING_DATE: z.string().optional(),
  COMPANY_STATUS: z.enum(['pre-launch', 'launched']).optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  if (process.env.NEXT_BUILD_SKIP_DB || process.env.NODE_ENV === 'test' || process.env.VITEST) {
    return process.env as unknown as Env
  }
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(
      [
        '',
        '===========================================',
        ' Invalid environment variables',
        '===========================================',
        issues,
        '',
        'Hint: check .env.local for development or the hosting environment for prod.',
        '===========================================',
        '',
      ].join('\n')
    )
  }
  return result.data
}

export const env = validateEnv()
