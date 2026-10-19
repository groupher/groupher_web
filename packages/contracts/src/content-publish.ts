export { CONTENT_PUBLISH_ERROR_CODE } from './content-publish.generated'
export type { TContentPublishErrorCode } from './content-publish.generated'

export const CONTENT_SOURCE_FORMAT = { PLATE: 'plate', MARKDOWN: 'markdown' } as const

export const CONTENT_PUBLISH_ACTION = {
  UPDATE_DOC_DRAFT: 'docDraft.update',
  CREATE_ARTICLE: 'article.create',
  UPDATE_ARTICLE: 'article.update',
  CREATE_COMMENT: 'comment.create',
  UPDATE_COMMENT: 'comment.update',
} as const

export const CONTENT_TYPE = { DOC: 'doc', ARTICLE: 'article', COMMENT: 'comment' } as const
export const CONTENT_PUBLISH_SCOPE = {
  DOC_WRITE: 'content:doc:write',
  ARTICLE_WRITE: 'content:article:write',
  COMMENT_WRITE: 'content:comment:write',
} as const
export const CONTENT_PUBLISH_AUDIENCE = 'phoenix:content-publisher-api'
export const CONTENT_PUBLISH_RESOURCE = 'https://api.groupher.com/content-publisher'

export type TContentPublishAction =
  (typeof CONTENT_PUBLISH_ACTION)[keyof typeof CONTENT_PUBLISH_ACTION]
export type TContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE]
export type TContentPublishScope =
  (typeof CONTENT_PUBLISH_SCOPE)[keyof typeof CONTENT_PUBLISH_SCOPE]
export type TContentSource =
  | { format: typeof CONTENT_SOURCE_FORMAT.PLATE; value: unknown[] }
  | { format: typeof CONTENT_SOURCE_FORMAT.MARKDOWN; markdown: string }

type TCommandBase<TAction extends TContentPublishAction, TTarget, TPayload> = {
  action: TAction
  target: TTarget
  payload: TPayload
  commandId: string
}

export type TUpdateDocDraftCommand = TCommandBase<
  typeof CONTENT_PUBLISH_ACTION.UPDATE_DOC_DRAFT,
  { community: string; documentId: string },
  { content: TContentSource; title: string; subtitle: string; slug: string }
> & { expectedVersion: number }
export type TCreateArticleCommand = TCommandBase<
  typeof CONTENT_PUBLISH_ACTION.CREATE_ARTICLE,
  { community: string; thread: string },
  { content: TContentSource; title: string; category?: string; tagIds: string[] }
>
export type TUpdateArticleCommand = TCommandBase<
  typeof CONTENT_PUBLISH_ACTION.UPDATE_ARTICLE,
  { article: { community: string; innerId: string | number; thread: string } },
  { content: TContentSource; title: string; category?: string; tagIds: string[] }
> & { expectedVersion: number }
export type TCreateCommentCommand = TCommandBase<
  typeof CONTENT_PUBLISH_ACTION.CREATE_COMMENT,
  {
    article: { community: string; thread: string; innerId: string | number }
    parentId?: string
  },
  { content: TContentSource }
>
export type TUpdateCommentCommand = TCommandBase<
  typeof CONTENT_PUBLISH_ACTION.UPDATE_COMMENT,
  {
    comment: {
      article: { community: string; thread: string; innerId: string | number }
      innerId: string
    }
  },
  { content: TContentSource }
> & { expectedVersion: number }
export type TContentPublishCommand =
  | TUpdateDocDraftCommand
  | TCreateArticleCommand
  | TUpdateArticleCommand
  | TCreateCommentCommand
  | TUpdateCommentCommand

export const CONTENT_TYPE_BY_ACTION = {
  [CONTENT_PUBLISH_ACTION.UPDATE_DOC_DRAFT]: CONTENT_TYPE.DOC,
  [CONTENT_PUBLISH_ACTION.CREATE_ARTICLE]: CONTENT_TYPE.ARTICLE,
  [CONTENT_PUBLISH_ACTION.UPDATE_ARTICLE]: CONTENT_TYPE.ARTICLE,
  [CONTENT_PUBLISH_ACTION.CREATE_COMMENT]: CONTENT_TYPE.COMMENT,
  [CONTENT_PUBLISH_ACTION.UPDATE_COMMENT]: CONTENT_TYPE.COMMENT,
} as const satisfies Record<TContentPublishAction, TContentType>

