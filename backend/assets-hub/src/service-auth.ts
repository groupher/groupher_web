import { createServiceAuthVerifier } from '@groupher/service/auth'

export const ASSETS_HUB_INTERNAL_AUDIENCE = 'assets-hub:internal-api'
export const DEFAULT_SERVICE_AUTH_ISSUER = 'https://auth.groupher.com'
export const DEFAULT_SERVICE_AUTH_JWKS_URL = 'https://auth.groupher.com/.well-known/jwks.json'

export type TAssetsHubInternalVerifier = ReturnType<typeof createServiceAuthVerifier>

/** Builds the verifier shared by the Node local provider and Cloudflare Worker adapters. */
export const createAssetsHubInternalVerifier = (
  issuer: string,
  jwksUrl: string,
): TAssetsHubInternalVerifier =>
  createServiceAuthVerifier({
    audience: ASSETS_HUB_INTERNAL_AUDIENCE,
    issuer,
    jwksUrl,
  })
