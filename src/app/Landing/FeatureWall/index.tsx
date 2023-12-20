import { FC } from 'react'

import BundleSizeCard from './BundleSizeCard'
import MobileFirst from './MobileFirst'
import RichContent from './RichContent'
import DarkMode from './DarkMode'
import Security from './Security'
import Design from './Design'
import Integration from './Integration'
import Statistics from './Statistics'

import {
  Wrapper,
  Slogan,
  Title,
  Desc,
  CardsWrapper,
  FooterCards,
  LeftCards,
  RightCards,
} from '../styles/feature_wall'

const FeatureWall: FC = () => {
  return (
    <Wrapper>
      <Slogan>
        <Title>自带电池、开箱即用</Title>
        <Desc>无需繁琐配置，即刻拥有功能完善的反馈社区，与用户双赢</Desc>
      </Slogan>
      <CardsWrapper>
        <LeftCards>
          <MobileFirst />
          <RichContent />
          <DarkMode />
          <Integration />
        </LeftCards>
        <RightCards>
          <BundleSizeCard />
        </RightCards>
      </CardsWrapper>
      <FooterCards>
        <Security />
        <Statistics />
        <Design />
      </FooterCards>
    </Wrapper>
  )
}

export default FeatureWall
