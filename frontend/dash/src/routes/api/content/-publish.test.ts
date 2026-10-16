import { afterEach, describe, expect, it, vi } from 'vitest'

import { getPhoenixToken } from '~/app/phoenix-token'

import { contentPublishRoutePost } from './publish'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => (configuration: unknown) => configuration,
}))
vi.mock('~/app/phoenix-token', () => ({ getPhoenixToken: vi.fn() }))
vi.mock('@dash/server/content-publisher', () => ({ handleContentPublishRequest: vi.fn() }))

describe('Content Publisher route ownership', () => {
  afterEach(() => vi.clearAllMocks())

  it('returns structured JSON 401 before invoking the Publisher', async () => {
    vi.mocked(getPhoenixToken).mockReturnValue(null)
    const response = await contentPublishRoutePost({
      request: new Request('https://dash.groupher.com/api/content/publish', { method: 'POST' }),
    })

    expect(response.status).toBe(401)
    expect(response.headers.get('content-type')).toContain('application/json')
    expect(response.headers.get('cache-control')).toBe('no-store')
    await expect(response.json()).resolves.toEqual({
      error: { code: 'unauthorized', message: 'Authentication is required.' },
      ok: false,
    })
  })
})
