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
  testid?: string
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

// todo constant for MENU_ICON
const DEMO_ITEMS = [
  {
    key: 'all',
    title: '全部',
    icon: MENU.ALL,
  },
  {
    key: 'todo',
    title: '计划中',
    icon: MENU.TODO,
  },
  {
    key: 'wip',
    title: '进行中',
    icon: MENU.WIP,
  },
  {
    key: 'done',
    title: '已完成',
    icon: MENU.DONE,
  },
]

const Menu: FC<TProps> = ({
  testid = 'menu',
  activeKey = '',
  onSelect = log,
  items = DEMO_ITEMS,
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
