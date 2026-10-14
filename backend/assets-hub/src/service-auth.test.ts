import { describe, expect, it } from 'vitest'

import { createAssetsHubInternalVerifier } from './service-auth'

describe('createAssetsHubInternalVerifier', () => {
  it('reuses one remote JWKS verifier for each issuer and URL pair', () => {
    const first = createAssetsHubInternalVerifier(
      'https://auth.groupher.test',
      'https://auth.groupher.test/.well-known/jwks.json',
    )
    const second = createAssetsHubInternalVerifier(
      'https://auth.groupher.test',
      'https://auth.groupher.test/.well-known/jwks.json',
    )
    const different = createAssetsHubInternalVerifier(
      'https://auth.groupher.test',
      'https://auth.groupher.test/.well-known/rotated-jwks.json',
    )

    expect(second).toBe(first)
    expect(different).not.toBe(first)
  })
})
