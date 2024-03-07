'use client'

import { FC, ReactNode, memo } from 'react'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

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

  const dashboard = useDashboard(community)
  const wallpaper = useWallpaper(community)
  const filterSearchParams = useFilterSearchParams()

  // NOTE: 目前在没有启动后端的情况下，如果这行代码出现在 useCommunity 之前，会导致 build 后的代码疯狂
  // post 到 /GraphiQL, 奇怪的行为。。，很怀疑是 URQL 客户端的 Bug ..
  const theme = useThemeFromURL()

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
