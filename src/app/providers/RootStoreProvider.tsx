'use client'

import { useParams } from 'next/navigation'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStore } from '@/stores/init'
import TYPE from '@/constant/type'

import { useCommunity, useTags, usePagedPosts, parseWallpaper, parseDashboard } from '../queries'
// import { getData } from '@/utils/getData'
// import { Store } from './Store'

enableStaticRendering(typeof window === 'undefined')

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

const StoreWrapper = ({ children }) => {
  // console.log('## init in layout, load community info, dashboard info')
  //  const pathname = usePathname()
  const params = useParams()
  const communitySlug = params.community as string
  // console.log('## communitySlug: ', communitySlug)

  const skip = !communitySlug

  // const [result] = useQueryCommunity('home', { skip: pathname === '/home' })
  const { community } = useCommunity(communitySlug, { skip })
  const { pagedPosts } = usePagedPosts({ community: communitySlug }, { skip })
  const { tags } = useTags({ community: communitySlug }, { skip })

  const wallpaper = !skip ? parseWallpaper(community) : {}
  const dashboard = !skip ? parseDashboard(community) : {}

  const store = useStore({
    articlesThread: {
      pagedPosts,
      resState: TYPE.RES_STATE.DONE,
    },
    tagsBar: {
      tags,
    },
    viewing: {
      community: community || {},
    },
    wallpaperEditor: wallpaper,
    dashboardThread: dashboard,
  })

  return <Provider store={store}>{children}</Provider>
}

export default StoreWrapper
