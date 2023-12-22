import { FC, useState } from 'react'

import type { TDashboardPath } from '@/spec'
import { DASHBOARD_ROUTE } from '@/constant/route'

import SideMenus from './SideMenus'
import LayoutTab from './LayoutTab'
import SeoTab from './SeoTab'
// import ContentPreview from './ContentPreview'
// import DashboardPreview from './DashboardPreview'

import { Wrapper, Right } from '../styles/dashboard_intros'

const DashboardIntros: FC = () => {
  const [tab, setTab] = useState<TDashboardPath>(DASHBOARD_ROUTE.LAYOUT)

  return (
    <Wrapper>
      <SideMenus tab={tab} onChange={(tab) => setTab(tab)} />
      <Right>
        {tab === DASHBOARD_ROUTE.LAYOUT && <LayoutTab />}
        {tab === DASHBOARD_ROUTE.SEO && <SeoTab />}

        {/* <ContentPreview tab={tab} /> */}
        {/* <DashboardPreview tab={tab} /> */}
      </Right>
    </Wrapper>
  )
}

export default DashboardIntros
