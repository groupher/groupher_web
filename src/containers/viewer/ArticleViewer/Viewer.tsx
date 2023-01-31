/*
 *
 * ArticleViewer
 *
 */

import { FC, memo } from 'react'

import type { TArticle, TBroadcastConfig } from '@/spec'

import PostViewer from './PostViewer'

type TProps = {
  article: TArticle
  loading: boolean
  broadcastConfig: TBroadcastConfig
}

const Viewer: FC<TProps> = ({ article, loading, broadcastConfig }) => {
  const { meta } = article

  switch (meta.thread.toLowerCase()) {
    default: {
      // post, job, etc..
      return <PostViewer article={article} loading={loading} broadcastConfig={broadcastConfig} />
    }
  }
}

export default memo(Viewer)
