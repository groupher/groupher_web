import { useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'

import { Q } from '~/query'
import type { TEffectivePagiConfig } from '~/spec'

import { PagedChangelogsContext } from './context'
import { loadingOrDone, usePagedChangelogsInput, usePagedChangelogsResult } from './shared'

type TProps = PropsWithChildren<{ config: TEffectivePagiConfig }>

/** Provides the offset page surface; this component never registers an infinite query. */
export default function OffsetPagedChangelogsProvider({ children, config }: TProps) {
  const { pagedParams } = usePagedChangelogsInput()
  const query = useQuery(Q.article.changelogs(pagedParams, config))
  const articleChunks = useMemo(() => [query.data?.entries || []], [query.data?.entries])
  const value = usePagedChangelogsResult({
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

  return <PagedChangelogsContext.Provider value={value}>{children}</PagedChangelogsContext.Provider>
}
