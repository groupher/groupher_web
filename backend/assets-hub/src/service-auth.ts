/**
 * Centralizes the Assets Hub internal service-auth verifier contract.
 *
 *   Node provider / Cloudflare Worker
 *     -> shared audience and endpoint defaults
 *     -> service-token verifier
 *     -> scoped internal Assets Hub request
 */

import { createServiceAuthVerifier } from '@groupher/service/auth'

export const ASSETS_HUB_INTERNAL_AUDIENCE = 'assets-hub:internal-api'
export const DEFAULT_SERVICE_AUTH_ISSUER = 'https://auth.groupher.com'
export const DEFAULT_SERVICE_AUTH_JWKS_URL = 'https://auth.groupher.com/.well-known/jwks.json'

export type TAssetsHubInternalVerifier = ReturnType<typeof createServiceAuthVerifier>

const verifierCache = new Map<string, TAssetsHubInternalVerifier>()

/** Builds the verifier shared by the Node local provider and Cloudflare Worker adapters. */
export const createAssetsHubInternalVerifier = (
  issuer: string,
  jwksUrl: string,
): TAssetsHubInternalVerifier => {
  const cacheKey = JSON.stringify([issuer, jwksUrl])
  const cached = verifierCache.get(cacheKey)
  if (cached) return cached

  const verifier = createServiceAuthVerifier({
    audience: ASSETS_HUB_INTERNAL_AUDIENCE,
    issuer,
    jwksUrl,
  })
  verifierCache.set(cacheKey, verifier)
  return verifier
}
