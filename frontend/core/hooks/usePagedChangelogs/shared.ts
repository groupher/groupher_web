import { useMemo } from 'react'

import TYPE from '~/const/type'
import { useArticleStatesByChunks } from '~/hooks/useArticleStates'
import useURLSearchParams from '~/hooks/useURLSearchParams'
import { getPagedArticlesParams } from '~/lib/pagedArticlesFilter'
import { normalizePaginationError } from '~/lib/pagination/errors'
import type {
  TChangelog,
  TEffectivePagiConfig,
  TPagedArticleViewModels,
  TPagedArticlesParams,
  TPagedChangelogs,
  TResState,
} from '~/spec'
import useCommunity from '~/stores/community/hooks'

import type { TPagedChangelogsResult } from './context'

/** Reads the stable community/filter input shared by both pagination surfaces. */
export const usePagedChangelogsInput = (): { pagedParams: TPagedArticlesParams } => {
  const { slug } = useCommunity()
  const searchParams = useURLSearchParams()
  return { pagedParams: getPagedArticlesParams(slug, searchParams) }
}

type TComposeOptions = {
  articleChunks: readonly (readonly TChangelog[])[]
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
export const usePagedChangelogsResult = ({
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
}: TComposeOptions): TPagedChangelogsResult => {
  const pagedChangelogs = useMemo<TPagedChangelogs>(
    () => ({ entries: articleChunks.flatMap((chunk) => chunk) }),
    [articleChunks],
  )
  const states = useArticleStatesByChunks<TChangelog>(articleChunks)
  const viewModels = useMemo<TPagedArticleViewModels>(
    () => ({
      ...pagedChangelogs,
      entries: states.map(({ content, stats, viewerState }) => ({
        content,
        stats,
        viewerState,
      })),
    }),
    [pagedChangelogs, states],
  )

  return {
    resState,
    pagedChangelogs: viewModels,
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
