import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import AlertBoard from './index'

const state = vi.hoisted(() => ({ request: vi.fn() }))

vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))
vi.mock('~/stores/account/hooks', () => ({ default: () => ({ accountRef: 'reviewer-1' }) }))

beforeEach(() => {
  state.request.mockImplementation(
    async (_document: unknown, variables: { pagi: { offset: { page: number } } }) => {
      const page = variables.pagi.offset.page

      return {
        reviewCases: {
          entries: [
            {
              id: `case-${page}`,
              targetKey: `article:page-${page}`,
              status: 'OPEN',
              priority: 'NORMAL',
              version: 1,
            },
          ],
          pageInfo: { page, size: 30, totalCount: 31, totalPages: 2 },
        },
      }
    },
  )
})

it('loads later pages of the review queue', async () => {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <AlertBoard community='home' />
    </QueryClientProvider>,
  )

  expect(await screen.findByText('article:page-1')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.next_page' }))

  expect(await screen.findByText('article:page-2')).toBeInTheDocument()
  await waitFor(() => {
    expect(state.request.mock.calls.at(-1)?.[1].pagi.offset.page).toBe(2)
  })
})
