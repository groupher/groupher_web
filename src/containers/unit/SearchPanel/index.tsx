/* *
 * SearchPanel
 *
 */

import { FC } from 'react'
import dynamic from 'next/dynamic'

// import { buildLog } from '@/logger'
import { bond } from '@/mobx'
import { DOC_FAQ_LAYOUT } from '@/constant/layout'

import type { TStore } from './store'
import { Wrapper, Title, SearchInput } from './styles'
import { useInit } from './logic' /* eslint-disable-next-line */

const FaqList = dynamic(() => import('@/widgets/FaqList'))
// const log = buildLog('C:SearchPanel')

type TProps = {
  searchPanel?: TStore
  testid?: string
}

const SearchPanelContainer: FC<TProps> = ({ searchPanel: store, testid = 'search-panel' }) => {
  useInit(store)

  return (
    <Wrapper testid={testid}>
      <Title>在帖子中搜索</Title>
      <SearchInput placeholder="搜索内容" autoFocus />

      <FaqList layout={DOC_FAQ_LAYOUT.SEARCH_HINT} top={30} left={6} />
    </Wrapper>
  )
}

export default bond(SearchPanelContainer, 'searchPanel') as FC<TProps>