export const CONTENT_SCOPE_BY_ACTION = {
  [CONTENT_PUBLISH_ACTION.UPDATE_DOC_DRAFT]: CONTENT_PUBLISH_SCOPE.DOC_WRITE,
  [CONTENT_PUBLISH_ACTION.CREATE_ARTICLE]: CONTENT_PUBLISH_SCOPE.ARTICLE_WRITE,
  [CONTENT_PUBLISH_ACTION.UPDATE_ARTICLE]: CONTENT_PUBLISH_SCOPE.ARTICLE_WRITE,
  [CONTENT_PUBLISH_ACTION.CREATE_COMMENT]: CONTENT_PUBLISH_SCOPE.COMMENT_WRITE,
  [CONTENT_PUBLISH_ACTION.UPDATE_COMMENT]: CONTENT_PUBLISH_SCOPE.COMMENT_WRITE,
} as const satisfies Record<TContentPublishAction, TContentPublishScope>

export type TContentPublishIssue = { path: string; code: string; message: string }
type TContentPublishParseFailure = { ok: false; issues: TContentPublishIssue[] }
export type TContentPublishParseResult =
  | { ok: true; value: TContentPublishCommand }
  | TContentPublishParseFailure
const issue = (path: string, code: string, message: string): TContentPublishParseFailure => ({
  ok: false,
  issues: [{ path, code, message }],
})
const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value)
const failed = (value: unknown): value is TContentPublishParseFailure =>
  isRecord(value) && value.ok === false
const readString = (
  record: Record<string, unknown>,
  key: string,
  path = key,
): string | TContentPublishParseFailure =>
  typeof record[key] === 'string' && record[key].trim()
    ? (record[key] as string)
    : issue(path, 'invalid_string', `${key} must be a non-empty string.`)
const readVersion = (record: Record<string, unknown>): number | TContentPublishParseFailure =>
  Number.isSafeInteger(record.expectedVersion) && Number(record.expectedVersion) >= 0
    ? Number(record.expectedVersion)
    : issue('expectedVersion', 'invalid_version', 'expectedVersion must be a non-negative integer.')
const parseSource = (value: unknown): TContentSource | TContentPublishParseFailure => {
  if (!isRecord(value))
    return issue('payload.content', 'invalid_type', 'Content source must be an object.')
  if (value.format === CONTENT_SOURCE_FORMAT.PLATE)
    return Array.isArray(value.value)
      ? { format: CONTENT_SOURCE_FORMAT.PLATE, value: value.value }
      : issue('payload.content.value', 'invalid_type', 'Plate content must be an array.')
  if (value.format === CONTENT_SOURCE_FORMAT.MARKDOWN)
    return typeof value.markdown === 'string'
      ? { format: CONTENT_SOURCE_FORMAT.MARKDOWN, markdown: value.markdown }
      : issue('payload.content.markdown', 'invalid_type', 'Markdown content must be a string.')
  return issue(
    'payload.content.format',
    'unknown_format',
    'Content source format is not supported.',
  )
}

