import { afterEach, describe, expect, it, vi } from 'vitest'

import { observeCommunityRevalidation } from './community-revalidation'

const envKeys = ['COMMUNITY_REVALIDATION_URL', 'COMMUNITY_REVALIDATE_SECRET'] as const
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]))

afterEach(() => {
  for (const key of envKeys) {
    const value = originalEnv[key]
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
  vi.restoreAllMocks()
})

describe('Dash-to-Community cache revalidation', () => {
  it('retries once and preserves the service authorization contract', async () => {
    process.env.COMMUNITY_REVALIDATION_URL = 'https://community.test/internal/cache/revalidate'
    process.env.COMMUNITY_REVALIDATE_SECRET = 'secret'
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }))

    await observeCommunityRevalidation(['community[home]'], 'graphql.UpdateDashboardSeo')

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({
      headers: {
        Authorization: 'Bearer secret',
        'Content-Type': 'application/json',
      },
    })
  })
})
