import { useContext } from 'react'

import { PagedPostsContext } from './context'
import type { TPagedPostsResult } from './context'

/**
 * Reads and updates the current community post-list state.
 *
 * The hook keeps URL-derived filters next to the articleList store data so list
 * pages, tag bars, and refresh actions all talk through the same paging shape.
 *
 * @example
 *   const { pagedPosts, paginationApi } = usePagedPosts()
 */
export default function usePagedPosts(): TPagedPostsResult {
  const value = useContext(PagedPostsContext)
  if (!value) throw new Error('usePagedPosts must be used within PagedPostsProvider')
  return value
}
