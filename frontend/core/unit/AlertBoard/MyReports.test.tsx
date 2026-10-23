import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import MyReports from './MyReports'

const state = vi.hoisted(() => ({ request: vi.fn(), active: true, accountRef: 'account-a' }))

vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))
vi.mock('~/stores/account/hooks', () => ({ default: () => ({ accountRef: state.accountRef }) }))

beforeEach(() => {
  state.active = true
  state.accountRef = 'account-a'
  state.request.mockImplementation(
    async (_document: unknown, variables: Record<string, unknown>) => {
      if ('pagi' in variables) {
        const page = (variables.pagi as { offset: { page: number } }).offset.page
        return {
          myReports: {
            entries:
              state.active || page === 1
                ? [
                    {
                      id: `report-${page}`,
                      targetKey: `comment:${page === 1 ? 44 : 45}`,
                      reasonCode: 'SPAM',
                      details: 'Hidden after report',
                      insertedAt: '2026-10-22T00:00:00Z',
                    },
                  ]
                : [],
            pageInfo: {
              totalPages: state.active ? 2 : 1,
              hasNextPage: state.active && page === 1,
              hasPreviousPage: state.active && page === 2,
            },
          },
        }
      }

      state.active = false
      return { withdrawReport: { report: { id: 'report-1' } } }
    },
  )
})

it('withdraws a report from the account list without loading its target', async () => {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <MyReports show onClose={() => {}} />
    </QueryClientProvider>,
  )

  expect(await screen.findByText('comment:44')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.next_page' }))
  expect(await screen.findByText('comment:45')).toBeInTheDocument()
  expect(screen.getByText('Hidden after report')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.report_withdraw' }))

  await waitFor(() => expect(screen.getByText('comment:44')).toBeInTheDocument())
  expect(state.request.mock.calls.some((call) => 'reportId' in call[1])).toBe(true)
  expect(
    state.request.mock.calls.some(
      (call) =>
        'pagi' in call[1] && (call[1].pagi as { offset: { page: number } }).offset.page === 1,
    ),
  ).toBe(true)
})
