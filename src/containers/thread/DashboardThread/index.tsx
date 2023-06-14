/* *
 * DashboardThread
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import { ROUTE } from '@/constant/route'

import SideMenu from './SideMenu'
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
  Help,
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
}

const DashboardThreadContainer: FC<TProps> = ({
  dashboardThread: store,
  testid = 'dashboard-thread',
}) => {
  useInit(store)
  const {
    curTab,
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
    widgetsSettings,
    helpSettings,
    broadcastSettings,
    touched,
  } = store

  const { DASHBOARD } = ROUTE

  return (
    <Wrapper testid={testid}>
      <SideMenu curTab={curTab} touched={touched} community={curCommunity} />

      <MainWrapper>
        {curTab === DASHBOARD.DASHBOARD && <Overview />}
        {curTab === DASHBOARD.INFO && <BasicInfo settings={baseInfoSettings} />}
        {curTab === DASHBOARD.SEO && <SEO settings={seoSettings} />}
        {curTab === DASHBOARD.LAYOUT && <Layout settings={uiSettings} touched={touched} />}
        {curTab === DASHBOARD.ALIAS && <Alias settings={aliasSettings} />}
        {curTab === DASHBOARD.ADMINS && <Admin />}
        {curTab === DASHBOARD.THREADS && <Threads settings={enableSettings} />}
        {curTab === DASHBOARD.TAGS && <Tags settings={tagSettings} touched={touched} />}

        {curTab === DASHBOARD.RSS && <RSS settings={rssSettings} touched={touched} />}

        {curTab === DASHBOARD.HEADER && <Header settings={headerSettings} touched={touched} />}
        {curTab === DASHBOARD.FOOTER && <Footer settings={footerSettings} touched={touched} />}
        {curTab === DASHBOARD.BROADCAST && (
          <Broadcast settings={broadcastSettings} touched={touched} />
        )}
        {curTab === DASHBOARD.HELP && <Help settings={helpSettings} />}
        {curTab === DASHBOARD.DOMAIN && <Domain />}
        {curTab === DASHBOARD.THIRD_PART && <ThirdPart />}
        {curTab === DASHBOARD.WIDGETS && <Widgets settings={widgetsSettings} touched={touched} />}
      </MainWrapper>
    </Wrapper>
  )
}

export default bond(DashboardThreadContainer, 'dashboardThread') as FC<TProps>
