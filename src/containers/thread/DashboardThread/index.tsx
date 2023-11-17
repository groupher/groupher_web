/* *
 * DashboardThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { includes } from 'ramda'

import { ROUTE, DASHBORD_CMS_ROUTES } from '@/constant/route'

import useMetric from '@/hooks/useMetric'

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

import { useStore } from './store'
import { Wrapper, MainWrapper } from './styles'
import { useInit } from './logic'

// const log = buildLog('C:DashboardThread')

const DashboardThread: FC = () => {
  const store = useStore()
  useInit(store)
  const metric = useMetric()

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
  } = store

  const { DASHBOARD } = ROUTE

  return (
    <Wrapper $testid="dashboard-thread" metric={metric}>
      <SideMenu curTab={curTab} touched={touched} community={curCommunity} />

      <MainWrapper>
        {curTab === DASHBOARD.OVERVIEW && <Overview data={overviewData} />}
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

export default observer(DashboardThread)
