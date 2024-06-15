/*
 *
 * PostThread
 *
 */

import { BANNER_LAYOUT } from '@/const/layout'

import useLayout from '@/hooks/useLayout'
import { THREAD } from '@/const/thread'

// import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import PagedPosts from '@/widgets/PagedPosts'
import TagNote from '@/widgets/TagNote'
import ArticlesFilter from '@/widgets/ArticlesFilter'

import ThreadSidebar from './ThreadSidebar'

import { Wrapper, MainWrapper, SidebarWrapper, FilterWrapper } from './styles'

export default () => {
  const { postLayout, bannerLayout } = useLayout()

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
