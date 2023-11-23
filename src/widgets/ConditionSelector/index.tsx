import { FC, memo, useState, useRef } from 'react'

import type { TSpace, TTooltipPlacement, TConditionMode } from '@/spec'

import DropdownButton from '@/widgets/Buttons/DropdownButton'
import Menu from '@/widgets/Menu'
import { Space } from '@/widgets/Common'

import ActiveLabel from './ActiveLabel'

import type { TActiveCondition } from './spec'
import { getMenuItems, getTitle, getActiveMenuItem } from './helper'
import { Wrapper } from './styles'

type TProps = {
  mode: TConditionMode
  active?: TActiveCondition
  placement?: TTooltipPlacement
  selected?: boolean
  closable?: boolean

  onSelect?: (condition: TActiveCondition) => void
} & TSpace

const ConditionSelector: FC<TProps> = ({
  mode,
  active = null,
  onSelect = console.log,
  selected = false,
  placement = 'bottom',
  closable = true,

  ...restProps
}) => {
  const [offset, setOffset] = useState([30, 5])
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)

  const popWidth = 142

  const menuItems = getMenuItems(mode)
  const activeMenuItem = getActiveMenuItem(menuItems, active)

  const title = getTitle(mode)

  return (
    <Wrapper ref={ref} $selected={selected} $menuOpen={menuOpen} {...restProps}>
      {!selected ? (
        <Menu
          offset={offset as [number, number]}
          items={menuItems}
          onSelect={(item) => onSelect(item.key as TActiveCondition)}
          onShow={() => setMenuOpen(true)}
          onHide={() => {
            setOffset([30, 5])
            setMenuOpen(false)
          }}
          activeKey={active}
          placement={placement}
          popWidth={popWidth}
        >
          <DropdownButton $active={menuOpen} selected={selected}>
            {title}
            <Space right={3} />
          </DropdownButton>
        </Menu>
      ) : (
        <DropdownButton
          $active={menuOpen}
          selected={selected}
          closable={closable}
          onClear={() => {
            // simulate click to avoid menu pop again
            ref.current.click()
            onSelect(null)
          }}
        >
          <Menu
            offset={offset as [number, number]}
            items={menuItems}
            onSelect={(item) => onSelect(item.key as TActiveCondition)}
            onShow={() => {
              setOffset([8, 8])
              setMenuOpen(true)
            }}
            onHide={() => {
              setOffset([30, 5])
              setMenuOpen(false)
            }}
            activeKey={active}
            placement={placement}
            popWidth={popWidth}
          >
            <ActiveLabel activeItem={activeMenuItem} title={title} condition={active} />
          </Menu>
        </DropdownButton>
      )}
    </Wrapper>
  )
}

export default memo(ConditionSelector)
