/* *
 * DashboardThread
 *
 */

import { FC } from 'react'
import { includes } from 'ramda'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import { ROUTE, DASHBORD_CMS_ROUTES } from '@/constant/route'

import type { TMetric } from '@/spec'
import SideMenu from './SideMenu'
import CMS from './CMS'

import {
  Overview,
  BasicInfo,
  SEO,
  Layout,
  Alias,
  Admin,
  Threads,
  Broadcast,
  Tags,
  Domain,
  ThirdPart,
  Widgets,
  // Doc,
  Header,
  Footer,
  RSS,
} from './dynamic'

import type { TStore } from './store'
import { Wrapper, MainWrapper } from './styles'
import { useInit } from './logic'

// const log = buildLog('C:DashboardThread')

type TProps = {
  dashboardThread?: TStore
  testid?: string
  metric: TMetric
}

const DashboardThreadContainer: FC<TProps> = ({
  dashboardThread: store,
  testid = 'dashboard-thread',
  metric,
}) => {
  useInit(store)

  const {
    curTab,
    overviewData,
    curCommunity,
    baseInfoSettings,
    seoSettings,
    enableSettings,
    uiSettings,
    tagSettings,
    rssSettings,
    headerSettings,
    footerSettings,
    aliasSettings,
    adminSettings,
    widgetsSettings,
    // docSettings,
    broadcastSettings,
    touched,
    cmsContents,
    glowType,
  } = store

  console.log('## glowType: ', glowType)

  const { DASHBOARD } = ROUTE

  return (
    <Wrapper testid={testid} metric={metric}>
      <SideMenu curTab={curTab} touched={touched} community={curCommunity} />

      <MainWrapper>
        {curTab === DASHBOARD.DASHBOARD && <Overview data={overviewData} />}
        {curTab === DASHBOARD.INFO && <BasicInfo settings={baseInfoSettings} touched={touched} />}
        {curTab === DASHBOARD.SEO && <SEO settings={seoSettings} touched={touched} />}
        {curTab === DASHBOARD.LAYOUT && <Layout settings={uiSettings} touched={touched} />}
        {curTab === DASHBOARD.ALIAS && <Alias settings={aliasSettings} />}
        {curTab === DASHBOARD.ADMINS && <Admin settings={adminSettings} />}
        {curTab === DASHBOARD.THREADS && <Threads settings={enableSettings} />}
        {curTab === DASHBOARD.TAGS && <Tags settings={tagSettings} touched={touched} />}

        {curTab === DASHBOARD.RSS && <RSS settings={rssSettings} touched={touched} />}

        {curTab === DASHBOARD.HEADER && <Header settings={headerSettings} touched={touched} />}
        {curTab === DASHBOARD.FOOTER && <Footer settings={footerSettings} touched={touched} />}
        {curTab === DASHBOARD.BROADCAST && (
          <Broadcast settings={broadcastSettings} touched={touched} />
        )}
        {/* {curTab === DASHBOARD.DOC && <Doc settings={docSettings} />} */}
        {curTab === DASHBOARD.DOMAIN && <Domain />}
        {curTab === DASHBOARD.THIRD_PART && <ThirdPart />}
        {curTab === DASHBOARD.WIDGETS && <Widgets settings={widgetsSettings} touched={touched} />}

        {includes(curTab, DASHBORD_CMS_ROUTES) && (
          <CMS cmsContents={cmsContents} route={curTab} touched={touched} />
        )}
      </MainWrapper>
    </Wrapper>
  )
}

export default bond(DashboardThreadContainer, 'dashboardThread') as FC<TProps>
