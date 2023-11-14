import { FC, memo, useState, useRef } from 'react'

import type { TArticleState, TSpace, TTooltipPlacement } from '@/spec'
import { ARTICLE_STATE } from '@/constant/gtd'

import DropdownButton from '@/widgets/Buttons/DropdownButton'
import Menu from '@/widgets/Menu'

import { POST_STATE_MENU_ITEMS } from '@/constant/menu'
// import { MENU_ITEMS } from './constant'
import ActiveLabel from './ActiveLabel'
import { FilterWrapper, FullWrapper } from './styles'

type TProps = {
  activeState?: TArticleState
  placement?: TTooltipPlacement
  onSelect?: (state: TArticleState) => void
  selected?: boolean
} & TSpace

const StateSelector: FC<TProps> = ({
  activeState = ARTICLE_STATE.ALL,
  onSelect = console.log,
  selected = false,
  placement = 'bottom',
  ...restProps
}) => {
  const [offset, setOffset] = useState([30, 5])
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef(null)

  const handleSelect = (state: TArticleState) => {
    onSelect(state)
  }

  const Wrapper = FilterWrapper
  const popWidth = 120

  return (
    <Wrapper $selected={selected} $menuOpen={menuOpen} {...restProps} ref={ref}>
      {!selected ? (
        <Menu
          offset={offset as [number, number]}
          items={POST_STATE_MENU_ITEMS}
          onSelect={(item) => handleSelect(item.key as TArticleState)}
          onShow={() => setMenuOpen(true)}
          onHide={() => {
            setOffset([30, 5])
            setMenuOpen(false)
          }}
          activeKey={activeState}
          placement={placement}
          popWidth={popWidth}
        >
          <DropdownButton $active={menuOpen} selected={selected}>
            状态
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
            items={POST_STATE_MENU_ITEMS}
            onSelect={(item) => handleSelect(item.key as TArticleState)}
            onShow={() => {
              setOffset([8, 8])
              setMenuOpen(true)
            }}
            onHide={() => {
              setOffset([30, 5])
              setMenuOpen(false)
            }}
            activeKey={activeState}
            placement={placement}
            popWidth={popWidth}
          >
            <ActiveLabel state={activeState} />
          </Menu>
        </DropdownButton>
      )}
    </Wrapper>
  )
}

export default memo(StateSelector)
