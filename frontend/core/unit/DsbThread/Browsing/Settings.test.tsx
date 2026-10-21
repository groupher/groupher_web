import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'

import PagiModeSettings from './Settings'
const state = vi.hoisted(() => ({ request: vi.fn() }))
vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: state.request }))
vi.mock('~/query', () => ({ dsbKeys: { config: (slug: string) => ['dsb', 'config', slug] } }))
vi.mock('~/hooks/useTrans', () => ({ default: () => ({ t: (key: string) => key }) }))
vi.mock('~/stores/community/hooks', () => ({ default: () => ({ slug: 'xx' }) }))
vi.mock('~/stores/dsbConfig/hooks', () => ({
  default: () => ({ pagiMode: 'page', pagiMobileMode: 'infinite_scroll', pagiRevision: 4 }),
}))
vi.mock('~/query/mutation/optimistic/execute', () => ({
  executeCommand: ({ request, variables }: any) => request(variables),
}))
it('saves one community mode with revision and patches the canonical dashboard owner', async () => {
  const client = new QueryClient()
  client.setQueryData(['dsb', 'config', 'xx'], {
    pagiMode: 'page',
    pagiMobileMode: 'infinite_scroll',
    pagiRevision: 4,
    original: {},
  })
  state.request.mockResolvedValue({
    updateDashboardPagiMode: {
      pagiMode: 'INFINITE_SCROLL',
      pagiMobileMode: 'LOAD_MORE',
      pagiRevision: 5,
    },
  })
  render(
    <QueryClientProvider client={client}>
      <PagiModeSettings />
    </QueryClientProvider>,
  )
  expect(screen.getAllByRole('radio')).toHaveLength(6)
  fireEvent.click(
    within(screen.getByRole('group', { name: 'dsb.pagi.desktop' })).getByRole('radio', {
      name: 'dsb.pagi.infinite_scroll',
    }),
  )
  fireEvent.click(
    within(screen.getByRole('group', { name: 'dsb.pagi.mobile' })).getByRole('radio', {
      name: 'dsb.pagi.load_more',
    }),
  )
  fireEvent.click(screen.getByRole('button', { name: 'dsb.pagi.save' }))
  await waitFor(() => expect(state.request).toHaveBeenCalledTimes(1))
  expect(state.request.mock.calls[0][1]).toEqual({
    community: 'xx',
    mode: 'INFINITE_SCROLL',
    mobileMode: 'LOAD_MORE',
    expectedRevision: 4,
  })
  await waitFor(() =>
    expect(client.getQueryData(['dsb', 'config', 'xx'])).toMatchObject({
      pagiMode: 'infinite_scroll',
      pagiMobileMode: 'load_more',
      pagiRevision: 5,
    }),
  )
  expect(state.request.mock.calls[0][1]).not.toHaveProperty('surface')
  expect(state.request.mock.calls[0][1]).not.toHaveProperty('config')
})
