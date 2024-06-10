import { useContext } from 'react'

// import type { TEnableConfig, TDashboardPath } from '@/spec'

import { StoreContext } from '@/stores2'
import type { TStore } from '@/stores2/dashboardStore/spec'

type TRes = {
  dashboard: TStore
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useDashboard = (): TRes => {
  const { dashboard } = useContext(StoreContext)

  return {
    dashboard,
  }
}

export default useDashboard
