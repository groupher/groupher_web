import type { TThemeMap, TThemeName, TValueOf } from '@/spec'

import {
  DASHBOARD_ROUTE,
  // DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  // DASHBOARD_ALIAS_ROUTE,
  // DASHBOARD_BROADCAST_ROUTE,
  // DASHBOARD_SEO_ROUTE,
  // DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

// type MyObjectValueUnion = ValuesOf<typeof DASHBOARD_ROUTE>

export type TDashbaordStore = {
  savingField: string | null
  saving: boolean
  loading: boolean

  curTab: TValueOf<typeof DASHBOARD_ROUTE>
  baseInfoTab: TValueOf<typeof DASHBOARD_BASEINFO_ROUTE>

  // actions
  // change: (theme: TThemeName) => void
}
