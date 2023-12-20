import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import useHover from '@/hooks/useHover'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/design'

const Design: FC = () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={cardRef} $color={COLOR_NAME.BLACK}>
      <Panel hovering={isCardHovered} />
      <Footer>
        <Title>默认好看</Title>
        <Desc>设计走心，并提供多样的自定义选项，助力您的品牌建设。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default Design
