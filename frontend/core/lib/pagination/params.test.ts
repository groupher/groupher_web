import { paginationDefaultV1 } from '@groupher/contracts/pagination'

import { pagiConfigKey, toLegacyPagi, toPagiGraphQLInput, toPagiPageInfo } from './params'

describe('pagination params adapter', () => {
  it('uses the shared platform default contract', () => {
    expect(paginationDefaultV1).toEqual({
      api: 'offset',
      mode: 'page',
      schemaVersion: 1,
      revision: 0,
      defaultSize: 20,
      maxSize: 100,
    })
  })

  it('maps offset requests without adding cursor fields', () => {
    expect(toPagiGraphQLInput({ api: 'offset', page: 2, size: 20, configRevision: 3 })).toEqual({
      offset: { page: 2, size: 20, configRevision: 3 },
    })
  })

  it('maps forward cursor requests as opaque values', () => {
    expect(
      toPagiGraphQLInput({ api: 'cursor', first: 20, after: 'opaque', configRevision: 4 }),
    ).toEqual({
      cursor: { first: 20, after: 'opaque', configRevision: 4 },
    })
  })

  it('omits absent cursor and revision values instead of serializing undefined', () => {
    expect(toPagiGraphQLInput({ api: 'cursor', first: 20 })).toEqual({ cursor: { first: 20 } })
  })

  it('keeps only config identity in the query-key config segment', () => {
    expect(
      pagiConfigKey({
        api: 'cursor',
        mode: 'infinite_scroll',
        schemaVersion: 1,
        revision: 7,
        defaultSize: 20,
        maxSize: 100,
      }),
    ).toEqual({ api: 'cursor', mode: 'infinite_scroll', schemaVersion: 1, revision: 7 })
  })

  it('normalizes GraphQL offset metadata for both new and legacy consumers', () => {
    const pageInfo = {
      __typename: 'OffsetPageInfo' as const,
      page: 2,
      size: 20,
      totalCount: 41,
      totalPages: 3,
      hasPreviousPage: true,
      hasNextPage: true,
    }

    expect(toPagiPageInfo(pageInfo)).toMatchObject({ api: 'offset', page: 2 })
    expect(toLegacyPagi(pageInfo)).toEqual({
      pageNumber: 2,
      pageSize: 20,
      totalCount: 41,
      totalPages: 3,
    })
  })

  it('does not invent offset totals for cursor metadata', () => {
    const pageInfo = {
      __typename: 'CursorPageInfo' as const,
      startCursor: 'start',
      endCursor: 'end',
      hasPreviousPage: false,
      hasNextPage: true,
    }

    expect(toPagiPageInfo(pageInfo)).toMatchObject({ api: 'cursor', endCursor: 'end' })
    expect(toLegacyPagi(pageInfo)).toEqual({})
  })
})
