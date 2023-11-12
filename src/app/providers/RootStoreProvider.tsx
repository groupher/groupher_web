'use client'

import { usePathname, useParams } from 'next/navigation'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStore } from '@/stores/init'
import { THREAD } from '@/constant/thread'
import TYPE from '@/constant/type'

import {
  useSession,
  useCommunity,
  useTags,
  usePost,
  useChangelog,
  usePagedPosts,
  useGroupedKanbanPosts,
  usePagedChangelogs,
  parseThread,
  parseWallpaper,
  parseDashboard,
  parseCommunity,
} from '../queries'

enableStaticRendering(typeof window === 'undefined')

const StoreWrapper = ({ children }) => {
  // console.log('## init in layout, load community info, dashboard info')
  const pathname = usePathname()
  const params = useParams()
  const communitySlug = parseCommunity(params.community as string)

  // console.log('## pathname: ', pathname)
  const activeThread = parseThread(pathname)
  // console.log('## activeThread: ', activeThread)
  // console.log('## communitySlug: ', communitySlug)

  const skip = !communitySlug

  const { sesstion } = useSession()

  // const [result] = useQueryCommunity('home', { skip: pathname === '/home' })
  const { community } = useCommunity(communitySlug, { skip })

  const { pagedPosts } = usePagedPosts(
    { community: communitySlug },
    { skip: !(activeThread === THREAD.POST && !params.id) },
  )

  const { post } = usePost(communitySlug, params.id as string, {
    skip: !(activeThread === THREAD.POST && params.id),
  })

  const { changelog } = useChangelog(communitySlug, params.id as string, {
    skip: !(activeThread === THREAD.CHANGELOG && params.id),
  })

  const { groupedKanbanPosts } = useGroupedKanbanPosts(communitySlug, {
    skip: activeThread !== THREAD.KANBAN,
  })

  const { pagedChangelogs } = usePagedChangelogs(
    { community: communitySlug },
    { skip: activeThread !== THREAD.CHANGELOG },
  )

  const { tags } = useTags({ community: communitySlug }, { skip })

  const wallpaper = !skip ? parseWallpaper(community) : {}
  const dashboard = !skip ? parseDashboard(community, pathname) : {}

  const store = useStore({
    ...sesstion,
    kanbanThread: groupedKanbanPosts,
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
      post,
      changelog,
      activeThread,
    },
    wallpaperEditor: wallpaper,
    dashboardThread: dashboard,
  })

  return <Provider store={store}>{children}</Provider>
}

export default StoreWrapper
