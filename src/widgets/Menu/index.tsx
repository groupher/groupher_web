/*
 *
 * Menu
 *
 */

import { ReactNode, FC, memo } from 'react'

import type { TTooltipPlacement } from '@/spec'
import { buildLog } from '@/logger'
import Tooltip from '@/widgets/Tooltip'
import MENU from '@/constant/menu'

import type { TMenuItem } from './spec'
import List from './List'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:Menu:index')

type TProps = {
  activeKey?: string
  items?: TMenuItem[]
  onSelect?: (item: TMenuItem) => void
  children?: ReactNode
  offset?: [number, number]
  placement?: TTooltipPlacement
  onShow?: () => void
  onHide?: () => void
  popWidth?: number
  withDesc?: boolean
}

const Menu: FC<TProps> = ({
  activeKey = '',
  onSelect = log,
  items = [],
  children = 'menu',
  onShow = log,
  onHide = log,
  placement = 'bottom',
  offset = [-5, 5],
  popWidth = 120,
  withDesc = false,
}) => {
  return (
    <Tooltip
      placement={placement}
      trigger="click"
      onShow={() => onShow && onShow()}
      onHide={() => onHide && onHide()}
      offset={offset as [number, number]}
      noPadding
      content={
        <List
          items={items}
          activeKey={activeKey}
          onSelect={onSelect}
          popWidth={popWidth}
          withDesc={withDesc}
        />
      }
    >
      <Wrapper>{children}</Wrapper>
    </Tooltip>
  )
}

export default memo(Menu)
