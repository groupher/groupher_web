import { handleContentPublishRequest } from '@groupher/frontend-core/server/content-publisher'
import { createFileRoute } from '@tanstack/react-router'

import { readPhoenixTokenCookie } from '~/app/phoenix-token'

/** Authenticates Community callers before entering the shared trusted Publisher boundary. */
export const contentPublishRoutePost = ({ request }: { request: Request }) => {
  const backendToken = readPhoenixTokenCookie(request)
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
