/*
 *
 * ArticlesThread
 *
 */

import { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import type { TResState, TArticleFilterMode } from '@/spec'
import { BANNER_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/logger'
import usePostLayout from '@/hooks/usePostLayout'

import ThreadSidebar from '@/containers/thread/ThreadSidebar'
import PagedArticles from '@/widgets/PagedArticles'
import TagNote from '@/widgets/TagNote'
import ViewportTracker from '@/widgets/ViewportTracker'
import ArticlesFilter from '@/widgets/ArticlesFilter'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { useStore } from './store'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper } from './styles'
import { useInit, inAnchor, outAnchor, onFilterSelect } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticlesThread')

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const ArticlesThread: FC = () => {
  const store = useStore()
  useInit(store)

  const postLayout = usePostLayout()
  const trackerRef = useRef(null)

  useEffect(() => {
    if (trackerRef.current) {
      isInViewport(trackerRef.current) ? inAnchor() : outAnchor()
    }
  }, [trackerRef])

  if (store.curThread !== 'post') return <LavaLampLoading top={20} />

  const {
    isMobile,
    pagedArticlesData,
    filtersData,
    curThread,
    showFilters,
    resState,
    mode,
    globalLayout,
    activeTagData,
    groupedTags,
  } = store

  const isSidebarLayout = globalLayout.banner === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : MainWrapper

  return (
    <Wrapper>
      <LayoutWrapper thread={curThread} $postLayout={postLayout}>
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

        <PagedArticles
          data={pagedArticlesData}
          thread={curThread}
          resState={resState as TResState}
        />
      </LayoutWrapper>

      {!isSidebarLayout && <ThreadSidebar />}
    </Wrapper>
  )
}

export default observer(ArticlesThread)
