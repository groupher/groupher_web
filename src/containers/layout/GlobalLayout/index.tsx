/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import { Provider as BalancerTextProvider } from 'react-wrap-balancer'

import METRIC from '@/constant/metric'
import { TOPBAR_LAYOUT } from '@/constant/layout'

import useMetric from '@/hooks/useMetric'
import useWallpaper from '@/hooks/useWallpaper'

import ThemePalette from '@/containers/layout/ThemePalette'
import ModeLine from '@/containers/unit/ModeLine'

import Broadcast from '@/widgets/Broadcast'
import Footer from '@/widgets/Footer'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '@/widgets/CustomScroller'

import { useStore } from './store'
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
import { useInit } from './logic'

let DashboardAlert = null

type TProps = {
  children: ReactNode
}

const GlobalLayout: FC<TProps> = ({ children }) => {
  const store = useStore()
  useInit(store)

  const metric = useMetric()
  const { hasShadow } = useWallpaper()

  const [showDashboardAlertUI, setShowDashboardAlertUI] = useState(false)

  const { isMobile, globalLayout, showDashboardAlert } = store

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
        <Addon />
        <Skeleton>
          <Wallpaper />
          <ScrollWrapper $noMobilePadding={metric === METRIC.HOME}>
            <Wrapper>
              <SEO />
              <InnerWrapper
                metric={metric}
                $hasShadow={hasShadow}
                $hasTopbar={metric !== METRIC.HOME && globalLayout.topbar === TOPBAR_LAYOUT.YES}
                $topbarBg={globalLayout.topbarBg}
              >
                <Broadcast />
                <ContentWrapper>
                  <BodyWrapper>{children}</BodyWrapper>
                  <Footer />
                </ContentWrapper>
                <GlowBackground />
              </InnerWrapper>
              {isMobile && <ModeLine />}
            </Wrapper>
          </ScrollWrapper>
        </Skeleton>

        {showDashboardAlertUI && <DashboardAlert />}
      </ThemePalette>
    </BalancerTextProvider>
  )
}

export default observer(GlobalLayout)
