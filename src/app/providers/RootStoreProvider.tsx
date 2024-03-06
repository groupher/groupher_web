'use client'

import { FC, ReactNode, memo } from 'react'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import type { TThemeName } from '@/spec'
import { useStore } from '@/stores/init'

import {
  useMetric,
  useSession,
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
  token: null | string
  theme: TThemeName
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children, token, theme }) => {
  const userHasLogin = !!token

  const metric = useMetric()
  const activeThread = useThreadParam()
  // console.log('## activeThread: ', activeThread)

  const { sesstion } = useSession()
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
    ...sesstion,
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
