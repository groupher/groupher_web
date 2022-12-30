import { FC, memo } from 'react'

import { COLOR_NAME } from '@/constant'

import Block from './Block'
import AdderBlock from './AdderBlock'

import { Wrapper, CatsWrapper } from '../../styles/help/block_layout'

type TProps = {
  testid?: string
}

const BlockList: FC<TProps> = ({ testid = 'FaqLayout' }) => {
  return (
    <Wrapper>
      <CatsWrapper>
        <Block color={COLOR_NAME.ORANGE} title="分类 1" desc="边缘函数" column={3} />
        <AdderBlock />
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(BlockList)
