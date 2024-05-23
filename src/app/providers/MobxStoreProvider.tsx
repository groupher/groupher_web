'use client'

import { memo, ReactNode } from 'react'

import { StoreContext, useStore } from '@/stores2'

import { useThemeFromURL, useCommunity, useDashboard } from '../queries'

const MobxStoreWrapper = ({ children }: { children: ReactNode }) => {
  const theme = useThemeFromURL()
  const { community } = useCommunity()
  const dashboard = useDashboard(community)

  const rootStore = useStore({
    theme,
    viewing: {
      community,
    },
    dashboard,
  })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

export default memo(MobxStoreWrapper)
