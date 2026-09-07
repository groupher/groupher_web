'use client'

import { use } from 'react'

import createStoreHook from '../createStoreHook'
import { StoreContext } from './context'

const useContentShadowStore = createStoreHook(StoreContext)

export default useContentShadowStore

/** Returns the mutable editor store for save callbacks. */
export const useContentShadowStoreLive = () => {
  const store = use(StoreContext)
  if (!store) throw new Error('useContentShadowStore must be used within a ContentShadowProvider')
  return store
}
