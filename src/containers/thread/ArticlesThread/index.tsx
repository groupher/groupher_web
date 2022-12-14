/*
 *
 * ArticlesThread
 *
 */

import { FC } from 'react'
import dynamic from 'next/dynamic'

import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TResState } from '@/spec'
import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import PagedArticles from '@/widgets/PagedArticles'

// import FaqList from '@/widgets/FaqList'
import TagNote from '@/widgets/TagNote'

import ViewportTracker from '@/widgets/ViewportTracker'
import ThreadSidebar from '@/containers/thread/ThreadSidebar'
import ArticlesFilter from '@/widgets/ArticlesFilter'

import type { TStore } from './store'

import { Wrapper, MainWrapper, FilterWrapper } from './styles'

import { useInit, inAnchor, outAnchor, onFilterSelect, onSearch, closeSearch } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticlesThread')

const FaqList = dynamic(() => import('@/widgets/FaqList'))

type TProps = {
  articlesThread?: TStore
}

const ArticlesThreadContainer: FC<TProps> = ({ articlesThread: store }) => {
  useInit(store)

  const { isMobile } = useMobileDetect()

  const {
    pagedArticlesData,
    filtersData,
    curCommunity,
    curThread,
    showFilters,
    c11n,
    resState,
    mode,
    globalLayout,
    activeTagData,
  } = store
  const { pageNumber, totalCount } = pagedArticlesData

  return (
    <Wrapper>
      <MainWrapper thread={curThread}>
        <ViewportTracker onEnter={inAnchor} onLeave={outAnchor} />

        {showFilters && (
          <FilterWrapper thread={curThread}>
            <ArticlesFilter
              resState={resState as TResState}
              onSelect={onFilterSelect}
              activeFilter={filtersData}
              pageNumber={pageNumber}
              totalCount={totalCount}
              mode={mode}
              onSearch={onSearch}
              closeSearch={closeSearch}
            />
          </FilterWrapper>
        )}

        <TagNote tag={activeTagData} />

        {mode === 'default' && (
          <PagedArticles
            data={pagedArticlesData}
            curCommunity={curCommunity}
            thread={curThread}
            resState={resState as TResState}
            c11n={c11n}
            globalLayout={globalLayout}
          />
        )}
        {mode === 'search' && <FaqList mode="search-hint" />}
      </MainWrapper>

      {!isMobile && <ThreadSidebar />}
    </Wrapper>
  )
}

export default bond(ArticlesThreadContainer, 'articlesThread') as FC<TProps>
