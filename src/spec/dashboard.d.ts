import type { TColorName } from './color'

export type TAvatarLayout = 'circle' | 'square'
export type TBrandLayout = 'both' | 'logo' | 'text'
export type TBannerLayout = 'header' | 'tabber' | 'sidebar'

export type TTopbarLayout = 'yes' | 'no'
export type TPostLayout = 'upvote_first' | 'comment_first' | 'card' | 'minimal' | 'cover'
export type TKanbanLayout = 'simple' | 'full'
export type TChangelogLayout = 'preview' | 'outline'
export type THelpLayout = 'article' | 'faq_flat' | 'faq_collapse'
export type TFooterLayout = 'simple' | 'full'

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

export type TGlobalLayout = {
  primaryColor: TColorName
  brand: TBrandLayout
  post: TPostLayout
  kanban: TKanbanLayout
  kanbanBgColors: string[]
  help: THelpLayout
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
}
