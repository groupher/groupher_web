'use client'

import { memo, type ReactNode } from 'react'

import { StoreContext, useStore } from '@/stores3'
// import { HOME_COMMUNITY } from '@/const/name'

// import { useThemeFromURL, useCommunity, useDashboard } from '../queries'
import { useThemeFromURL } from '../queries'

const ValtioStoreWrapper = ({ children }: { children: ReactNode }) => {
  const theme = useThemeFromURL()
  // const { community } = useCommunity()
  // const dashboard = useDashboard(community)

  const rootStore = useStore({
    theme,
  })

  // const rootStore = useStore({
  //   theme,
  //   viewing: {
  //     community: community || HOME_COMMUNITY,
  //   },
  //   dashboard,
  // })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

export default memo(ValtioStoreWrapper)
