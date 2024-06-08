import { type FC, useState } from 'react'

import Tooltip from '@/widgets/Tooltip'

import RangeSlider from '@/widgets/RangeSlider'

import { Wrapper, Block, Panel, Reset, Icon, Desc } from '../styles/toolbox/rotate_block'
import { rotateOnChange } from '../logic'

type TProps = {
  rotate: number
}

const RotateBlock: FC<TProps> = ({ rotate }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            {rotate !== 0 && <Reset onClick={() => rotateOnChange(0)}>回正</Reset>}
            <RangeSlider value={rotate} onChange={(v) => rotateOnChange(v)} />
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

      <Desc>旋转</Desc>
    </Wrapper>
  )
}

export default RotateBlock
