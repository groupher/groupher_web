import fixture from '../fixtures/pagination-default-v1.json'

/** Shared transport shape for the platform pagination fallback. */
export type TPaginationDefaultV1 = {
  api: 'offset'
  mode: 'page'
  schemaVersion: 1
  revision: 0
  defaultSize: 20
  maxSize: 100
}

/** Single contract source consumed by frontend defaults and parity tests. */
export const paginationDefaultV1 = fixture as unknown as TPaginationDefaultV1

/** Canonical oneOf GraphQL input, also carried unchanged by HTTP list gateways. */
export type PagiInput =
  | { offset: { page?: number; size?: number; configRevision?: number }; cursor?: never }
  | { cursor: { first?: number; after?: string; configRevision?: number }; offset?: never }
export type PagiPageInfo =
  | {
      __typename: 'OffsetPageInfo'
      page: number
      size: number
      totalCount: number
      totalPages: number
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  | {
      __typename: 'CursorPageInfo'
      startCursor: string | null
      endCursor: string | null
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
export type PagiPage<T> = { entries: T[]; pageInfo: PagiPageInfo }

/** Checks transport shape; resource size, depth, revision and cursor validation remain server-owned. */
export const isPagiInput = (input: unknown): input is PagiInput => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return false
  const keys = Object.keys(input)
  if (keys.length !== 1 || !['offset', 'cursor'].includes(keys[0])) return false
  const branch = (input as Record<string, unknown>)[keys[0]]
  if (!branch || typeof branch !== 'object' || Array.isArray(branch)) return false
  const allowed =
    keys[0] === 'offset' ? ['page', 'size', 'configRevision'] : ['first', 'after', 'configRevision']
  return Object.entries(branch).every(
    ([key, value]) =>
      allowed.includes(key) &&
      (key === 'after'
        ? typeof value === 'string'
        : typeof value === 'number' && Number.isSafeInteger(value)),
  )
}
