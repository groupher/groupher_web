'use client'

import { type ReactNode, useLayoutEffect, useState } from 'react'

import setupStore from '.'
import CommunityViewportProvider from '../communityViewport/provider'
import { StoreContext } from './context'
import type { TInit, TStore } from './spec'

type TProps = {
  children: ReactNode
  initData: TInit
}

export default function Provider({ children, initData }: TProps) {
  const [store] = useState<TStore>(() => setupStore(initData))

  useLayoutEffect(() => {
    store.hydrate(initData)
  }, [initData, store])

  return (
    <StoreContext.Provider value={store}>
      <CommunityViewportProvider>{children}</CommunityViewportProvider>
    </StoreContext.Provider>
  )
}
