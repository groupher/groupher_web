import METRIC from '@/constant/metric'

import ArticleLayout from './ArticleLayout'
import ChangelogLayout from './ChangelogLayout'

const ArticleContent = (props) => {
  const { metric } = props

  switch (metric) {
    case METRIC.CHANGELOG_ARTICLE: {
      return <ChangelogLayout {...props} />
    }
    default: {
      return <ArticleLayout {...props} />
    }
  }
}

export default ArticleContent
