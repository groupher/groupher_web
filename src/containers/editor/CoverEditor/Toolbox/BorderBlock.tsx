import { type FC, useState } from 'react'
import { keys } from 'ramda'

import Tooltip from '~/widgets/Tooltip'
import Radio from '~/widgets/Switcher/Radio'

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
  SelectBox,
  ForbidIcon,
  Divider,
  Row,
  RowTitle,
  RadiusContentsRow,
} from '../styles/toolbox/border_block'
import { borderRadiusOnChange, linearBorderPosOnChange, glassBorderOnChange } from '../logic'

type TProps = {
  borderRadiusLevel: TSettingLevel
  linearBorderPos: TLinearBorderPos
  shadowLevel: TSettingLevel
  hasGlassBorder: boolean
}

const ArchBlock: FC<TProps> = ({
  borderRadiusLevel,
  linearBorderPos,
  shadowLevel,
  hasGlassBorder,
}) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Row>
              <RowTitle>圆角</RowTitle>
              <RadiusContentsRow>
                {keys(IMAGE_BORDER_RADIUS).map((level) => {
                  if (level === 'L1') {
                    return (
                      <SelectBox
                        key={level}
                        $active={borderRadiusLevel === SETTING_LEVEL[level]}
                        onClick={() => borderRadiusOnChange(SETTING_LEVEL[level])}
                      >
                        <ForbidIcon $active={borderRadiusLevel === SETTING_LEVEL[level]} />
                      </SelectBox>
                    )
                  }

                  if (level === 'L3') return null

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
              </RadiusContentsRow>
            </Row>
            <Divider />
            <BorderRow>
              <RowTitle>边框</RowTitle>
              <BorderContentsRow>
                {keys(LINEAR_BORDER).map((pos) => {
                  if (pos === LINEAR_BORDER.NONE.toUpperCase()) {
                    return (
                      <SelectBox
                        key={pos}
                        $active={linearBorderPos === LINEAR_BORDER.NONE}
                        onClick={() => linearBorderPosOnChange(LINEAR_BORDER.NONE)}
                      >
                        <ForbidIcon $active={linearBorderPos === LINEAR_BORDER.NONE} />
                      </SelectBox>
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
            <Divider />
            <BorderRow>
              <RowTitle>外框</RowTitle>

              <Radio
                size="small"
                left={-7}
                items={[
                  {
                    value: '有',
                    key: true,
                  },
                  {
                    value: '无',
                    key: false,
                    dimOnActive: true,
                  },
                ]}
                activeKey={hasGlassBorder}
                onChange={(item) => glassBorderOnChange(item.key as boolean)}
              />
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
