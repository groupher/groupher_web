import {
  hasConfiguredCommunityRevalidation,
  observeCommunityRevalidation,
} from '@dash/server/community-revalidation'
import { createFileRoute } from '@tanstack/react-router'
import { waitUntil } from 'cloudflare:workers'

import { proxyGraphQLRequest } from '~/graphql/proxy'
import { mutationCacheEffect } from '~/query/cacheInvalidation'

export const Route = createFileRoute('/api/graphql')({
  server: {
    handlers: {
      GET: ({ request }) => proxyGraphQLRequest(request),
      POST: async ({ request }) => {
        const payload = (await request
          .clone()
          .json()
          .catch(() => null)) as {
          query?: unknown
          variables?: unknown
        } | null
        const response = await proxyGraphQLRequest(request)
        if (
          response.ok &&
          hasConfiguredCommunityRevalidation() &&
          payload &&
          typeof payload.query === 'string'
        ) {
          const result = (await response
            .clone()
            .json()
            .catch(() => null)) as { errors?: unknown[] } | null
          if (!result?.errors?.length) {
            const variables =
              payload.variables && typeof payload.variables === 'object'
                ? (payload.variables as Record<string, unknown>)
                : {}
            const effect = mutationCacheEffect(payload.query, variables)
            if (effect?.mode === 'immediate' && effect.tags.length > 0) {
              waitUntil(
                observeCommunityRevalidation(effect.tags, `graphql.${effect.operationName}`),
              )
            }
          }
        }
        return response
      },
    },
  },
})
