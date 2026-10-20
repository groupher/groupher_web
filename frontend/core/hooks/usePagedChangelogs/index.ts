import { useContext } from 'react'

import { PagedChangelogsContext } from './context'
import type { TPagedChangelogsResult } from './context'

/**
 * Reads changelog server state directly from the canonical Query cache.
 *
 * @example
 *   const { pagedChangelogs, paginationApi } = usePagedChangelogs()
 */
export default function usePagedChangelogs(): TPagedChangelogsResult {
  const value = useContext(PagedChangelogsContext)
  if (!value) throw new Error('usePagedChangelogs must be used within PagedChangelogsProvider')
  return value
}
