import type { TCommentCollection, TCommentPage } from '~/query/commentPage'
import type { TCommentFeedEffect } from '~/query/mutation/commentReceipt'
import type { TComment } from '~/spec'

/** Applies confirmed writes to their owning collection without flattening parent identity. */
export const overlayCommentFeed = (
  page: TCommentPage,
  collection: TCommentCollection,
  receipts: TCommentFeedEffect[],
  first: boolean,
): TCommentPage => {
  const patch = (entries: TComment[], receipt: TCommentFeedEffect): TComment[] =>
    entries.flatMap((entry) => {
      if (String(entry.innerId) === receipt.commentRef) {
        return receipt.type === 'delete'
          ? []
          : [{ ...entry, ...receipt.comment, replies: entry.replies }]
      }
      return [{ ...entry, replies: entry.replies ? patch(entry.replies, receipt) : [] }]
    })
  let entries = page.entries
  let pinnedEntries = page.pinnedEntries
  for (const receipt of receipts) {
    entries = patch(entries, receipt)
    pinnedEntries = patch(pinnedEntries, receipt)
    if (!first || receipt.type !== 'create' || !receipt.comment) continue
    const comment = receipt.comment
    const root = comment.rootInnerId || receipt.parentId
    const belongs = collection.rootInnerId
      ? String(root) === collection.rootInnerId
      : collection.mode === 'TIMELINE' || !receipt.parentId
    if (
      belongs &&
      ![...entries, ...pinnedEntries].some((entry) => String(entry.innerId) === receipt.commentRef)
    ) {
      entries = [...entries, comment]
    } else if (!collection.rootInnerId && receipt.parentId) {
      const addPreview = (list: TComment[]) =>
        list.map((entry) => {
          if (String(entry.innerId) !== String(root)) return entry
          const replies = entry.replies || []
          if (replies.some((reply) => String(reply.innerId) === receipt.commentRef)) return entry
          return { ...entry, replies: [...replies, comment].slice(0, 3) }
        })
      entries = addPreview(entries)
      pinnedEntries = addPreview(pinnedEntries)
    }
  }
  return { ...page, entries, pinnedEntries }
}
