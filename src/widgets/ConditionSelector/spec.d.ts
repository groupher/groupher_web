import type { TArticleState, TArticleCat } from '@/spec'

export type TActiveCondition = TArticleState | TArticleCat | 'ALL'

export type TMenuItem = {
  key: string
  title?: stirng
  icon?: string
}
