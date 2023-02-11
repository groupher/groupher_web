import type {
  TUpvoteLayout,
  TDashboardLayout,
  TAvatarLayout,
  TBrandLayout,
  TBannerLayout,
  TTopbarLayout,
  TBroadcastLayout,
  TBroadcastArticleLayout,
  TPostLayout,
  TKanbanLayout,
  TChangelogLayout,
  TSnakeUpperCase,
  THelpLayout,
  THelpFAQLayout,
  TFooterLayout,
} from '@/spec'

export const UPVOTE_LAYOUT = {
  DEFAULT: 'default',
  COMMENT: 'comment',
  ARTICLE: 'article',
  POST_LIST: 'post_list',
  POST_MINIMAL: 'post_minimal',
  GENERAL: 'general',
  SIMPLE: 'simple',
  FIXED_HEADER: 'fixed_header',
  STICKER: 'sticker',
} as Record<TSnakeUpperCase<TUpvoteLayout>, TUpvoteLayout>

export const AVATAR_LAYOUT = {
  CIRCLE: 'circle',
  SQUARE: 'square',
} as Record<TSnakeUpperCase<TAvatarLayout>, TAvatarLayout>

export const BRAND_LAYOUT = {
  BOTH: 'both',
  LOGO: 'logo',
  TEXT: 'text',
} as Record<TSnakeUpperCase<TBrandLayout>, TBrandLayout>

export const BANNER_LAYOUT = {
  HEADER: 'header',
  TABBER: 'tabber',
  SIDEBAR: 'sidebar',
} as Record<TSnakeUpperCase<TBannerLayout>, TBannerLayout>

export const TOPBAR_LAYOUT = {
  YES: 'yes',
  NO: 'no',
} as Record<TSnakeUpperCase<TTopbarLayout>, TTopbarLayout>

export const BROADCAST_LAYOUT = {
  DEFAULT: 'default',
  CENTER: 'center',
} as Record<TSnakeUpperCase<TBroadcastLayout>, TBroadcastLayout>

export const BROADCAST_ARTICLE_LAYOUT = {
  DEFAULT: 'default',
  SIMPLE: 'simple',
} as Record<TSnakeUpperCase<TBroadcastArticleLayout>, TBroadcastArticleLayout>

export const POST_LAYOUT = {
  UPVOTE_FIRST: 'upvote_first',
  COMMENT_FIRST: 'comment_first',
  CARD: 'card',
  MINIMAL: 'minimal',
  COVER: 'cover',
} as Record<TSnakeUpperCase<TPostLayout>, TPostLayout>

export const KANBAN_LAYOUT = {
  SIMPLE: 'simple',
  FULL: 'full',
} as Record<TSnakeUpperCase<TKanbanLayout>, TKanbanLayout>

export const CHANGELOG_LAYOUT = {
  PREVIEW: 'preview',
  OUTLINE: 'outline',
} as Record<TSnakeUpperCase<TChangelogLayout>, TChangelogLayout>

export const DASHBOARD_DESC_LAYOUT = {
  POST_LIST: 'post_list',
  BANNER: 'banner',
  CHANGELOG_LIST: 'changelog_list',
} as Record<TSnakeUpperCase<TDashboardLayout>, TDashboardLayout>

export const HELP_LAYOUT = {
  BLOCKS: 'blocks',
  LISTS: 'lists',
  ARTICLE: 'article',
} as Record<TSnakeUpperCase<THelpLayout>, THelpLayout>

export const HELP_FAQ_LAYOUT = {
  FLAT: 'flat',
  COLLAPSE: 'collapse',
  SEARCH_HINT: 'search_hint',
} as Record<TSnakeUpperCase<THelpFAQLayout>, THelpFAQLayout>

export const FOOTER_LAYOUT = {
  SIMPLE: 'simple',
  FULL: 'full',
} as Record<Uppercase<TFooterLayout>, TFooterLayout>
