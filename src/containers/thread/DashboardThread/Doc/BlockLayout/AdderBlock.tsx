import { FC, memo } from 'react'

import { Wrapper, AddIcon, Title } from '../../styles/doc/block_layout/adder_block'
import { addDocCategory } from '../../logic'

const AdderBlock: FC = () => {
  return (
    <Wrapper onClick={() => addDocCategory()}>
      <AddIcon />
      <Title>添加新分类</Title>
    </Wrapper>
  )
}

export default memo(AdderBlock)
