import { FC, memo, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { TTag, TGroupedTags } from '@/spec'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'
import ActiveTag from './ActiveTag'

import { EditorWrapper, MobileWrapper, Label } from './styles'

const FilterPanel = dynamic(() => import('./FilterPanel'))

type TProps = {
  groupedTags: TGroupedTags
  activeTag: TTag | null
  onSelect?: (tag: TTag) => void
  mode?: 'mobile' | 'modeline' | 'default'
}

const TagSelector: FC<TProps> = ({ mode = 'default', groupedTags, activeTag, onSelect }) => {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSelect = (tag: TTag) => {
    onSelect(tag)
  }

  const Wrapper = mode === 'default' ? EditorWrapper : MobileWrapper

  return (
    <Wrapper $menuOpen={menuOpen}>
      {mode === 'default' && <Label>标签</Label>}
      <Tooltip
        placement="bottom-start"
        trigger="click"
        onShow={() => {
          setShow(true)
          setMenuOpen(true)
        }}
        onHide={() => setMenuOpen(false)}
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
        <DropdownButton noArrow={mode === 'modeline'}>
          <ActiveTag activeTag={activeTag} mode={mode} />
        </DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(TagSelector)
