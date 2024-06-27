/*
 *
 * FaIcons
 *
 */

import { type FC, memo, useState } from 'react'
import { keys } from 'ramda'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { COLOR_NAME } from '~/const/colors'
import type { TSpace, TColorName } from '~/spec'

import { Row } from '~/widgets/Common'
import Tooltip from '~/widgets/Tooltip'

import type { TIcon } from './spec'
import FaIcon from './icons'
import Panel from './Panel'

import { Wrapper, InnerWrapper, IconWrapper, ArrowIcon } from './styles/selector'

type TProps = {
  testid?: string
  size?: number
} & TSpace

const FaIcons: FC<TProps> = ({ testid = 'fa-icons', size = 16, ...restProps }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectColor, setSelectColor] = useState<TColorName>(COLOR_NAME.BLACK)

  const iconNames = keys(FaIcon)
  const [selectIcon, setSelectIcon] = useState<TIcon>(iconNames[0])

  return (
    <Wrapper $testid={testid} {...restProps}>
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
              <FontAwesomeIcon icon={FaIcon[selectIcon]} fontSize={size} color={selectColor} />
            </IconWrapper>

            <ArrowIcon $active={panelOpen} />
          </Row>
        </Tooltip>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(FaIcons)
