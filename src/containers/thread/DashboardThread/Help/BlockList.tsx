import { FC, memo } from 'react'

import { COLOR_NAME } from '@/constant'

import Block from './Block'
import { Wrapper, CatsWrapper } from '../styles/help/block_list'

type TProps = {
  testid?: string
}

const BlockList: FC<TProps> = ({ testid = 'FaqLayout' }) => {
  return (
    <Wrapper>
      <CatsWrapper>
        <Block color={COLOR_NAME.ORANGE} title="Get Started" desc="Get Started" column={3} />
        <Block color={COLOR_NAME.RED} title="CI/CD and DevOps" desc="CI/CD and DevOps" column={3} />
        <Block
          color={COLOR_NAME.BLUE}
          title="Collaborative Coding"
          desc="Collaborative Coding"
          column={3}
        />
        <Block color={COLOR_NAME.GREEN} title="Developers" desc="Collaborative Coding" column={3} />
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(BlockList)
