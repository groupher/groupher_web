'use client'
// import Landing from './Landing'
import AnimatedCount from '@/widgets/AnimatedCount'

import useHover from '@/hooks/useHover'
import useThemeData from '@/hooks/useThemeData'
import { COLOR_NAME } from '@/constant/colors'
import HomeHeader from '@/widgets/HomeHeader'

import { FREE_PAN_ITEMS, PAID_PAN_ITEMS, CUSTOM_PAN_ITEMS } from './constant'
import Feature from './Feature'

import {
  Wrapper,
  InnerWrapper,
  Column,
  Board,
  TopTitle,
  Desc,
  Price,
  CancelNote,
  ButtonWrapper,
  UpgradeButton,
  CatPaw,
} from './styles'

export default function Page() {
  const [paidHoveredRef, paidHovered] = useHover<HTMLDivElement>()
  const themeData = useThemeData()

  return (
    <Wrapper>
      <HomeHeader />
      <InnerWrapper>
        <Column $color={COLOR_NAME.GREEN} $opacity={0.3}>
          <TopTitle $color={COLOR_NAME.GREEN}>免费</TopTitle>
          <Desc>您的产品刚刚起步，需要公共空间和潜在用户交流探讨。</Desc>
          <Price>0</Price>
          <CancelNote>可随时升级或注销</CancelNote>
          <Board>
            {FREE_PAN_ITEMS.map((item) => (
              <Feature key={item.key} title={item.title} color={COLOR_NAME.GREEN} />
            ))}
          </Board>
          <ButtonWrapper>
            <UpgradeButton ghost>创建社区实例</UpgradeButton>
          </ButtonWrapper>
        </Column>
        <Column ref={paidHoveredRef} $color={COLOR_NAME.ORANGE} $opacity={0.6}>
          <CatPaw src="landing/catpaw.png" top={paidHovered ? 158 : 75} />
          <TopTitle $color={COLOR_NAME.BROWN}>交个朋友</TopTitle>
          <Desc>您的产品已有一定规模，希望解锁社区更多功能获得进一步增长。</Desc>
          <Price>
            <AnimatedCount
              count={paidHovered ? 9 : 0}
              forceColor={themeData.article.title}
              left={5}
              size="huge"
            />
            .9 &nbsp;&nbsp;
          </Price>
          <CancelNote $hide={!paidHovered} $color={COLOR_NAME.BROWN}>
            内测折扣价，可随时退款
          </CancelNote>

          <Board>
            {PAID_PAN_ITEMS.map((item) => (
              <Feature key={item.key} title={item.title} color={COLOR_NAME.ORANGE} />
            ))}
          </Board>
          <ButtonWrapper>
            <UpgradeButton>开始 30 天试用</UpgradeButton>
          </ButtonWrapper>
        </Column>
        <Column $color={COLOR_NAME.BLUE} $opacity={0.4}>
          <TopTitle $color={COLOR_NAME.BLUE}>定制开发</TopTitle>
          <Desc>您的产品需要更加个性化的功能，我们可提供量身定做服务。</Desc>
          <Price>--</Price>
          <Board>
            {CUSTOM_PAN_ITEMS.map((item) => (
              <Feature key={item.key} title={item.title} color={COLOR_NAME.BLUE} />
            ))}
          </Board>
          <ButtonWrapper>
            <UpgradeButton ghost>联系我们</UpgradeButton>
          </ButtonWrapper>
        </Column>
      </InnerWrapper>
    </Wrapper>
  )
}
