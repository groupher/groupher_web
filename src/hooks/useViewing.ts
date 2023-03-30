import { useState, useEffect } from 'react'
// import { merge } from 'ramda'

import EVENT from '@/constant/event'
import type { TViewingInfo } from '@/spec'

import BStore from '@/utils/bstore'
import { Global } from '@/utils/helper'

const initState = {
  community: 'home',
  id: '1',
}

const useViewing = (): TViewingInfo | null => {
  const [viewing, setViewing] = useState(initState)

  /* eslint-disable */
  useEffect(() => {
    const checkViewing = () => {
      const item = BStore.get('viewingArticle')
      // @ts-ignore
      setViewing(item)
    }

    Global.addEventListener(EVENT.VIEWING_CHANGED, checkViewing)

    return () => {
      Global.removeEventListener(EVENT.VIEWING_CHANGED, checkViewing)
    }
  }, [])

  return viewing
}

export default useViewing
