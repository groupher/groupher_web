import { FC } from 'react'

import useHover from '@/hooks/useHover'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/dark_mode'

const DarkMode: FC = () => {
  const [ref, isHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={ref}>
      <Panel hovering={isHovered} />
      <Footer>
        <Title>暗黑模式</Title>
        <Desc>支持手动或根据系统切换主题。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default DarkMode
