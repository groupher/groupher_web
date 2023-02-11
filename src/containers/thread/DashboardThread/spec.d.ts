import type { ReactNode } from 'react'

import type {
  TWallpaper,
  TCustomWallpaper,
  TColorName,
  TPostLayout,
  TChangelogLayout,
  TFooterLayout,
  TBrandLayout,
  TTopbarLayout,
  TBannerLayout,
  TTag,
  TThread,
  TSizeSML,
  THelpLayout,
  THelpFAQLayout,
  TDashboardPath,
  TKanbanLayout,
  TWallpaperInfo,
  TAvatarLayout,
  TDashboardLayoutRoute,
  TDashboardBaseInfoRoute,
  TDashboardSEORoute,
  TBroadcastConfig,
  TDashboardBroadcastRoute,
} from '@/spec'

type TMenuGroupName = 'BASIC' | 'ANALYSIS' | 'MANAGEMENT' | 'INTEGRATE'

export type TMenuGroup = {
  title: string
  icon: ReactNode
  children: TMenuItem[]
}

type TMenuItem = { title: string; raw: TDashboardPath }

export type TMenu = {
  [k: TMenuGroupName]: TMenuGroup
}

export type TTagSettings = {
  saving: boolean
  tags: TTag[]
  editingTag: TTag
  settingTag: TTag
  categories: string[]
  activeTagCategory: string
}
export type TFooterSettings = {
  footerLayout: TFooterLayout
  saving: boolean
}
export type TAlias = {
  raw: string
  name: string
  original?: string
  suggestions?: string[]
}
export type TAliasSettings = {
  saving: boolean
  alias: TAlias[]
  editingAlias: TAlias
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
  alias: boolean
  tags: boolean

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
  | 'alias'
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
