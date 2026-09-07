import { revalidateCommunityTags } from '@dash/server/community-revalidation'
import { createFileRoute } from '@tanstack/react-router'

import { getPhoenixToken } from '~/app/phoenix-token'
import { CACHE_TAG, isCacheTag } from '~/constant/cache'

const json = (body: Record<string, unknown>, status = 200): Response =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })

export const Route = createFileRoute('/api/revalidate/community')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = (await request.json().catch(() => ({}))) as {
          community?: unknown
          tags?: unknown
          reason?: unknown
        }
        const community = typeof payload.community === 'string' ? payload.community.trim() : ''
        if (!community) return json({ ok: false, error: 'community is required' }, 400)
        if (!getPhoenixToken(request)) return json({ ok: false, error: 'unauthorized' }, 401)

        const tags = Array.isArray(payload.tags)
          ? payload.tags.filter((tag): tag is string => typeof tag === 'string')
          : [CACHE_TAG.communityCache(community)]
        const communityPrefix = `community[${community}]`
        if (
          tags.length === 0 ||
          tags.some((tag) => !isCacheTag(tag) || !tag.startsWith(communityPrefix))
        ) {
          return json({ ok: false, error: 'invalid_tags' }, 400)
        }

        try {
          await revalidateCommunityTags(
            tags,
            typeof payload.reason === 'string' ? payload.reason : 'dashboard.community.update',
          )
          return json({ ok: true })
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          const status = message.includes('not configured') ? 503 : 502
          return json({ ok: false, error: 'community_purge_failed' }, status)
        }
      },
    },
  },
})
