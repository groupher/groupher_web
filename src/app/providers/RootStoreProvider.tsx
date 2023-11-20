'use client'

import { FC, ReactNode, cloneElement, Children, isValidElement } from 'react'
import { usePathname, useParams } from 'next/navigation'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStore } from '@/stores/init'
import { THREAD } from '@/constant/thread'
// import TYPE from '@/constant/type'

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

type TProps = {
  token: null | string
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children, token }) => {
  // console.log('## init in layout, load community info, dashboard info')
  const pathname = usePathname()
  const params = useParams()
  const userHasLogin = !!token

  const communitySlug = parseCommunity(params.community as string)

  // console.log('## pathname: ', pathname)
  const activeThread = parseThread(pathname)
  // console.log('## activeThread: ', activeThread)

  const skip = !communitySlug

  const { sesstion } = useSession()
  const { community } = useCommunity({ skip, userHasLogin })

  const { pagedPosts } = usePagedPosts({
    skip: !(activeThread === THREAD.POST && !params.id),
    userHasLogin,
  })

  const { pagedChangelogs } = usePagedChangelogs({
    skip: activeThread !== THREAD.CHANGELOG,
    userHasLogin,
  })

  const { post } = usePost({
    skip: !(activeThread === THREAD.POST && params.id),
    userHasLogin,
  })

  const { changelog } = useChangelog({
    skip: !(activeThread === THREAD.CHANGELOG && params.id),
    userHasLogin,
  })

  const { groupedKanbanPosts } = useGroupedKanbanPosts({
    skip: activeThread !== THREAD.KANBAN,
    userHasLogin,
  })

  const { tags } = useTags({ skip, userHasLogin })

  const wallpaper = !skip ? parseWallpaper(community) : {}
  const dashboard = !skip ? parseDashboard(community, pathname) : {}

  const store = useStore({
    ...sesstion,
    articles: {
      pagedPosts,
      pagedChangelogs,
      ...groupedKanbanPosts,
    },
    kanbanThread: groupedKanbanPosts,
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

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        // @ts-ignore
        globalLayout: store.dashboardThread.globalLayout,
      })
    }
    return child
  })

  return <Provider store={store}>{childrenWithProps}</Provider>
}

export default RootStoreWrapper
