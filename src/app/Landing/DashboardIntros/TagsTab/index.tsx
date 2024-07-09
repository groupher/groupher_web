import type { FC } from 'react'

import ContentCard from './ContentCard'
import Footer from './Footer'

import { Wrapper } from '../../styles/dashboard_intros/tags_tab'

const SeoTab: FC = () => {
  return (
    <Wrapper>
      <ContentCard />
      <Footer />
    </Wrapper>
  )
}

export default SeoTab
