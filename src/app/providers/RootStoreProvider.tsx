'use client'

import { usePathname, useParams } from 'next/navigation'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStore } from '@/stores/init'
import { THREAD } from '@/constant/thread'
import TYPE from '@/constant/type'

import {
  useCommunity,
  useTags,
  usePagedPosts,
  usePagedChangelogs,
  parseThread,
  parseWallpaper,
  parseDashboard,
} from '../queries'

enableStaticRendering(typeof window === 'undefined')

const StoreWrapper = ({ children }) => {
  // console.log('## init in layout, load community info, dashboard info')
  const pathname = usePathname()
  const params = useParams()
  const communitySlug = params.community as string
  const activeThread = parseThread(pathname)
  // console.log('## activeThread: ', activeThread)
  // console.log('## communitySlug: ', communitySlug)

  const skip = !communitySlug

  // const [result] = useQueryCommunity('home', { skip: pathname === '/home' })
  const { community } = useCommunity(communitySlug, { skip })

  const { pagedPosts } = usePagedPosts(
    { community: communitySlug },
    { skip: activeThread !== THREAD.POST },
  )

  const { pagedChangelogs } = usePagedChangelogs(
    { community: communitySlug },
    { skip: activeThread !== THREAD.CHANGELOG },
  )

  const { tags } = useTags({ community: communitySlug }, { skip })

  const wallpaper = !skip ? parseWallpaper(community) : {}
  const dashboard = !skip ? parseDashboard(community) : {}

  const store = useStore({
    articlesThread: {
      pagedPosts,
      pagedChangelogs,
      resState: TYPE.RES_STATE.DONE,
    },
    tagsBar: {
      tags,
    },
    viewing: {
      community: community || {},
      activeThread,
    },
    wallpaperEditor: wallpaper,
    dashboardThread: dashboard,
  })

  return <Provider store={store}>{children}</Provider>
}

export default StoreWrapper
