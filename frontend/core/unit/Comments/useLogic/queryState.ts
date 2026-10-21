import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useSnapshot } from 'valtio'

import useViewingArticle from '~/hooks/useViewingArticle'
import { Q } from '~/query'
import { getAccountRef } from '~/stores/account/accountRef'
import useAccount from '~/stores/account/hooks'
import { StoreContext } from '~/stores/comments/context'
import type { TStore } from '~/stores/comments/spec'

import { useCommentFeed } from '../pagination/context'

/** Reads the selected Pagi provider and the independently owned article summary. */
export default function useCommentQueryState() {
  const store = useContext(StoreContext) as TStore
  if (!store) throw new Error('Comments store is missing')
  const comments = useSnapshot(store)
  const feed = useCommentFeed()
  const account = useAccount()
  const { articlePath } = useViewingArticle()
  const summaryQuery = useQuery(
    Q.viewer.commentSummary(
      account.accountRef || getAccountRef(account.user) || '',
      articlePath.community,
      articlePath.thread,
      articlePath.innerId,
    ),
  )
  return { comments, data: feed.data, feed, summaryQuery }
}
