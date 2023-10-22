/*
 *
 * SearchPanel
 *
 */

import { FC, memo } from 'react'
import dynamic from 'next/dynamic'

import { buildLog } from '@/logger'

import { DOC_FAQ_LAYOUT } from '@/constant/layout'
import { closeDrawer } from '@/signal'

import { Wrapper, Title, SearchInput, CloseIcon } from './styles'

const FaqList = dynamic(() => import('@/widgets/FaqList'))

/* eslint-disable-next-line */
const log = buildLog('c:SearchPanel:index')

type TProps = {
  testid?: string
}

const SearchPanel: FC<TProps> = ({ testid = 'search-panel' }) => {
  return (
    <Wrapper testid={testid}>
      <CloseIcon onClick={() => closeDrawer()} />

      <Title>在帖子中搜索</Title>
      <SearchInput placeholder="搜索内容" autoFocus />

      <FaqList layout={DOC_FAQ_LAYOUT.SEARCH_HINT} top={30} left={6} />
    </Wrapper>
  )
}

export default memo(SearchPanel)
