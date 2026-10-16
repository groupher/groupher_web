import { handleContentPublishRequest } from '@dash/server/content-publisher'
import { createFileRoute } from '@tanstack/react-router'

import { getPhoenixToken } from '~/app/phoenix-token'

/** Authenticates the same-origin caller before entering the trusted publisher boundary. */
export const contentPublishRoutePost = ({ request }: { request: Request }) => {
  const backendToken = getPhoenixToken(request)
  if (!backendToken) {
    return Response.json(
      { error: { code: 'unauthorized', message: 'Authentication is required.' }, ok: false },
      {
        headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
        status: 401,
      },
    )
  }
  return handleContentPublishRequest(request, { backendToken })
}

export const Route = createFileRoute('/api/content/publish')({
  server: {
    handlers: {
      POST: contentPublishRoutePost,
    },
  },
})
