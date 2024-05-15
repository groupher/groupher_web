import type { TThemeMap, TThemeName } from '@/spec'

import {
  DASHBOARD_ROUTE,
  // DASHBOARD_LAYOUT_ROUTE,
  // DASHBOARD_BASEINFO_ROUTE,
  // DASHBOARD_ALIAS_ROUTE,
  // DASHBOARD_BROADCAST_ROUTE,
  // DASHBOARD_SEO_ROUTE,
  // DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

type ValuesOf<T> = T[keyof T]
// type MyObjectValueUnion = ValuesOf<typeof DASHBOARD_ROUTE>

export type TDashbaordStore = {
  savingField: string | null
  saving: boolean
  loading: boolean

  curTab: ValuesOf<typeof DASHBOARD_ROUTE>

  // actions
  // change: (theme: TThemeName) => void
}
