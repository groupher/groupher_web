import type { TColorName } from './color'

export type TAvatarLayout = 'circle' | 'square'
export type TBrandLayout = 'both' | 'logo' | 'text'
export type TBannerLayout = 'header' | 'tabber' | 'sidebar'

export type TTopbarLayout = 'yes' | 'no'
export type TPostLayout = 'upvote_first' | 'comment_first' | 'masonry' | 'minimal' | 'cover'
export type TKanbanLayout = 'simple' | 'full'
export type TChangelogLayout = 'classic' | 'simple'
export type THelpLayout = 'blocks' | 'lists' | 'article'
export type THelpFAQLayout = 'flat' | 'collapse' | 'search_hint'
export type TFooterLayout = 'simple' | 'full'
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
  help: boolean
  helpLastUpdate: boolean
  helpReaction: boolean
  //
  about: boolean
  aboutTechstack: boolean
  aboutLocation: boolean
  aboutLinks: boolean
  aboutMediaReport: boolean
}

export type TNameAliasConfig = {
  raw: string
  name: string
  original?: string
}

export type TDashboardThreadConfig = {
  enable: TEnableConfig
  nameAlias: TNameAliasConfig[]
}

export type TGlobalLayout = {
  primaryColor: TColorName
  brand: TBrandLayout
  post: TPostLayout
  kanban: TKanbanLayout
  kanbanBgColors: TColorName[]
  help: THelpLayout
  helpFaq: THelpFAQLayout
  banner: TBannerLayout
  avatar: TAvatarLayout
  changelog: TChangelogLayout
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
