import type { TCommunity } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useViewingCommunity = (): TCommunity => {
  const store = useSubStore('viewing')

  return store.community
}

export default useViewingCommunity
