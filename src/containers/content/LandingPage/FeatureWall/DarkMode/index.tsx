import { FC } from 'react'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/dark_mode'

const DarkMode: FC = () => {
  return (
    <Wrapper>
      <Panel />
      <Footer>
        <Title>暗黑模式</Title>
        <Desc>Groupher 所有代码均开源，私有部署无限制。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default DarkMode
