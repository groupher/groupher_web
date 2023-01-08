import { FC } from 'react'

import { Wrapper, Title, Desc } from '../styles/feature_wall/intro_digest'

const FeatureWall: FC = () => {
  return (
    <Wrapper>
      <Title>更新日志</Title>
      <Desc>产品更新历史，方便查找</Desc>
    </Wrapper>
  )
}

export default FeatureWall
