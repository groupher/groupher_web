import { paginationDefaultV1 } from '@groupher/contracts/pagination'

import type {
  TPagiPageInfo,
  TGraphQLPagiPageInfo,
  TEffectivePagiConfig,
  TDashboardPagination,
  TPaginationSurface,
  TPagiGraphQLInput,
  TPagiRequest,
  TOffsetPagi,
  TCursorPagi,
} from '~/spec'
import type { TPagi } from '~/spec'

/** The platform fallback used before a community exposes an effective surface config. */
export const DEFAULT_EFFECTIVE_PAGI_CONFIG: TEffectivePagiConfig = {
  ...paginationDefaultV1,
}

/** Resolves a bootstrap surface to a complete, transport-ready config. */
export const toEffectivePagiConfig = (
  pagination: TDashboardPagination | null | undefined,
  surface: TPaginationSurface,
): TEffectivePagiConfig => ({
  ...DEFAULT_EFFECTIVE_PAGI_CONFIG,
  ...(pagination?.[surface] || {}),
})

/** Maps the Core discriminated union to the GraphQL @oneOf input shape. */
export const toPagiGraphQLInput = (pagi: TPagiRequest): TPagiGraphQLInput => {
  if (pagi.api === 'offset') return { offset: toOffsetInput(pagi) }
  return { cursor: toCursorInput(pagi) }
}

/** Returns the config identity that must be part of every list query key. */
export const pagiConfigKey = (config: TEffectivePagiConfig) => ({
  api: config.api,
  mode: config.mode,
  schemaVersion: config.schemaVersion,
  revision: config.revision,
})

/** Adds the transport discriminator that GraphQL intentionally keeps out of PageInfo fields. */
export const toPagiPageInfo = (pageInfo: TGraphQLPagiPageInfo): TPagiPageInfo => {
  if (pageInfo.__typename === 'OffsetPageInfo') return { ...pageInfo, api: 'offset' }
  return { ...pageInfo, api: 'cursor' }
}

/** Adapts the new page contract for legacy list consumers during the migration window. */
export const toLegacyPagi = (pageInfo: TGraphQLPagiPageInfo): TPagi => {
  if (pageInfo.__typename === 'OffsetPageInfo') {
    return {
      pageNumber: pageInfo.page,
      pageSize: pageInfo.size,
      totalCount: pageInfo.totalCount,
      totalPages: pageInfo.totalPages,
    }
  }

  return {}
}

const toOffsetInput = (pagi: TOffsetPagi) => ({
  page: pagi.page,
  size: pagi.size,
  ...(pagi.configRevision === undefined ? {} : { configRevision: pagi.configRevision }),
})

const toCursorInput = (pagi: TCursorPagi) => ({
  first: pagi.first,
  ...(pagi.after === undefined ? {} : { after: pagi.after }),
  ...(pagi.configRevision === undefined ? {} : { configRevision: pagi.configRevision }),
})
