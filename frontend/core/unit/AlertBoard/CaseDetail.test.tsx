import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import CaseDetail from './CaseDetail'

const state = vi.hoisted(() => ({
  request: vi.fn(),
  activeRestrictions: [] as unknown[],
  allowedActions: ['APPROVE'],
}))

vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))

const renderCaseDetail = () =>
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <CaseDetail community='home' scopeKind='COMMUNITY' caseId='case-1' onChanged={vi.fn()} />
    </QueryClientProvider>,
  )

beforeEach(() => {
  state.request.mockClear()
  state.activeRestrictions = []
  state.allowedActions = ['APPROVE']
  let rejectNextDecision = true
  state.request.mockImplementation(
    async (_document: unknown, variables: Record<string, unknown>) => {
      if ('id' in variables) {
        return {
          reviewCase: {
            case: {
              id: 'case-1',
              version: 3,
              contentToken: 'token-1',
              targetKey: 'post/home/1',
              status: 'OPEN',
              priority: 'NORMAL',
            },
            safeSummary: 'Review summary',
            activeRestrictions: state.activeRestrictions,
            reports: [],
            allowedActions: state.allowedActions,
          },
        }
      }
      if ('caseId' in variables) {
        if (rejectNextDecision) {
          rejectNextDecision = false
          throw new Error('response lost after decision')
        }
        return { decideReviewCase: { decisionId: 'decision-1' } }
      }
      throw new Error('Unexpected GraphQL operation')
    },
  )
})

it('reuses the decision command id after an ambiguous failure', async () => {
  renderCaseDetail()

  fireEvent.click(await screen.findByRole('button', { name: 'alert_board.action.approve' }))
  await screen.findByRole('alert')
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.action.approve' }))

  await waitFor(() =>
    expect(state.request.mock.calls.filter((call) => 'caseId' in call[1])).toHaveLength(2),
  )
  const decisionCalls = state.request.mock.calls.filter((call) => 'caseId' in call[1])
  expect(decisionCalls[0][1].commandId).toBeTruthy()
  expect(decisionCalls[1][1].commandId).toBe(decisionCalls[0][1].commandId)
})

it('sends only action-compatible active restriction ids', async () => {
  state.activeRestrictions = [
    { id: 1, kind: 'rule_hit', source: 'policy', content_token: 'old-token' },
    { id: 2, kind: 'rule_hit', source: 'policy', content_token: 'token-1' },
    { id: 3, kind: 'manual_hold', source: 'administrator', content_token: 'token-1' },
    { id: 4, kind: 'awaiting_human', source: 'submission', content_token: 'token-1' },
  ]
  state.allowedActions = ['APPROVE', 'RELEASE']
  renderCaseDetail()

  fireEvent.click(await screen.findByRole('button', { name: 'alert_board.action.approve' }))
  await screen.findByRole('alert')
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.action.release' }))

  await waitFor(() =>
    expect(state.request.mock.calls.filter((call) => 'caseId' in call[1])).toHaveLength(2),
  )
  const decisionCalls = state.request.mock.calls.filter((call) => 'caseId' in call[1])
  expect(decisionCalls[0][1].input.restrictionIds).toEqual([2, 4])
  expect(decisionCalls[1][1].input.restrictionIds).toEqual([1, 2, 3])
})
