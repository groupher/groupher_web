import { FC, memo, useState } from 'react'
import dynamic from 'next/dynamic'

import type { TArticleState, TArticleCatMode, TTooltipPlacement, TSpace } from '@/spec'
import { ARTICLE_STATE, ARTICLE_STATE_MODE } from '@/constant/gtd'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import ActiveState from './ActiveState'

import { FilterWrapper, FullWrapper, Label } from './styles'

const FilterPanel = dynamic(() => import('./FilterPanel'))
const FullPanel = dynamic(() => import('./FullPanel'))

type TProps = {
  mode?: TArticleCatMode
  tooltipPlacement?: TTooltipPlacement
} & TSpace

const StateSelector: FC<TProps> = ({
  mode = ARTICLE_STATE_MODE.FULL,
  tooltipPlacement = 'bottom-end',
  ...restProps
}) => {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeState, setActiveState] = useState(null)

  const handleSelect = (state: TArticleState) => {
    setActiveState(state)
  }

  const Wrapper = mode === ARTICLE_STATE_MODE.FILTER ? FilterWrapper : FullWrapper
  const offset = mode === ARTICLE_STATE_MODE.FILTER ? [20, 5] : [-42, 5]

  return (
    <Wrapper $menuOpen={menuOpen} {...restProps}>
      {mode === ARTICLE_STATE_MODE.FULL && <Label>状态</Label>}
      <Tooltip
        placement={tooltipPlacement}
        trigger="click"
        onShow={() => {
          setShow(true)
          setMenuOpen(true)
        }}
        onHide={() => setMenuOpen(false)}
        offset={offset as [number, number]}
        content={
          <>
            {show && mode === ARTICLE_STATE_MODE.FILTER && (
              <FilterPanel activeState={activeState} onSelect={handleSelect} />
            )}
            {show && mode === ARTICLE_STATE_MODE.FULL && (
              <FullPanel activeState={activeState} onSelect={handleSelect} />
            )}
          </>
        }
        noPadding
      >
        <DropdownButton
          $active={menuOpen}
          selected={activeState && activeState !== ARTICLE_STATE.ALL}
        >
          {!activeState || activeState === ARTICLE_STATE.ALL ? (
            '状态'
          ) : (
            <ActiveState activeState={activeState} mode={mode} />
          )}
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(StateSelector)
