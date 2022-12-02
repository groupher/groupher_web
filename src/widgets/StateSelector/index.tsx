import { FC, memo, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import { Wrapper, Label } from './styles'

const FilterPanel = dynamic(() => import('./FilterPanel'))

type TProps = {
  state?: string
}

const StateSelector: FC<TProps> = ({ state = 'todo' }) => {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeState, setActiveState] = useState('todo')

  const handleSelect = (state: string) => {
    setActiveState(state)
  }

  return (
    <Wrapper menuOpen={menuOpen}>
      <Label>状态</Label>
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
        offset={[-42, 5]}
        content={
          <Fragment>
            {show && (
              <FilterPanel activeState={activeState} onSelect={handleSelect} />
            )}
          </Fragment>
        }
      >
        <DropdownButton>
          active
          {/* <ActiveState activeTag={activeTag} /> */}
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(StateSelector)
