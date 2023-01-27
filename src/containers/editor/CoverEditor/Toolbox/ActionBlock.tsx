import { FC, useState } from 'react'

import Tooltip from '@/widgets/Tooltip'

import type { TImageRadio } from '../spec'
import { IMAGE_RATIO } from '../constant'

import {
  Wrapper,
  Block,
  Panel,
  DeleteItem,
  DeleteIcon,
  Item,
  Icon,
  Desc,
} from '../styles/toolbox/action_block'

type TProps = {
  onDelete: () => void
  onReplace: () => void
}

const ActionBlock: FC<TProps> = ({ onDelete, onReplace }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Item onClick={onReplace}>替换图片</Item>
            <DeleteItem onClick={onDelete}>
              <DeleteIcon />
              删除
            </DeleteItem>
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

      <Desc>操作</Desc>
    </Wrapper>
  )
}

export default ActionBlock
