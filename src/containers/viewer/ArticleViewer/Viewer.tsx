/*
 *
 * ArticleViewer
 *
 */

import { type FC, memo } from 'react'

import type { TArticle } from '~/spec'

import PostViewer from './PostViewer'

type TProps = {
  article: TArticle
  loading: boolean
}

const Viewer: FC<TProps> = ({ article, loading }) => {
  const { meta } = article

  switch (meta.thread.toLowerCase()) {
    default: {
      // post, job, etc..
      return <PostViewer article={article} loading={loading} />
    }
  }
}

export default memo(Viewer)
