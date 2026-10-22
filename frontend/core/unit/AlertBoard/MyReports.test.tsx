import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import MyReports from './MyReports'

const state = vi.hoisted(() => ({ request: vi.fn(), active: true }))

vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))

beforeEach(() => {
  state.active = true
  state.request.mockImplementation(
    async (_document: unknown, variables: Record<string, unknown>) => {
      if ('pagi' in variables) {
        return {
          myReports: {
            entries: state.active
              ? [
                  {
                    id: 'report-1',
                    targetKey: 'comment:44',
                    reasonCode: 'SPAM',
                    details: 'Hidden after report',
                    insertedAt: '2026-10-22T00:00:00Z',
                  },
                ]
              : [],
            pageInfo: {
              totalPages: 1,
              hasNextPage: false,
              hasPreviousPage: false,
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
  expect(screen.getByText('Hidden after report')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.report_withdraw' }))

  await waitFor(() => expect(screen.getByText('alert_board.my_reports_empty')).toBeInTheDocument())
  expect(state.request.mock.calls.some((call) => 'reportId' in call[1])).toBe(true)
})
