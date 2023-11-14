import { FC, memo, useState, useRef } from 'react'

import type { TSpace, TTooltipPlacement } from '@/spec'
import { ARTICLE_STATE } from '@/constant/gtd'

import DropdownButton from '@/widgets/Buttons/DropdownButton'
import Menu from '@/widgets/Menu'

import { POST_STATE_MENU_ITEMS } from '@/constant/menu'
// import { MENU_ITEMS } from './constant'
import ActiveLabel from './ActiveLabel'
import type { TActiveCondition, TMenuItem } from './spec'
import { FilterWrapper } from './styles'

type TProps = {
  mode?: 'state' | 'category' | 'article' | 'tag'
  active?: TActiveCondition
  placement?: TTooltipPlacement
  selected?: boolean
  menuItems?: TMenuItem[]
  title?: string

  onSelect?: (condition: TActiveCondition) => void
} & TSpace

const ConditionSelector: FC<TProps> = ({
  active = ARTICLE_STATE.ALL,
  onSelect = console.log,
  selected = false,
  placement = 'bottom',
  menuItems = POST_STATE_MENU_ITEMS,
  title = '状态',

  ...restProps
}) => {
  const [offset, setOffset] = useState([30, 5])
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)

  const Wrapper = FilterWrapper
  const popWidth = 120

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
            <ActiveLabel title={title} condition={active} />
          </Menu>
        </DropdownButton>
      )}
    </Wrapper>
  )
}

export default memo(ConditionSelector)
