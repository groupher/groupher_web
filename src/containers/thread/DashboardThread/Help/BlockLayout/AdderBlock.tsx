import { FC, memo } from 'react'

import { Wrapper, AddIcon, Title } from '../../styles/help/block_layout/adder_block'
import { addHelpCategory } from '../../logic'

const AdderBlock: FC = () => {
  return (
    <Wrapper onClick={() => addHelpCategory()}>
      <AddIcon />
      <Title>添加新分类</Title>
    </Wrapper>
  )
}

export default memo(AdderBlock)
