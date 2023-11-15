/*
 *
 * PostThread
 *
 */

import { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import type { TResState, TArticleFilterMode } from '@/spec'
import { BANNER_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/logger'
import usePostLayout from '@/hooks/usePostLayout'
import { THREAD } from '@/constant/thread'

import ThreadSidebar from '@/containers/thread/ThreadSidebar'
import PagedArticles from '@/widgets/PagedArticles'
import TagNote from '@/widgets/TagNote'
import ViewportTracker from '@/widgets/ViewportTracker'
import ArticlesFilter from '@/widgets/ArticlesFilter'
// import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { useStore } from './store'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper } from './styles'
import { useInit, inAnchor, outAnchor, onFilterSelect } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:PostThread')

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const PostThread: FC = () => {
  const store = useStore()
  useInit(store)

  const postLayout = usePostLayout()
  const trackerRef = useRef(null)

  useEffect(() => {
    if (trackerRef.current) {
      isInViewport(trackerRef.current) ? inAnchor() : outAnchor()
    }
  }, [trackerRef])

  // if (store.curThread !== THREAD.POST) return <LavaLampLoading top={20} />

  const isMobile = false
  const { pagedPostsData, curThread, showFilters, resState, mode, globalLayout } = store

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
              resState={resState as TResState}
              onSelect={onFilterSelect}
              mode={mode as TArticleFilterMode}
            />
          </FilterWrapper>
        )}

        <TagNote />

        <PagedArticles data={pagedPostsData} thread={curThread} resState={resState as TResState} />
      </LayoutWrapper>

      {!isSidebarLayout && <ThreadSidebar />}
    </Wrapper>
  )
}

export default observer(PostThread)
