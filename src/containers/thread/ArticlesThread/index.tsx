/*
 *
 * ArticlesThread
 *
 */

import { FC } from 'react'
import dynamic from 'next/dynamic'

import type { TResState, TArticleFilterMode } from '@/spec'
import { BANNER_LAYOUT, HELP_FAQ_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import PagedArticles from '@/widgets/PagedArticles'
import TagNote from '@/widgets/TagNote'

import ViewportTracker from '@/widgets/ViewportTracker'
import ThreadSidebar from '@/containers/thread/ThreadSidebar'
import ArticlesFilter from '@/widgets/ArticlesFilter'

import type { TStore } from './store'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper, ArticleListWrapper } from './styles'

import { useInit, inAnchor, outAnchor, onFilterSelect, onSearch, closeSearch } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticlesThread')

const FaqList = dynamic(() => import('@/widgets/FaqList'))

type TProps = {
  articlesThread?: TStore
}

const ArticlesThreadContainer: FC<TProps> = ({ articlesThread: store }) => {
  useInit(store)

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
    isViewingArticle,
    activeTagData,
    groupedTags,
  } = store
  const isSidebarLayout = globalLayout.banner === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : MainWrapper

  return (
    <Wrapper>
      <LayoutWrapper thread={curThread} isViewingArticle={isViewingArticle}>
        <ViewportTracker onEnter={inAnchor} onLeave={outAnchor} />

        {showFilters && (
          <FilterWrapper thread={curThread}>
            <ArticlesFilter
              activeTag={activeTagData}
              groupedTags={groupedTags}
              resState={resState as TResState}
              onSelect={onFilterSelect}
              activeFilter={filtersData}
              mode={mode as TArticleFilterMode}
              onSearch={onSearch}
              closeSearch={closeSearch}
            />
          </FilterWrapper>
        )}

        <TagNote tag={activeTagData} />

        {mode === 'search' && <FaqList layout={HELP_FAQ_LAYOUT.SEARCH_HINT} left={6} />}

        <ArticleListWrapper show={mode === 'default'}>
          <PagedArticles
            data={pagedArticlesData}
            curCommunity={curCommunity}
            thread={curThread}
            resState={resState as TResState}
            c11n={c11n}
            globalLayout={globalLayout}
          />
        </ArticleListWrapper>
      </LayoutWrapper>

      {!isSidebarLayout && <ThreadSidebar />}
    </Wrapper>
  )
}

export default bond(ArticlesThreadContainer, 'articlesThread') as FC<TProps>
