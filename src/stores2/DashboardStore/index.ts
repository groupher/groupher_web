import { battery } from '@/mobx'

import type { TDashbaordStore } from './spec'
import {
  DASHBOARD_ROUTE,
  // DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  // DASHBOARD_ALIAS_ROUTE,
  // DASHBOARD_BROADCAST_ROUTE,
  // DASHBOARD_SEO_ROUTE,
  // DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

// theme store
const createDashboardStore = (): TDashbaordStore => {
  const store = {
    savingField: null,
    saving: false,
    loading: false,
    curTab: DASHBOARD_ROUTE.INFO,
    baseInfoTab: DASHBOARD_BASEINFO_ROUTE.BASIC,

    // curTab: DASHBOARD_ROUTE.INFO,

    // views
    // get themeData() {
    //   return ''
    // },

    // actions
    // change: (theme: TThemeName) => {
    //   store.theme = theme
    // },
    // toggle() {
    //   store.theme = store.theme === THEME.DAY ? THEME.NIGHT : THEME.DAY
    // },
  }

  return battery(store)
}

export default createDashboardStore
