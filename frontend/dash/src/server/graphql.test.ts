import { getRequest } from '@tanstack/react-start/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getPhoenixToken } from '~/app/phoenix-token'

import { fetchGraphQL, getAuthToken } from './graphql'

vi.mock('@tanstack/react-start/server', () => ({
  getRequest: vi.fn(),
  setResponseHeader: vi.fn(),
}))

vi.mock('~/app/phoenix-token', () => ({
  getPhoenixToken: vi.fn(),
}))

describe('getAuthToken', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('uses the shared verified Phoenix token boundary', () => {
    const request = new Request('https://dash.groupher.localhost/home')
    vi.mocked(getRequest).mockReturnValue(request)
    vi.mocked(getPhoenixToken).mockReturnValue('verified-token')

    expect(getAuthToken()).toBe('verified-token')
    expect(getPhoenixToken).toHaveBeenCalledWith(request)
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
