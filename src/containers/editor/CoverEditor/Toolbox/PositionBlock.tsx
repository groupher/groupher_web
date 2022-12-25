import { FC } from 'react'
import { Wrapper, Block, Pice, Desc } from '../styles/toolbox/position_block'

import type { TImagePos } from '../spec'
import { IMAGE_POS } from '../constant'
import { imagePosOnChange } from '../logic'

type TProps = {
  pos: TImagePos
}

const PositionBlock: FC<TProps> = ({ pos }) => {
  return (
    <Wrapper>
      <Block>
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.TOP_LEFT)}
          $active={pos === IMAGE_POS.TOP_LEFT}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.TOP_CENTER)}
          $active={pos === IMAGE_POS.TOP_CENTER}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.TOP_RIGHT)}
          $active={pos === IMAGE_POS.TOP_RIGHT}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.CENTER_LEFT)}
          $active={pos === IMAGE_POS.CENTER_LEFT}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.CENTER)}
          $active={pos === IMAGE_POS.CENTER}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.CENTER_RIGHT)}
          $active={pos === IMAGE_POS.CENTER_RIGHT}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.BOTTOM_LEFT)}
          $active={pos === IMAGE_POS.BOTTOM_LEFT}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.BOTTOM_CENTER)}
          $active={pos === IMAGE_POS.BOTTOM_CENTER}
        />
        <Pice
          onClick={() => imagePosOnChange(IMAGE_POS.BOTTOM_RIGHT)}
          $active={pos === IMAGE_POS.BOTTOM_RIGHT}
        />
      </Block>
      <Desc>位置</Desc>
    </Wrapper>
  )
}

export default PositionBlock
