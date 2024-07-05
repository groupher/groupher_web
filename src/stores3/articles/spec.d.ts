import type {
  TAccount,
  TCommunity,
  TUser,
  TPagedArticles,
  TArticleOrder,
  TArticleCat,
  TArticleState,
  TResState,
} from '~/spec'

export type TStore = {
  pagedPosts: TPagedArticles
  pagedChangelogs: TPagedArticles

  // kanban's
  todo: TPagedArticles
  wip: TPagedArticles
  done: TPagedArticles

  activeOrder: TArticleOrder | null
  activeCat: TArticleCat | null
  activeState: TArticleState | null

  resState: TResState
}

export const holder = 1
