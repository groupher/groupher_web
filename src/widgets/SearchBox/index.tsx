/*
 *
 * SearchBox
 *
 */

import { type FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { openSearch } from '@/signal'

import { Wrapper, SearchIcon, Text } from './styles'

type TProps = {
  testid?: string
} & TSpace

const SearchBox: FC<TProps> = ({ testid = 'search-box', ...restProps }) => {
  return (
    <Wrapper $testid={testid} {...restProps} onClick={() => openSearch()}>
      <SearchIcon />
      <Text>搜索内容</Text>
    </Wrapper>
  )
}

export default memo(SearchBox)
