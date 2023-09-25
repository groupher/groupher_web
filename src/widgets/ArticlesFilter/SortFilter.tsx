import { FC, memo, useState } from 'react'

import type { TArticleFilter, TTooltipPlacement } from '@/spec'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import FilterPanel from './FilterPanel'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
  noArrow?: boolean
  placement?: TTooltipPlacement
}

const SortFilter: FC<TProps> = ({
  onSelect,
  activeFilter,
  noArrow = false,
  placement = 'bottom-start',
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Tooltip
      trigger="click"
      placement={placement}
      onShow={() => setMenuOpen(true)}
      onHide={() => setMenuOpen(false)}
      offset={[-30, 5]}
      content={
        FilterPanel && (
          // @ts-ignore
          <FilterPanel onSelect={onSelect} activeFilter={activeFilter} />
        )
      }
    >
      <DropdownButton left={-10} noArrow={noArrow} $active={menuOpen}>
        <div>排序</div>
      </DropdownButton>
    </Tooltip>
  )
}

export default memo(SortFilter)
