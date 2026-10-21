import { useState, type PropsWithChildren } from 'react'

import type { TCommentCollection } from '~/query/commentPage'
import type { TEffectivePagiConfig } from '~/spec'

import FeedProvider from './FeedProvider'

/** Resets position on article/view/config identity changes while keeping editor state independent. */
export default function RootCollection({
  children,
  collection,
  config,
  initialPage,
}: PropsWithChildren<{
  collection: TCommentCollection
  config: TEffectivePagiConfig
  initialPage: number
}>) {
  const [page, setPage] = useState(initialPage)
  return (
    <FeedProvider collection={collection} config={config} page={page} setPage={setPage}>
      {children}
    </FeedProvider>
  )
}
