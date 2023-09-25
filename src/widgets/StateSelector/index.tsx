import { FC, memo, useState, useRef } from 'react'

import type { TArticleState, TArticleCatMode, TSpace, TTooltipPlacement } from '@/spec'
import { ARTICLE_STATE, ARTICLE_STATE_MODE } from '@/constant/gtd'

import DropdownButton from '@/widgets/Buttons/DropdownButton'
import Menu from '@/widgets/Menu'

import { MENU_ITEMS } from './constant'
import ActiveState from './ActiveState'
import { FilterWrapper, FullWrapper, Label } from './styles'

type TProps = {
  mode?: TArticleCatMode
  state?: string
  placement?: TTooltipPlacement
} & TSpace

const StateSelector: FC<TProps> = ({
  mode = ARTICLE_STATE_MODE.FULL,
  state = 'todo',
  placement = 'bottom',
  ...restProps
}) => {
  const [offset, setOffset] = useState([30, 5])
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeState, setActiveState] = useState(null)
  const ref = useRef(null)

  const handleSelect = (state: TArticleState) => {
    setActiveState(state)
  }

  const Wrapper = mode === ARTICLE_STATE_MODE.FILTER ? FilterWrapper : FullWrapper

  return (
    <Wrapper menuOpen={menuOpen} {...restProps} ref={ref}>
      {mode === ARTICLE_STATE_MODE.FULL && <Label>状态</Label>}
      <Menu
        offset={offset as [number, number]}
        items={MENU_ITEMS}
        onSelect={(item) => handleSelect(item.key as TArticleState)}
        activeKey={activeState}
        popWidth={120}
        placement={placement}
        onShow={() => {
          if (activeState !== ARTICLE_STATE.ALL) {
            setOffset([10, 5])
          } else {
            setOffset([30, 5])
          }
          setMenuOpen(true)
        }}
        onHide={() => {
          setOffset([22, 5])
          setMenuOpen(false)
        }}
      >
        <DropdownButton
          $active={menuOpen}
          selected={activeState && activeState !== ARTICLE_STATE.ALL}
          closable
          onClear={() => {
            // simulate click to avoid menu pop again
            ref.current.click()
            setActiveState(ARTICLE_STATE.ALL)
          }}
        >
          {!activeState || activeState === ARTICLE_STATE.ALL ? (
            '状态'
          ) : (
            <ActiveState activeState={activeState} mode={mode} />
          )}
        </DropdownButton>
      </Menu>
    </Wrapper>
  )
}

export default memo(StateSelector)
