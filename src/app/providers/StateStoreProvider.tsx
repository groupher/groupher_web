'use client'

import type { ReactNode } from 'react'

import { useParams, usePathname, useSearchParams } from 'next/navigation'

import { StoreContext, useStore } from '~/stores'
import { HOME_COMMUNITY } from '~/const/name'

import {
  useI18n,
  useThemeFromURL,
  useCommunity,
  useThreadParam,
  useDashboard,
  useWallpaper,
  useTags,
  useMetric,
  usePost,
  useChangelog,
  usePagedPosts,
  usePagedChangelogs,
  useGroupedKanbanPosts,
  useFilterSearchParams,
} from '../queries'

export default ({ children }: { children: ReactNode }) => {
  const route = {
    params: useParams(),
    pathname: usePathname(),
    searchParams: useSearchParams(),
  }

  const metric = useMetric(route)
  const { locale, localeData } = useI18n(route)

  const theme = useThemeFromURL(route)
  const { pagedPosts } = usePagedPosts(route)
  const { pagedChangelogs } = usePagedChangelogs(route)
  const { groupedKanbanPosts } = useGroupedKanbanPosts(route)
  const filterSearchParams = useFilterSearchParams()

  const { post } = usePost(route)
  const { changelog } = useChangelog(route)
  const { community } = useCommunity(route)
  const activeThread = useThreadParam(route)
  const { tags } = useTags(route)

  const dashboard = useDashboard(community, route)
  const wallpaper = useWallpaper(community, route)

  // @ts-ignore
  // console.log('## dashbaord: ', dashboard)

  const rootStore = useStore({
    locale,
    localeData,
    theme,
    articles: {
      pagedPosts,
      pagedChangelogs,
      ...groupedKanbanPosts,
      ...filterSearchParams,
    },
    viewing: {
      metric,
      post,
      changelog,
      community: community || HOME_COMMUNITY,
      activeThread,
      tags,
    },
    wallpaper,
    dashboard,
  })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
