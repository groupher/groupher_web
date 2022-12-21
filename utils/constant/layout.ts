import type {
  TUpvoteLayout,
  TDashboardLayout,
  TBrandLayout,
  TBannerLayout,
  TTopbarLayout,
  TBannerNotifyLayout,
  TPostLayout,
  TKanbanLayout,
  TChangelogLayout,
  TSnakeUpperCase,
  THelpLayout,
} from '@/spec'

export const UPVOTE_LAYOUT = {
  DEFAULT: 'default',
  COMMENT: 'comment',
  ARTICLE: 'article',
  POST_LIST: 'post-list',
  POST_MINIMAL: 'post-minimal',
  GENERAL: 'general',
  SIMPLE: 'simple',
  FIXED_HEADER: 'fixed-header',
  STICKER: 'sticker',
} as Record<TSnakeUpperCase<TUpvoteLayout>, TUpvoteLayout>

export const BRAND_LAYOUT = {
  BOTH: 'both',
  LOGO: 'logo',
  TEXT: 'text',
} as Record<TSnakeUpperCase<TBrandLayout>, TBrandLayout>

export const BANNER_LAYOUT = {
  HEADER: 'header',
  TABBER: 'tabber',
} as Record<TSnakeUpperCase<TBannerLayout>, TBannerLayout>

export const TOPBAR_LAYOUT = {
  YES: 'yes',
  NO: 'no',
} as Record<TSnakeUpperCase<TTopbarLayout>, TTopbarLayout>

export const BANNER_NOTIFY_LAYOUT = {
  DEFAULT: 'default',
  CENTER: 'center',
} as Record<TSnakeUpperCase<TBannerNotifyLayout>, TBannerNotifyLayout>

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
  FULL: 'full',
  FAQ: 'faq',
  HELPCENTER: 'helpcenter',
  ARTICLE: 'article',
} as Record<TSnakeUpperCase<THelpLayout>, THelpLayout>
