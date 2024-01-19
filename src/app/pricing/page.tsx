'use client'
// import Landing from './Landing'

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
} from './styles'

export default function Page() {
  return (
    <Wrapper>
      <HomeHeader />
      <InnerWrapper>
        <Column $color={COLOR_NAME.BLACK} $opacity={0.4}>
          <TopTitle $color={COLOR_NAME.BLACK}>免费</TopTitle>
          <Desc>您的产品刚刚起步，需要公共空间和潜在用户交流探讨。</Desc>
          <Price>0</Price>
          <CancelNote>可随时升级或注销</CancelNote>
          <Board>
            {FREE_PAN_ITEMS.map((item) => (
              <Feature key={item.key} title={item.title} />
            ))}
          </Board>
          <ButtonWrapper>
            <UpgradeButton ghost>创建社区实例</UpgradeButton>
          </ButtonWrapper>
        </Column>
        <Column $color={COLOR_NAME.ORANGE}>
          <TopTitle $color={COLOR_NAME.BROWN}>交个朋友</TopTitle>
          <Desc>您的产品已有一定规模，希望解锁社区更多功能获得进一步增长。</Desc>
          <Price>999</Price>
          <CancelNote>可按月支付，随时可取消</CancelNote>
          <Board>
            {PAID_PAN_ITEMS.map((item) => (
              <Feature key={item.key} title={item.title} />
            ))}
          </Board>
          <ButtonWrapper>
            <UpgradeButton>开启 30 天试用</UpgradeButton>
          </ButtonWrapper>
        </Column>
        <Column $color={COLOR_NAME.PURPLE} $opacity={0.3}>
          <TopTitle $color={COLOR_NAME.PURPLE}>定制开发</TopTitle>
          <Desc>您的产品需要更加个性化的功能，我们可提供量身定做服务。</Desc>
          <Price>--</Price>
          <Board>
            {CUSTOM_PAN_ITEMS.map((item) => (
              <Feature key={item.key} title={item.title} />
            ))}
          </Board>
        </Column>
      </InnerWrapper>
    </Wrapper>
  )
}
