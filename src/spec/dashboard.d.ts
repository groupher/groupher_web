import type { TColorName } from './color'

export type TAvatarLayout = 'circle' | 'square'
export type TBrandLayout = 'both' | 'logo' | 'text'
export type TBannerLayout = 'header' | 'tabber' | 'sidebar'

export type TTopbarLayout = 'yes' | 'no'
export type TPostLayout = 'quora' | 'ph' | 'masonry' | 'minimal' | 'cover'
export type TKanbanLayout = 'simple' | 'full'
export type TChangelogLayout = 'classic' | 'simple'
export type TDocLayout = 'blocks' | 'lists' | 'cards' | 'article'
export type TDocFAQLayout = 'flat' | 'collapse' | 'search_hint'
export type THeaderLayout = 'center' | 'right' | 'float'
export type TFooterLayout = 'simple' | 'group'
export type TRSSType = 'digest' | 'full'

export type TBroadcastLayout = 'default' | 'center'
export type TBroadcastArticleLayout = 'default' | 'simple'

export type TBroadcastConfig = {
  // banner
  broadcastLayout: TBroadcastLayout
  broadcastBg: TColorName
  broadcastEnable: boolean
  // article
  broadcastArticleBg: TColorName
  broadcastArticleLayout: TBroadcastArticleLayout
  broadcastArticleEnable: boolean
}

export type TEnableConfig = {
  post: boolean
  kanban: boolean
  changelog: boolean
  //
  doc: boolean
  docLastUpdate: boolean
  docReaction: boolean
  //
  about: boolean
  aboutTechstack: boolean
  aboutLocation: boolean
  aboutLinks: boolean
  aboutMediaReport: boolean
}

export type TNameAlias = {
  slug: string
  name: string
  original?: string
  group?: string
}

export type TDashboardThreadConfig = {
  enable: TEnableConfig
  nameAlias: TNameAlias[]
}

export type TDashboardSEOConfig = {
  seoEnable: boolean
  ogSiteName: string
  ogTitle: string
  ogDescription?: string
  ogUrl: string
  ogImage?: string
  ogLocale?: string
  ogPublisher?: string

  twTitle: string
  twDescription: string
  twUrl: string
  twCard: string // 'summary' | 'summary_large_image'
  twSite: string
  twImage: string
  twImageWidth: string
  twImageHeight: string
}

export type TGlobalLayout = {
  primaryColor: TColorName
  brand: TBrandLayout
  post: TPostLayout
  kanban: TKanbanLayout
  kanbanBgColors: TColorName[]
  doc: TDocLayout
  docFaq: TDocFAQLayout
  banner: TBannerLayout
  avatar: TAvatarLayout
  changelog: TChangelogLayout
  header: THeaderLayout
  footer: TFooterLayout

  broadcast: TBroadcastLayout
  broadcastBg: TColorName
  broadcastEnable: boolean

  broadcastArticle: TBroadcastArticleLayout
  broadcastArticleBg: TColorName
  broadcastArticleEnable: boolean

  topbar: TTopbarLayout
  topbarBg: TColorName

  enable: TEnableConfig
}
