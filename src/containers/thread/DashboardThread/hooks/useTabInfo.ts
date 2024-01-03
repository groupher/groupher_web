import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TDashboardLayoutRoute } from '@/spec'

type TRet = {
  layoutTab: TDashboardLayoutRoute
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTabInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { layoutTab } = store.dashboardThread

  return {
    layoutTab,
  }
}

export default useTabInfo
