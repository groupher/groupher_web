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
  TKanbanCardLayout,
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
  TNameAlias,
  TSocialItem,
  TPagedArticles,
  TID,
  TDashboardDocRoute,
  TFAQSection,
  TPagedCommunities,
  TModerator,
  TMediaReport,
  TDashboardSEOConfig,
  TTagLayout,
} from '@/spec'

export { TNameAlias } from '@/spec'

type TMenuGroupName = 'BASIC' | 'ANALYSIS' | 'CMS' | 'INTEGRATE'

export type TOverview = {
  views: number
  subscribersCount: number
  postsCount: number
  changelogsCount: number
  docsCount: number
}

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
  initFold: boolean
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

export type TLinkState = {
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

export type TAliasSettings = {
  saving: boolean
  nameAlias: TNameAlias[]
  editingAlias: TNameAlias
  aliasTab: TDashboardAliasRoute
}

export type TBaseInfoSettings = {
  loading: boolean
  queringMediaReportIndex: number | null
  saving: boolean

  favicon: string
  logo: string
  title: string
  desc: string
  introduction: string
  homepage: string
  slug: string
  city: string
  techstack: string

  socialLinks: TSocialItem[]
  baseInfoTab: TDashboardBaseInfoRoute
  mediaReports: TMediaReport[]
}

export type TSEOSettings = TDashboardSEOConfig & {
  saving: boolean
  seoTab: TDashboardSEORoute
}

// export type TUiSettings = {
//   saving: boolean
//   primaryColor: TColorName
//   brandLayout: TBrandLayout
//   topbarLayout: TTopbarLayout
//   topbarBg: TColorName
//   tagLayout: TTagLayout
//   avatarLayout: TAvatarLayout
//   bannerLayout: TBannerLayout
//   glowType: string
//   glowFixed: boolean
//   glowOpacity: string
//   gossBlur: number
//   gossBlurDark: number
//   docLayout: TDocLayout
//   docFaqLayout: TDocFaqLayout
//   postLayout: TPostLayout
//   changelogLayout: TChangelogLayout
//   headerLayout: THeaderLayout
//   footerLayout: TFooterLayout

//   layoutTab: TDashboardLayoutRoute
// }

export type TBroadcastSettings = TBroadcastConfig & {
  saving: boolean
  broadcastTab: TDashboardBroadcastRoute
}

export type TTouched = {
  primaryColor: boolean
  brandLayout: boolean
  tagLayout: boolean
  avatarLayout: boolean
  bannerLayout: boolean
  headerLayout: boolean
  footerLayout: boolean
  glowType: boolean
  glowFixed: boolean
  glowOpacity: boolean
  gossBlur: boolean
  gossBlurDark: boolean
  docLayout: boolean
  docFaqLayout: boolean
  topbarLayout: boolean
  topbarBg: boolean
  postLayout: boolean
  kanbanLayout: boolean
  kanbanCardLayout: boolean
  kanbanBgColors: boolean
  changelogLayout: boolean
  nameAlias: boolean
  tags: boolean
  tagsIndex: boolean

  headerLinks: boolean
  footerLinks: boolean

  faqSections: boolean

  socialLinks: boolean
  mediaReports: boolean
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
  | 'mediaReports'
  | 'socialLinks'
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
  | 'kanbanCardLayout'
  | 'kanbanBgColors'
  | 'brandLayout'
  | 'tagLayout'
  | 'avatarLayout'
  | 'bannerLayout'
  | 'headerLayout'
  | 'footerLayout'
  | 'glowType'
  | 'glowFixed'
  | 'glowOpacity'
  | 'gossBlur'
  | 'gossBlurDark'
  | 'headerLinks'
  | 'footerLinks'
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
