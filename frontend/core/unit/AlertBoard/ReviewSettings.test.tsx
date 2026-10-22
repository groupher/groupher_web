import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ReviewSettings from './ReviewSettings'

const state = vi.hoisted(() => ({ request: vi.fn() }))

vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))

const renderReviewSettings = () =>
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <ReviewSettings community='home' scopeKind='COMMUNITY' />
    </QueryClientProvider>,
  )

beforeEach(() => {
  let rejectNextSave = true
  state.request.mockImplementation(
    async (_document: unknown, variables: Record<string, unknown>) => {
      if ('subjectKind' in variables) {
        return {
          reviewConfig: {
            version: 2,
            publishMode: 'IMMEDIATE',
            editMode: 'IMMEDIATE',
            backgroundCheck: false,
            rules: { items: [] },
            prompt: null,
            providerProfile: null,
            requiredModalities: ['text'],
          },
        }
      }
      if ('input' in variables) {
        if (rejectNextSave) {
          rejectNextSave = false
          throw new Error('response lost after config update')
        }
        return { updateReviewConfig: { commandId: variables.commandId } }
      }
      throw new Error('Unexpected GraphQL operation')
    },
  )
})

it('reuses the config command id after an ambiguous failure', async () => {
  renderReviewSettings()

  const publishMode = await screen.findByLabelText('alert_board.publish_mode')
  fireEvent.change(publishMode, { target: { value: 'AI_FIRST' } })
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.save' }))
  await screen.findByRole('alert')
  fireEvent.click(screen.getByRole('button', { name: 'alert_board.save' }))

  await waitFor(() =>
    expect(state.request.mock.calls.filter((call) => 'input' in call[1])).toHaveLength(2),
  )
  const saveCalls = state.request.mock.calls.filter((call) => 'input' in call[1])
  expect(saveCalls[0][1].commandId).toBeTruthy()
  expect(saveCalls[1][1].commandId).toBe(saveCalls[0][1].commandId)
  expect(typeof saveCalls[1][1].input.config.rules).toBe('string')
  expect(JSON.parse(saveCalls[1][1].input.config.rules)).toEqual({ items: [] })
})
