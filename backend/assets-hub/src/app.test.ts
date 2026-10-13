import { describe, expect, it } from 'vitest'

import { createApp } from './app'

const allowedOrigin = 'http://dash.groupher.localhost:3103'
const localEnvironment = {
  ASSETS_HUB_CAPABILITY_SECRET: 'test-capability-secret',
  ASSETS_HUB_RUNTIME: 'local',
  PHOENIX_GRAPHQL_ENDPOINT: 'http://127.0.0.1:4001/graphiql',
  SERVICE_AUTH_CLIENT_ID: 'assets-hub-test',
  SERVICE_AUTH_CLIENT_SECRET: 'test-secret',
  SERVICE_AUTH_ISSUER: 'http://auth.groupher.localhost:3004',
  SERVICE_AUTH_JWKS_URL: 'http://auth.groupher.localhost:3004/.well-known/jwks.json',
  SERVICE_AUTH_TOKEN_ENDPOINT: 'http://auth.groupher.localhost:3004/oauth2/token',
}

const preflight = (path: string, method: string) =>
  createApp({ environment: localEnvironment }).request(path, {
    headers: {
      'access-control-request-headers': 'content-type',
      'access-control-request-method': method,
      origin: allowedOrigin,
    },
    method: 'OPTIONS',
  })

describe('local Assets Hub HTTP boundary', () => {
  it.each([
    ['/generated-batches', 'POST'],
    ['/local/uploads/upload-1', 'PUT'],
    ['/a/asset-1/original', 'GET'],
  ])('allows configured browser preflight for %s', async (path, method) => {
    const response = await preflight(path, method)

    expect(response.status).toBe(204)
    expect(response.headers.get('access-control-allow-origin')).toBe(allowedOrigin)
    expect(response.headers.get('access-control-allow-methods')).toContain(method)
  })

  it('requires explicit local issuer and JWKS configuration before reporting ready', async () => {
    const app = createApp({
      environment: {
        ...localEnvironment,
        SERVICE_AUTH_ISSUER: undefined,
        SERVICE_AUTH_JWKS_URL: undefined,
      },
    })

    const response = await app.request('/health/ready')

    expect(response.status).toBe(503)
    expect(await response.json()).toMatchObject({
      checks: [
        {
          message: expect.stringContaining('SERVICE_AUTH_ISSUER, SERVICE_AUTH_JWKS_URL'),
          status: 'down',
        },
      ],
    })
  })

  it('keeps public routes available and fails internal auth closed for an invalid JWKS URL', async () => {
    const app = createApp({
      environment: {
        ...localEnvironment,
        SERVICE_AUTH_JWKS_URL: 'not-a-url',
      },
    })

    expect((await app.request('/health')).status).toBe(200)
    expect((await app.request('/health/ready')).status).toBe(503)
    expect(
      (
        await app.request('/internal/assets/delete', {
          headers: { authorization: 'Bearer invalid-token' },
          method: 'POST',
        })
      ).status,
    ).toBe(401)
  })
})
