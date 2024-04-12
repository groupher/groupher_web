'use client'

import { FC, ReactNode, memo } from 'react'
import { Provider } from 'mobx-react'

import { useStore } from '@/stores/init'

import {
  useThemeFromURL,
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
  const theme = useThemeFromURL()

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
    theme: {
      curTheme: theme,
    },
  })

  console.log('## root store provider')
  return <Provider store={store}>{children}</Provider>
}

export default memo(RootStoreWrapper)
