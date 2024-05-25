import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick } from 'ramda'

import type { TDashboardSEOConfig } from '@/spec'
import { SEO_KEYS } from '@/const/seo'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useSEO = (): TDashboardSEOConfig => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  // @ts-ignore
  return pick(SEO_KEYS, store.dashboardThread)
}

export default useSEO
