'use client'

import type { ReactNode } from 'react'

import { StoreContext, useStore } from '@/stores3'
import { HOME_COMMUNITY } from '@/const/name'

import { useI18n, useThemeFromURL, useCommunity, useDashboard, useWallpaper } from '../queries'

export default ({ children }: { children: ReactNode }) => {
  const { locale, localeData } = useI18n()

  const theme = useThemeFromURL()
  const { community } = useCommunity()
  const dashboard = useDashboard(community)
  const wallpaper = useWallpaper(community)

  // @ts-ignore
  console.log('## dashbaord: ', dashboard.curTab)

  const rootStore = useStore({
    locale,
    localeData,
    theme,
    viewing: {
      community: community || HOME_COMMUNITY,
    },
    wallpaper,
    dashboard,
  })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
