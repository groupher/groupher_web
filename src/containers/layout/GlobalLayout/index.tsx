/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import METRIC from '@/constant/metric'
import { TOPBAR_LAYOUT } from '@/constant/layout'

import type { TSEO, TMetric } from '@/spec'
import { bond } from '@/utils/mobx'

import ThemePalette from '@/containers/layout/ThemePalette'
import Broadcast from '@/widgets/Broadcast'
import Footer from '@/widgets/Footer'

// import DashboardAlert from './DashboardAlert'
// import CustomScroller from '@/widgets/CustomScroller'

import type { TStore } from './store'
import SEO from './SEO'
import Wallpaper from './Wallpaper'

import { Addon } from './dynamic'

import {
  Skeleton,
  Wrapper,
  ScrollWrapper,
  GrowBackground,
  InnerWrapper,
  BodyWrapper,
  ContentWrapper,
} from './styles'
import { useInit, childrenWithProps, getGlowPosition, loadDemoSetting } from './logic'

let DashboardAlert = null

type TProps = {
  globalLayout?: TStore
  children: ReactNode
  seoConfig: TSEO
  metric: TMetric
}

const GlobalLayoutContainer: FC<TProps> = ({
  globalLayout: store,
  seoConfig,
  children,
  metric,
}) => {
  // load debug graph
  const { isMobile } = useMobileDetect()
  useInit(store, { isMobile })

  const router = useRouter()

  const [load, setLoad] = useState(false)
  const [showDashboardAlertUI, setShowDashboardAlertUI] = useState(false)

  const {
    wallpaperInfo,
    hasShadow,
    glowEffect,
    globalLayout,
    broadcastConfig,
    showDashboardAlert,
  } = store

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
    <ThemePalette>
      {load && <Addon metric={metric} />}
      <Skeleton>
        <Wallpaper wallpaperInfo={wallpaperInfo} />
        <ScrollWrapper>
          <Wrapper>
            <SEO metric={metric} config={seoConfig} />
            <InnerWrapper
              metric={metric}
              hasShadow={hasShadow}
              hasTopbar={metric !== METRIC.HOME && globalLayout.topbar === TOPBAR_LAYOUT.YES}
              topbarBg={globalLayout.topbarBg}
            >
              <Broadcast metric={metric} settings={broadcastConfig} />
              <ContentWrapper>
                <BodyWrapper isMobile={isMobile}>
                  {childrenWithProps(children, { metric })}
                </BodyWrapper>
                <Footer metric={metric} />
              </ContentWrapper>
              {!!glowEffect.glowType && (
                <GrowBackground
                  glowType={glowEffect.glowType}
                  glowPosition={getGlowPosition(metric, glowEffect.glowFixed)}
                  glowOpacity={glowEffect.glowOpacity}
                />
              )}
            </InnerWrapper>
            {/* {isMobile && <ModeLine metric={metric} />} */}
          </Wrapper>
        </ScrollWrapper>
      </Skeleton>

      {showDashboardAlertUI && <DashboardAlert />}
    </ThemePalette>
  )
}

export default bond(GlobalLayoutContainer, 'globalLayout') as FC<TProps>
