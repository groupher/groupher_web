import type { TCommunity } from '~/spec'

import { parseDashboard } from './parse'

it('bootstraps both layout defaults when dashboard data is absent', () => {
  expect(parseDashboard({} as TCommunity)).toMatchObject({
    pagiMode: 'page',
    pagiMobileMode: 'infinite_scroll',
    pagiRevision: 0,
    original: { pagiMode: 'page', pagiMobileMode: 'infinite_scroll' },
  })
})

it('normalizes both GraphQL preferences without losing the revision', () => {
  expect(
    parseDashboard({
      dashboard: { pagiMode: 'LOAD_MORE', pagiMobileMode: 'PAGE', pagiRevision: 7 },
    } as unknown as TCommunity),
  ).toMatchObject({
    pagiMode: 'load_more',
    pagiMobileMode: 'page',
    pagiRevision: 7,
    original: { pagiMode: 'load_more', pagiMobileMode: 'page', pagiRevision: 7 },
  })
})
