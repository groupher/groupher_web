import { FC } from 'react'

import BundleSizeCard from './BundleSizeCard'

import { Wrapper, Slogan, Title, Desc, CardsWrapper } from '../styles/feature_wall'

const FeatureWall: FC = () => {
  return (
    <Wrapper>
      <Slogan>
        <Title>自带电池、开箱即用</Title>
        <Desc>无需繁琐配置，即刻拥有功能完善的反馈社区，与用户双赢</Desc>
      </Slogan>
      <CardsWrapper>
        <BundleSizeCard />
      </CardsWrapper>
    </Wrapper>
  )
}

export default FeatureWall
