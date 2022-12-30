import { FC, memo } from 'react'

import { Wrapper, AddIcon, Title } from '../styles/help/adder_block'

const AdderBlock: FC = () => {
  return (
    <Wrapper>
      <AddIcon />
      <Title>添加新分类</Title>
    </Wrapper>
  )
}

export default memo(AdderBlock)
