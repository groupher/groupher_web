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
  TBannerNotifyLayout,
  TTag,
  TThread,
  TSizeSML,
  THelpLayout,
  TDashboardPath,
  TKanbanLayout,
  TWallpaperInfo,
  TAvatarLayout,
  TDashboardLayoutRoute,
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
  bannerNotifyLayout: TBannerNotifyLayout
  bannerNotifyBg: TColorName
  postLayout: TPostLayout
  kanbanLayout: TKanbanLayout
  changelogLayout: TChangelogLayout
  footerLayout: TFooterLayout

  layoutTab: TDashboardLayoutRoute
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
  topbarLayout: boolean
  topbarBg: boolean
  bannerNotifyLayout: boolean
  bannerNotifyBg: boolean
  postLayout: boolean
  kanbanLayout: boolean
  changelogLayout: boolean
  alias: boolean
  tags: boolean

  widgetsPrimaryColor: boolean
  widgetsThreads: boolean
  widgetsSize: boolean

  // sidebar
  ui: boolean
  widgets: boolean
}

export type TSettingField =
  | 'primaryColor'
  | 'postLayout'
  | 'kanbanLayout'
  | 'brandLayout'
  | 'avatarLayout'
  | 'bannerLayout'
  | 'footerLayout'
  | 'glowType'
  | 'glowFixed'
  | 'glowOpacity'
  | 'helpLayout'
  | 'topbarLayout'
  | 'topbarBg'
  | 'bannerNotifyLayout'
  | 'bannerNotifyBg'
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
