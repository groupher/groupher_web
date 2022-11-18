import { FC, memo } from 'react'

import type { TMetric, TArticle } from '@/spec'
import { METRIC } from '@/constant'

import HomeCommunity from './HomeCommunity'
import Article from './Article'
import Community from './Community'

export type TProps = {
  metric?: TMetric
  article?: TArticle
  title?: string
  noBottomBorder?: boolean
}

const TopInfo: FC<TProps> = ({
  metric = METRIC.COMMUNITY,
  title = '',
  ...restProps
}) => {
  if (METRIC.COMMUNITY && title !== '') {
    return <Community title={title} />
  }

  switch (metric) {
    case METRIC.ARTICLE: {
      return <Article {...restProps} />
    }
    default:
      return <HomeCommunity />
  }
}

export default memo(TopInfo)
