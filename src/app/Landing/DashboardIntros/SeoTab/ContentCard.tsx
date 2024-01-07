import { FC } from 'react'

import WebCard from './WebCard'
import TwitterCard from './TwitterCard'

import { Wrapper } from '../../styles/dashboard_intros/seo_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <WebCard />
      <div>seo tab </div>
      <TwitterCard />
    </Wrapper>
  )
}

export default ContentCard
