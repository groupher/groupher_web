import { FC } from 'react'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/mobile_first'

const OpenSource: FC = () => {
  return (
    <Wrapper>
      <Panel />
      <Footer>
        <Title>免费开源</Title>
        <Desc>Groupher 所有代码均开源，私有部署无限制。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default OpenSource
