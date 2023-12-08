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
        <Title>轻量化</Title>
        <Desc>相比同类应用，体积最小</Desc>
      </Banner>
      <Panel />
      <WarningMask />
    </Wrapper>
  )
}

export default BundleSizeCard
