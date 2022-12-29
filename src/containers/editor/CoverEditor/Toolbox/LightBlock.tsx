import { FC } from 'react'
import { values } from 'ramda'

import type { TImagePos } from '../spec'
import { IMAGE_POS } from '../constant'

import { Wrapper, Block, Pice, Desc } from '../styles/toolbox/light_block'
import { lightPosOnChange } from '../logic'

type TProps = {
  pos: TImagePos
}

const LightBlock: FC<TProps> = ({ pos }) => {
  return (
    <Wrapper>
      <Block>
        {values(IMAGE_POS).map((_pos) => {
          if (_pos === IMAGE_POS.NONE) return null

          return <Pice key={_pos} onClick={() => lightPosOnChange(_pos)} $active={pos === _pos} />
        })}
      </Block>
      <Desc>焦点</Desc>
    </Wrapper>
  )
}

export default LightBlock
