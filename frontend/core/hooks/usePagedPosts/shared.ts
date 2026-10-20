import { useMemo } from 'react'

import TYPE from '~/const/type'
import { useArticleStatesByChunks } from '~/hooks/useArticleStates'
import useURLSearchParams from '~/hooks/useURLSearchParams'
import { getPagedArticlesParams } from '~/lib/pagedArticlesFilter'
import { normalizePaginationError } from '~/lib/pagination/errors'
import type {
  TEffectivePagiConfig,
  TPagedArticleViewModels,
  TPagedArticlesParams,
  TPagedPosts,
  TPost,
  TResState,
} from '~/spec'
import useCommunity from '~/stores/community/hooks'

import type { TPagedPostsResult } from './context'

/** Reads the stable community/filter input shared by both pagination surfaces. */
export const usePagedPostsInput = (): { pagedParams: TPagedArticlesParams } => {
  const { slug } = useCommunity()
  const searchParams = useURLSearchParams()
  return { pagedParams: getPagedArticlesParams(slug, searchParams) }
}

type TComposeOptions = {
  articleChunks: readonly (readonly TPost[])[]
  pagedParams: TPagedArticlesParams
  resState: TResState
  config: TEffectivePagiConfig
  initialError: unknown
  isRetryingInitial: boolean
  retryInitial: () => Promise<unknown>
  hasNextPage: boolean
  isFetchingNextPage: boolean
  nextPageError: unknown
  retryNextPage: () => Promise<unknown>
  fetchNextPage: () => Promise<unknown>
}

/** Composes legacy list view models while retaining each loaded page's state batch boundary. */
export const usePagedPostsResult = ({
  articleChunks,
  pagedParams,
  resState,
  config,
  initialError,
  isRetryingInitial,
  retryInitial,
  hasNextPage,
  isFetchingNextPage,
  nextPageError,
  retryNextPage,
  fetchNextPage,
}: TComposeOptions): TPagedPostsResult => {
  const pagedPosts = useMemo<TPagedPosts>(
    () => ({ entries: articleChunks.flatMap((chunk) => chunk) }),
    [articleChunks],
  )
  const states = useArticleStatesByChunks<TPost>(articleChunks)
  const viewModels = useMemo<TPagedArticleViewModels>(
    () => ({
      ...pagedPosts,
      entries: states.map(({ content, stats, viewerState }) => ({
        content,
        stats,
        viewerState,
      })),
    }),
    [pagedPosts, states],
  )

  return {
    resState,
    pagedPosts: viewModels,
    pagedParams,
    paginationApi: config.api,
    initialError: normalizePaginationError(initialError),
    isRetryingInitial,
    retryInitial,
    hasNextPage,
    isFetchingNextPage,
    nextPageError: normalizePaginationError(nextPageError),
    retryNextPage,
    fetchNextPage,
  }
}

/** Maps the active query's pending state to the legacy list response state. */
export const loadingOrDone = (isPending: boolean): TResState =>
  (isPending ? TYPE.RES_STATE.LOADING : TYPE.RES_STATE.DONE) as TResState
