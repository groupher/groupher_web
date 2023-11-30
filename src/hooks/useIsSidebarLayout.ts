import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import { BANNER_LAYOUT } from '@/constant/layout'
import useBannerLayout from '@/hooks/useBannerLayout'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useIsSidebarLayout = (): boolean => {
  const { store } = useContext(MobXProviderContext)
  const bannerLayout = useBannerLayout()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return bannerLayout === BANNER_LAYOUT.SIDEBAR
}

export default useIsSidebarLayout
