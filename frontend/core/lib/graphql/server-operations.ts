import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

import {
  CreateBlogFromPublisherDocument,
  CreateChangelogFromPublisherDocument,
  CreateCommentDocument,
  CreatePostDocument,
  ReplyCommentDocument,
  UpdateBlogFromPublisherDocument,
  UpdateChangelogFromPublisherDocument,
  UpdateCommentDocument,
  UpdateDocDraftDocument,
  UpdatePostFromEditorDocument,
} from './generated/graphql'

export type TContentPublishOperation = TypedDocumentNode<Record<string, unknown>, never>

/** Node-safe generated operations used by the trusted Content Publisher adapter. */
export const CONTENT_PUBLISH_OPERATIONS = {
  createBlog: CreateBlogFromPublisherDocument,
  createChangelog: CreateChangelogFromPublisherDocument,
  createComment: CreateCommentDocument,
  createPost: CreatePostDocument,
  replyComment: ReplyCommentDocument,
  updateBlog: UpdateBlogFromPublisherDocument,
  updateChangelog: UpdateChangelogFromPublisherDocument,
  updateComment: UpdateCommentDocument,
  updateDocDraft: UpdateDocDraftDocument,
  updatePost: UpdatePostFromEditorDocument,
} as const