/** Parses untrusted JSON into one closed, action-specific command. */
export const parseContentPublishCommand = (input: unknown): TContentPublishParseResult => {
  if (!isRecord(input)) return issue('', 'invalid_type', 'Request body must be an object.')
  const action = input.action
  if (!Object.values(CONTENT_PUBLISH_ACTION).includes(action as TContentPublishAction))
    return issue('action', 'unknown_action', 'Content publish action is not supported.')
  if (!isRecord(input.target)) return issue('target', 'invalid_type', 'target must be an object.')
  if (!isRecord(input.payload))
    return issue('payload', 'invalid_type', 'payload must be an object.')
  const commandId = readString(input, 'commandId')
  if (failed(commandId)) return commandId
  const content = parseSource(input.payload.content)
  if (failed(content)) return content
  const target = input.target
  const payload = input.payload
  switch (action) {
    case CONTENT_PUBLISH_ACTION.UPDATE_DOC_DRAFT: {
      const community = readString(target, 'community', 'target.community')
      if (failed(community)) return community
      const documentId = readString(target, 'documentId', 'target.documentId')
      if (failed(documentId)) return documentId
      const title = readString(payload, 'title', 'payload.title')
      if (failed(title)) return title
      if (typeof payload.subtitle !== 'string')
        return issue('payload.subtitle', 'invalid_string', 'subtitle must be a string.')
      const slug = readString(payload, 'slug', 'payload.slug')
      if (failed(slug)) return slug
      const expectedVersion = readVersion(input)
      if (failed(expectedVersion)) return expectedVersion
      return {
        ok: true,
        value: {
          action,
          target: { community, documentId },
          payload: { content, title, subtitle: payload.subtitle, slug },
          commandId,
          expectedVersion,
        },
      }
    }
    case CONTENT_PUBLISH_ACTION.CREATE_ARTICLE:
    case CONTENT_PUBLISH_ACTION.UPDATE_ARTICLE: {
      const articleTarget =
        action === CONTENT_PUBLISH_ACTION.UPDATE_ARTICLE ? target.article : target
      if (!isRecord(articleTarget))
        return issue('target.article', 'invalid_type', 'article must be an object.')
      const community = readString(
        articleTarget,
        'community',
        action === CONTENT_PUBLISH_ACTION.UPDATE_ARTICLE
          ? 'target.article.community'
          : 'target.community',
      )
      if (failed(community)) return community
      const thread = readString(
        articleTarget,
        'thread',
        action === CONTENT_PUBLISH_ACTION.UPDATE_ARTICLE
          ? 'target.article.thread'
          : 'target.thread',
      )
      if (failed(thread)) return thread
      const title = readString(payload, 'title', 'payload.title')
      if (failed(title)) return title
      if (!Array.isArray(payload.tagIds) || !payload.tagIds.every((id) => typeof id === 'string'))
        return issue('payload.tagIds', 'invalid_type', 'tagIds must be an array of strings.')
      const articlePayload = {
        content,
        title,
        ...(typeof payload.category === 'string' ? { category: payload.category } : {}),
        tagIds: payload.tagIds,
      }
      if (action === CONTENT_PUBLISH_ACTION.CREATE_ARTICLE)
        return {
          ok: true,
          value: { action, target: { community, thread }, payload: articlePayload, commandId },
        }
      const innerId = articleTarget.innerId
      if (typeof innerId !== 'string' && typeof innerId !== 'number')
        return issue(
          'target.article.innerId',
          'invalid_type',
          'innerId must be a string or number.',
        )
      const expectedVersion = readVersion(input)
      if (failed(expectedVersion)) return expectedVersion
      return {
        ok: true,
        value: {
          action,
          target: { article: { community, innerId, thread } },
          payload: articlePayload,
          commandId,
          expectedVersion,
        },
      }
    }
    case CONTENT_PUBLISH_ACTION.CREATE_COMMENT: {
      if (!isRecord(target.article))
        return issue('target.article', 'invalid_type', 'article must be an object.')
      const community = readString(target.article, 'community', 'target.article.community')
      if (failed(community)) return community
      const thread = readString(target.article, 'thread', 'target.article.thread')
      if (failed(thread)) return thread
      const innerId = target.article.innerId
      if (typeof innerId !== 'string' && typeof innerId !== 'number')
        return issue(
          'target.article.innerId',
          'invalid_type',
          'innerId must be a string or number.',
        )
      return {
        ok: true,
        value: {
          action,
          target: {
            article: { community, thread, innerId },
            ...(typeof target.parentId === 'string' ? { parentId: target.parentId } : {}),
          },
          payload: { content },
          commandId,
        },
      }
    }
    case CONTENT_PUBLISH_ACTION.UPDATE_COMMENT: {
      if (!isRecord(target.comment) || !isRecord(target.comment.article))
        return issue('target.comment', 'invalid_type', 'comment must be an object.')
      const community = readString(
        target.comment.article,
        'community',
        'target.comment.article.community',
      )
      if (failed(community)) return community
      const thread = readString(target.comment.article, 'thread', 'target.comment.article.thread')
      if (failed(thread)) return thread
      const articleInnerId = target.comment.article.innerId
      if (typeof articleInnerId !== 'string' && typeof articleInnerId !== 'number')
        return issue(
          'target.comment.article.innerId',
          'invalid_type',
          'innerId must be a string or number.',
        )
      const innerId = readString(target.comment, 'innerId', 'target.comment.innerId')
      if (failed(innerId)) return innerId
      const expectedVersion = readVersion(input)
      if (failed(expectedVersion)) return expectedVersion
      return {
        ok: true,
        value: {
          action,
          target: {
            comment: {
              article: { community, thread, innerId: articleInnerId },
              innerId,
            },
          },
          payload: { content },
          commandId,
          expectedVersion,
        },
      }
    }
  }
  return issue('action', 'unknown_action', 'Content publish action is not supported.')
}
