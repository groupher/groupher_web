import type { FC } from 'react'

import useHover from '@/hooks/useHover'
import { COLOR_NAME } from '@/const/colors'

import Panel from './Panel'
import { Wrapper, Header, Title, Desc } from '../../styles/feature_wall/mobile_first'

const MobileFirst: FC = () => {
  const [ref, isHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper $color={COLOR_NAME.ORANGE} ref={ref}>
      <Header>
        <Title>移动端友好</Title>
        <Desc>所有内容自适应手机、平板等小屏幕尺寸，功能与桌面端一致。</Desc>
      </Header>
      <Panel hovering={isHovered} />
    </Wrapper>
  )
}

export default MobileFirst
