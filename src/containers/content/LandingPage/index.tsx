/* *
 * LandingPage
 *
 */

import { FC, useEffect, useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import Router from 'next/router'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import { BANNER_LAYOUT, HELP_FAQ_LAYOUT } from '@/constant/layout'

import Link from 'next/link'

import { ROUTE } from '@/constant/route'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import FaqList from '@/widgets/FaqList'
import HomeHeader from '@/widgets/HomeHeader'

import CoverImage from './CoverImage'
import WallpaperBar from './WallpaperBar'

import FeatureWall from './FeatureWall'
import TechStacks from './TechStacks'
import EnjoyDev from './EnjoyDev'
import UsersWall from './UsersWall'

import type { TStore } from './store'

import {
  Wrapper,
  BgGlow,
  PatternBg,
  Banner,
  BetaText,
  Title,
  Desc,
  ButtonGroup,
  DemoPanel,
  DemoMenuItem,
  LinkIcon,
  StartButton,
  DemoButton,
  ArrowIcon,
  Divider,
  FAQWrapper,
} from './styles'

import { useInit, changeGlowEffect } from './logic'

type TProps = {
  landingPage?: TStore
}

const LandingPageContainer: FC<TProps> = ({ landingPage: store }) => {
  useInit(store)

  const { wallpaperInfo, gradientWallpapers } = store
  const { wallpaper } = wallpaperInfo

  const [bannerLayout, setBannerLayout] = useState(BANNER_LAYOUT.HEADER)

  useEffect(() => {
    changeGlowEffect(wallpaper)
  }, [wallpaper])

  return (
    <ParallaxProvider>
      <Wrapper testid="landing-page">
        <PatternBg />
        <DesktopOnly>
          <BgGlow wallpaper={wallpaper} />
        </DesktopOnly>
        <Banner>
          <HomeHeader />
          <BetaText wallpaper={wallpaper}>内测中</BetaText>
          <Title>让你的产品聆听用户的声音</Title>
          <Desc>
            讨论区，GTD 看板，更新日志，帮助文档多合一，收集沉淀用户反馈，助你打造更好的产品
          </Desc>
          <ButtonGroup>
            <StartButton
              size="medium"
              onClick={() => {
                Router.push(`/${ROUTE.HOME}/${ROUTE.HELP}`)
              }}
            >
              开始使用
            </StartButton>

            <Tooltip
              content={
                <DemoPanel>
                  <DemoMenuItem href={`/${ROUTE.HOME}`}>
                    官方社区
                    <LinkIcon />
                  </DemoMenuItem>
                  <DemoMenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>
                    管理后台
                    <LinkIcon />
                  </DemoMenuItem>
                </DemoPanel>
              }
              placement="bottom"
              offset={[1, 5]}
            >
              <DemoButton size="medium" ghost>
                在线体验 <ArrowIcon />
              </DemoButton>
            </Tooltip>
          </ButtonGroup>
        </Banner>
        <CoverImage wallpaperInfo={wallpaperInfo} bannerLayout={bannerLayout} />
        <WallpaperBar
          wallpaper={wallpaper}
          gradientWallpapers={gradientWallpapers}
          bannerLayout={bannerLayout}
          onLayoutChange={(layout) => setBannerLayout(layout)}
        />

        <DesktopOnly>
          <Divider top={100} bottom={100} />
        </DesktopOnly>
        <MobileOnly>
          <Divider top={50} bottom={50} />
        </MobileOnly>

        <FeatureWall />
        <DesktopOnly>
          <Divider top={100} bottom={100} />
        </DesktopOnly>
        <MobileOnly>
          <Divider top={50} bottom={50} />
        </MobileOnly>
        <EnjoyDev />
        <DesktopOnly>
          <Divider top={80} bottom={80} />
        </DesktopOnly>
        <MobileOnly>
          <Divider top={-120} bottom={0} />
        </MobileOnly>
        <TechStacks />
        <DesktopOnly>
          <Divider top={80} bottom={80} />
        </DesktopOnly>
        <MobileOnly>
          <Divider top={50} bottom={50} />
        </MobileOnly>
        <UsersWall />
        <DesktopOnly>
          <Divider top={60} bottom={60} />
        </DesktopOnly>
        <MobileOnly>
          <Divider top={50} bottom={50} />
        </MobileOnly>
        <FAQWrapper>
          <FaqList layout={HELP_FAQ_LAYOUT.FLAT} large />
        </FAQWrapper>
      </Wrapper>
    </ParallaxProvider>
  )
}

export default bond(LandingPageContainer, 'landingPage') as FC<TProps>
