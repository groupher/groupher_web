'use client'

import { FC, ReactNode, memo, useEffect } from 'react'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useRouter } from 'next/navigation'

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
  // const router = useRouter()

  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     if (!community) {
  //       await router.push('/oops')
  //     }
  //   }

  //   handleRedirect()
  // }, [])

  const theme = useThemeFromURL()

  const metric = useMetric()
  const activeThread = useThreadParam()

  const { community } = useCommunity(userHasLogin)
  console.log('## community -----> ', community)
  const { pagedPosts } = usePagedPosts(userHasLogin)
  const { pagedChangelogs } = usePagedChangelogs(userHasLogin)
  const { post } = usePost(userHasLogin)
  const { changelog } = useChangelog(userHasLogin)
  const { groupedKanbanPosts } = useGroupedKanbanPosts(userHasLogin)
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
