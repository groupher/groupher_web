import { useInfiniteQuery } from '@tanstack/react-query'

import { Q } from '~/query'

import { CommentFeedContext, type TFeedProps } from './context'
import useCommentPages from './usePages'

export default function CursorFeed({ children, collection, config, setPage }: TFeedProps) {
  const query = useInfiniteQuery(Q.comment.infinite(collection, config))
  const pages = useCommentPages(query.data?.pages || [], collection)
  const data = pages.length
    ? {
        ...pages[pages.length - 1],
        entries: pages.flatMap((page) => page.entries),
        pinnedEntries: pages.flatMap((page) => page.pinnedEntries),
      }
    : undefined
  return (
    <CommentFeedContext.Provider
      value={{
        collection,
        config,
        data,
        pending: query.isPending,
        fetching: query.isFetching,
        error: query.isError && !query.data ? query.error : null,
        nextError: query.isFetchNextPageError ? query.error : null,
        hasNext: query.hasNextPage,
        loadingNext: query.isFetchingNextPage,
        retry: () => {
          void query.refetch()
        },
        loadNext: () => {
          if (!query.isFetching) void query.fetchNextPage()
        },
        setPage,
      }}
    >
      {children}
    </CommentFeedContext.Provider>
  )
}
