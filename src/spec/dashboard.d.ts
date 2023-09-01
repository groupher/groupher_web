import type { TColorName } from './color'
import type { TLinkItem } from './utils'

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

export type TNameAliasConfig = {
  slug: string
  name: string
  original?: string
  group?: string
}

export type TDashboardThreadConfig = {
  enable: TEnableConfig
  nameAlias: TNameAliasConfig[]
  extraLinks?: TLinkItem[]
}

export type TFooterConfig = {
  layout: TFooterLayout
  links: TLinkItem[]
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
