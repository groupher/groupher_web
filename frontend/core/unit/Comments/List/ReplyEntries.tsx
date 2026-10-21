import type { CSSProperties } from 'react'

import type { TComment, TID } from '~/spec'

import Comment from '../Comment'
import type { TAPIMode } from '../spec'

const VISIBILITY: CSSProperties = { contentVisibility: 'auto', containIntrinsicSize: '220px' }

/** Displays all replies at one visual depth while retaining their actual reply target. */
export default function ReplyEntries({
  entries,
  apiMode,
  foldedIdSet,
  preview = false,
}: {
  entries: readonly TComment[]
  apiMode: TAPIMode
  foldedIdSet: Set<TID>
  preview?: boolean
}) {
  return (
    <>
      {entries.map((comment) => (
        <div key={comment.innerId} style={VISIBILITY}>
          <Comment
            apiMode={apiMode}
            data={comment}
            isFolded={foldedIdSet.has(comment.innerId)}
            showInnerRef
            isReply
            preview={preview}
          />
        </div>
      ))}
    </>
  )
}
