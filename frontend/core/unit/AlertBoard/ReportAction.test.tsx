import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ReportAction from './ReportAction'

const state = vi.hoisted(() => ({ request: vi.fn(), login: true, reportId: null as string | null }))

vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/stores/account/hooks', () => ({ default: () => ({ isLogin: state.login }) }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))
vi.mock('~/signal', () => ({ authWarn: vi.fn() }))

const target = {
  kind: 'ARTICLE' as const,
  article: { community: 'home', thread: 'POST' as const, innerId: '17' },
}

const renderReportAction = () =>
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <ReportAction target={target} />
    </QueryClientProvider>,
  )

beforeEach(() => {
  state.login = true
  state.reportId = null
  let rejectNextSubmit = true
  state.request.mockImplementation(
    async (_document: unknown, variables: Record<string, unknown>) => {
      if ('target' in variables) return { contentReview: { viewerReportId: state.reportId } }
      if ('input' in variables) {
        if (rejectNextSubmit) {
          rejectNextSubmit = false
          throw new Error('response lost after request')
        }
        state.reportId = 'report-1'
        return { submitReport: { commandId: 'command', report: { id: state.reportId } } }
      }
      if ('reportId' in variables) {
        state.reportId = null
        return { withdrawReport: { commandId: 'withdraw-command', report: { id: 'report-1' } } }
      }
      throw new Error('Unexpected GraphQL operation')
    },
  )
})

it('retries with the same command id and then withdraws the current user report', async () => {
  renderReportAction()

  fireEvent.click(await screen.findByRole('button', { name: 'alert_board.report' }))
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.report_submit' }))

  await screen.findByRole('alert')
  const submitCalls = state.request.mock.calls.filter((call) => 'input' in call[1])
  const firstCommandId = submitCalls[0][1].commandId
  expect(firstCommandId).toBeTruthy()

  fireEvent.click(screen.getByRole('button', { name: 'alert_board.report_submit' }))
  await screen.findByText('alert_board.report_submitted')

  const retriedCalls = state.request.mock.calls.filter((call) => 'input' in call[1])
  expect(retriedCalls).toHaveLength(2)
  expect(retriedCalls[1][1].commandId).toBe(firstCommandId)

  fireEvent.click(screen.getByRole('button', { name: 'alert_board.report_withdraw' }))
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'alert_board.report' })).toBeInTheDocument(),
  )
})
