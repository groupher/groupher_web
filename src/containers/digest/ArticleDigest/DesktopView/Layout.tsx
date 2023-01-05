import { FC, memo } from 'react'
import type { TArticle, TMetric, TThread } from '@/spec'

import METRIC from '@/constant/metric'

import PostLayout from './PostLayout'

type TProps = {
  article: TArticle
  thread: TThread
  metric?: TMetric
}

const Layout: FC<TProps> = ({ article, thread, metric = METRIC.ARTICLE }) => {
  switch (thread) {
    default: {
      return <PostLayout article={article} />
    }
  }
}

export default memo(Layout)
