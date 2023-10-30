import type { TArticleCat, TArticleState, TArticleCatMode, TArticleStateMode } from '@/spec'

export const ARTICLE_CAT_REJECT = {
  REJECT: 'REJECT', // 关闭
  REJECT_DUP: 'REJECT_DUP', // 重复问题
  REJECT_NO_PLAN: 'REJECT_NO_PLAN', // 无计划
  REJECT_REPRO: 'REJECT_REPRO', // 无法重现
  REJECT_STALE: 'REJECT_STALE', // 已过时
}

export const ARTICLE_CAT = {
  ALL: 'ALL',
  FEATURE: 'FEATURE',
  BUG: 'BUG',
  QUESTION: 'QUESTION',
  OTHER: 'OTHER',
} as Record<Uppercase<TArticleCat>, Uppercase<TArticleCat>>

export const ARTICLE_STATE = {
  ALL: 'ALL',
  TODO: 'TODO',
  WIP: 'WIP',
  DONE: 'DONE',
  DEFAULT: 'DEFAULT',
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
