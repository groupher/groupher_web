import { FC, memo } from 'react'
import type { TArticle, TMetric, TThread } from '@/spec'

import METRIC from '@/constant/metric'

import PostLayout from './PostLayout'
import ChangelogLayout from './ChangelogLayout'

type TProps = {
  article: TArticle
  thread: TThread
  metric?: TMetric
}

const Layout: FC<TProps> = ({ article, thread, metric = METRIC.ARTICLE }) => {
  switch (metric) {
    case METRIC.CHANGELOG_ARTICLE: {
      return <ChangelogLayout article={article} />
    }
    default: {
      return <PostLayout article={article} />
    }
  }
}

export default memo(Layout)
