import { loadKanban, loadPagedChangelogs, loadPagedPosts } from '@dash/server/cms'
import { queryOptions } from '@tanstack/react-query'

import { DEFAULT_EFFECTIVE_PAGI_CONFIG } from '~/lib/pagination/params'
import { articleQueries } from '~/query/article'

export const dashQueries = {
  posts: (community: string, config = DEFAULT_EFFECTIVE_PAGI_CONFIG) =>
    queryOptions({
      queryKey: articleQueries.posts(
        { community, page: 1, size: config.defaultSize },
        { ...config, api: 'offset', mode: 'page' },
      ).queryKey,
      queryFn: () =>
        loadPagedPosts({
          data: {
            community,
            pagi: {
              offset: { page: 1, size: config.defaultSize, configRevision: config.revision },
            },
          },
        }),
      staleTime: 60_000,
    }),
  changelogs: (community: string, config = DEFAULT_EFFECTIVE_PAGI_CONFIG) =>
    queryOptions({
      queryKey: articleQueries.changelogs(
        { community, page: 1, size: config.defaultSize },
        { ...config, api: 'offset', mode: 'page' },
      ).queryKey,
      queryFn: () =>
        loadPagedChangelogs({
          data: {
            community,
            pagi: {
              offset: { page: 1, size: config.defaultSize, configRevision: config.revision },
            },
          },
        }),
      staleTime: 60_000,
    }),
  kanban: (community: string, config = DEFAULT_EFFECTIVE_PAGI_CONFIG) =>
    queryOptions({
      queryKey: articleQueries.kanban(community, config).queryKey,
      queryFn: () => loadKanban({ data: { community } }),
      staleTime: 60_000,
    }),
}
