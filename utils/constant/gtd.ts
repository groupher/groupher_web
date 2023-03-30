import type { TArticleCat, TArticleState, TArticleCatMode, TArticleStateMode } from '@/spec'

export const ARTICLE_CAT_REJECT = {
  REJECT_DUP: 'REJECT_DUP',
  REJECT_NO_PLAN: 'REJECT_NO_PLAN',
  REJECT_NO_FIX: 'REJECT_NO_FIX',
  REJECT_REPRO: 'REJECT_REPRO',
  REJECT_STALE: 'REJECT_STALE',
}

export const ARTICLE_CAT = {
  ALL: 'ALL',
  FEATURE: 'FEATURE',
  BUG: 'BUG',
  QUESTION: 'QUESTION',
  OTHER: 'OTHER',
} as Record<Uppercase<TArticleCat>, Uppercase<TArticleCat>>

export const ARTICLE_STATE = {
  TODO: 'TODO',
  WIP: 'WIP',
  DONE: 'DONE',
  DEFAULT: 'DEFAULT',
  RESOLVED: 'RESOLVED',
  // reject
  ...ARTICLE_CAT_REJECT,
} as Record<Uppercase<TArticleState>, Uppercase<TArticleState>>

export const ARTICLE_CAT_MODE = {
  FILTER: 'filter',
  FULL: 'full',
} as Record<Uppercase<TArticleCatMode>, TArticleCatMode>

export const ARTICLE_STATE_MODE = {
  FILTER: 'filter',
  FULL: 'full',
} as Record<Uppercase<TArticleStateMode>, TArticleStateMode>
