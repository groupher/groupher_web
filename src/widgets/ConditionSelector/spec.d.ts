import type { TArticleState, TArticleCat, TMenu } from '@/spec'

export type TActiveCondition = TArticleState | TArticleCat | 'ALL'

export type TMenuItem = {
  key: string
  title?: stirng
  icon?: TMenu
}
