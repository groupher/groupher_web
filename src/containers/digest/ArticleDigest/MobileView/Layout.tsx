import { FC, memo } from 'react'
import type { TArticle, TMetric } from '@/spec'

import METRIC from '@/constant/metric'

import PostLayout from './PostLayout'

type TProps = {
  article: TArticle
  metric?: TMetric
}

const Layout: FC<TProps> = ({ article, metric = METRIC.ARTICLE }) => {
  return <PostLayout article={article} />
}

export default memo(Layout)
