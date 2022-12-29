import { FC, useState } from 'react'

import Tooltip from '@/widgets/Tooltip'

import type { TImageSize } from '../spec'
import { IMAGE_SIZE } from '../constant'

import { Wrapper, Panel, Block, Item, Icon, Desc } from '../styles/toolbox/size_block'
import { sizeOnChange } from '../logic'

type TProps = {
  size: TImageSize
}

const SizeBlock: FC<TProps> = ({ size }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Item
              fontSize={15}
              $active={size === IMAGE_SIZE.LARGE}
              onClick={() => sizeOnChange(IMAGE_SIZE.LARGE)}
            >
              大
            </Item>
            <Item
              fontSize={13}
              $active={size === IMAGE_SIZE.MEDIUM}
              onClick={() => sizeOnChange(IMAGE_SIZE.MEDIUM)}
            >
              中
            </Item>
            <Item
              fontSize={10}
              $active={size === IMAGE_SIZE.SMALL}
              onClick={() => sizeOnChange(IMAGE_SIZE.SMALL)}
            >
              小
            </Item>
          </Panel>
        }
        placement="top"
        trigger="mouseenter focus"
        onShow={() => setPanelOpen(true)}
        onHide={() => setPanelOpen(false)}
        hideOnClick={false}
        offset={[-1, 5]}
        noPadding
      >
        <Block $active={panelOpen}>
          <Icon />
        </Block>
      </Tooltip>
      <Desc>大小</Desc>
    </Wrapper>
  )
}

export default SizeBlock
