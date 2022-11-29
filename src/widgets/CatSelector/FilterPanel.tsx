import { FC, memo } from 'react'

import { FILTER } from '@/constant'

import type { TArticleFilter } from '@/spec'

import {
  Wrapper,
  SelectItem,
  AllIcon,
  LightIcon,
  BugIcon,
  QuestionIcon,
  OtherIcon,
} from './styles/filter_panel'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
}

const FilterPanel: FC<TProps> = ({ activeFilter, onSelect }) => {
  return (
    <Wrapper>
      <SelectItem
        active={activeFilter.length === FILTER.MOST_WORDS}
        onClick={() => onSelect({ length: FILTER.MOST_WORDS })}
      >
        <AllIcon />
        全部
      </SelectItem>

      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <LightIcon />
        功能需求
      </SelectItem>

      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <BugIcon />
        Bug
      </SelectItem>

      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <QuestionIcon />
        求助
      </SelectItem>

      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <OtherIcon />
        其它
      </SelectItem>
    </Wrapper>
  )
}

export default memo(FilterPanel)
