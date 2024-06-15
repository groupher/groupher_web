import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import { BANNER_LAYOUT } from '@/const/layout'
import useLayout from '@/hooks/useLayout'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
export default (): boolean => {
  const { store } = useContext(MobXProviderContext)
  const { bannerLayout } = useLayout()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return bannerLayout === BANNER_LAYOUT.SIDEBAR
}
