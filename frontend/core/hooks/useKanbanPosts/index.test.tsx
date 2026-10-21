import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import useKanbanPosts from '.'

const state = vi.hoisted(() => ({ request: vi.fn(), api: 'offset' as 'offset' | 'cursor' }))
vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/stores/community/hooks', () => ({ default: () => ({ slug: 'xx' }) }))
vi.mock('~/stores/dsbConfig/hooks', () => ({
  default: () => ({
    pagiMode: state.api === 'cursor' ? 'load_more' : 'page',
    pagiRevision: 5,
  }),
}))
vi.mock('~/hooks/useArticleStates', () => ({
  useArticleStatesByChunks: (chunks: unknown[][]) =>
    chunks.flat().map((content) => ({ content, stats: null, viewerState: {} })),
}))
const entry = (id: number) => ({
  id: String(id),
  innerId: String(id),
  thread: 'POST',
  community: { slug: 'xx' },
})
const page = (entries: unknown[], end: string | null = null, next = false) => ({
  entries,
  pinnedEntries: [],
  pageInfo:
    state.api === 'cursor'
      ? {
          __typename: 'CursorPageInfo',
          startCursor: null,
          endCursor: end,
          hasNextPage: next,
          hasPreviousPage: false,
        }
      : {
          __typename: 'OffsetPageInfo',
          page: 1,
          size: 20,
          totalCount: 3,
          totalPages: 2,
          hasNextPage: next,
          hasPreviousPage: false,
        },
})
function setup() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
  return renderHook(() => useKanbanPosts(), { wrapper })
}
beforeEach(() => {
  state.request.mockReset()
  state.api = 'offset'
})
it('changes only the selected board and preserves business filters and current revision', async () => {
  state.request.mockImplementation(async (_document, variables) =>
    variables.filter
      ? { kanbanPage: page([entry(3)]) }
      : {
          groupedKanbanPosts: {
            backlog: page([entry(1), entry(2)], null, true),
            todo: page([]),
            wip: page([]),
            done: page([]),
            rejected: page([]),
          },
        },
  )
  const { result } = setup()
  await waitFor(() => expect(result.current.backlog.entries).toHaveLength(2))
  act(() => result.current.backlog.setPage(2))
  await waitFor(() => expect(result.current.backlog.entries[0]?.content.innerId).toBe('3'))
  expect(state.request.mock.calls[1][1]).toMatchObject({
    filter: { community: 'xx', status: 'BACKLOG' },
    pagi: { offset: { page: 2, size: 20, configRevision: 5 } },
  })
  expect(result.current.todo.entries).toEqual([])
  expect(state.request).toHaveBeenCalledTimes(2)
})
it('appends cursor chunks, retries the failed page, and keeps other boards independent', async () => {
  state.api = 'cursor'
  let failed = false
  state.request.mockImplementation(async (_document, variables) => {
    if (!variables.filter)
      return {
        groupedKanbanPosts: {
          backlog: page([entry(1), entry(2)], 'next', true),
          todo: page([]),
          wip: page([]),
          done: page([]),
          rejected: page([]),
        },
      }
    if (!failed) {
      failed = true
      throw new Error('network')
    }
    return { kanbanPage: page([entry(2), entry(3)]) }
  })
  const { result } = setup()
  await waitFor(() => expect(result.current.backlog.entries).toHaveLength(2))
  act(() => result.current.backlog.next())
  await waitFor(() => expect(result.current.backlog.error).toBeTruthy())
  expect(result.current.backlog.entries).toHaveLength(2)
  expect(result.current.todo.error).toBeNull()
  act(() => result.current.backlog.retry())
  await waitFor(() => expect(result.current.backlog.entries).toHaveLength(3))
  expect(result.current.backlog.entries.map((item) => item.content.innerId)).toEqual([
    '1',
    '2',
    '3',
  ])
  expect(result.current.backlog.pageInfo?.hasNextPage).toBe(false)
})

const testViewportWidth = window.innerWidth
beforeEach(() => Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1440 }))
afterEach(() =>
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: testViewportWidth }),
)
