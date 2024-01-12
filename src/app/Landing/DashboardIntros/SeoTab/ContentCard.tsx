import { FC } from 'react'

import ArticleCard from './ArticleCard'
import WebCard from './WebCard'
import Content from './Content'
import TwitterCard from './TwitterCard'

import { Wrapper } from '../../styles/dashboard_intros/seo_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <ArticleCard />
      <WebCard />
      <TwitterCard />
      <Content />
    </Wrapper>
  )
}

export default ContentCard
