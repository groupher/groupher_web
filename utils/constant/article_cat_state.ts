import type { TArticleCat, TArticleState } from '@/spec'

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

  // reject
  ...ARTICLE_CAT_REJECT,
} as Record<Uppercase<TArticleCat>, Uppercase<TArticleCat>>

export const ARTICLE_STATE = {
  TODO: 'TODO',
  WIP: 'WIP',
  DONE: 'DONE',
  DEFAULT: 'DEFAULT',
  RESOLVE: 'RESOLVE',
  REJECT: 'REJECT',
} as Record<Uppercase<TArticleState>, Uppercase<TArticleState>>
