import { afterEach, describe, expect, it, vi } from 'vitest'

import { readPhoenixTokenCookie } from '~/app/phoenix-token'

import { contentPublishRoutePost } from './publish'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => (configuration: unknown) => configuration,
}))
vi.mock('~/app/phoenix-token', () => ({ readPhoenixTokenCookie: vi.fn() }))
vi.mock('@groupher/frontend-core/server/content-publisher', () => ({
  handleContentPublishRequest: vi.fn(),
}))

describe('Community Content Publisher route ownership', () => {
  afterEach(() => vi.clearAllMocks())

  it('returns structured JSON 401 before invoking the Publisher', async () => {
    vi.mocked(readPhoenixTokenCookie).mockReturnValue(null)
    const response = await contentPublishRoutePost({
      request: new Request('https://community.groupher.com/api/content/publish', {
        method: 'POST',
      }),
    })

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toMatchObject({
      error: { code: 'unauthorized' },
      ok: false,
    })
  })

  it('forwards the opaque Phoenix token to the shared Publisher adapter', async () => {
    vi.mocked(readPhoenixTokenCookie).mockReturnValue('opaque-token')
    const { handleContentPublishRequest } =
      await import('@groupher/frontend-core/server/content-publisher')
    vi.mocked(handleContentPublishRequest).mockResolvedValueOnce(
      new Response(null, { status: 200 }),
    )
    const request = new Request('https://community.groupher.com/api/content/publish', {
      method: 'POST',
    })

    await contentPublishRoutePost({ request })

    expect(handleContentPublishRequest).toHaveBeenCalledWith(request, {
      backendToken: 'opaque-token',
    })
  })
})
