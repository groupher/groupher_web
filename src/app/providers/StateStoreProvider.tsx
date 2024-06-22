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
  useMetric,
} from '../queries'

export default ({ children }: { children: ReactNode }) => {
  const metric = useMetric()
  const { locale, localeData } = useI18n()

  const theme = useThemeFromURL()
  const { community } = useCommunity()
  const activeThread = useThreadParam()
  const dashboard = useDashboard(community)
  const wallpaper = useWallpaper(community)

  // @ts-ignore
  // console.log('## dashbaord: ', dashboard)

  const rootStore = useStore({
    locale,
    localeData,
    theme,
    viewing: {
      metric,
      community: community || HOME_COMMUNITY,
      activeThread,
    },
    wallpaper,
    dashboard,
  })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
