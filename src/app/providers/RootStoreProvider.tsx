'use client'

import { type FC, type ReactNode, memo } from 'react'
import { Provider } from 'mobx-react'
import { Suspense } from 'react'

import { useStore } from '@/stores/init'

import {
  useCommunity,
  usePost,
  useChangelog,
  usePagedPosts,
  useGroupedKanbanPosts,
  usePagedChangelogs,
  //
  useFilterSearchParams,
  useThreadParam,
} from '../queries'

type TProps = {
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children }) => {
  const activeThread = useThreadParam()

  const { community } = useCommunity()
  const { pagedPosts } = usePagedPosts()
  const { pagedChangelogs } = usePagedChangelogs()
  const { post } = usePost()
  const { changelog } = useChangelog()
  const { groupedKanbanPosts } = useGroupedKanbanPosts()

  const filterSearchParams = useFilterSearchParams()

  const store = useStore({
    articles: {
      pagedPosts,
      pagedChangelogs,
      ...groupedKanbanPosts,
      ...filterSearchParams,
    },
    kanbanThread: groupedKanbanPosts,
    viewing: {
      community: community || {},
      post,
      changelog,
      activeThread,
    },
  })

  return (
    <Provider store={store}>
      <Suspense fallback={null}>{children}</Suspense>
    </Provider>
  )
}

export default memo(RootStoreWrapper)
