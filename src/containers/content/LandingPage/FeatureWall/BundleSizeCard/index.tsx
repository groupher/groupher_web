import { FC } from 'react'

import Panel from './Panel'
import {
  Wrapper,
  Banner,
  Title,
  Desc,
  WarningMask,
} from '../../styles/feature_wall/bundle_size_card'

const BundleSizeCard: FC = () => {
  return (
    <Wrapper>
      <Banner>
        <Title>精简 & 轻量</Title>
        <Desc>对比国内外类似服务，体积更小</Desc>
      </Banner>
      <Panel />
      <WarningMask />
    </Wrapper>
  )
}

export default BundleSizeCard
