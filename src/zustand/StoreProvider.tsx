'use client'

import { type PropsWithChildren, useRef } from 'react'
import type { TStore, StoreType } from './store'
import { initializeStore, Provider } from './store'

export interface PreloadedStoreInterface extends Pick<TStore, 'lastUpdate'> {}

export default function StoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedStoreInterface>) {
  const storeRef = useRef<StoreType>()

  if (!storeRef.current) {
    storeRef.current = initializeStore(props)
  }

  return <Provider value={storeRef.current}>{children}</Provider>
}
