import { FC, memo } from 'react'

import type { TThread, TArticleFilter } from '@/spec'
import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import FilterPanel from './FilterPanel'

import { Wrapper, Label } from './styles/filter_button'

type TProps = {
  thread: TThread
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
}

const FilterButton: FC<TProps> = ({ thread, onSelect, activeFilter }) => {
  return (
    <Wrapper>
      <Label>排序</Label>
      <Tooltip
        placement="bottom"
        trigger="click"
        hideOnClick={false}
        content={
          FilterPanel && (
            // @ts-ignore
            <FilterPanel
              thread={thread}
              onSelect={onSelect}
              activeFilter={activeFilter}
            />
          )
        }
      >
        <DropdownButton>全部</DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(FilterButton)
