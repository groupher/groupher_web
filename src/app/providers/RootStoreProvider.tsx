'use client'

import { FC, ReactNode, memo } from 'react'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

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

enableStaticRendering(typeof window === 'undefined')

type TProps = {
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children }) => {
  const userHasLogin = false

  const metric = useMetric()
  const activeThread = useThreadParam()

  const { community } = useCommunity(userHasLogin)

  const { pagedPosts } = usePagedPosts(userHasLogin)
  const { pagedChangelogs } = usePagedChangelogs(userHasLogin)
  const { post } = usePost(userHasLogin)
  const { changelog } = useChangelog(userHasLogin)
  const { groupedKanbanPosts } = useGroupedKanbanPosts(userHasLogin)
  const { tags } = useTags()

  const wallpaper = useWallpaper(community)
  const dashboard = useDashboard(community)
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
    dashboardThread: dashboard,
    wallpaperEditor: wallpaper,
  })

  console.log('## root store provider')
  return <Provider store={store}>{children}</Provider>
}

export default memo(RootStoreWrapper)
