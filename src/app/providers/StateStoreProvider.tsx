'use client'

import type { ReactNode } from 'react'

import { StoreContext, useStore } from '@/stores3'
import { HOME_COMMUNITY } from '@/const/name'

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
} from '../queries'

export default ({ children }: { children: ReactNode }) => {
  const metric = useMetric()
  const { locale, localeData } = useI18n()

  const theme = useThemeFromURL()
  const { post } = usePost()
  const { changelog } = useChangelog()
  const { community } = useCommunity()
  const activeThread = useThreadParam()
  const { tags } = useTags()

  const dashboard = useDashboard(community)
  const wallpaper = useWallpaper(community)

  // @ts-ignore
  console.log('## dashbaord tags: ', tags)

  const rootStore = useStore({
    locale,
    localeData,
    theme,
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
