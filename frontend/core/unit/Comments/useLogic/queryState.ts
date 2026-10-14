import { useQuery } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { useSnapshot } from 'valtio'

import useViewingArticle from '~/hooks/useViewingArticle'
import { gatherCommentViewerIds, mergeCommentViewerState } from '~/lib/commentViewerState'
import { Q } from '~/query'
import { articlePathKey } from '~/query/articlePath'
import {
  overlayCommentReactionReceipt,
  readCommentReactionReceipts,
} from '~/query/mutation/commentReactionReceipt'
import { readCommentFeedReceipts } from '~/query/mutation/commentReceipt'
import useCommentReceiptReconcile from '~/query/useCommentReceiptReconcile'
import type { TComment, TPagedComments } from '~/spec'
import { getAccountRef } from '~/stores/account/accountRef'
import useAccount from '~/stores/account/hooks'
import { StoreContext as CommentsStoreContext } from '~/stores/comments/context'
import type { TStore as TCommentsStore } from '~/stores/comments/spec'

/** Combines public comments with viewer-owned flags without duplicating either cache. */
export default function useCommentQueryState() {
  const commentsStore = useContext(CommentsStoreContext) as TCommentsStore | null
  if (!commentsStore)
    throw new Error('comments query must be used within a Comments store provider')
  const comments = useSnapshot(commentsStore)
  const account = useAccount()
  const { article, articlePath, stats } = useViewingArticle()
  const query = useQuery(
    Q.comment.list(
      articlePath.community,
      articlePath.thread,
      articlePath.innerId,
      comments.page,
      comments.mode,
    ),
  )
  const viewerQuery = useQuery(
    Q.viewer.commentStates(
      account.accountRef || getAccountRef(account.user) || '',
      articlePath,
      query.data ? gatherCommentViewerIds(query.data as TPagedComments) : [],
    ),
  )
  const summaryQuery = useQuery(
    Q.viewer.commentSummary(
      account.accountRef || getAccountRef(account.user) || '',
      articlePath.community,
      articlePath.thread,
      articlePath.innerId,
    ),
  )
  useCommentReceiptReconcile(article)
  const data = useMemo(() => {
    if (!query.data) return query.data
    const articleKey = articlePathKey(articlePath)
    const reactionReceipts = new Map(
      readCommentReactionReceipts(
        account.accountRef || getAccountRef(account.user),
        articleKey,
      ).map((receipt) => [receipt.commentRef, receipt]),
    )
    const receipts = readCommentFeedReceipts(
      account.accountRef || getAccountRef(account.user),
      articleKey,
    )
    const withReceipts = receipts.reduce((current, receipt) => {
      if (receipt.type === 'delete') {
        const remove = (entries: TComment[]): TComment[] =>
          entries
            .filter((entry) => String(entry.innerId) !== receipt.commentRef)
            .map((entry) =>
              entry.replies?.length ? { ...entry, replies: remove(entry.replies) } : entry,
            )
        const entries = remove(current.entries as TComment[])
        return entries.length === current.entries.length
          ? current
          : {
              ...current,
              entries,
              totalCount: Math.max(0, (current.totalCount || 0) - 1),
            }
      }
      if (!receipt.comment) return current
      const comment = receipt.comment
      const replace = (entries: TComment[]): { entries: TComment[]; replaced: boolean } => {
        let replaced = false
        const next = entries.map((entry) => {
          if (String(entry.innerId) === String(comment.innerId)) {
            replaced = true
            return comment
          }
          if (!entry.replies?.length) return entry
          const nested = replace(entry.replies)
          if (!nested.replaced) return entry
          replaced = true
          return { ...entry, replies: nested.entries }
        })
        return { entries: next, replaced }
      }
      const replaced = replace(current.entries as TComment[])
      if (replaced.replaced) return { ...current, entries: replaced.entries }
      if (!receipt.parentId) {
        return {
          ...current,
          entries: [comment, ...(current.entries as TComment[])],
          totalCount: (current.totalCount || 0) + 1,
        }
      }
      const append = (entries: TComment[]): TComment[] =>
        entries.map((entry) =>
          String(entry.innerId) === receipt.parentId
            ? { ...entry, replies: [...(entry.replies || []), comment] }
            : entry.replies?.length
              ? { ...entry, replies: append(entry.replies) }
              : entry,
        )
      return { ...current, entries: append(current.entries as TComment[]) }
    }, query.data as TPagedComments)
    const withViewer = viewerQuery.data
      ? {
          ...withReceipts,
          entries: (withReceipts.entries as unknown as TComment[]).map((comment) =>
            mergeCommentViewerState(comment, viewerQuery.data),
          ),
        }
      : withReceipts

    const overlayReactionReceipts = (comment: TComment): TComment => {
      const receipt = reactionReceipts.get(String(comment.innerId))
      const currentRevision = comment.commentInteractionRevision
      const receiptRevision = receipt?.publicProjection.commentInteractionRevision
      const nested = {
        ...comment,
        replies: comment.replies?.map(overlayReactionReceipts) || [],
        replyToComment: comment.replyToComment
          ? overlayReactionReceipts(comment.replyToComment)
          : null,
      }
      if (
        !receipt ||
        (typeof receiptRevision === 'number' &&
          typeof currentRevision === 'number' &&
          currentRevision >= receiptRevision)
      ) {
        return nested
      }
      return overlayCommentReactionReceipt(nested, receipt)
    }

    return {
      ...withViewer,
      entries: (withViewer.entries as unknown as TComment[]).map(overlayReactionReceipts),
    } as TPagedComments
  }, [
    account.accountRef,
    account.user,
    articlePath.community,
    articlePath.innerId,
    stats?.snapshotAt,
    articlePath.thread,
    query.data,
    viewerQuery.data,
  ])

  return { comments, commentsStore, data, query, summaryQuery }
}
