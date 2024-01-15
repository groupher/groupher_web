/*
 *
 * SearchPanel
 *
 */

import { FC, memo, lazy, Suspense } from 'react'

import { buildLog } from '@/logger'

import { DOC_FAQ_LAYOUT } from '@/constant/layout'
import { closeDrawer } from '@/signal'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { Wrapper, Title, SearchInput, CloseIcon } from './styles'

const FaqList = lazy(() => import('@/widgets/FaqList'))

const _log = buildLog('c:SearchPanel:index')

type TProps = {
  testid?: string
}

const SearchPanel: FC<TProps> = ({ testid = 'search-panel' }) => {
  return (
    <Wrapper $testid={testid}>
      <CloseIcon onClick={() => closeDrawer()} />

      <Title>在帖子中搜索</Title>
      <SearchInput placeholder="搜索内容" autoFocus />

      <Suspense fallback={<LavaLampLoading />}>
        <FaqList layout={DOC_FAQ_LAYOUT.SEARCH_HINT} top={30} left={6} />
      </Suspense>
    </Wrapper>
  )
}

export default memo(SearchPanel)
