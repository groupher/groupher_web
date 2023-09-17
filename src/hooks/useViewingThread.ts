import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TThread } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useViewingThread = (): TThread => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return store.viewing.activeThread
}

export default useViewingThread
