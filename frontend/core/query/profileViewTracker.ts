/**
 * Sends the explicit Profile view command after a Profile is visible.
 *
 * The backend owns actor policy, sliding-window dedupe, counting, and public-cache invalidation.
 * The caller reconciles its visible Profile from the committed `views` returned here.
 */
import { browserGraphQLRequest } from '~/graphql/client'
import { trackProfileView as trackProfileViewMutation } from '~/schemas/pages/user'

import { isRetryableTransportError } from './queryClient'

/** Tracks one visible Profile with one safe transport retry. */
export const trackProfileView = async (login: string) => {
  if (typeof window === 'undefined') return null

  const request = () => browserGraphQLRequest(trackProfileViewMutation, { login })

  try {
    const data = await request()
    return data.trackProfileView
  } catch (error) {
    if (!isRetryableTransportError(error)) throw error
    const data = await request()
    return data.trackProfileView
  }
}
