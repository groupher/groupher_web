import { FC, memo, useState, useRef } from 'react'

import type { TSpace, TTooltipPlacement, TConditionMode } from '@/spec'
import { ARTICLE_STATE } from '@/constant/gtd'

import DropdownButton from '@/widgets/Buttons/DropdownButton'
import Menu from '@/widgets/Menu'

import ActiveLabel from './ActiveLabel'

import type { TActiveCondition } from './spec'
import { getMenuItems, getTitle, getActiveMenuItem } from './helper'
import { FilterWrapper } from './styles'

type TProps = {
  mode: TConditionMode
  active?: TActiveCondition
  placement?: TTooltipPlacement
  selected?: boolean

  onSelect?: (condition: TActiveCondition) => void
} & TSpace

const ConditionSelector: FC<TProps> = ({
  mode,
  active = ARTICLE_STATE.ALL,
  onSelect = console.log,
  selected = false,
  placement = 'bottom',

  ...restProps
}) => {
  const [offset, setOffset] = useState([30, 5])
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)

  const Wrapper = FilterWrapper
  const popWidth = 120

  const menuItems = getMenuItems(mode)
  const activeMenuItem = getActiveMenuItem(menuItems, active)

  // console.log('## activeMenuItem: ', activeMenuItem)

  const title = getTitle(mode)

  return (
    <Wrapper $selected={selected} $menuOpen={menuOpen} {...restProps} ref={ref}>
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
          </DropdownButton>
        </Menu>
      ) : (
        <DropdownButton
          $active={menuOpen}
          selected={selected}
          closable
          onClear={() => {
            // simulate click to avoid menu pop again
            ref.current.click()
            onSelect(ARTICLE_STATE.ALL)
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
