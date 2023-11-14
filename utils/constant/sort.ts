import type { TArticleSort } from '@/spec'

export const ARTICLE_SORT = {
  ALL: 'ALL',
  PUBLISH: 'PUBLISH',
  UPVOTE: 'UPVOTE',
  COMMENT: 'COMMENT',
  VIEWS: 'VIEWS',
} as Record<Uppercase<TArticleSort>, Uppercase<TArticleSort>>

export const DIR = {
  // ..
}
