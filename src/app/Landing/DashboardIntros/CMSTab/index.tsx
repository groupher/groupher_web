import type { FC } from 'react'

import Tabs from './Tabs'
import ContentCard from './MainCard'
import MenuCard from './MenuCard'

import { Wrapper, InnerWrapper } from '../../styles/dashboard_intros/cms_tab'

const CMSTab: FC = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Tabs />
        <ContentCard />
        <MenuCard />
      </InnerWrapper>
    </Wrapper>
  )
}

export default CMSTab
