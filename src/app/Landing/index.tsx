/* *
 * LandingPage
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { DOC_FAQ_LAYOUT } from '@/constant/layout'
import useWallpaper from '@/hooks/useWallpaper'
import useMetric from '@/hooks/useMetric'

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
import Footer from './Footer'

import {
  Wrapper,
  InnerWrapper,
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
  StartLink,
  StartButton,
  DemoButton,
  ArrowLeftIcon,
  ArrowDownIcon,
  Divider,
  FAQWrapper,
} from './styles'

const faqs = [
  {
    title: 'Groupher 是免费的吗',
    body: '是的，在一定额度内免费使用，部分高级功能需要收费。',
    index: 0,
  },
  {
    title: '可以只使用某些模块吗',
    body: '是的，你可以根据需要单独使用讨论区、看板、更新日志等。',
    index: 1,
  },
  {
    title: '可以私有部署吗',
    body: '是的，本项目完全开源，你可以用于私有部署，但需要遵守特定协议。',
    index: 2,
  },
  {
    title: '支持手机端使用吗',
    body: '是的，本项目对于手机屏幕做了适配。但目前没有原生的 App',
    index: 3,
  },
  {
    title: '支持内容审核吗',
    body: '是的，你可以在后台打开先审后发，同时平台 AI 自动会过滤违法信息。',
    index: 4,
  },
  {
    title: '支持海外访问吗',
    body: '是的，但是目前服务器在国内，国际化相关工作还在开发中，敬请期待。',
    index: 5,
  },
]

const LandingPage: FC = () => {
  const { wallpaper } = useWallpaper()
  const metric = useMetric()

  return (
    <Wrapper $testid="landing-page" metric={metric}>
      <PatternBg />
      <InnerWrapper metric={metric}>
        <DesktopOnly>
          <BgGlow wallpaper={wallpaper} />
        </DesktopOnly>
        <Banner>
          <HomeHeader />
          <BetaText wallpaper={wallpaper}>内测中</BetaText>
          <Title>让你的产品听见用户的声音</Title>
          <Desc>讨论区、看板、更新日志、帮助文档多合一，收集沉淀用户反馈，助你打造更好的产品</Desc>
          <ButtonGroup>
            <StartLink href={ROUTE.APPLY_COMMUNITY}>
              <StartButton wallpaper={wallpaper} size="medium">
                开始使用 <ArrowLeftIcon />
              </StartButton>
            </StartLink>

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
          <Divider top={60} bottom={80} />
        </DesktopOnly>
        <FAQWrapper>
          <FaqList layout={DOC_FAQ_LAYOUT.FLAT} large sections={faqs} />
        </FAQWrapper>
        <Divider top={60} bottom={80} />

        <Footer />
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(LandingPage)
