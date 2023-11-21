/*
 *
 * PostThread
 *
 */

import { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import type { TResState } from '@/spec'
import { BANNER_LAYOUT } from '@/constant/layout'

import { buildLog } from '@/logger'
import usePostLayout from '@/hooks/usePostLayout'
import useBannerLayout from '@/hooks/useBannerLayout'
import usePagedPosts from '@/hooks/usePagedPosts'
import { THREAD } from '@/constant/thread'

import PagedPosts from '@/widgets/PagedPosts'
import TagNote from '@/widgets/TagNote'
import ViewportTracker from '@/widgets/ViewportTracker'
import ArticlesFilter from '@/widgets/ArticlesFilter'
// import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import ThreadSidebar from './ThreadSidebar'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper } from './styles'
import { inAnchor, outAnchor, onFilterSelect } from './logic'

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
  const bannerLayout = useBannerLayout()
  const { resState } = usePagedPosts()

  const postLayout = usePostLayout()
  const trackerRef = useRef(null)

  useEffect(() => {
    if (trackerRef.current) {
      isInViewport(trackerRef.current) ? inAnchor() : outAnchor()
    }
  }, [trackerRef])

  // if (store.curThread !== THREAD.POST) return <LavaLampLoading top={20} />

  const isMobile = false
  const showFilters = true

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : MainWrapper

  return (
    <Wrapper>
      <LayoutWrapper $thread={THREAD.POST} $postLayout={postLayout}>
        <ViewportTracker onEnter={inAnchor} onLeave={outAnchor} />

        {showFilters && (
          <FilterWrapper ref={trackerRef}>
            <ArticlesFilter
              isMobile={isMobile}
              resState={resState as TResState}
              onSelect={onFilterSelect}
              mode="default"
            />
          </FilterWrapper>
        )}
        <TagNote />
        <PagedPosts />
      </LayoutWrapper>

      {!isSidebarLayout && <ThreadSidebar />}
    </Wrapper>
  )
}

export default observer(PostThread)
