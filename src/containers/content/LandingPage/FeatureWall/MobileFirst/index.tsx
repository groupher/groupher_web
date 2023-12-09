import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'

import Panel from './Panel'
import { Wrapper, Header, Title, Desc } from '../../styles/feature_wall/mobile_first'

const MobileFirst: FC = () => {
  return (
    <Wrapper $color={COLOR_NAME.ORANGE}>
      <Header>
        <Title>移动端友好</Title>
        <Desc>Groupher 所有代码均开源，私有部署无限制。</Desc>
      </Header>
      <Panel />
    </Wrapper>
  )
}

export default MobileFirst
