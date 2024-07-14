/*
 *
 * PostThread
 *
 */

import { BANNER_LAYOUT } from '~/const/layout'

import useLayout from '~/hooks/useLayout'

// import LavaLampLoading from '~/widgets/Loading/LavaLampLoading'
import PagedPosts from '~/widgets/PagedPosts'
import TagNote from '~/widgets/TagNote'
import ArticlesFilter from '~/widgets/ArticlesFilter'

import ThreadSidebar from './ThreadSidebar'

import useSalon from './salon'

export default () => {
  const { bannerLayout } = useLayout()

  const s = useSalon()

  const isSidebarLayout = bannerLayout === BANNER_LAYOUT.SIDEBAR

  return (
    <div className={`${s.wrapper}`}>
      <div className={`${s.layout}`}>
        <div className={`${s.filter}`}>
          <ArticlesFilter />
        </div>
        <TagNote />
        <PagedPosts />
      </div>

      {!isSidebarLayout && <ThreadSidebar />}
    </div>
  )
}
