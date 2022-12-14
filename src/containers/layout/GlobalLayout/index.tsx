/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode, useEffect, useState } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { TOPBAR_LAYOUT } from '@/constant/layout'

import type { TSEO, TMetric } from '@/spec'
import { bond } from '@/utils/mobx'

import ThemePalette from '@/containers/layout/ThemePalette'
// import BannerNotify from '@/widgets/BannerNotify'
import Footer from '@/widgets/Footer'
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
import { useInit, childrenWithProps, getGlowPosition } from './logic'

type TProps = {
  globalLayout?: TStore
  children: ReactNode
  seoConfig: TSEO
  noFooter?: boolean

  metric: TMetric
}

const GlobalLayoutContainer: FC<TProps> = ({
  globalLayout: store,
  seoConfig,
  children,
  noFooter = false,
  metric,
}) => {
  // load debug graph
  const { isMobile } = useMobileDetect()
  useInit(store, { isMobile })

  const [load, setLoad] = useState(false)

  const { wallpaper, wallpapers, hasShadow, glowType, glowFixed, globalLayout } = store

  useEffect(() => {
    setLoad(true)
  }, [])

  return (
    <ThemePalette>
      {load && <Addon />}
      <Skeleton>
        <Wallpaper wallpaper={wallpaper} wallpapers={wallpapers} />
        {/* <CustomScroller
          instanceKey={BODY_SCROLLER}
          direction="vertical"
          height="100vh"
          barSize={SIZE.MEDIUM}
          showShadow={false}
          onScrollDirectionChange={onPageScrollDirhange}
          autoHide
        > */}
        <ScrollWrapper>
          <Wrapper>
            <SEO metric={metric} config={seoConfig} />
            <InnerWrapper
              metric={metric}
              hasShadow={hasShadow}
              hasTopbar={globalLayout.topbar === TOPBAR_LAYOUT.YES}
              topbarBg={globalLayout.topbarBg}
            >
              {/* <BannerNotify
                metric={metric}
                layout={globalLayout.bannerNotify}
                bg={globalLayout.bannerNotifyBg}
              /> */}
              <ContentWrapper>
                <BodyWrapper isMobile={isMobile}>
                  {childrenWithProps(children, { metric })}
                </BodyWrapper>
                <Footer metric={metric} />
              </ContentWrapper>
              {!!glowType && (
                <GrowBackground
                  glowType={glowType}
                  glowPosition={getGlowPosition(metric, glowFixed)}
                />
              )}
            </InnerWrapper>
            {/* {isMobile && <ModeLine metric={metric} />} */}
          </Wrapper>
        </ScrollWrapper>
        {/* </CustomScroller> */}
      </Skeleton>
    </ThemePalette>
  )
}

export default bond(GlobalLayoutContainer, 'globalLayout') as FC<TProps>
