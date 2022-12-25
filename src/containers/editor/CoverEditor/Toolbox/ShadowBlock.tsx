import { FC, useState } from 'react'
import Tooltip from '@/widgets/Tooltip'

import type { TSettingLevel } from '../spec'
import { IMAGE_SHADOW, SETTING_LEVEL } from '../constant'
import { Wrapper, Block, Icon, Desc, Panel, ShadowBox } from '../styles/toolbox/shadow_block'
import { shadowOnChange } from '../logic'

type TProps = {
  shadowLevel: TSettingLevel
}

const ShadowBlock: FC<TProps> = ({ shadowLevel }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <ShadowBox
              boxShadow={IMAGE_SHADOW.L1}
              $active={shadowLevel === SETTING_LEVEL.L1}
              onClick={() => shadowOnChange(SETTING_LEVEL.L1)}
            />
            <ShadowBox
              boxShadow={IMAGE_SHADOW.L2}
              $active={shadowLevel === SETTING_LEVEL.L2}
              onClick={() => shadowOnChange(SETTING_LEVEL.L2)}
            />
            <ShadowBox
              boxShadow={IMAGE_SHADOW.L3}
              $active={shadowLevel === SETTING_LEVEL.L3}
              onClick={() => shadowOnChange(SETTING_LEVEL.L3)}
            />
            <ShadowBox
              boxShadow={IMAGE_SHADOW.L4}
              $active={shadowLevel === SETTING_LEVEL.L4}
              onClick={() => shadowOnChange(SETTING_LEVEL.L4)}
            />
            <ShadowBox
              boxShadow={IMAGE_SHADOW.L5}
              $active={shadowLevel === SETTING_LEVEL.L5}
              onClick={() => shadowOnChange(SETTING_LEVEL.L5)}
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

      <Desc $active={panelOpen}>阴影</Desc>
    </Wrapper>
  )
}

export default ShadowBlock
