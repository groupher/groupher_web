import { FC, useState } from 'react'
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
  Divider,
  Row,
  RowTitle,
} from '../styles/toolbox/border_block'
import { borderRadiusOnChange, linearBorderPosOnChange } from '../logic'

type TProps = {
  level: TSettingLevel
  linearBorderPos: TLinearBorderPos
}

const ArchBlock: FC<TProps> = ({ level, linearBorderPos }) => {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            <Row>
              <RowTitle>圆角</RowTitle>
              <RadiusBox
                borderRadius={IMAGE_BORDER_RADIUS.L1}
                $active={level === SETTING_LEVEL.L1}
                onClick={() => borderRadiusOnChange(SETTING_LEVEL.L1)}
              />
              <RadiusBox
                borderRadius={IMAGE_BORDER_RADIUS.L2}
                $active={level === SETTING_LEVEL.L2}
                onClick={() => borderRadiusOnChange(SETTING_LEVEL.L2)}
              />
              <RadiusBox
                borderRadius={IMAGE_BORDER_RADIUS.L3}
                $active={level === SETTING_LEVEL.L3}
                onClick={() => borderRadiusOnChange(SETTING_LEVEL.L3)}
              />
              <RadiusBox
                borderRadius={IMAGE_BORDER_RADIUS.L4}
                $active={level === SETTING_LEVEL.L4}
                onClick={() => borderRadiusOnChange(SETTING_LEVEL.L4)}
              />
              <RadiusBox
                borderRadius={IMAGE_BORDER_RADIUS.L5}
                $active={level === SETTING_LEVEL.L5}
                onClick={() => borderRadiusOnChange(SETTING_LEVEL.L5)}
              />
            </Row>
            <Divider />

            <BorderRow>
              <RowTitle>边框</RowTitle>
              <BorderContentsRow>
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.TOP_LEFT}
                  $active={linearBorderPos === LINEAR_BORDER.TOP_LEFT}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.TOP_LEFT)}
                />
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.TOP_RIGHT}
                  $active={linearBorderPos === LINEAR_BORDER.TOP_RIGHT}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.TOP_RIGHT)}
                />
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.BOTTOM_LEFT}
                  $active={linearBorderPos === LINEAR_BORDER.BOTTOM_LEFT}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.BOTTOM_LEFT)}
                />
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.BOTTOM_RIGHT}
                  $active={linearBorderPos === LINEAR_BORDER.BOTTOM_RIGHT}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.BOTTOM_RIGHT)}
                />
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.TOP_ALL}
                  $active={linearBorderPos === LINEAR_BORDER.TOP_ALL}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.TOP_ALL)}
                />
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.BOTTOM_ALL}
                  $active={linearBorderPos === LINEAR_BORDER.BOTTOM_ALL}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.BOTTOM_ALL)}
                />
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.LEFT_ALL}
                  $active={linearBorderPos === LINEAR_BORDER.LEFT_ALL}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.LEFT_ALL)}
                />
                <BorderBox
                  linearBorderPos={LINEAR_BORDER.RIGHT_ALL}
                  $active={linearBorderPos === LINEAR_BORDER.RIGHT_ALL}
                  onClick={() => linearBorderPosOnChange(LINEAR_BORDER.RIGHT_ALL)}
                />
              </BorderContentsRow>
            </BorderRow>
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

      <Desc $active={panelOpen}>边角</Desc>
    </Wrapper>
  )
}

export default ArchBlock
