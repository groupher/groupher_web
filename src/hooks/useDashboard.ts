import { useContext } from 'react'
import { pick, values } from 'ramda'

// import type { TEnableConfig, TDashboardPath } from '@/spec'

import { StoreContext } from '@/stores2'
import { SETTING_FIELD } from '@/stores2/dashboardStore/constant'
import { TSettingsFields } from '@/stores2/dashboardStore/spec'

type TRes = TSettingsFields

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useDashboard = (): TRes => {
  const { dashboard } = useContext(StoreContext)

  return pick(values(SETTING_FIELD), dashboard) as TRes
}

export default useDashboard
