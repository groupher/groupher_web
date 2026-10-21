import { useQuery, useQueries } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import TYPE from '~/const/type'
import { EMPTY_PAGED_ARTICLES } from '~/const/utils'
import { useArticleStatesByChunks } from '~/hooks/useArticleStates'
import usePagiConfig from '~/hooks/usePagiConfig'
import { mergeCursorArticlePages } from '~/lib/pagination/merge'
import { toPagiGraphQLInput } from '~/lib/pagination/params'
import { Q } from '~/query'
import type {
  TPagedArticleViewModels,
  TPagedPosts,
  TResState,
  TPagiRequest,
  TPaginationMode,
} from '~/spec'
import useCommunity from '~/stores/community/hooks'
import useDsbConfig from '~/stores/dsbConfig/hooks'

export type TKanbanPage = TPagedArticleViewModels & {
  mode: TPaginationMode
  setPage: (page: number) => void
  next: () => void
  retry: () => void
  pending: boolean
  error: unknown
}
const boards = ['backlog', 'todo', 'wip', 'done', 'rejected'] as const
type Board = (typeof boards)[number]
type TRes = Record<Board, TKanbanPage> & { resState: TResState }

/** Reads grouped kanban server state directly from Query. */
export default function useKanbanPosts(): TRes {
  const { slug } = useCommunity()
  const { config, ready } = usePagiConfig(useDsbConfig(), slug)
  const query = useQuery({ ...Q.article.kanban(slug, config), enabled: ready })
  const scope = `${slug}:${config.revision}`
  const [positions, setPositions] = useState<{
    scope: string
    requests: Partial<Record<Board, TPagiRequest[]>>
  }>({ scope, requests: {} })
  const requests = positions.scope === scope ? positions.requests : {}
  const setPosition = (board: Board, request: TPagiRequest) =>
    setPositions((current) => {
      const existing = current.scope === scope ? current.requests : {}
      const prior = existing[board] || []
      if (
        request.api === 'cursor' &&
        prior.some((item) => item.api === 'cursor' && item.after === request.after)
      )
        return current
      return {
        scope,
        requests: {
          ...existing,
          [board]: request.api === 'cursor' ? [...prior, request] : [request],
        },
      }
    })
  const pageRequests = boards.flatMap((board) =>
    (requests[board] || []).map((request) => ({ board, request })),
  )
  const pages = useQueries({
    queries: pageRequests.map(({ board, request }) => ({
      ...Q.article.kanbanPage(
        slug,
        board === 'rejected'
          ? { community: slug, statuses: ['REJECT', 'REJECT_DUP'] }
          : { community: slug, status: board.toUpperCase() },
        toPagiGraphQLInput(request),
      ),
    })),
  })
  const data: Partial<Record<Board, TPagedPosts>> = {}
  const chunks: (readonly import('~/spec').TPost[])[] = []
  for (const board of boards) {
    const indices = pageRequests.flatMap((item, index) => (item.board === board ? [index] : []))
    const cursor = requests[board]?.[0]?.api === 'cursor'
    const head = query.data?.[board]
    const loaded = indices.flatMap((index) => (pages[index].data ? [pages[index].data!] : []))
    const boardPages = cursor
      ? [...(head ? [head] : []), ...loaded]
      : indices.length
        ? loaded
        : head
          ? [head]
          : []
    const merged = mergeCursorArticlePages(boardPages.map((page) => page.entries))
    chunks.push(...merged.chunks)
    const last = boardPages.at(-1)
    if (last) data[board] = { ...last, entries: merged.chunks.flat() }
  }
  const states = useArticleStatesByChunks(chunks)
  const stateByArticle = useMemo(
    () => new Map(states.map((state) => [state.content, state] as const)),
    [states],
  )

  const toViewModels = (board: Board): TKanbanPage => {
    const page = data[board]
    const index = pageRequests.map((item) => item.board).lastIndexOf(board)
    const active = index < 0 ? undefined : pages[index]
    return {
      ...(page || EMPTY_PAGED_ARTICLES),
      setPage: (page: number) =>
        setPosition(board, {
          api: 'offset',
          page,
          size: config.defaultSize,
          configRevision: config.revision,
        }),
      next: () => {
        const info = page?.pageInfo
        if (info?.__typename === 'CursorPageInfo' && info.hasNextPage && info.endCursor)
          setPosition(board, {
            api: 'cursor',
            first: config.defaultSize,
            after: info.endCursor,
            configRevision: config.revision,
          })
      },
      retry: () => {
        void (active ? active.refetch() : query.refetch())
      },
      mode: config.mode,
      pending: active ? active.isFetching : query.isFetching,
      error: active ? active.error : query.error,
      entries: (page?.entries || []).map((article) => {
        const state = stateByArticle.get(article)!
        return {
          content: article,
          stats: state.stats,
          viewerState: state.viewerState,
        }
      }),
    }
  }

  return {
    resState: (!query.data && query.isFetching
      ? TYPE.RES_STATE.LOADING
      : TYPE.RES_STATE.DONE) as TResState,
    backlog: toViewModels('backlog'),
    todo: toViewModels('todo'),
    wip: toViewModels('wip'),
    done: toViewModels('done'),
    rejected: toViewModels('rejected'),
  }
}
