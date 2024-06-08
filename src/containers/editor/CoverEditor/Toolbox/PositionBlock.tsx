import type { FC } from 'react'
import { values } from 'ramda'

import type { TImagePos } from '../spec'
import { IMAGE_POS } from '../constant'

import { Wrapper, Block, Pice, Desc } from '../styles/toolbox/position_block'
import { posOnChange } from '../logic'

type TProps = {
  pos: TImagePos
}

const PositionBlock: FC<TProps> = ({ pos }) => {
  return (
    <Wrapper>
      <Block>
        {values(IMAGE_POS).map((_pos) => {
          if (_pos === IMAGE_POS.NONE) return null

          return <Pice key={_pos} onClick={() => posOnChange(_pos)} $active={pos === _pos} />
        })}
      </Block>
      <Desc>位置</Desc>
    </Wrapper>
  )
}

export default PositionBlock
