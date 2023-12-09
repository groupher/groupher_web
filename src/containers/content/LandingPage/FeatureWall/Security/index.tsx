import { FC } from 'react'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/security'

const Security: FC = () => {
  return (
    <Wrapper>
      <Panel />
      <Footer>
        <Title>掌控数据</Title>
        <Desc>在安全的前提下，管理社区内容以及无缝部署迁移，来去自由。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default Security
