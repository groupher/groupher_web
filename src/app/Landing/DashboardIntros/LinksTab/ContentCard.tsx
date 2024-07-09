import type { FC } from 'react'

import HeaderCard from './HeaderCard'
import Content from './Content'
import FooterCard from './FooterCard'

import { Wrapper } from '../../styles/dashboard_intros/links_tab/content_card'

const ContentCard: FC = () => {
  return (
    <Wrapper>
      <HeaderCard />
      <Content />
      <FooterCard />
    </Wrapper>
  )
}

export default ContentCard
