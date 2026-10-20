/** Transport-neutral pagination request used by Core adapters. */
export type TPaginationApi = 'offset' | 'cursor'
export type TPaginationMode = 'page' | 'load_more' | 'infinite_scroll'

export type TOffsetPagi = {
  api: 'offset'
  page: number
  size: number
  configRevision?: number
}

export type TCursorPagi = {
  api: 'cursor'
  first: number
  after?: string
  configRevision?: number
}

export type TPagiRequest = TOffsetPagi | TCursorPagi

export type TPagiGraphQLInput =
  | {
      offset: {
        page?: number
        size?: number
        configRevision?: number
      }
      cursor?: never
    }
  | {
      cursor: {
        first?: number
        after?: string
        configRevision?: number
      }
      offset?: never
    }

export type TEffectivePagiConfig = {
  api: TPaginationApi
  mode: TPaginationMode
  schemaVersion: number
  revision: number
  defaultSize: number
  maxSize: number
}

export type TPaginationSurface = 'posts' | 'changelogs' | 'comments'

export type TDashboardPagination = Partial<
  Record<TPaginationSurface, Partial<TEffectivePagiConfig>>
>

export type TOffsetPageInfo = {
  __typename: 'OffsetPageInfo'
  api: 'offset'
  page: number
  size: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type TCursorPageInfo = {
  __typename: 'CursorPageInfo'
  api: 'cursor'
  startCursor: string | null
  endCursor: string | null
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type TPagiPageInfo = TOffsetPageInfo | TCursorPageInfo

/** GraphQL page metadata before the transport-neutral `api` discriminator is added. */
export type TGraphQLPagiPageInfo = Omit<TOffsetPageInfo, 'api'> | Omit<TCursorPageInfo, 'api'>
