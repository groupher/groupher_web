import { FC, memo } from 'react'

import Block from './Block'
import AdderBlock from './AdderBlock'

import type { TDocSettings } from '../../spec'
import { Wrapper, CatsWrapper } from '../../styles/doc/block_layout'

type TProps = {
  settings: TDocSettings
}

const BlockList: FC<TProps> = ({ settings }) => {
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
