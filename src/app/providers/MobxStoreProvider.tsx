'use client'

import { memo, ReactNode } from 'react'

import { StoreContext, useStore } from '@/stores2'

import { useThemeFromURL } from '../queries'

const MobxStoreWrapper = ({ children }: { children: ReactNode }) => {
  const theme = useThemeFromURL()

  const rootStore = useStore({ theme })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

export default memo(MobxStoreWrapper)
