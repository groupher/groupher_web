'use client'

import { usePathname } from 'next/navigation'
import { Provider } from 'mobx-react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStore } from '@/stores/init'

import { ssrParseWallpaper } from '@/utils/ssr'

import { useQueryCommunity } from '../queries'
// import { getData } from '@/utils/getData'
// import { Store } from './Store'

enableStaticRendering(typeof window === 'undefined')

// const fetcher = (...args) => fetch(...args).then((res) => res.json())

const StoreWrapper = ({ children }) => {
  // console.log('## init in layout, load community info, dashboard info')
  // const { data, error, isLoading } = useSWR('https://api.sampleapis.com/beers/ale', fetcher)
  const pathname = usePathname()

  // console.log('## curPath: ', pathname)

  // const [result] = useQueryCommunity('home', { skip: pathname === '/home' })
  const { community } = useQueryCommunity('home')
  console.log('## got wallpaper before: ', community)

  const wallpaper = ssrParseWallpaper(community)
  // console.log('## bbb: ', result.data)

  const store = useStore({
    viewing: {
      community: community || {},
    },
    wallpaperEditor: {
      ...wallpaper,
    },
    // dashboardThread: {
    //   ...dashboard,
    // },
  })

  return <Provider store={store}>{children}</Provider>
}

export default StoreWrapper
