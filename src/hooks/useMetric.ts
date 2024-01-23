import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import { usePathname } from 'next/navigation'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { BANNER_LAYOUT } from '@/constant/layout'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useMetric = (): TMetric => {
  const { store } = useContext(MobXProviderContext)
  const pathname = usePathname()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  if (pathname === '/') {
    return METRIC.HOME
  }

  const { bannerLayout } = store.dashboardThread

  if (store.metric === METRIC.COMMUNITY && bannerLayout === BANNER_LAYOUT.SIDEBAR) {
    return METRIC.COMMUNITY_SIDEBAR
  }

  if (store.metric === METRIC.DOC && bannerLayout === BANNER_LAYOUT.SIDEBAR) {
    return METRIC.COMMUNITY_SIDEBAR
  }

  if (store.metric === METRIC.DOC && bannerLayout === BANNER_LAYOUT.TABBER) {
    return METRIC.COMMUNITY
  }

  return store.metric as TMetric
}

export default useMetric
