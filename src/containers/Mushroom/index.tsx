'use client'

import { FC, useEffect, useCallback } from 'react'

import useViewingThread from '@/hooks/useViewingThread'
import { THREAD } from '@/constant/thread'

import { useStore } from './store'
import { useInit } from './logic'

const Mushroom: FC = () => {
  const store = useStore()

  useInit(store)
  const curThread = useViewingThread()

  const handleBrowserPopChange = useCallback(
    (data) => {
      if (curThread === THREAD.POST) {
        // window.location = data.target.location.pathname
      }
    },
    [curThread],
  )

  useEffect(() => {
    // loadLocale()

    /**
     * this event is only hanle brower back/forward, current behavior is like producthunt
     */
    window.addEventListener('popstate', handleBrowserPopChange)

    return () => {
      window.removeEventListener('popstate', handleBrowserPopChange)
    }
  }, [])

  return <></>
}

export default Mushroom
