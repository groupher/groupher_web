import type { FC } from 'react'

import { COLOR_NAME } from '@/const/colors'
import useHover from '@/hooks/useHover'
import useTheme from '@/hooks/useTheme'

import Panel from './Panel'

import {
  Wrapper,
  InnerWrapper,
  StarIcon,
  StarIcon2,
  Footer,
  Title,
  Desc,
} from '../../styles/feature_wall/dark_mode'

const DarkMode: FC = () => {
  const { toggle } = useTheme()

  const [ref, isHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={ref} onClick={() => toggle()} $color={COLOR_NAME.CYAN}>
      <InnerWrapper $color={COLOR_NAME.CYAN} $hovering={isHovered} />
      {isHovered && <StarIcon />}
      {isHovered && <StarIcon2 />}

      <Panel hovering={isHovered} />
      <Footer>
        <Title>暗黑模式</Title>
        <Desc>支持手动或根据系统切换主题。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default DarkMode
