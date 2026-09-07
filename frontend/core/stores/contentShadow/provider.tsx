'use client'

import { type ReactNode, useEffect, useRef } from 'react'

import setupStore from '.'
import { StoreContext } from './context'
import type { TContentShadowInit, TStore } from './spec'

type TProps = { children: ReactNode; initData?: TContentShadowInit }

export default function ContentShadowProvider({ children, initData = false }: TProps) {
  const storeRef = useRef<TStore | null>(null)
  storeRef.current ??= setupStore(initData)

  useEffect(() => {
    storeRef.current?.reconcileConfirmed(initData)
  }, [initData])

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}
