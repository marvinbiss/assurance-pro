/**
 * GET /api/openapi.json — Vivos Assurance Public API spec.
 *
 * OpenAPI 3.1.0 — consommable par:
 *   - Scalar / Swagger UI (rendu sur /docs)
 *   - openapi-generator (auto SDK TypeScript/Python/Go/...)
 *   - Postman / Insomnia import
 *   - Agents IA (génération clients programmatique)
 */

import { NextResponse } from 'next/server'
import { buildOpenAPISpec } from '@/lib/openapi/spec'

export function GET() {
  return NextResponse.json(buildOpenAPISpec(), {
    headers: {
      'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
      'access-control-allow-origin': '*',
      'content-type': 'application/json; charset=utf-8',
    },
  })
}
