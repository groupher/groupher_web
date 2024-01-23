import { FC, useState } from 'react'

import { DASHBOARD_ROUTE } from '@/constant/route'
import useMetric from '@/hooks/useMetric'

import type { TIntroTab } from './spec'
import SideMenus from './SideMenus'
import LayoutTab from './LayoutTab'
import SeoTab from './SeoTab'
import CMSTab from './CMSTab'
import TagsTab from './TagsTab'
import AdminsTab from './AdminsTab'
import LinksTab from './LinksTab'
import IntegrateTab from './IntegrateTab'
import ImportTab from './ImportTab'
import TrendTab from './TrendTab'

import {
  Wrapper,
  ContentWrapper,
  InnerWrapper,
  Slogan,
  Title,
  Desc,
  Right,
} from '../styles/dashboard_intros'

const DashboardIntros: FC = () => {
  const metric = useMetric()
  const [tab, setTab] = useState<TIntroTab>(DASHBOARD_ROUTE.LAYOUT)

  return (
    <Wrapper>
      <Slogan>
        <Title>完善的后台管理</Title>
        <Desc>强大的自定义设置，满足你的品牌个性化及内容管理需要</Desc>
      </Slogan>

      <ContentWrapper metric={metric}>
        <InnerWrapper $tab={tab} metric={metric}>
          <SideMenus tab={tab} onChange={(tab) => setTab(tab)} />
          <Right>
            {tab === DASHBOARD_ROUTE.LAYOUT && <LayoutTab />}
            {tab === DASHBOARD_ROUTE.SEO && <SeoTab />}
            {tab === DASHBOARD_ROUTE.POST && <CMSTab />}
            {tab === DASHBOARD_ROUTE.TAGS && <TagsTab />}
            {tab === DASHBOARD_ROUTE.ADMINS && <AdminsTab />}
            {tab === DASHBOARD_ROUTE.HEADER && <LinksTab />}
            {tab === DASHBOARD_ROUTE.WIDGETS && <IntegrateTab />}
            {tab === DASHBOARD_ROUTE.INOUT && <ImportTab />}
            {tab === DASHBOARD_ROUTE.TREND && <TrendTab />}
          </Right>
        </InnerWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

export default DashboardIntros
