/* *
 * LandingPage
 *
 */

import { FC, useEffect, useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import { BANNER_LAYOUT, HELP_FAQ_LAYOUT } from '@/constant/layout'

import Link from 'next/link'

import { ROUTE } from '@/constant/route'

import Tooltip from '@/widgets/Tooltip'
import Button from '@/widgets/Buttons/Button'
import FaqList from '@/widgets/FaqList'

import Header from './Header'
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
        <BgGlow wallpaper={wallpaper} />
        <PatternBg />
        <Banner>
          <Header />
          <BetaText wallpaper={wallpaper}>内测中</BetaText>
          <Title>让你的产品聆听用户的声音</Title>
          <Desc>
            讨论区，GTD 看板，更新日志，帮助文档多合一，收集沉淀用户反馈，助你打造更好的产品
          </Desc>
          <ButtonGroup>
            <Link href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>
              <Button size="medium">开始使用</Button>
            </Link>

            <Tooltip
              content={
                <DemoPanel>
                  <DemoMenuItem href={`/${ROUTE.HOME}`}>
                    官方社区
                    <LinkIcon />
                  </DemoMenuItem>
                  <DemoMenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>
                    管理后台
                    <LinkIcon />{' '}
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
        <Divider top={100} bottom={100} />

        <FeatureWall />
        <Divider top={60} bottom={100} />
        <EnjoyDev />
        <Divider top={80} bottom={80} />
        <TechStacks />
        <Divider top={80} bottom={80} />
        <UsersWall />
        <Divider top={60} bottom={80} />

        <FAQWrapper>
          <FaqList layout={HELP_FAQ_LAYOUT.FLAT} large />
        </FAQWrapper>
      </Wrapper>
    </ParallaxProvider>
  )
}

export default bond(LandingPageContainer, 'landingPage') as FC<TProps>
