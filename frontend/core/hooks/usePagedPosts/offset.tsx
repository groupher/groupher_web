import { useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'

import { articlePageEntries } from '~/lib/pagination/merge'
import { Q } from '~/query'
import type { TEffectivePagiConfig } from '~/spec'

import { PagedPostsContext } from './context'
import { loadingOrDone, usePagedPostsInput, usePagedPostsResult } from './shared'

type TProps = PropsWithChildren<{ config: TEffectivePagiConfig }>

/** Provides the offset page surface; this component never registers an infinite query. */
export default function OffsetPagedPostsProvider({ children, config }: TProps) {
  const { pagedParams } = usePagedPostsInput(config)
  const query = useQuery(Q.article.posts(pagedParams, config))
  const articleChunks = useMemo(
    () => [query.data ? articlePageEntries(query.data) : []],
    [query.data],
  )
  const value = usePagedPostsResult({
    articleChunks,
    pageInfo: query.data?.pageInfo,
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
