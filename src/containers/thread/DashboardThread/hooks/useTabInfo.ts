import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TDashboardLayoutRoute, TDashboardPath } from '@/spec'

type TRet = {
  layoutTab: TDashboardLayoutRoute
  curTab: TDashboardPath
}

const useTabInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { curTab, layoutTab } = store.dashboardThread

  return {
    curTab,
    layoutTab,
  }
}

export default useTabInfo
