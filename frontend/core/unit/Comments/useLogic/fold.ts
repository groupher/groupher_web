import type { TComment, TID } from '~/spec'

/** True when every currently loaded root comment is folded. */
export const areAllCommentsFolded = (
  entries: readonly TComment[],
  foldedCommentIds: readonly TID[],
): boolean => {
  if (entries.length === 0) return false

  const foldedCommentIdSet = new Set(foldedCommentIds)
  return entries.every((comment) => foldedCommentIdSet.has(comment.innerId))
}
