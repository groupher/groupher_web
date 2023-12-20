import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import useHover from '@/hooks/useHover'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/integration'

const Integration: FC = () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={cardRef} $color={COLOR_NAME.PINK}>
      <Panel hovering={isCardHovered} />
      <Footer>
        <Title>绑定集成</Title>
        <Desc>仅需一行代码，让你的网站拥有各种社区反馈组件。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default Integration