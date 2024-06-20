'use client'

import { type FC, type ReactNode, memo } from 'react'
import { Provider } from 'mobx-react'
import { Suspense } from 'react'

import { useStore } from '@/stores/init'

import {
  useMetric,
  useCommunity,
  useTags,
  usePost,
  useChangelog,
  usePagedPosts,
  useGroupedKanbanPosts,
  usePagedChangelogs,
  useWallpaper,
  useDashboard,
  //
  useFilterSearchParams,
  useThreadParam,
} from '../queries'

type TProps = {
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children }) => {
  const metric = useMetric()
  const activeThread = useThreadParam()

  const { community } = useCommunity()
  const { pagedPosts } = usePagedPosts()
  const { pagedChangelogs } = usePagedChangelogs()
  const { post } = usePost()
  const { changelog } = useChangelog()
  const { groupedKanbanPosts } = useGroupedKanbanPosts()
  const { tags } = useTags()

  const dashboard = useDashboard(community)
  const wallpaper = useWallpaper(community)
  const filterSearchParams = useFilterSearchParams()

  const store = useStore({
    metric,
    articles: {
      pagedPosts,
      pagedChangelogs,
      ...groupedKanbanPosts,
      ...filterSearchParams,
    },
    kanbanThread: groupedKanbanPosts,
    tagsBar: {
      tags,
    },
    viewing: {
      community: community || {},
      post,
      changelog,
      activeThread,
    },
    wallpaperEditor: wallpaper,
    dashboardThread: dashboard,
  })

  return (
    <Provider store={store}>
      <Suspense fallback={null}>{children}</Suspense>
    </Provider>
  )
}

export default memo(RootStoreWrapper)
