import { queryOptions } from '@tanstack/react-query'

import { THREAD } from '~/const/thread'
import { browserGraphQLRequest } from '~/graphql/client'
import { changelog, pagedChangelogs } from '~/schemas/pages/changelog'
import { doc } from '~/schemas/pages/doc'
import { communityTagGroups, communityTagStats } from '~/schemas/pages/misc'
import { groupedKanbanPosts, pagedPosts, post } from '~/schemas/pages/post'
import type {
  TPagedArticlesParams,
  TPagedChangelogs,
  TPagedPosts,
  TPost,
  TTagStats,
  TTagGroup,
  TThread,
} from '~/spec'

import { articleStats, articleStatsBatch } from './articleStats'
import { toArticleListFilter } from './filter'
import { articleQueryKeys } from './key'

type TGroupedKanbanPosts = {
  backlog: TPagedPosts
  todo: TPagedPosts
  wip: TPagedPosts
  done: TPagedPosts
  rejected: TPagedPosts
}

const posts = (filter: TPagedArticlesParams) =>
  queryOptions({
    queryKey: articleQueryKeys.posts(filter),
    meta: { hydration: 'public' },
    queryFn: async () => {
      const data = await browserGraphQLRequest(pagedPosts, {
        filter: toArticleListFilter(filter),
      })
      return data.pagedPosts as unknown as TPagedPosts
    },
  })

const changelogs = (filter: TPagedArticlesParams) =>
  queryOptions({
    queryKey: articleQueryKeys.changelogs(filter),
    meta: { hydration: 'public' },
    queryFn: async () => {
      const data = await browserGraphQLRequest(pagedChangelogs, {
        filter: toArticleListFilter(filter),
      })
      return data.pagedChangelogs as unknown as TPagedChangelogs
    },
  })

const kanban = (community: string) =>
  queryOptions({
    queryKey: articleQueryKeys.kanban(community),
    meta: { hydration: 'public' },
    queryFn: async () => {
      const data = await browserGraphQLRequest(groupedKanbanPosts, { community })
      return data.groupedKanbanPosts as unknown as TGroupedKanbanPosts
    },
    enabled: !!community,
  })

const detail = (community: string, thread: TThread, innerId: string | number) =>
  queryOptions({
    queryKey: articleQueryKeys.detail(community, thread, innerId),
    meta: { hydration: 'public' },
    queryFn: async () => {
      const article = { community, thread, innerId: String(innerId) }
      if (thread === THREAD.CHANGELOG) {
        const data = await browserGraphQLRequest(changelog, {
          article,
        })
        return data.changelog as unknown as TPost
      }
      if (thread === THREAD.DOC) {
        const data = await browserGraphQLRequest(doc, {
          article,
        })
        return data.doc as unknown as TPost
      }
      const data = await browserGraphQLRequest(post, {
        article,
      })
      return data.post as unknown as TPost
    },
  })

const tagStats = (community: string, thread: TThread, slug: string | null | undefined) =>
  queryOptions({
    queryKey: articleQueryKeys.tagStats(community, thread, slug),
    queryFn: async () => {
      if (!slug) return null
      const data = await browserGraphQLRequest(communityTagStats, { community, thread, slug })
      return data.communityTagStats ? ({ ...data.communityTagStats, slug } as TTagStats) : null
    },
    enabled: !!community && !!thread && !!slug,
  })

const tagGroups = (community: string, thread: TThread) =>
  queryOptions({
    queryKey: articleQueryKeys.tagGroups(community, thread),
    queryFn: async () => {
      const data = await browserGraphQLRequest(communityTagGroups, { community, thread })
      return (data.communityTagGroups || []) as unknown as TTagGroup[]
    },
    enabled: !!community && !!thread,
    staleTime: 60_000,
  })

export const articleQueries = {
  posts,
  changelogs,
  kanban,
  detail,
  tagGroups,
  tagStats,
  stats: articleStats,
  statsBatch: articleStatsBatch,
}
