import { FC, memo } from 'react'

import type { TArticleFilter, TTooltipPlacement } from '@/spec'

import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'
import { DesktopOnly, MobileOnly } from '@/widgets/Common'

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
        <DesktopOnly>默认排序</DesktopOnly>
        <MobileOnly>排序</MobileOnly>
      </DropdownButton>
    </Tooltip>
  )
}

export default memo(SortFilter)
