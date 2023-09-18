import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TMetric } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useMetric = (): TMetric => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return store.metric as TMetric
}

export default useMetric
