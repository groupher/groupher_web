import { FC, memo } from 'react'

import { Wrapper, Title } from '../styles/bottom_bar/main_block_info'

const MainBlockInfo: FC = () => {
  return (
    <Wrapper>
      <Title href="/">首页</Title>
    </Wrapper>
  )
}

export default memo(MainBlockInfo)
