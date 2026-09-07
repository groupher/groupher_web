'use client'

import { type ReactNode, useLayoutEffect, useRef } from 'react'

import setupStore from '.'
import CommunityViewportProvider from '../communityViewport/provider'
import { StoreContext } from './context'
import type { TInit, TStore } from './spec'

type TProps = {
  children: ReactNode
  initData: TInit
}

export default function Provider({ children, initData }: TProps) {
  const storeRef = useRef<TStore | null>(null)

  storeRef.current ??= setupStore(initData)

  useLayoutEffect(() => {
    storeRef.current?.hydrate(initData)
  }, [initData])

  return (
    <StoreContext.Provider value={storeRef.current}>
      <CommunityViewportProvider>{children}</CommunityViewportProvider>
    </StoreContext.Provider>
  )
}
