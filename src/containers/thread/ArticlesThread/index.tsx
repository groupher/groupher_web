/*
 *
 * ArticlesThread
 *
 */

import { FC, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

import type { TResState, TArticleFilterMode } from '@/spec'
import { BANNER_LAYOUT, DOC_FAQ_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/logger'
import { bond } from '@/mobx'

import PagedArticles from '@/widgets/PagedArticles'
import TagNote from '@/widgets/TagNote'

import ViewportTracker from '@/widgets/ViewportTracker'
import ThreadSidebar from '@/containers/thread/ThreadSidebar'
import ArticlesFilter from '@/widgets/ArticlesFilter'

import type { TStore } from './store'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper } from './styles'
import { useInit, inAnchor, outAnchor, onFilterSelect } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticlesThread')

const FaqList = dynamic(() => import('@/widgets/FaqList'))

type TProps = {
  articlesThread?: TStore
}

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const ArticlesThreadContainer: FC<TProps> = ({ articlesThread: store }) => {
  useInit(store)

  const trackerRef = useRef(null)

  useEffect(() => {
    if (trackerRef.current) {
      isInViewport(trackerRef.current) ? inAnchor() : outAnchor()
    }
  }, [trackerRef])

  const {
    isMobile,
    pagedArticlesData,
    filtersData,
    curThread,
    showFilters,
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
          <FilterWrapper ref={trackerRef} thread={curThread}>
            <ArticlesFilter
              isMobile={isMobile}
              activeTag={activeTagData}
              groupedTags={groupedTags}
              resState={resState as TResState}
              onSelect={onFilterSelect}
              activeFilter={filtersData}
              mode={mode as TArticleFilterMode}
            />
          </FilterWrapper>
        )}

        <TagNote tag={activeTagData} />

        {mode === 'search' && <FaqList layout={DOC_FAQ_LAYOUT.SEARCH_HINT} left={6} />}

        {mode === 'default' && (
          <PagedArticles
            data={pagedArticlesData}
            thread={curThread}
            resState={resState as TResState}
          />
        )}
      </LayoutWrapper>

      {!isSidebarLayout && <ThreadSidebar />}
    </Wrapper>
  )
}

export default bond(ArticlesThreadContainer, 'articlesThread') as FC<TProps>
