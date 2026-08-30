import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import {
  AUTH_ERROR,
  GROUPHER_AUTH_SIGNED_IN_COOKIE,
  GROUPHER_AUTH_TOKEN_COOKIE,
  PHOENIX_BROWSER_TOKEN_CLAIMS,
  getAuthCookieNames,
  getAuthSessionCookieName,
} from './auth'

describe('Auth cookie contract', () => {
  it('uses host-only Cookie names for secure Auth Session and OAuth state', () => {
    expect(getAuthCookieNames(true)).toEqual({
      callbackUrl: '__Host-groupher-auth.callback-url',
      csrfToken: '__Host-groupher-auth.csrf-token',
      nonce: '__Host-groupher-auth.nonce',
      pkceCodeVerifier: '__Host-groupher-auth.pkce.code_verifier',
      sessionToken: '__Host-groupher-auth.session-token',
      state: '__Host-groupher-auth.state',
      webauthnChallenge: '__Host-groupher-auth.challenge',
    })
  })

  it('keeps HTTP development cookies unprefixed', () => {
    expect(getAuthSessionCookieName(false)).toBe('groupher-auth.session-token')
  })

  it('uses the canonical Groupher auth token cookie', () => {
    expect(GROUPHER_AUTH_TOKEN_COOKIE).toBe('groupher-auth.token')
  })

  it('uses a non-sensitive signed-in hint cookie', () => {
    expect(GROUPHER_AUTH_SIGNED_IN_COOKIE).toBe('groupher-auth.signed-in')
  })
})

describe('Auth protocol contract', () => {
  it('exposes stable machine-readable auth errors', () => {
    expect(AUTH_ERROR.INVALID_CSRF).toBe('INVALID_CSRF')
    expect(AUTH_ERROR.TOKEN_EXPIRED).toBe('TOKEN_EXPIRED')
    expect(AUTH_ERROR.OAUTH_LAST_LOGIN_METHOD).toBe('OAUTH_LAST_LOGIN_METHOD')
  })

  it('exposes the Phoenix browser token claims', () => {
    expect(PHOENIX_BROWSER_TOKEN_CLAIMS).toEqual({
      audience: 'phoenix:browser-api',
      issuer: 'groupher:phoenix',
      type: 'browser_access',
    })
  })

  it('keeps the backend/api Elixir mirror in parity', () => {
    const elixirSource = readFileSync(
      new URL('../../../backend/api/lib/groupher_server/auth/contract.ex', import.meta.url),
      'utf8',
    )

    for (const code of Object.values(AUTH_ERROR)) {
      expect(elixirSource).toContain(`"${code}"`)
    }
    for (const claim of Object.values(PHOENIX_BROWSER_TOKEN_CLAIMS)) {
      expect(elixirSource).toContain(`"${claim}"`)
    }
  })
})
