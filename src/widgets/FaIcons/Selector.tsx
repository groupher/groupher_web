/*
 *
 * FaIcons
 *
 */

import { FC, memo, useState } from 'react'
import { keys } from 'ramda'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { COLORS, COLOR_NAME } from '@/constant/colors'
import type { TSpace, TColorName } from '@/spec'
import { buildLog } from '@/utils/logger'

import { Row } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'

import type { TIcon } from './spec'
import FaIcon from './icons'
import Panel from './Panel'

import { Wrapper, InnerWrapper, IconWrapper, ArrowIcon } from './styles/selector'

/* eslint-disable-next-line */
const log = buildLog('c:FaIcons:index')

type TProps = {
  testid?: string
  size?: number
  icon?: TIcon
  color?: TColorName
} & TSpace

const FaIcons: FC<TProps> = ({
  testid = 'fa-icons',
  size = 16,
  icon = 'user',
  color = 'ORANGE',
  ...restProps
}) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectColor, setSelectColor] = useState<TColorName>(COLOR_NAME.BLACK)

  const iconNames = keys(FaIcon)
  const [selectIcon, setSelectIcon] = useState<TIcon>(iconNames[0])

  return (
    <Wrapper testid={testid} {...restProps}>
      <InnerWrapper>
        <Tooltip
          content={
            <Panel
              panelOpen={panelOpen}
              selectIcon={selectIcon}
              selectColor={selectColor}
              onColorSelect={setSelectColor}
              onIconSelect={setSelectIcon}
            />
          }
          placement="bottom-start"
          hideOnClick={false}
          trigger="click"
          offset={[-5, 5]}
          onShow={() => setPanelOpen(true)}
          onHide={() => setPanelOpen(false)}
          noPadding
        >
          <Row>
            <IconWrapper color={selectColor} $active={panelOpen}>
              <FontAwesomeIcon
                icon={FaIcon[selectIcon]}
                fontSize={size}
                color={COLORS[selectColor]}
              />
            </IconWrapper>

            <ArrowIcon $active={panelOpen} />
          </Row>
        </Tooltip>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(FaIcons)
