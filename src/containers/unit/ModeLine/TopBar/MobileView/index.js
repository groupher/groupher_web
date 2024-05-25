import React from 'react'

import METRIC from '@/const/metric'

import ArticleBar from './ArticleBar'
import CommunityBar from './CommunityBar'

const MobileView = ({ metric, ...restProps }) => {
  return (
    <React.Fragment>
      {metric === METRIC.ARTICLE ? <ArticleBar {...restProps} /> : <CommunityBar {...restProps} />}
    </React.Fragment>
  )
}

export default React.memo(MobileView)
