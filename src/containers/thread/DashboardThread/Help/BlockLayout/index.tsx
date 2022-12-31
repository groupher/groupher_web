import { FC, memo } from 'react'

import { COLOR_NAME } from '@/constant'

import Block from './Block'
import AdderBlock from './AdderBlock'

import type { THelpSettings } from '../../spec'
import { Wrapper, CatsWrapper } from '../../styles/help/block_layout'

type TProps = {
  testid?: string
  settings: THelpSettings
}

const BlockList: FC<TProps> = ({ testid = 'FaqLayout', settings }) => {
  const { categories } = settings

  return (
    <Wrapper>
      <CatsWrapper>
        {categories.map((cat) => {
          return <Block key={cat.index} color={cat.color} title={cat.name} />
        })}
        <AdderBlock />
      </CatsWrapper>
    </Wrapper>
  )
}

export default memo(BlockList)
