import type { ComponentProps } from 'react'

import { useCommentFeed } from '../pagination/context'
import Controls from '../pagination/Controls'
import ReplyEntries from './ReplyEntries'

export default function ReplyPage(
  props: Omit<ComponentProps<typeof ReplyEntries>, 'entries' | 'preview'>,
) {
  const feed = useCommentFeed()
  return (
    <>
      <ReplyEntries {...props} entries={feed.data?.entries || []} />
      <Controls />
    </>
  )
}
