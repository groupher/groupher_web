import { createContext } from 'react'

import type {
  TEffectivePagiConfig,
  TPagedArticleViewModels,
  TPagedArticlesParams,
  TResState,
} from '~/spec'

export type TPagedPostsResult = {
  resState: TResState
  pagedPosts: TPagedArticleViewModels
  pagedParams: TPagedArticlesParams
  paginationApi: TEffectivePagiConfig['api']
  paginationMode: TEffectivePagiConfig['mode']
  initialError: Error | null
  isRetryingInitial: boolean
  retryInitial: () => Promise<unknown>
  hasNextPage: boolean
  isFetchingNextPage: boolean
  nextPageError: Error | null
  retryNextPage: () => Promise<unknown>
  fetchNextPage: () => Promise<unknown>
}

export const PagedPostsContext = createContext<TPagedPostsResult | null>(null)
