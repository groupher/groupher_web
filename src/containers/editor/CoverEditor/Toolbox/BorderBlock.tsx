import { FC, useState } from 'react'
import { keys } from 'ramda'

import Tooltip from '@/widgets/Tooltip'

import type { TLinearBorderPos, TSettingLevel } from '../spec'
import { IMAGE_BORDER_RADIUS, SETTING_LEVEL, LINEAR_BORDER } from '../constant'
import {
  Wrapper,
  Block,
  Icon,
  Desc,
  Panel,
  RadiusBox,
  BorderContentsRow,
  BorderRow,
  BorderBox,
  ForbidIcon,
  Divider,
  Row,
  RowTitle,
} from '../styles/toolbox/border_block'
import { borderRadiusOnChange, linearBorderPosOnChange } from '../logic'

type TProps = {
  borderRadiusLevel: TSettingLevel
  linearBorderPos: TLinearBorderPos
  shadowLevel: TSettingLevel
}

const ArchBlock: FC<TProps> = ({ borderRadiusLevel, linearBorderPos, shadowLevel }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Row>
              <RowTitle>圆角</RowTitle>
              {keys(IMAGE_BORDER_RADIUS).map((level) => {
                return (
                  <RadiusBox
                    key={level}
                    borderRadius={IMAGE_BORDER_RADIUS[level]}
                    shadowLevel={shadowLevel}
                    $active={borderRadiusLevel === SETTING_LEVEL[level]}
                    onClick={() => borderRadiusOnChange(SETTING_LEVEL[level])}
                  />
                )
              })}
            </Row>

            <Divider />

            <BorderRow>
              <RowTitle>边框</RowTitle>
              <BorderContentsRow>
                {keys(LINEAR_BORDER).map((pos) => {
                  if (pos === LINEAR_BORDER.NONE.toUpperCase()) {
                    return (
                      <ForbidIcon
                        key={pos}
                        $active={linearBorderPos === LINEAR_BORDER.NONE}
                        onClick={() => linearBorderPosOnChange(LINEAR_BORDER.NONE)}
                      />
                    )
                  }
                  return (
                    <BorderBox
                      key={pos}
                      linearBorderPos={LINEAR_BORDER[pos]}
                      shadowLevel={shadowLevel}
                      $active={linearBorderPos === LINEAR_BORDER[pos]}
                      onClick={() => linearBorderPosOnChange(LINEAR_BORDER[pos])}
                    />
                  )
                })}
              </BorderContentsRow>
            </BorderRow>
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

      <Desc $active={panelOpen}>边角</Desc>
    </Wrapper>
  )
}

export default ArchBlock
