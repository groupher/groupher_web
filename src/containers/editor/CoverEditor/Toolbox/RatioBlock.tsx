import { FC, useState } from 'react'

import Tooltip from '@/widgets/Tooltip'

import { Wrapper, Block, Panel, Item, Icon, Desc } from '../styles/toolbox/ratio_block'

const RatioBlock = () => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Item $active>1:1</Item>
            <Item>4:3</Item>
            <Item>16:9</Item>
          </Panel>
        }
        placement="top"
        trigger="click"
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
