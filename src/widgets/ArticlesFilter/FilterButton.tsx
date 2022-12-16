import { FC, memo } from 'react'

import type { TArticleFilter } from '@/spec'
import Tooltip from '@/widgets/Tooltip'
import DropdownButton from '@/widgets/Buttons/DropdownButton'

import FilterPanel from './FilterPanel'

import { Wrapper, Label } from './styles/filter_button'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
}

const FilterButton: FC<TProps> = ({ onSelect, activeFilter }) => {
  return (
    <Wrapper>
      <Label>排序</Label>
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
        <DropdownButton>全部</DropdownButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(FilterButton)
