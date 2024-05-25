/*
 *
 * PostThread
 *
 */

import { FC } from 'react'

import { BANNER_LAYOUT } from '@/const/layout'

import { buildLog } from '@/logger'
import usePostLayout from '@/hooks/usePostLayout'
import useBannerLayout from '@/hooks/useBannerLayout'
import { THREAD } from '@/const/thread'

// import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import PagedPosts from '@/widgets/PagedPosts'
import TagNote from '@/widgets/TagNote'
import ArticlesFilter from '@/widgets/ArticlesFilter'

import ThreadSidebar from './ThreadSidebar'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper } from './styles'

const _log = buildLog('C:PostThread')

const PostThread: FC = () => {
  const bannerLayout = useBannerLayout()

  const postLayout = usePostLayout()

  // const isMobile = false
  // const showFilters = true

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR
  const LayoutWrapper = isSidebarLayout ? SidebarWrapper : MainWrapper

  return (
    <Wrapper>
      <LayoutWrapper $thread={THREAD.POST} $postLayout={postLayout}>
        <FilterWrapper>
          <ArticlesFilter />
        </FilterWrapper>
        <TagNote />
        <PagedPosts />
      </LayoutWrapper>

      {!isSidebarLayout && <ThreadSidebar />}
    </Wrapper>
  )
}

// will cause multiple re-renders
// export default observer(PostThread)
export default PostThread
