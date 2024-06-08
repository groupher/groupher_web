import type { FC } from 'react'

import { COLOR_NAME } from '@/const/colors'
import useHover from '@/hooks/useHover'

import Panel from './Panel'

import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/integration'

const Integration: FC = () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={cardRef} $color={COLOR_NAME.PINK}>
      <Panel hovering={isCardHovered} />
      <Footer>
        <Title>一键集成</Title>
        <Desc>一行代码让你的网站通过 Sidebar/Modal/iframe 等方式接入反馈组件。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default Integration
