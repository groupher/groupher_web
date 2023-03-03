import { FC, memo } from 'react'

import type { TArticleFilter } from '@/spec'
import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import FilterPanel from './FilterPanel'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
}

const SortFilter: FC<TProps> = ({ onSelect, activeFilter }) => {
  return (
    <Tooltip
      placement="bottom-start"
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
      <DropdownButton left={-8}>排序</DropdownButton>
    </Tooltip>
  )
}

export default memo(SortFilter)
