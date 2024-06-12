'use client'

import type { ReactNode } from 'react'

import { StoreContext, useStore } from '@/stores3'
import { HOME_COMMUNITY } from '@/const/name'

import { useI18n, useThemeFromURL, useCommunity, useDashboard } from '../queries'

export default ({ children }: { children: ReactNode }) => {
  const { locale, localeData } = useI18n()

  const theme = useThemeFromURL()
  const { community } = useCommunity()
  const dashboard = useDashboard(community)

  const rootStore = useStore({
    locale,
    localeData,
    theme,
    viewing: {
      community: community || HOME_COMMUNITY,
    },
    dashboard,
  })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
