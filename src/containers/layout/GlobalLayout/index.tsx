/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Provider as BalancerTextProvider } from 'react-wrap-balancer'

import METRIC from '@/constant/metric'
import { TOPBAR_LAYOUT } from '@/constant/layout'

import useMetric from '@/hooks/useMetric'
import useWallpaper from '@/hooks/useWallpaper'

import { bond } from '@/utils/mobx'

import ThemePalette from '@/containers/layout/ThemePalette'
import ModeLine from '@/containers/unit/ModeLine'

import Broadcast from '@/widgets/Broadcast'
import Footer from '@/widgets/Footer'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '@/widgets/CustomScroller'

import type { TStore } from './store'
import SEO from './SEO'
import Wallpaper from './Wallpaper'

import { Addon, GlowBackground } from './dynamic'

import {
  Skeleton,
  Wrapper,
  ScrollWrapper,
  InnerWrapper,
  BodyWrapper,
  ContentWrapper,
} from './styles'
import { useInit, loadDemoSetting } from './logic'

let DashboardAlert = null

type TProps = {
  globalLayout?: TStore
  children: ReactNode
}

const GlobalLayoutContainer: FC<TProps> = ({ globalLayout: store, children }) => {
  // load debug graph
  useInit(store)

  const metric = useMetric()
  const router = useRouter()
  const { hasShadow } = useWallpaper()

  const [load, setLoad] = useState(false)
  const [showDashboardAlertUI, setShowDashboardAlertUI] = useState(false)

  const { isMobile, globalLayout, showDashboardAlert } = store

  useEffect(() => {
    const handleRouteComplete = () => loadDemoSetting()
    router.events.on('routeChangeComplete', handleRouteComplete)

    setLoad(true)

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  useEffect(() => {
    if (showDashboardAlert) {
      DashboardAlert = dynamic(() => import('./DashboardAlert'), { ssr: false })
      setShowDashboardAlertUI(true)
    } else {
      setShowDashboardAlertUI(false)
    }
  }, [showDashboardAlert])

  return (
    <BalancerTextProvider>
      <ThemePalette>
        {load && <Addon />}
        <Skeleton>
          <Wallpaper />
          <ScrollWrapper noMobilePadding={metric === METRIC.HOME}>
            <Wrapper>
              <SEO />
              {/* TODO: extract */}
              <InnerWrapper
                metric={metric}
                hasShadow={hasShadow}
                hasTopbar={metric !== METRIC.HOME && globalLayout.topbar === TOPBAR_LAYOUT.YES}
                topbarBg={globalLayout.topbarBg}
              >
                <Broadcast />
                <ContentWrapper>
                  <BodyWrapper>{children}</BodyWrapper>
                  <Footer />
                </ContentWrapper>
                <GlowBackground />
              </InnerWrapper>
              {isMobile && load && <ModeLine />}
            </Wrapper>
          </ScrollWrapper>
        </Skeleton>

        {showDashboardAlertUI && <DashboardAlert />}
      </ThemePalette>
    </BalancerTextProvider>
  )
}

export default bond(GlobalLayoutContainer, 'globalLayout') as FC<TProps>
