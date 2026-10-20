import { useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'

import { Q } from '~/query'
import type { TEffectivePagiConfig } from '~/spec'

import { PagedPostsContext } from './context'
import { loadingOrDone, usePagedPostsInput, usePagedPostsResult } from './shared'

type TProps = PropsWithChildren<{ config: TEffectivePagiConfig }>

/** Provides the offset page surface; this component never registers an infinite query. */
export default function OffsetPagedPostsProvider({ children, config }: TProps) {
  const { pagedParams } = usePagedPostsInput()
  const query = useQuery(Q.article.posts(pagedParams, config))
  const articleChunks = useMemo(() => [query.data?.entries || []], [query.data?.entries])
  const value = usePagedPostsResult({
    articleChunks,
    pagedParams,
    resState: loadingOrDone(query.isPending),
    config,
    initialError: query.isError && !query.data ? query.error : null,
    isRetryingInitial: query.isRefetching,
    retryInitial: query.refetch,
    hasNextPage: false,
    isFetchingNextPage: false,
    nextPageError: null,
    retryNextPage: async () => undefined,
    fetchNextPage: async () => undefined,
  })

  return <PagedPostsContext.Provider value={value}>{children}</PagedPostsContext.Provider>
}
