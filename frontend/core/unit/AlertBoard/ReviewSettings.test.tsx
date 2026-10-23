import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ReviewSettings from './ReviewSettings'

const state = vi.hoisted(() => ({ request: vi.fn() }))

vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))
vi.mock('~/stores/account/hooks', () => ({ default: () => ({ accountRef: 'reviewer-1' }) }))

beforeEach(() => {
  state.request.mockResolvedValue({
    reviewConfig: {
      version: 1,
      publishMode: 'IMMEDIATE',
      editMode: 'IMMEDIATE',
      backgroundCheck: false,
      rules: { items: [] },
      prompt: null,
      providerProfile: null,
      requiredModalities: ['text'],
    },
  })
})

it('lets platform admins configure Docs while keeping Doc modes immediate', async () => {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <ReviewSettings community='' scopeKind='PLATFORM' />
    </QueryClientProvider>,
  )

  const subject = screen.getByRole('combobox', { name: 'alert_board.content_type' })
  expect(screen.getByRole('option', { name: 'alert_board.doc' })).toBeInTheDocument()
  fireEvent.change(subject, { target: { value: 'DOC' } })

  await waitFor(() => {
    expect(state.request.mock.calls.at(-1)?.[1].subjectKind).toBe('DOC')
  })
  await screen.findByRole('button', { name: 'alert_board.save' })

  const modes = screen.getAllByRole('combobox')
  expect(modes[1]).toBeDisabled()
  expect(modes[2]).toBeDisabled()
  expect(screen.getAllByRole('option', { name: 'alert_board.mode.immediate' })).toHaveLength(2)
})
