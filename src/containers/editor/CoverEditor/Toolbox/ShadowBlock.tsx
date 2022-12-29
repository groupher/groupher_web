import { FC, useState } from 'react'
import { values } from 'ramda'

import Tooltip from '@/widgets/Tooltip'

import type { TSettingLevel } from '../spec'
import { IMAGE_SHADOW, SETTING_LEVEL } from '../constant'

import {
  Wrapper,
  Block,
  Icon,
  Desc,
  Panel,
  ShadowBox,
  SelectBox,
  ForbidIcon,
} from '../styles/toolbox/shadow_block'
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
            {values(SETTING_LEVEL).map((level) => {
              if (level === 'L1') {
                return (
                  <SelectBox
                    key={level}
                    $active={shadowLevel === SETTING_LEVEL[level]}
                    onClick={() => shadowOnChange(SETTING_LEVEL[level])}
                  >
                    <ForbidIcon $active={shadowLevel === SETTING_LEVEL[level]} />
                  </SelectBox>
                )
              }

              return (
                <ShadowBox
                  key={level}
                  boxShadow={IMAGE_SHADOW[level]}
                  $active={shadowLevel === SETTING_LEVEL[level]}
                  onClick={() => shadowOnChange(SETTING_LEVEL[level])}
                />
              )
            })}
          </Panel>
        }
        placement="top"
        trigger="mouseenter focus"
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
