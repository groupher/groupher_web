import { useInfiniteQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'

import { Q } from '~/query'
import { toPagedPosts } from '~/query/article'
import type { TEffectivePagiConfig, TPost } from '~/spec'

import { PagedPostsContext } from './context'
import { usePagedPostsInput, usePagedPostsResult, loadingOrDone } from './shared'

type TProps = PropsWithChildren<{ config: TEffectivePagiConfig }>

/** Provides the cursor page surface; this component never registers an offset query. */
export default function CursorPagedPostsProvider({ children, config }: TProps) {
  const { pagedParams } = usePagedPostsInput()
  const query = useInfiniteQuery(Q.article.postsInfinite(pagedParams, config))
  const articleChunks = useMemo<readonly (readonly TPost[])[]>(
    () => query.data?.pages.map((page) => toPagedPosts(page).entries) || [],
    [query.data?.pages],
  )
  const value = usePagedPostsResult({
    articleChunks,
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
