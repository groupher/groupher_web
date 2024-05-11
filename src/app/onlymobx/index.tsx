'use client'
import React, { createContext, ReactNode } from 'react'

import { useStore } from './hooks'
import { rootStore } from './store'

export const StoreContext = createContext(rootStore)

export const OnlyMobxStoreWrapper = ({ children }: { children: ReactNode }) => {
  const rootStore = useStore({ theme: 'night' })

  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}
