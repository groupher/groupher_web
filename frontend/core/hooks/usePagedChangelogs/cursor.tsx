import { useInfiniteQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'

import { Q } from '~/query'
import { toPagedChangelogs } from '~/query/article'
import type { TChangelog, TEffectivePagiConfig } from '~/spec'

import { PagedChangelogsContext } from './context'
import { loadingOrDone, usePagedChangelogsInput, usePagedChangelogsResult } from './shared'

type TProps = PropsWithChildren<{ config: TEffectivePagiConfig }>

/** Provides the cursor page surface; this component never registers an offset query. */
export default function CursorPagedChangelogsProvider({ children, config }: TProps) {
  const { pagedParams } = usePagedChangelogsInput()
  const query = useInfiniteQuery(Q.article.changelogsInfinite(pagedParams, config))
  const articleChunks = useMemo<readonly (readonly TChangelog[])[]>(
    () => query.data?.pages.map((page) => toPagedChangelogs(page).entries) || [],
    [query.data?.pages],
  )
  const value = usePagedChangelogsResult({
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

  return <PagedChangelogsContext.Provider value={value}>{children}</PagedChangelogsContext.Provider>
}
