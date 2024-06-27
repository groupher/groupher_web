import { type FC, useState } from 'react'

import Tooltip from '~/widgets/Tooltip'

import type { TImageRadio } from '../spec'
import { IMAGE_RATIO } from '../constant'

import { Wrapper, Block, Panel, Item, Icon, Desc } from '../styles/toolbox/ratio_block'
import { ratioOnChange } from '../logic'

type TProps = {
  ratio: TImageRadio
}

const RatioBlock: FC<TProps> = ({ ratio }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Item
              $active={ratio === IMAGE_RATIO.SCREEN}
              onClick={() => ratioOnChange(IMAGE_RATIO.SCREEN)}
            >
              16:9
            </Item>

            <Item $active={ratio === IMAGE_RATIO.TV} onClick={() => ratioOnChange(IMAGE_RATIO.TV)}>
              4:3
            </Item>
            <Item
              $active={ratio === IMAGE_RATIO.SQUARE}
              onClick={() => ratioOnChange(IMAGE_RATIO.SQUARE)}
            >
              1:1
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

      <Desc>比例</Desc>
    </Wrapper>
  )
}

export default RatioBlock
