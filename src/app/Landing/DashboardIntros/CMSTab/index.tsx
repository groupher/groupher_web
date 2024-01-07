import { FC } from 'react'

import Tabs from './Tabs'
import ContentCard from './ContentCard'
import MenuCard from './MenuCard'

import { Wrapper } from '../../styles/dashboard_intros/cms_tab'

const CMSTab: FC = () => {
  return (
    <Wrapper>
      <Tabs />
      <ContentCard />
      <MenuCard />
    </Wrapper>
  )
}

export default CMSTab
