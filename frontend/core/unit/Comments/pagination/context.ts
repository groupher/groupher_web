import { createContext, useContext, type PropsWithChildren } from 'react'

import type { TCommentCollection, TCommentPage } from '~/query/commentPage'
import type { TEffectivePagiConfig } from '~/spec'

export type TFeedProps = PropsWithChildren<{
  collection: TCommentCollection
  config: TEffectivePagiConfig
  page: number
  setPage: (page: number) => void
}>
export type TCommentFeed = {
  data?: TCommentPage
  collection: TCommentCollection
  config: TEffectivePagiConfig
  pending: boolean
  fetching: boolean
  error: Error | null
  nextError: Error | null
  hasNext: boolean
  loadingNext: boolean
  retry: () => void
  loadNext: () => void
  setPage: (page: number) => void
}
export const CommentFeedContext = createContext<TCommentFeed | null>(null)
/** Reads the active root or reply feed and fails outside its pagination provider. */
export const useCommentFeed = () => {
  const feed = useContext(CommentFeedContext)
  if (!feed) throw new Error('Comment list must be inside a pagination provider')
  return feed
}
