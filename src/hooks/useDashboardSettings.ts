import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick } from 'ramda'

import type { TEnableConfig, TDashboardPath } from '@/spec'

import type { TOverview, TCMSContents } from '@/containers/thread/DashboardThread/spec'

type TRes = {
  curTab: TDashboardPath
  overviewData: TOverview
  enableSettings: TEnableConfig

  cmsContents: TCMSContents
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useDashboardSettings = (): TRes => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return pick(
    ['curTab', 'overviewData', 'enableSettings', 'cmsContents'],
    store.dashboardThread,
  ) as TRes
}

export default useDashboardSettings
