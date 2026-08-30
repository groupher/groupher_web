import { AUTH_ERROR } from '@groupher/contracts/auth'
import { afterEach, describe, expect, it, vi } from 'vitest'

const { refreshSession } = vi.hoisted(() => ({
  refreshSession: vi.fn(async () => undefined),
}))

vi.mock('~/auth', () => ({
  AuthRequestError: class extends Error {},
  authFailureFromError: () => ({}),
  invalidateAuthState: vi.fn(),
  refreshSession,
  requestLogin: vi.fn(),
  resolveAuthFailure: ({ code }: { code?: string }) =>
    code === AUTH_ERROR.TOKEN_EXPIRED || code === AUTH_ERROR.TOKEN_MISSING ? 'refresh' : 'none',
  withAuthRetry: async <T>(
    operation: () => Promise<T>,
    resolveFailure: (error: unknown) => { code?: string },
  ) => {
    try {
      return await operation()
    } catch (error) {
      const failure = resolveFailure(error)
      if (failure.code !== AUTH_ERROR.TOKEN_EXPIRED && failure.code !== AUTH_ERROR.TOKEN_MISSING)
        throw error
      await refreshSession()
      return operation()
    }
  },
}))

import { parse } from 'graphql'

import { browserGraphQLRequest, createAuthFetch, GraphQLRequestError } from './client'

describe('createAuthFetch', () => {
  afterEach(() => {
    vi.clearAllMocks()
    document.cookie = 'groupher-auth.signed-in=; Max-Age=0; Path=/'
  })

  it('refreshes once and replays an expired authenticated GraphQL operation once', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        Response.json({
          errors: [{ extensions: { code: AUTH_ERROR.TOKEN_EXPIRED }, message: 'expired' }],
        }),
      )
      .mockResolvedValueOnce(Response.json({ data: { me: { id: '42' } } }))

    const response = await createAuthFetch(fetcher)('/api/graphql', {
      body: JSON.stringify({ query: 'query Viewer { me { id } }' }),
      method: 'POST',
    })

    await expect(response.json()).resolves.toEqual({ data: { me: { id: '42' } } })
    expect(refreshSession).toHaveBeenCalledTimes(1)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('does not refresh permission failures', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        errors: [{ extensions: { code: 'PERMISSION_DENIED' }, message: 'forbidden' }],
      }),
    )

    await createAuthFetch(fetcher)('/api/graphql', { method: 'POST' })

    expect(refreshSession).not.toHaveBeenCalled()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('refreshes a missing HttpOnly token when the readable signed-in hint remains', async () => {
    document.cookie = 'groupher-auth.signed-in=1; Path=/'
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        Response.json({
          errors: [{ extensions: { code: 4301 }, message: 'Authorize: need login' }],
        }),
      )
      .mockResolvedValueOnce(Response.json({ data: { me: { id: '42' } } }))

    await createAuthFetch(fetcher)('/api/graphql', { method: 'POST' })

    expect(refreshSession).toHaveBeenCalledTimes(1)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('refreshes when the explicit session probe reports an invalid session', async () => {
    document.cookie = 'groupher-auth.signed-in=1; Path=/'
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ data: { sessionState: { isValid: false } } }))
      .mockResolvedValueOnce(
        Response.json({ data: { sessionState: { isValid: true, user: { id: '42' } } } }),
      )

    const response = await createAuthFetch(fetcher)('/api/graphql', { method: 'POST' })

    await expect(response.json()).resolves.toEqual({
      data: { sessionState: { isValid: true, user: { id: '42' } } },
    })
    expect(refreshSession).toHaveBeenCalledTimes(1)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('does not refresh a nullable public me result', async () => {
    document.cookie = 'groupher-auth.signed-in=1; Path=/'
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ data: { me: null } }))

    const response = await createAuthFetch(fetcher)('/api/graphql', { method: 'POST' })

    await expect(response.json()).resolves.toEqual({ data: { me: null } })
    expect(refreshSession).not.toHaveBeenCalled()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('returns typed data through the same-origin browser transport', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ data: { value: 42 } }))
    const data = await browserGraphQLRequest<{ value: number }, Record<string, never>>(
      parse('query Value { value }'),
      {},
      { fetcher },
    )

    expect(data).toEqual({ value: 42 })
    const [requestUrl, requestInit] = fetcher.mock.calls[0] || []
    expect(String(requestUrl)).toContain('/api/graphql')
    expect(requestInit).toEqual(expect.objectContaining({ method: 'POST', credentials: 'include' }))
  })

  it('forwards AbortSignal through the GraphQL transport', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ data: { value: 42 } }))
    const signal = new AbortController().signal

    await browserGraphQLRequest(parse('query Value { value }'), {}, { fetcher, signal })

    expect(fetcher.mock.calls[0]?.[1]?.signal).toBe(signal)
  })

  it('throws GraphQL business errors so Query does not treat them as data', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        Response.json({ errors: [{ extensions: { code: 'INVALID_INPUT' }, message: 'invalid' }] }),
      )

    await expect(
      browserGraphQLRequest(parse('mutation Save { save }'), {}, { fetcher }),
    ).rejects.toBeInstanceOf(GraphQLRequestError)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})
