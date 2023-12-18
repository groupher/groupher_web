/*
 *
 * PostThread
 *
 */

import { FC, useRef } from 'react'
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
import ArticlesFilter from '@/widgets/ArticlesFilter'
// import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import ThreadSidebar from './ThreadSidebar'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper } from './styles'

const _log = buildLog('C:PostThread')

const PostThread: FC = () => {
  const bannerLayout = useBannerLayout()
  const { resState } = usePagedPosts()

  const postLayout = usePostLayout()
  const trackerRef = useRef(null)

  // if (store.curThread !== THREAD.POST) return <LavaLampLoading top={20} />

  const isMobile = false
  const showFilters = true

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : MainWrapper

  return (
    <Wrapper>
      <LayoutWrapper $thread={THREAD.POST} $postLayout={postLayout}>
        {showFilters && (
          <FilterWrapper ref={trackerRef}>
            <ArticlesFilter isMobile={isMobile} resState={resState as TResState} mode="default" />
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
