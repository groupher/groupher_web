import { API_ROUTE } from '@groupher/route-contract'

import { validateSlug } from './validator'

type TSlugifyResponse = {
  ok: boolean
  slug?: string
  error?: string
}

/** Runs the slugify operation at the frontend shared boundary. */
export const slugify = async (value: string): Promise<string> => {
  const response = await fetch(API_ROUTE.SLUGIFY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value }),
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as TSlugifyResponse
    throw new Error(error.error || `Failed to slugify value (${response.status})`)
  }

  const result = (await response.json().catch(() => ({}))) as TSlugifyResponse

  const validation = validateSlug(result.slug)

  if (!result.ok || !validation.valid) {
    throw new Error(result.error || 'Failed to slugify value')
  }

  return validation.value
}
