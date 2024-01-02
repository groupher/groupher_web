import { FC, useState } from 'react'

import type { TDashboardPath } from '@/spec'
import { DASHBOARD_ROUTE } from '@/constant/route'

import SideMenus from './SideMenus'
import LayoutTab from './LayoutTab'
import SeoTab from './SeoTab'
import CMSTab from './CMSTab'
import TagsTab from './TagsTab'
import AdminsTab from './AdminsTab'
import LinksTab from './LinksTab'
import IntegrateTab from './IntegrateTab'
import TrendTab from './TrendTab'

import { Wrapper, Right } from '../styles/dashboard_intros'

const DashboardIntros: FC = () => {
  const [tab, setTab] = useState<TDashboardPath>(DASHBOARD_ROUTE.LAYOUT)

  return (
    <Wrapper>
      <SideMenus tab={tab} onChange={(tab) => setTab(tab)} />
      <Right>
        {tab === DASHBOARD_ROUTE.LAYOUT && <LayoutTab />}
        {tab === DASHBOARD_ROUTE.SEO && <SeoTab />}
        {tab === DASHBOARD_ROUTE.POST && <CMSTab />}
        {tab === DASHBOARD_ROUTE.TAGS && <TagsTab />}
        {tab === DASHBOARD_ROUTE.ADMINS && <AdminsTab />}
        {tab === DASHBOARD_ROUTE.HEADER && <LinksTab />}
        {tab === DASHBOARD_ROUTE.WIDGETS && <IntegrateTab />}
        {tab === DASHBOARD_ROUTE.TREND && <TrendTab />}
      </Right>
    </Wrapper>
  )
}

export default DashboardIntros
