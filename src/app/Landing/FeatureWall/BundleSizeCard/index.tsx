import type { FC } from 'react'

import useHover from '~/hooks/useHover'
import { COLOR_NAME } from '~/const/colors'

import Panel from './Panel'
import {
  Wrapper,
  Banner,
  Title,
  Desc,
  WarningMask,
} from '../../styles/feature_wall/bundle_size_card'

const BundleSizeCard: FC = () => {
  const [ref, isHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper $color={COLOR_NAME.PURPLE} ref={ref}>
      <Banner>
        <Title>精简 & 轻量</Title>
        <Desc>对比国内外同类服务，体积更小</Desc>
      </Banner>
      <Panel hovering={isHovered} />
      <WarningMask />
    </Wrapper>
  )
}

export default BundleSizeCard
