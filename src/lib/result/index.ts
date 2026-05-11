/**
 * Result pattern — modélisation explicite des erreurs comme valeurs.
 *
 * Inspiré de Rust/Elm/F#. Force le caller à gérer l'échec au lieu
 * d'oublier un try/catch perdu dans la pile.
 *
 * Convention :
 *   - Result<T, E> = Ok(T) | Err(E)
 *   - ResultAsync<T, E> = Promise<Result<T, E>>
 *   - Erreurs typées (pas de string anonyme), avec discriminator code
 *
 * Usage :
 *   const r = await getPage('rc-pro')
 *   if (r.isErr()) {
 *     match(r.error)
 *       .with({ code: 'NotFound' }, () => ...)
 *       .with({ code: 'Database' }, (e) => log(e))
 *       .exhaustive()
 *     return notFound()
 *   }
 *   return render(r.value)
 */

export {
  Result,
  ResultAsync,
  ok,
  okAsync,
  err,
  errAsync,
  fromPromise,
  fromThrowable,
} from 'neverthrow'

/**
 * Standard erreurs domaine assurance.
 * Étendre selon besoin avec discriminator `code` constant.
 */
export type DomainError =
  | { code: 'NotFound'; resource: string; identifier?: string }
  | { code: 'ValidationFailed'; field: string; reason: string }
  | { code: 'Unauthorized'; reason?: string }
  | { code: 'Forbidden'; reason?: string }
  | { code: 'RateLimited'; retryAfterMs: number }
  | { code: 'Database'; query: string; cause: unknown }
  | { code: 'External'; service: string; cause: unknown }
  | { code: 'Conflict'; reason: string }
  | { code: 'Internal'; cause: unknown }

export function notFoundError(resource: string, identifier?: string): DomainError {
  return { code: 'NotFound', resource, ...(identifier ? { identifier } : {}) }
}

export function validationError(field: string, reason: string): DomainError {
  return { code: 'ValidationFailed', field, reason }
}

export function databaseError(query: string, cause: unknown): DomainError {
  return { code: 'Database', query, cause }
}

export function externalError(service: string, cause: unknown): DomainError {
  return { code: 'External', service, cause }
}

/**
 * Convertit une erreur domaine en HTTP status code standard.
 */
export function domainErrorToStatus(e: DomainError): number {
  switch (e.code) {
    case 'NotFound':
      return 404
    case 'ValidationFailed':
      return 400
    case 'Unauthorized':
      return 401
    case 'Forbidden':
      return 403
    case 'Conflict':
      return 409
    case 'RateLimited':
      return 429
    case 'Database':
    case 'External':
    case 'Internal':
    default:
      return 500
  }
}
