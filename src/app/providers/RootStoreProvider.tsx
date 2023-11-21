'use client'

import { FC, ReactNode, cloneElement, Children, isValidElement } from 'react'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStore } from '@/stores/init'

import {
  useSession,
  useCommunity,
  useTags,
  usePost,
  useChangelog,
  usePagedPosts,
  useGroupedKanbanPosts,
  usePagedChangelogs,
  useWallpaper,
  useDashboard,
  //
  useThreadParam,
} from '../queries'

enableStaticRendering(typeof window === 'undefined')

type TProps = {
  token: null | string
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children, token }) => {
  const userHasLogin = !!token

  const activeThread = useThreadParam()
  // console.log('## activeThread: ', activeThread)

  const { sesstion } = useSession()
  const { community } = useCommunity(userHasLogin)

  const { pagedPosts } = usePagedPosts(userHasLogin)
  const { pagedChangelogs } = usePagedChangelogs(userHasLogin)
  const { post } = usePost(userHasLogin)
  const { changelog } = useChangelog(userHasLogin)
  const { groupedKanbanPosts } = useGroupedKanbanPosts(userHasLogin)
  const { tags } = useTags()

  const wallpaper = useWallpaper(community)
  const dashboard = useDashboard(community)

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
