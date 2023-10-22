import { observer } from 'mobx-react'
import METRIC from '@/constant/metric'

import useMetric from '@/hooks/useMetric'

import ArticleLayout from './ArticleLayout'
import ChangelogLayout from './ChangelogLayout'

const ArticleContent = (props) => {
  const metric = useMetric()

  switch (metric) {
    case METRIC.CHANGELOG_ARTICLE: {
      return <ChangelogLayout {...props} />
    }
    default: {
      return <ArticleLayout {...props} />
    }
  }
}

export default observer(ArticleContent)
