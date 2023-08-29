import { FC, memo } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

import {
  Wrapper,
  Back,
  SearchIcon,
  InputWrapper,
  InputSearchIcon,
  Inputer,
  Text,
  ClearIcon,
  FilterIcon,
} from './styles/search_box'

type TProps = {
  searchMode: boolean
  onSearch: (v: string) => void
  closeSearch: () => void
}

const SearchBox: FC<TProps> = ({ searchMode, onSearch, closeSearch }) => {
  if (searchMode) {
    return (
      <InputWrapper>
        <Back>
          <ArrowButton fontSize={12} leftLayout color="BLACK" onClick={() => closeSearch()}>
            返回
          </ArrowButton>
        </Back>

        <InputSearchIcon />
        <Inputer placeholder="搜索内容" onChange={(e) => onSearch(e.target.value)} autoFocus />
        <ClearIcon onClick={() => onSearch('')} />
        <FilterIcon onClick={() => onSearch('')} />
      </InputWrapper>
    )
  }

  return (
    <Wrapper onClick={() => onSearch('')}>
      <SearchIcon />
      <Text>搜索内容</Text>
    </Wrapper>
  )
}

export default memo(SearchBox)
