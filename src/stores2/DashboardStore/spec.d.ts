import type {
  TLocale,
  TThemeMap,
  TColorName,
  TPostLayout,
  TKanbanLayout,
  TKanbanCardLayout,
  TDocLayout,
  TDocFAQLayout,
  TTagLayout,
  TBrandLayout,
  TBannerLayout,
  TChangeMode,
  TTopbarLayout,
  TAvatarLayout,
  THeaderLayout,
  TFooterLayout,
  TThemeName,
  TEnableConfig,
  TNameAlias,
  TLinkItem,
  TValueOf,
  TTag,
  TUser,
  TThread,
  TSizeSML,
  TWidgetType,
  TBroadcastLayout,
  TBroadcastArticleLayout,
  TChangelogLayout,
} from '@/spec'

import {
  DASHBOARD_ROUTE,
  DASHBOARD_LAYOUT_ROUTE,
  DASHBOARD_BASEINFO_ROUTE,
  DASHBOARD_ALIAS_ROUTE,
  DASHBOARD_BROADCAST_ROUTE,
  DASHBOARD_SEO_ROUTE,
  DASHBOARD_DOC_ROUTE,
} from '@/constant/route'

type TModerator = {
  passportItemCount: number
  role: string
  user: TUser
}

export type TSettingsFields = {
  // baseInfo
  favicon: string
  logo: string
  locale: TLocale
  title: string
  slug: string
  desc: string
  introduction: string
  homepage: string
  city: string
  techstack: string

  // social
  // socialLinks: T.opt(T.array(SocialLink), []),
  // mediaReports: T.opt(T.array(MediaReport), [EMPTY_MEDIA_REPORT]),

  // seo
  seoEnable: boolean
  ogSiteName: string
  ogTitle: string
  ogDescription: string
  ogUrl: string
  ogImage: string
  ogLocale: string
  ogPublisher: string

  twTitle: string
  twDescription: string
  twUrl: string
  twCard: string
  twSite: string
  twImage: string
  twImageWidth: string
  twImageHeight: string

  // layout
  primaryColor: TColorName
  postLayout: TPostLayout
  kanbanLayout: TKanbanLayout
  kanbanCardLayout: TKanbanCardLayout
  kanbanBgColors: string[]

  docLayout: TDocLayout
  docFaqLayout: TDocFAQLayout
  tagLayout: TTagLayout
  avatarLayout: TAvatarLayout
  brandLayout: TBrandLayout
  bannerLayout: TBannerLayout
  topbarLayout: TTopbarLayout
  topbarBg: TColorName

  broadcastLayout: TBroadcastLayout
  broadcastBg: TColorName
  broadcastEnable: boolean
  broadcastArticleLayout: TBroadcastArticleLayout

  broadcastArticleBg: TColorName
  broadcastArticleEnable: boolean

  changelogLayout: TChangelogLayout

  // doc
  // docCategories: T.opt(T.array(GroupCategory), []),

  // glow effect
  glowType: string
  glowFixed: boolean
  glowOpacity: string

  // goss blur
  gossBlur: int
  gossBlurDark: int

  // contents
  // tags
  tags: TTag[]
  activeTagGroup: string | null
  activeTagThread: string | null
  nameAlias: TNameAlias[]
  enable: TEnableConfig

  // faqSections: T.opt(T.array(FAQSection), DEFAULT_FAQ_ITEMS),
  // rssFeedType: T.opt(T.enum(values(RSS_TYPE)), RSS_TYPE.DIGEST),

  rssFeedCount: number

  headerLayout: THeaderLayout
  footerLayout: TFooterLayout

  footerLinks: TLinkItem[]
  headerLinks: TLinkItem[]

  moderators: TModerator[]

  // widgets
  widgetsPrimaryColor: TColorName
  widgetsThreads: TThread
  widgetsSize: TSizeSML
  widgetsType: TWidgetType
}

export type TDashbaordStore = TSettingsFields & {
  initSettings: TSettingsFields
  defaultSettings: TSettingsFields

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
  editingTag: TTag | null
  settingTag: TTag | null
  editingAlias: TNameAlias | null
  editingLink: TLinkItem
  editingLinkMode: TChangeMode

  editingGroup: string | null
  editingGroupIndex: number | null
  editingFAQIndex: number | null
  // editingFAQ: T.maybeNull(FAQSection),

  queringMediaReportIndex: number
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
  allModeratorRules: string
  allRootRules: string

  // views

  // actions
  // change: (theme: TThemeName) => void
}
