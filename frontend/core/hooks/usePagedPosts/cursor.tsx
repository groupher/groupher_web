import { useInfiniteQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

import useCursorArticleChunks from '~/hooks/useCursorArticleChunks'
import { articlePageEntries } from '~/lib/pagination/merge'
import { Q } from '~/query'
import type { TEffectivePagiConfig } from '~/spec'

import { PagedPostsContext } from './context'
import { usePagedPostsInput, usePagedPostsResult, loadingOrDone } from './shared'

type TProps = PropsWithChildren<{ config: TEffectivePagiConfig }>

/** Provides the cursor page surface; this component never registers an offset query. */
export default function CursorPagedPostsProvider({ children, config }: TProps) {
  const { pagedParams } = usePagedPostsInput(config)
  const query = useInfiniteQuery(Q.article.postsInfinite(pagedParams, config))
  const articleChunks = useCursorArticleChunks(query.data?.pages, articlePageEntries, 'posts')
  const value = usePagedPostsResult({
    articleChunks,
    pageInfo: query.data?.pages.at(-1)?.pageInfo,
    pagedParams,
    resState: loadingOrDone(query.isPending),
    config,
    initialError: query.isError && !query.data ? query.error : null,
    isRetryingInitial: query.isRefetching,
    retryInitial: query.refetch,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    nextPageError: query.isFetchNextPageError ? query.error : null,
    retryNextPage: query.fetchNextPage,
    fetchNextPage: query.fetchNextPage,
  })

  return <PagedPostsContext.Provider value={value}>{children}</PagedPostsContext.Provider>
}
