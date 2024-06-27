import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'
import useHover from '~/hooks/useHover'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/design'

const Design: FC = () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={cardRef} $color={COLOR_NAME.BLACK}>
      <Panel hovering={isCardHovered} />
      <Footer>
        <Title>默认好看</Title>
        <Desc>走心设计团队，丰富自定义细节，为您的产品生态添砖加瓦。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default Design
