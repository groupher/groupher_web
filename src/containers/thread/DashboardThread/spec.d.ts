import type { ReactNode } from 'react'

import type {
  TWallpaper,
  TCustomWallpaper,
  TColorName,
  TPostLayout,
  TChangelogLayout,
  THeaderLayout,
  TFooterLayout,
  TBrandLayout,
  TTopbarLayout,
  TBannerLayout,
  TTag,
  TThread,
  TCommunityThread,
  TSizeSML,
  THelpLayout,
  TDashboardPath,
  TKanbanLayout,
  TWallpaperInfo,
  TAvatarLayout,
  TDashboardLayoutRoute,
  TDashboardBaseInfoRoute,
  TDashboardSEORoute,
  TBroadcastConfig,
  TDashboardBroadcastRoute,
  TDashboardAliasRoute,
  TLinkItem,
  TChangeMode,
  TNameAliasConfig,
} from '@/spec'

type TMenuGroupName = 'BASIC' | 'ANALYSIS' | 'MANAGEMENT' | 'INTEGRATE'

export type TMenuGroup = {
  title: string
  icon: ReactNode
  children: TMenuItem[]
}

type TMenuItem = { title: string; raw: TDashboardPath; alias?: string }

export type TMenu = {
  [k: TMenuGroupName]: TMenuGroup
}

export type TTagSettings = {
  saving: boolean
  threads: TCommunityThread[]
  tags: TTag[]
  editingTag: TTag
  settingTag: TTag
  groups: string[]
  activeTagGroup: string
  activeTagThread: string
}

export type TRSSSettings = {
  feedType: string
  feedCount: number
  saving: boolean
}

type TLinkState = {
  editingLink: TLinkItem
  saving: boolean
  editingLinkMode: TChangeMode
  editingGroup: string | null
  editingGroupIndex: number | null
}

export type THeaderSettings = {
  headerLayout: THeaderLayout
  headerLinks: TLinkItem[]
} & TLinkState

export type TFooterSettings = {
  footerLayout: TFooterLayout
  footerLinks: TLinkItem[]
} & TLinkState

export type TNameAlias = TNameAliasConfig

export type TAliasSettings = {
  saving: boolean
  nameAlias: TNameAlias[]
  editingAlias: TNameAlias
  aliasTab: TDashboardAliasRoute
}

export type TBaseInfoSettings = {
  favicon: string
  logo: string
  title: string
  desc: string
  homepage: string
  url: string
  city: string
  techstack: string

  baseInfoTab: TDashboardBaseInfoRoute
}

export type TSEOSettings = {
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
  twCard: string // 'summary' | 'summary_large_image'
  twSite: string
  twImage: string
  twImageWidth: string
  twImageHeight: string

  seoTab: TDashboardSEORoute
}

export type TUiSettings = {
  saving: boolean
  wallpaperInfo: TWallpaperInfo
  wallpaper: TWallpaper
  customWallpaper: TCustomWallpaper
  primaryColor: TColorName
  brandLayout: TBrandLayout
  topbarLayout: TTopbarLayout
  topbarBg: TColorName
  avatarLayout: TAvatarLayout
  bannerLayout: TBannerLayout
  glowType: string
  glowFixed: boolean
  glowOpacity: string
  helpLayout: THelpLayout
  helpFaqLayout: THelpFaqLayout
  postLayout: TPostLayout
  kanbanLayout: TKanbanLayout
  kanbanBgColors: TColorName[]
  changelogLayout: TChangelogLayout
  headerLayout: THeaderLayout
  footerLayout: TFooterLayout

  layoutTab: TDashboardLayoutRoute
}

export type TBroadcastSettings = TBroadcastConfig & {
  saving: boolean
  broadcastTab: TDashboardBroadcastRoute
}

export type TWidgetsSettings = {
  saving: boolean
  widgetsPrimaryColor: TColorName
  widgetsThreads: TThread[]
  widgetsSize: TSizeSML
  widgetsType: TWidgetType
}

export type TTouched = {
  primaryColor: boolean
  brandLayout: boolean
  avatarLayout: boolean
  bannerLayout: boolean
  headerLayout: boolean
  footerLayout: boolean
  glowType: boolean
  glowFixed: boolean
  glowOpacity: boolean
  helpLayout: boolean
  helpFaqLayout: boolean
  topbarLayout: boolean
  topbarBg: boolean
  postLayout: boolean
  kanbanLayout: boolean
  kanbanBgColors: boolean
  changelogLayout: boolean
  nameAlias: boolean
  tags: boolean
  tagsIndex: boolean

  rssFeed: boolean

  widgetsPrimaryColor: boolean
  widgetsThreads: boolean
  widgetsSize: boolean

  // sidebar
  ui: boolean
  widgets: boolean
  broadcast: boolean
  broadcastArticle: boolean
}

export type TSettingField =
  | 'primaryColor'
  | 'postLayout'
  | 'kanbanLayout'
  | 'kanbanBgColors'
  | 'brandLayout'
  | 'avatarLayout'
  | 'bannerLayout'
  | 'headerLayout'
  | 'footerLayout'
  | 'glowType'
  | 'glowFixed'
  | 'glowOpacity'
  | 'helpLayout'
  | 'helpFaqLayout'
  | 'topbarLayout'
  | 'topbarBg'
  | 'broadcastLayout'
  | 'broadcastBg'
  | 'broadcastEnable'
  | 'broadcastArticleLayout'
  | 'broadcastArticleBg'
  | 'broadcastArticleEnable'
  | 'changelogLayout'
  | 'tag'
  | 'tagIndex'
  | 'nameAlias'
  | 'rssFeedType'
  | 'rssFeedCount'
  | 'enable'
  | 'widgetsPrimaryColor'
  | 'widgetsThreads'
  | 'widgetsSize'
  | 'widgetsType'

export type TWidgetType = 'sidebar' | 'modal' | 'popup' | 'iframe' | 'link'

type THelpFile = {
  index: number
  name: string
  articleId: string
  linkAddr: string
}

type THelpCategory = {
  name: string
  index: number
  color: TColorName
  files: THelpFile[]
}

export type THelpSettings = {
  categories: THelpCategory[]
}

export type TFooterEditType = 'logo' | 'title' | 'social'

export type TCurPageLinksKey = {
  links: 'footerLinks' | 'headerLinks'
  settings: 'footerSettings' | 'headerSettings'
}
