import { FC, memo, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { TTag, TGroupedTags } from '@/spec'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'
import ActiveTag from './ActiveTag'

import { Wrapper, Label } from './styles'

const FilterPanel = dynamic(() => import('./FilterPanel'))

type TProps = {
  groupedTags: TGroupedTags
  activeTag: TTag | null
  onSelect?: (tag: TTag) => void
}

const TagSelector: FC<TProps> = ({ groupedTags, activeTag, onSelect }) => {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSelect = (tag: TTag) => {
    onSelect(tag)
  }

  return (
    <Wrapper menuOpen={menuOpen}>
      <Label>标签</Label>
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
              <FilterPanel
                activeTag={activeTag}
                groupedTags={groupedTags}
                onSelect={handleSelect}
              />
            )}
          </Fragment>
        }
      >
        <DropdownButton>
          <ActiveTag activeTag={activeTag} />
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(TagSelector)
