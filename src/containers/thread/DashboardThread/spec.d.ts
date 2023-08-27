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
  TDocLayout,
  TDashboardPath,
  TKanbanLayout,
  TWallpaperInfo,
  TAvatarLayout,
  TUser,
  TDashboardLayoutRoute,
  TDashboardBaseInfoRoute,
  TDashboardSEORoute,
  TBroadcastConfig,
  TDashboardBroadcastRoute,
  TDashboardAliasRoute,
  TLinkItem,
  TChangeMode,
  TNameAliasConfig,
  TSocialItem,
  TPagedArticles,
  TID,
  TDashboardDocRoute,
  TFAQSection,
  TPagedCommunities,
  TModerator,
} from '@/spec'

type TMenuGroupName = 'BASIC' | 'ANALYSIS' | 'CMS' | 'INTEGRATE'

export type TCMSContents = {
  loading: boolean
  batchSelectedIDs: TID[]
  docTab: TDashboardDocRoute

  pagedPosts: TPagedArticles
  pagedCommunities: TPagedCommunities
  pagedDocs: TPagedArticles
  pagedChangelogs: TPagedArticles

  editingFAQ: TFAQSection
  faqSections: TFAQSection[]
  editingFAQIndex: number | null
}

export type TMenuGroup = {
  title: string
  icon: ReactNode
  children: TMenuItem[]
}

type TMenuItem = { title: string; slug: TDashboardPath; alias?: string }

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
  threads: TCommunityThread[]
} & TLinkState

export type TFooterSettings = {
  footerLayout: TFooterLayout
  footerLinks: TLinkItem[]
  threads: TCommunityThread[]
} & TLinkState

export type TNameAlias = TNameAliasConfig

export type TAdminSettings = {
  moderators: TModerator[]
  activeModerator: TUser | null
}

export type TAliasSettings = {
  saving: boolean
  nameAlias: TNameAlias[]
  editingAlias: TNameAlias
  aliasTab: TDashboardAliasRoute
}

export type TBaseInfoSettings = {
  saving: boolean

  favicon: string
  logo: string
  title: string
  desc: string
  homepage: string
  slug: string
  city: string
  techstack: string

  socialLinks: TSocialItem[]
  baseInfoTab: TDashboardBaseInfoRoute
}

export type TSEOSettings = {
  saving: boolean
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
  docLayout: TDocLayout
  docFaqLayout: TDocFaqLayout
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
  docLayout: boolean
  docFaqLayout: boolean
  topbarLayout: boolean
  topbarBg: boolean
  postLayout: boolean
  kanbanLayout: boolean
  kanbanBgColors: boolean
  changelogLayout: boolean
  nameAlias: boolean
  tags: boolean
  tagsIndex: boolean

  faqSections: boolean

  socialLinks: boolean
  rssFeed: boolean

  widgetsPrimaryColor: boolean
  widgetsThreads: boolean
  widgetsSize: boolean

  // sidebar
  baseInfo: boolean
  seo: boolean
  ui: boolean
  widgets: boolean
  broadcast: boolean
  broadcastArticle: boolean
}

export type TSettingField =
  | 'baseInfo'
  | 'seo'
  | 'favicon'
  | 'logo'
  | 'title'
  | 'slug'
  | 'desc'
  | 'homepage'
  | 'techstack'
  | 'city'
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
  | 'docLayout'
  | 'docFaqLayout'
  | 'topbarLayout'
  | 'topbarBg'
  | 'broadcastLayout'
  | 'broadcastBg'
  | 'broadcastEnable'
  | 'broadcastArticleLayout'
  | 'broadcastArticleBg'
  | 'broadcastArticleEnable'
  | 'changelogLayout'
  | 'socialLinks'
  | 'tag'
  | 'tagIndex'
  | 'faqSections'
  | 'faqSectionItem'
  | 'faqSectionAdd'
  | 'faqSectionDelete'
  | 'nameAlias'
  | 'rssFeedType'
  | 'rssFeedCount'
  | 'enable'
  | 'widgetsPrimaryColor'
  | 'widgetsThreads'
  | 'widgetsSize'
  | 'widgetsType'

export type TWidgetType = 'sidebar' | 'modal' | 'popup' | 'iframe' | 'link'

type TDocFile = {
  index: number
  name: string
  articleId: string
  linkAddr: string
}

type TDocCategory = {
  name: string
  index: number
  color: TColorName
  files: TDocFile[]
}

export type TDocSettings = {
  categories: TDocCategory[]
}

export type THeaderEditType = 'logo' | 'title'
export type TFooterEditType = THeaderEditType | 'social'

export type TCurPageLinksKey = {
  links: 'footerLinks' | 'headerLinks'
  settings: 'footerSettings' | 'headerSettings'
}

export type TMoveLinkDir = 'up' | 'down' | 'top' | 'bottom'
