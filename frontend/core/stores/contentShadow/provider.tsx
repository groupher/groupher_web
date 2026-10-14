'use client'

import { type ReactNode, useEffect, useState } from 'react'

import setupStore from '.'
import { StoreContext } from './context'
import type { TContentShadowInit, TStore } from './spec'

type TProps = { children: ReactNode; initData?: TContentShadowInit }

export default function ContentShadowProvider({ children, initData = false }: TProps) {
  const [store] = useState<TStore>(() => setupStore(initData))

  useEffect(() => {
    store.reconcileConfirmed(initData)
  }, [initData, store])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
