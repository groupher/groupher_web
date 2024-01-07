import { FC } from 'react'

import WebCard from './WebCard'
import Content from './Content'
import TwitterCard from './TwitterCard'

import { Wrapper } from '../../styles/dashboard_intros/seo_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <WebCard />
      <Content />
      <TwitterCard />
    </Wrapper>
  )
}

export default ContentCard
