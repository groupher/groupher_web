import { afterEach, describe, expect, it, vi } from 'vitest'

import worker from './worker'

afterEach(() => vi.unstubAllGlobals())

describe('Assets Hub delete queue', () => {
  it('deduplicates storage keys into one R2 bulk delete and ignores invalid messages', async () => {
    const deleteObjects = vi.fn(async (_keys: string | string[]) => undefined)
    const env = {
      ASSETS_BUCKET: { delete: deleteObjects, get: vi.fn() },
    } as unknown as Env

    await worker.queue(
      {
        messages: [
          {
            body: {
              assetId: 1,
              assetPublicRef: 'asset-1',
              communityId: 1,
              storage: 'r2',
              storageKey: 'assets/one.png',
            },
          },
          {
            body: {
              assetId: 2,
              assetPublicRef: 'asset-2',
              communityId: 1,
              storage: 'r2',
              storageKey: 'assets/one.png',
            },
          },
          { body: { storage: 'local', storageKey: 'invalid' } },
        ],
      },
      env,
    )

    expect(deleteObjects).toHaveBeenCalledTimes(1)
    expect(deleteObjects).toHaveBeenCalledWith(['assets/one.png'])
  })
})

describe('Assets Hub readiness', () => {
  const baseEnv = {
    ASSETS_BUCKET: { delete: vi.fn(), get: vi.fn() },
    ASSET_DELETE_QUEUE: { send: vi.fn() },
    ENVIRONMENT: 'development',
    PHOENIX_GRAPHQL_ENDPOINT: 'http://127.0.0.1:4001/graphiql',
    SERVICE_AUTH_CLIENT_ID: 'assets-hub-test',
    SERVICE_AUTH_CLIENT_SECRET: 'test-secret',
    SERVICE_AUTH_ISSUER: 'https://auth.groupher.localhost',
    SERVICE_AUTH_JWKS_URL: 'http://127.0.0.1:3004/.well-known/jwks.json',
    SERVICE_AUTH_TOKEN_ENDPOINT: 'http://127.0.0.1:3004/oauth2/token',
  } as unknown as Env

  it('fails readiness when the service identity configuration is incomplete', async () => {
    const response = await worker.fetch(new Request('http://assets.test/health/ready'), {
      ...baseEnv,
      SERVICE_AUTH_CLIENT_ID: undefined,
      SERVICE_AUTH_CLIENT_SECRET: undefined,
    })

    expect(response.status).toBe(503)
    expect(await response.json()).toMatchObject({
      status: 'down',
      checks: [
        {
          name: 'assets-service-auth',
          status: 'down',
          message: 'Service identity client configuration is incomplete.',
        },
      ],
    })
  })

  it('only reports ready after the token is accepted by Phoenix origin lookup', async () => {
    const fetcher = vi.fn()
    fetcher
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ access_token: 'probe-token', expires_in: 600, token_type: 'Bearer' }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: { communityAssetOriginInfo: null } }), { status: 200 }),
      )
    vi.stubGlobal('fetch', fetcher)

    const response = await worker.fetch(new Request('http://assets.test/health/ready'), baseEnv)

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({
      status: 'ok',
      checks: [{ name: 'assets-service-auth', status: 'ok' }],
    })
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(fetcher.mock.calls[1]?.[1]).toMatchObject({
      headers: expect.objectContaining({ authorization: 'Bearer probe-token' }),
    })
  })
})
