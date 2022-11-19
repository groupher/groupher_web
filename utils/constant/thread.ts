import type { TArticleThread, TThread } from '@/spec'

export const CARD_THREAD = {}

export const ARTICLE_THREAD = {
  POST: 'post',
} as Record<Uppercase<TArticleThread>, TArticleThread>

export const THREAD = {
  ...ARTICLE_THREAD,
  ACCOUNT: 'account',
  // for groupher
  KANBAN: 'kanban',
  CHANGELOG: 'changelog',
  HELP: 'help',
  ABOUT: 'about',
  DASHBOARD: 'dashboard',
} as Record<Uppercase<TThread>, TThread>
