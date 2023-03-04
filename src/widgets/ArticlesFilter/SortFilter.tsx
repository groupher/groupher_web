import { FC, memo } from 'react'

import type { TArticleFilter, TTooltipPlacement } from '@/spec'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import FilterPanel from './FilterPanel'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
  noArrow?: boolean
  tooltipPlacement?: TTooltipPlacement
}

const SortFilter: FC<TProps> = ({
  onSelect,
  activeFilter,
  noArrow = false,
  tooltipPlacement = 'bottom-start',
}) => {
  return (
    <Tooltip
      placement={tooltipPlacement}
      trigger="click"
      hideOnClick={false}
      offset={[-30, 5]}
      content={
        FilterPanel && (
          // @ts-ignore
          <FilterPanel onSelect={onSelect} activeFilter={activeFilter} />
        )
      }
    >
      <DropdownButton left={-8} noArrow={noArrow}>
        默认排序
      </DropdownButton>
    </Tooltip>
  )
}

export default memo(SortFilter)
