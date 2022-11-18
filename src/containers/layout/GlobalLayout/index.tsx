/*
 *
 * GlobalLayout
 *
 */

import { FC, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TSEO, TMetric } from '@/spec'
import { SIZE, BODY_SCROLLER } from '@/constant'
import { bond } from '@/utils/mobx'

import ThemePalette from '@/containers/layout/ThemePalette'
import BannerNotify from '@/widgets/BannerNotify'
import Footer from '@/widgets/Footer'
// import CustomScroller from '@/widgets/CustomScroller'

import type { TStore } from './store'
import SEO from './SEO'
import Wallpaper from './Wallpaper'

import { CustomScroller } from './dynamic'

import {
  Skeleton,
  Wrapper,
  InnerWrapper,
  BodyWrapper,
  ContentWrapper,
} from './styles'
import { useInit, onPageScrollDirhange, childrenWithProps } from './logic'

const Addon = dynamic(() => import('./Addon'), {
  ssr: false,
})

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

  const { sidebarPin, wallpaper, wallpapers, globalLayout } = store

  return (
    <ThemePalette>
      <Addon />
      <Skeleton>
        <Wallpaper wallpaper={wallpaper} wallpapers={wallpapers} />
        <CustomScroller
          instanceKey={BODY_SCROLLER}
          direction="vertical"
          height="100vh"
          barSize={SIZE.MEDIUM}
          showShadow={false}
          onScrollDirectionChange={onPageScrollDirhange}
          autoHide
        >
          <Wrapper>
            <SEO metric={metric} config={seoConfig} />
            <InnerWrapper metric={metric} sidebarPin={sidebarPin}>
              <BannerNotify
                metric={metric}
                layout={globalLayout.bannerNotify}
                bg={globalLayout.bannerNotifyBg}
              />
              <ContentWrapper offsetLeft={sidebarPin}>
                <BodyWrapper isMobile={isMobile}>
                  {childrenWithProps(children, { metric })}
                </BodyWrapper>
                <Footer metric={metric} />
              </ContentWrapper>
            </InnerWrapper>
            {/* {isMobile && <ModeLine metric={metric} />} */}
          </Wrapper>
        </CustomScroller>
      </Skeleton>
    </ThemePalette>
  )
}

export default bond(GlobalLayoutContainer, 'globalLayout') as FC<TProps>
