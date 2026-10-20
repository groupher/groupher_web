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
