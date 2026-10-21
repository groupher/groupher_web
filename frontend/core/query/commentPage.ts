import { resolvePagiPosition, toPagiPageInfo } from '~/lib/pagination/params'
import type {
  TComment,
  TPagiPageInfo,
  TGraphQLPagiPageInfo,
  TEffectivePagiConfig,
  TPagiRequest,
} from '~/spec'

import type { TArticlePath } from './articlePath'

/** A bounded comment collection; replies previews never stand in for a loaded page. */
export type TCommentPage = {
  entries: TComment[]
  pinnedEntries: TComment[]
  pageInfo: TPagiPageInfo
}
export type TCommentCollection = {
  article: TArticlePath
  mode: 'REPLIES' | 'TIMELINE'
  initialAfter?: string
  rootInnerId?: string
  sort?: 'ASC_INSERTED' | 'DESC_INSERTED'
}
export const normalizeCommentPage = (page: {
  entries: unknown[]
  pinnedEntries?: unknown[]
  pageInfo: TGraphQLPagiPageInfo
}): TCommentPage => ({
  entries: page.entries as TComment[],
  pinnedEntries: (page.pinnedEntries || []) as TComment[],
  pageInfo: toPagiPageInfo(page.pageInfo),
})

export const commentPagiRequest = (
  config: TEffectivePagiConfig,
  page = 1,
  after?: string,
): TPagiRequest =>
  config.api === 'offset'
    ? { api: 'offset', page, size: config.defaultSize, configRevision: config.revision }
    : { api: 'cursor', first: config.defaultSize, after, configRevision: config.revision }

/** Explicit comment links keep their method when an administrator changes the defaults. */
export const resolveCommentPosition = (config: TEffectivePagiConfig, search: URLSearchParams) =>
  resolvePagiPosition(config, search, {
    api: 'commentsApi',
    page: 'commentsPage',
    after: 'commentsAfter',
  })
