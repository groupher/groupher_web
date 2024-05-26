import { useContext } from 'react'
import { StoreContext } from '@/stores2'

import type { TCommunity } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useViewingCommunity = (): TCommunity => {
  const { viewing } = useContext(StoreContext)

  return viewing.community
}

export default useViewingCommunity
