import type { TMetric } from '@/spec'
// NOTE:  the value is mapping to @/utils/media's key
// so do not change to lowercase etc...
const METRIC = {
  HOME: 'HOME',
  COMMUNITY: 'COMMUNITY',
  USER: 'USER',
  // article
  ARTICLE: 'ARTICLE',

  // 版块
  HELP_CENTER: 'HELP_CENTER',

  // eidtors
  COMMUNITY_EDITOR: 'COMMUNITY_EDITOR',
  ARTICLE_EDITOR: 'ARTICLE_EDITOR',
} as Record<Uppercase<TMetric>, Uppercase<TMetric>>

export default METRIC
