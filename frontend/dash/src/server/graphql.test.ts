import { getRequest } from '@tanstack/react-start/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { readPhoenixTokenCookie } from '~/app/phoenix-token'

import { fetchGraphQL, getAuthToken } from './graphql'

vi.mock('@tanstack/react-start/server', () => ({
  getRequest: vi.fn(),
  setResponseHeader: vi.fn(),
}))

describe('getAuthToken', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('forwards the opaque Phoenix cookie without requiring the signing secret in Dash', () => {
    const request = new Request('https://dash.groupher.localhost/home', {
      headers: { cookie: 'theme=dark; groupher-auth.token=local.phoenix.token' },
    })
    vi.mocked(getRequest).mockReturnValue(request)

    expect(getAuthToken()).toBe('local.phoenix.token')
  })

  it('preserves encoded and padded cookie values', () => {
    const request = new Request('https://dash.groupher.localhost/home', {
      headers: { cookie: 'groupher-auth.token=part.one%3D%3D; theme=dark' },
    })
    expect(readPhoenixTokenCookie(request)).toBe('part.one==')
  })
})

describe('fetchGraphQL', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('preserves numeric backend error codes for route-specific handling', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            errors: [{ extensions: { code: 5504 }, message: 'Community' }],
          }),
          { headers: { 'Content-Type': 'application/json' }, status: 200 },
        ),
      ),
    )

    await expect(fetchGraphQL('query Test { __typename }', {}, null)).rejects.toMatchObject({
      backendCode: 5504,
      code: undefined,
      message: 'Community',
      status: 200,
    })
  })
})
