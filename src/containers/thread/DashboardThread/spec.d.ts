import type { ReactNode } from 'react'

import type {
  TWallpaper,
  TColorName,
  TPostLayout,
  TChangelogLayout,
  TBrandLayout,
  TBannerLayout,
  TBannerNotifyLayout,
  TTag,
  TThread,
  TSizeSML,
  THelpLayout,
  TFileTreeDirection,
  TDashboardPath,
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
  wallpaper: TWallpaper
  primaryColor: TColorName
  brandLayout: TBrandLayout
  bannerLayout: TBannerLayout
  helpLayout: THelpLayout
  bannerNotifyLayout: TBannerNotifyLayout
  bannerNotifyBg: TColorName
  fileTreeDirection: TFileTreeDirection
  postLayout: TPostLayout
  changelogLayout: TChangelogLayout
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
  bannerLayout: boolean
  helpLayout: boolean
  bannerNotifyLayout: boolean
  bannerNotifyBg: boolean
  fileTreeDirection: boolean
  postLayout: boolean
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
  | 'brandLayout'
  | 'bannerLayout'
  | 'helpLayout'
  | 'bannerNotifyLayout'
  | 'bannerNotifyBg'
  | 'fileTreeDirection'
  | 'changelogLayout'
  | 'tag'
  | 'alias'
  | 'widgetsPrimaryColor'
  | 'widgetsThreads'
  | 'widgetsSize'
  | 'widgetsType'

export type TWidgetType = 'sidebar' | 'modal' | 'popup' | 'iframe' | 'link'
