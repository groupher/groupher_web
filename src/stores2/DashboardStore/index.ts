import { battery } from '@/mobx'

import type { TDashbaordStore } from './spec'
import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

// theme store
const createDashboardStore = (): TDashbaordStore => {
  const store = {
    savingField: null,
    saving: false,
    loading: false,
    curTab: DASHBOARD_ROUTE.INFO,
    baseInfoTab: DASHBOARD_BASEINFO_ROUTE.BASIC,

    aliasTab: DASHBOARD_ALIAS_ROUTE.THREAD,
    seoTab: DASHBOARD_SEO_ROUTE.SEARCH_ENGINE,
    docTab: DASHBOARD_DOC_ROUTE.TABLE,
    layoutTab: DASHBOARD_LAYOUT_ROUTE.GLOBAL,
    broadcastTab: DASHBOARD_BROADCAST_ROUTE.GLOBAL,

    // overview
    // overview: T.opt(Overview, {}),

    // editing
    editingTag: null,
    settingTag: null,
    // editingAlias: T.maybeNull(NameAlias),
    // editingLink: T.maybeNull(LinkItem),
    // editingLinkMode: T.opt(T.enum(values(CHANGE_MODE)), CHANGE_MODE.CREATE),

    editingGroup: null,
    editingGroupIndex: null,
    editingFAQIndex: null,
    // editingFAQ: T.maybeNull(FAQSection),

    queringMediaReportIndex: null,
    // ...settingsModalFields,
    // initSettings: T.opt(InitSettings, {}),
    // defaultSettings: T.opt(InitSettings, {}),

    // cms
    batchSelectedIDs: [],
    // pagedCommunities: T.opt(PagedCommunities, emptyPagi),
    // pagedPosts: T.opt(PagedPosts, emptyPagi),
    // pagedDocs: T.opt(PagedDocs, emptyPagi),
    // pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),

    // for global alert
    demoAlertEnable: false,

    // activeModerator: T.maybeNull(User),
    allModeratorRules: '{}',
    allRootRules: '{}',
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
