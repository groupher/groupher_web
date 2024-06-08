import { type FC, useState, lazy, Suspense } from 'react'

import { DASHBOARD_ROUTE } from '@/const/route'
import useMetric from '@/hooks/useMetric'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import type { TIntroTab } from './spec'

export const SideMenus = lazy(() => import('./SideMenus'))
export const LayoutTab = lazy(() => import('./LayoutTab'))
export const SeoTab = lazy(() => import('./SeoTab'))

export const CMSTab = lazy(() => import('./CMSTab'))
export const TagsTab = lazy(() => import('./TagsTab'))
export const AdminsTab = lazy(() => import('./AdminsTab'))
export const LinksTab = lazy(() => import('./LinksTab'))

export const IntegrateTab = lazy(() => import('./IntegrateTab'))
export const ImportTab = lazy(() => import('./ImportTab'))
export const TrendTab = lazy(() => import('./TrendTab'))

import {
  Wrapper,
  ContentWrapper,
  InnerWrapper,
  Slogan,
  Title,
  Desc,
  Right,
} from '../styles/dashboard_intros'

const Loading = () => {
  return <LavaLampLoading top={0} left={30} />
}

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
            {tab === DASHBOARD_ROUTE.LAYOUT && (
              <Suspense fallback={<Loading />}>
                <LayoutTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.SEO && (
              <Suspense fallback={<Loading />}>
                <SeoTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.POST && (
              <Suspense fallback={<Loading />}>
                <CMSTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.TAGS && (
              <Suspense fallback={<Loading />}>
                <TagsTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.ADMINS && (
              <Suspense fallback={<Loading />}>
                <AdminsTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.HEADER && (
              <Suspense fallback={<Loading />}>
                <LinksTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.WIDGETS && (
              <Suspense fallback={<Loading />}>
                <IntegrateTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.INOUT && (
              <Suspense fallback={<Loading />}>
                <ImportTab />
              </Suspense>
            )}

            {tab === DASHBOARD_ROUTE.TREND && (
              <Suspense fallback={<Loading />}>
                <TrendTab />
              </Suspense>
            )}
          </Right>
        </InnerWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

export default DashboardIntros
