import type { TThemeMap, TThemeName, TValueOf } from '@/spec'

import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

export type TDashbaordStore = {
  savingField: string | null
  saving: boolean
  loading: boolean

  curTab: TValueOf<typeof DASHBOARD_ROUTE>
  baseInfoTab: TValueOf<typeof DASHBOARD_BASEINFO_ROUTE>
  aliasTab: TValueOf<typeof DASHBOARD_ALIAS_ROUTE>
  seoTab: TValueOf<typeof DASHBOARD_SEO_ROUTE>
  docTab: TValueOf<typeof DASHBOARD_DOC_ROUTE>
  layoutTab: TValueOf<typeof DASHBOARD_LAYOUT_ROUTE>
  broadcastTab: TValueOf<typeof DASHBOARD_BROADCAST_ROUTE>

  // overview: T.opt(Overview, {}),
  // editingTag: T.maybeNull(Tag),
  // settingTag: T.maybeNull(Tag),
  // editingAlias: T.maybeNull(NameAlias),
  // editingLink: T.maybeNull(LinkItem),
  // editingLinkMode: T.opt(T.enum(values(CHANGE_MODE)), CHANGE_MODE.CREATE),

  editingGroup: string | null
  editingGroupIndex: number | null
  editingFAQIndex: number | null
  // editingFAQ: T.maybeNull(FAQSection),

  queringMediaReportIndex: number
  // ...settingsModalFields,
  // initSettings: T.opt(InitSettings, {}),
  // defaultSettings: T.opt(InitSettings, {}),

  // cms
  batchSelectedIDs: string[]
  // pagedCommunities: T.opt(PagedCommunities, emptyPagi),
  // pagedPosts: T.opt(PagedPosts, emptyPagi),
  // pagedDocs: T.opt(PagedDocs, emptyPagi),
  // pagedChangelogs: T.opt(PagedChangelogs, emptyPagi),

  // for global alert
  demoAlertEnable: boolean

  // for admins
  // activeModerator: T.maybeNull(User),
  allModeratorRules: string // T.opt(T.str, '{}'),
  allRootRules: stringg // T.opt(T.str, '{}'),

  // views

  // actions
  // change: (theme: TThemeName) => void
}
