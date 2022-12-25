import { FC, useState } from 'react'
import Tooltip from '@/widgets/Tooltip'

import type { TSettingLevel } from '../spec'
import { IMAGE_BORDER_RADIUS, SETTING_LEVEL } from '../constant'
import { Wrapper, Block, Icon, Desc, Panel, ArchBox } from '../styles/toolbox/arch_block'
import { borderRadiusOnChange } from '../logic'

type TProps = {
  level: TSettingLevel
}

const ArchBlock: FC<TProps> = ({ level }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <ArchBox
              borderRadius={IMAGE_BORDER_RADIUS.L1}
              $active={level === SETTING_LEVEL.L1}
              onClick={() => borderRadiusOnChange(SETTING_LEVEL.L1)}
            />
            <ArchBox
              borderRadius={IMAGE_BORDER_RADIUS.L2}
              $active={level === SETTING_LEVEL.L2}
              onClick={() => borderRadiusOnChange(SETTING_LEVEL.L2)}
            />
            <ArchBox
              borderRadius={IMAGE_BORDER_RADIUS.L3}
              $active={level === SETTING_LEVEL.L3}
              onClick={() => borderRadiusOnChange(SETTING_LEVEL.L3)}
            />
            <ArchBox
              borderRadius={IMAGE_BORDER_RADIUS.L4}
              $active={level === SETTING_LEVEL.L4}
              onClick={() => borderRadiusOnChange(SETTING_LEVEL.L4)}
            />
            <ArchBox
              borderRadius={IMAGE_BORDER_RADIUS.L5}
              $active={level === SETTING_LEVEL.L5}
              onClick={() => borderRadiusOnChange(SETTING_LEVEL.L5)}
            />
          </Panel>
        }
        placement="top"
        trigger="click"
        onShow={() => setPanelOpen(true)}
        onHide={() => setPanelOpen(false)}
        hideOnClick={false}
        noPadding
      >
        <Block $active={panelOpen}>
          <Icon />
        </Block>
      </Tooltip>

      <Desc $active={panelOpen}>圆角</Desc>
    </Wrapper>
  )
}

export default ArchBlock
