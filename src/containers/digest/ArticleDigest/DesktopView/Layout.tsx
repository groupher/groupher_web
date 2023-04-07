import { FC, memo } from 'react'
import type { TArticle, TMetric } from '@/spec'

import METRIC from '@/constant/metric'

import PostLayout from './PostLayout'
import ChangelogLayout from './ChangelogLayout'

type TProps = {
  article: TArticle
  metric?: TMetric
}

const Layout: FC<TProps> = ({ article, metric = METRIC.ARTICLE }) => {
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
