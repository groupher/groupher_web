/* *
 * LandingPage
 *
 */

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import { ParallaxProvider } from 'react-scroll-parallax'

import { DOC_FAQ_LAYOUT } from '@/constant/layout'
import useWallpaper from '@/hooks/useWallpaper'

import { ROUTE } from '@/constant/route'

import { DesktopOnly, MobileOnly } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import FaqList from '@/widgets/FaqList'
import HomeHeader from '@/widgets/HomeHeader'

import CoverImage from './CoverImage'
// import WallpaperBar from './WallpaperBar'

import ArticlesIntroTabs from './ArticlesIntroTabs'
import FeatureWall from './FeatureWall'
import TechStacks from './TechStacks'
import DashboardIntros from './DashboardIntros'
import EnjoyDev from './EnjoyDev'
import UsersWall from './UsersWall'

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
  ArrowLeftIcon,
  ArrowDownIcon,
  Divider,
  FAQWrapper,
} from './styles'

const LandingPage: FC = () => {
  const router = useRouter()
  const { wallpaper } = useWallpaper()

  return (
    <ParallaxProvider>
      <Wrapper $testid="landing-page">
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
                router.push(`/${ROUTE.HOME}/${ROUTE.HELP}`)
              }}
            >
              开始使用 <ArrowLeftIcon />
            </StartButton>

            <Tooltip
              content={
                <DemoPanel>
                  <DemoMenuItem href={`/${ROUTE.HOME}`}>
                    官方社区
                    <LinkIcon />
                  </DemoMenuItem>
                  <DemoMenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.OVERVIEW}`}>
                    管理后台
                    <LinkIcon />
                  </DemoMenuItem>
                </DemoPanel>
              }
              placement="bottom"
              delay={200}
              offset={[1, 5]}
            >
              <DemoButton size="medium" ghost>
                在线体验 <ArrowDownIcon />
              </DemoButton>
            </Tooltip>
          </ButtonGroup>
        </Banner>
        <CoverImage />

        <ArticlesIntroTabs />

        <FeatureWall />
        {/* <FeatureWall /> */}
        <DashboardIntros />
        <EnjoyDev />
        <TechStacks />
        <DesktopOnly>
          <Divider top={80} bottom={80} />
        </DesktopOnly>
        <MobileOnly>
          <Divider top={50} bottom={50} />
        </MobileOnly>
        <UsersWall wallpaper={wallpaper} />
        <DesktopOnly>
          <Divider top={60} bottom={60} />
        </DesktopOnly>
        <MobileOnly>
          <Divider top={50} bottom={50} />
        </MobileOnly>
        <FAQWrapper>
          <FaqList layout={DOC_FAQ_LAYOUT.FLAT} large />
        </FAQWrapper>
      </Wrapper>
    </ParallaxProvider>
  )
}

export default observer(LandingPage)
