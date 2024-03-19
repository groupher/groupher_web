import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import { usePathname } from 'next/navigation'
import { includes } from 'ramda'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { BANNER_LAYOUT } from '@/constant/layout'
import { STATIC_ROUTES } from '@/constant/route'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useMetric = (): TMetric => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const pathname = usePathname()

  if (includes(pathname, STATIC_ROUTES)) {
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
