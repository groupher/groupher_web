'use client'

import { FC, ReactNode } from 'react'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStore } from '@/stores/init'

import {
  useMetric,
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
  useFilterSearchParams,
  useThreadParam,
} from '../queries'

enableStaticRendering(typeof window === 'undefined')

type TProps = {
  token: null | string
  children: ReactNode
}

const RootStoreWrapper: FC<TProps> = ({ children, token }) => {
  const userHasLogin = !!token

  const metric = useMetric()

  // const { sesstion } = useSession()
  // const { community } = useCommunity(userHasLogin)

  // @ts-ignore
  const wallpaper = useWallpaper()
  // @ts-ignore
  const dashboard = useDashboard()

  const store = useStore({
    metric,
    // ...sesstion,
    wallpaperEditor: wallpaper,
    dashboardThread: dashboard,
  })

  return <Provider store={store}>{children}</Provider>
}

export default RootStoreWrapper
