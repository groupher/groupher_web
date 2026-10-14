import type { TArticleCat, TArticleOrder, TArticleStatus, TThread } from '~/spec'

export type TInit = {
  thread?: TThread | null
}

export type TStore = TInit & {
  activeOrder: TArticleOrder | null | undefined
  activeCat: TArticleCat | null | undefined
  activeStatus: TArticleStatus | null | undefined

  updateActiveFilter: (filter: TArticleFilter) => void
  commit: (patch: Partial<TStore>) => void
}
