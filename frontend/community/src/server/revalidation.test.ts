import { afterEach, describe, expect, it, vi } from 'vitest'

import { observeCommunityTagPurge } from './revalidation'

const envKeys = ['CLOUDFLARE_ZONE_ID', 'CLOUDFLARE_API_TOKEN'] as const
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]))

afterEach(() => {
  for (const key of envKeys) {
    const value = originalEnv[key]
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
  vi.restoreAllMocks()
})

describe('Community cache purge', () => {
  it('retries a failed Cloudflare purge once before succeeding', async () => {
    process.env.CLOUDFLARE_ZONE_ID = 'zone'
    process.env.CLOUDFLARE_API_TOKEN = 'token'
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }))

    await observeCommunityTagPurge(['community[acme]'])

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('keeps the waitUntil boundary resolved after both purge attempts fail', async () => {
    process.env.CLOUDFLARE_ZONE_ID = 'zone'
    process.env.CLOUDFLARE_API_TOKEN = 'token'
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 503 }))
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    await expect(observeCommunityTagPurge(['community[acme]'])).resolves.toBeUndefined()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
