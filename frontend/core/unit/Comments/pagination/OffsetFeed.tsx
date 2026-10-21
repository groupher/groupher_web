import { useQuery } from '@tanstack/react-query'

import { Q } from '~/query'

import { CommentFeedContext, type TFeedProps } from './context'
import useCommentPages from './usePages'

export default function OffsetFeed({ children, collection, config, page, setPage }: TFeedProps) {
  const query = useQuery(Q.comment.page(collection, config, page))
  const pages = useCommentPages(query.data ? [query.data] : [], collection)
  return (
    <CommentFeedContext.Provider
      value={{
        collection,
        config,
        data: pages[0],
        pending: query.isPending,
        fetching: query.isFetching,
        error: query.error,
        nextError: null,
        hasNext: query.data?.pageInfo.hasNextPage || false,
        loadingNext: false,
        retry: () => {
          void query.refetch()
        },
        loadNext: () => setPage(page + 1),
        setPage,
      }}
    >
      {children}
    </CommentFeedContext.Provider>
  )
}
