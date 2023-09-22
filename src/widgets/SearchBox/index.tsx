/*
 *
 * SearchBox
 *
 */

import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import { openSearch } from '@/signal'

import { Wrapper, SearchIcon, Text } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:SearchBox:index')

type TProps = {
  testid?: string
} & TSpace

const SearchBox: FC<TProps> = ({ testid = 'search-box', ...restProps }) => {
  return (
    <Wrapper testid={testid} {...restProps} onClick={() => openSearch()}>
      <SearchIcon />
      <Text>搜索内容</Text>
    </Wrapper>
  )
}

export default memo(SearchBox)
