import type { TColorName } from '@/spec'

import useSubStore from '@/hooks/useSubStore'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
export default (): TColorName => {
  const store = useSubStore('dashboard')

  return store.primaryColor
}
