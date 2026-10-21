import { expect, it } from 'vitest'

import type { TCommentPage } from '~/query/commentPage'
import type { TCommentFeedEffect } from '~/query/mutation/commentReceipt'

import { overlayCommentFeed } from './overlay'
const collection = {
  article: { community: 'home', thread: 'POST' as const, innerId: '1' },
  mode: 'REPLIES' as const,
}
const page: TCommentPage = {
  pinnedEntries: [],
  entries: [{ innerId: '10', replies: [{ innerId: '11' }] }],
  pageInfo: {
    api: 'cursor',
    __typename: 'CursorPageInfo',
    startCursor: null,
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
  },
}
const receipt = {
  type: 'create',
  commentRef: '12',
  parentId: '11',
  comment: { innerId: '12', rootInnerId: '10', replyToComment: { innerId: '11' } },
} as TCommentFeedEffect
it('flattens a deep reply into its root preview without changing its direct parent', () => {
  const result = overlayCommentFeed(page, collection, [receipt], true)
  expect(result.entries[0].replies?.map((reply) => reply.innerId)).toEqual(['11', '12'])
  expect(result.entries[0].replies?.[1].replyToComment?.innerId).toBe('11')
  expect(result.entries[0].replies?.[0].replies).toEqual([])
})
it('inserts only into the matching reply collection and only on its head page', () => {
  const empty = { ...page, entries: [] }
  expect(
    overlayCommentFeed(empty, { ...collection, rootInnerId: '10' }, [receipt], true).entries,
  ).toHaveLength(1)
  expect(
    overlayCommentFeed(empty, { ...collection, rootInnerId: '20' }, [receipt], true).entries,
  ).toHaveLength(0)
  expect(
    overlayCommentFeed(empty, { ...collection, rootInnerId: '10' }, [receipt], false).entries,
  ).toHaveLength(0)
})
it('removes deleted previews even when the root entry itself remains', () => {
  expect(
    overlayCommentFeed(
      page,
      collection,
      [{ type: 'delete', commentRef: '11' } as TCommentFeedEffect],
      true,
    ).entries[0].replies,
  ).toEqual([])
})
