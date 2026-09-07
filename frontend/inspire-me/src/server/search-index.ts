import { createServerFn } from '@tanstack/react-start'
import { setResponseHeader } from '@tanstack/react-start/server'

/** Keeps the internal research application out of search indexes. */
export const disableSearchIndexing = createServerFn({ method: 'GET', strict: false }).handler(
  async () => {
    setResponseHeader('X-Robots-Tag', 'noindex, nofollow')
  },
)
