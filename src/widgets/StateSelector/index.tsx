import { FC, memo, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { TArticleState, TArticleCatMode } from '@/spec'
import { ARTICLE_STATE_MODE } from '@/constant/gtd'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import ActiveState from './ActiveState'

import { FilterWrapper, FullWrapper, Label } from './styles'

const FilterPanel = dynamic(() => import('./FilterPanel'))
const FullPanel = dynamic(() => import('./FullPanel'))

type TProps = {
  mode?: TArticleCatMode
  state?: string
}

const StateSelector: FC<TProps> = ({ mode = ARTICLE_STATE_MODE.FULL, state = 'todo' }) => {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeState, setActiveState] = useState(null)

  const handleSelect = (state: TArticleState) => {
    setActiveState(state)
  }

  const Wrapper = mode === ARTICLE_STATE_MODE.FILTER ? FilterWrapper : FullWrapper
  const offset = mode === ARTICLE_STATE_MODE.FILTER ? [-22, 5] : [-42, 5]

  return (
    <Wrapper menuOpen={menuOpen}>
      {mode === ARTICLE_STATE_MODE.FULL && <Label>状态</Label>}
      <Tooltip
        placement="bottom-start"
        trigger="click"
        onShow={() => {
          setShow(true)
          setMenuOpen(true)
        }}
        onHide={() => {
          setMenuOpen(false)
        }}
        offset={offset as [number, number]}
        content={
          <Fragment>
            {show && mode === ARTICLE_STATE_MODE.FILTER && (
              <FilterPanel activeState={activeState} onSelect={handleSelect} />
            )}

            {show && mode === ARTICLE_STATE_MODE.FULL && (
              <FullPanel activeState={activeState} onSelect={handleSelect} />
            )}
          </Fragment>
        }
        noPadding
      >
        <DropdownButton>
          <ActiveState activeState={activeState} mode={mode} />
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(StateSelector)
