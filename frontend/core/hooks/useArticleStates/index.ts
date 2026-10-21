/**
 * Builds normalized Article states for list, changelog, and Kanban surfaces.
 *
 *   Article contents
 *     -> group paths by community/thread
 *     -> real ArticleStats batch queries
 *     -> shared private-state/reconciliation layer
 *     -> ordered TArticleState[]
 *
 * Batch grouping is transport-only: output order always follows the caller's content order, while
 * state composition is identical to the single-Article hook.
 */
'use client'

import { useQueries, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { Q } from '~/query'
import { articlePathKey, articlePathOf, type TArticlePath } from '~/query/articlePath'
import type { TArticle, TArticleState, TArticleStats } from '~/spec'

import {
  composeArticleState,
  useArticlePrivateStatesByChunks,
  useRefreshStaleArticleStats,
} from './shared'

type TStatsBatch = {
  community: string
  thread: TArticlePath['thread']
  innerIds: string[]
}

const EMPTY_ARTICLES: readonly TArticle[] = []

const validRef = (path: TArticlePath): boolean =>
  Boolean(path.community && path.thread && path.innerId)

const groupStatsBatches = (paths: readonly TArticlePath[]): TStatsBatch[] => {
  const groups = new Map<
    string,
    { community: string; thread: TArticlePath['thread']; innerIds: Set<string> }
  >()

  for (const path of paths) {
    const scope = `${path.community}:${path.thread}`
    const group = groups.get(scope) || {
      community: path.community,
      thread: path.thread,
      innerIds: new Set<string>(),
    }
    group.innerIds.add(String(path.innerId))
    groups.set(scope, group)
  }

  return [...groups.values()].map((group) => ({
    community: group.community,
    thread: group.thread,
    innerIds: [...group.innerIds].sort(),
  }))
}

/**
 * Returns Article states in input order while batching public stats by community/thread.
 *
 * Missing or invalid paths retain their content with `stats: null`; private viewer state and local
 * confirmations are composed through the same shared precedence rules used by detail pages.
 */
export default function useArticleStates<T extends TArticle>(
  articles: readonly T[] | undefined,
): TArticleState<T>[] {
  return useArticleStatesByChunks([articles || (EMPTY_ARTICLES as readonly T[])])
}

/**
 * Returns Article states while preserving the caller's stable page/chunk boundaries.
 *
 * Each chunk owns its stats, viewer, and interaction batch keys. This is the list counterpart to
 * `useArticleStates`; infinite-query consumers can append a page without re-requesting earlier
 * chunks.
 */
export function useArticleStatesByChunks<T extends TArticle>(
  articleChunks: readonly (readonly T[])[],
): TArticleState<T>[] {
  const normalizedChunks = useMemo(() => articleChunks.map((chunk) => [...chunk]), [articleChunks])
  const normalizedArticles = useMemo(
    () => normalizedChunks.flatMap((chunk) => chunk),
    [normalizedChunks],
  )
  const queryClient = useQueryClient()
  const pathChunks = useMemo(
    () => normalizedChunks.map((chunk) => chunk.map(articlePathOf).filter(validRef)),
    [normalizedChunks],
  )
  const batches = useMemo(() => pathChunks.flatMap(groupStatsBatches), [pathChunks])

  const statsQueries = useQueries({
    queries: batches.map(({ community, thread, innerIds }) =>
      Q.article.statsBatch(queryClient, community, thread, innerIds),
    ),
  })
  const statsByRef = useMemo(() => {
    const index = new Map<string, TArticleStats>()
    for (const query of statsQueries) {
      for (const stats of query.data || []) index.set(articlePathKey(stats), stats)
    }
    return index
  }, [statsQueries])
  const privateState = useArticlePrivateStatesByChunks(pathChunks, statsByRef)
  const paths = useMemo(() => pathChunks.flat(), [pathChunks])
  useRefreshStaleArticleStats(queryClient, paths, statsByRef)

  return useMemo(
    () =>
      normalizedArticles.map((article) => {
        const path = articlePathOf(article)
        const key = articlePathKey(path)
        const stats = statsByRef.get(key) || null
        return composeArticleState({
          content: article,
          path,
          stats,
          viewed: privateState.viewerStates?.[key],
          interaction: privateState.interactionStates?.[key],
          viewAcknowledged: privateState.viewAcks.has(key),
          receipt: privateState.receipts.get(key) || null,
        })
      }),
    [normalizedArticles, privateState, statsByRef],
  )
}
