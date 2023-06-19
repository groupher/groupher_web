import { useState, useEffect } from 'react'
// import { merge } from 'ramda'

import { HCN } from '@/constant/name'
import EVENT from '@/constant/event'
import type { TCommunity } from '@/spec'

import BStore from '@/utils/bstore'
import { Global } from '@/utils/helper'

const initState = { raw: HCN, threads: [] }

const useCurCommunity = (): TCommunity | null => {
  const [community, setCommunity] = useState(initState)

  /* eslint-disable */
  useEffect(() => {
    function checkCommunity() {
      const item = BStore.get('curCommunity')

      if (item) {
        // @ts-ignore
        setCommunity(item)
      }
    }

    Global.addEventListener(EVENT.COMMUNITY_CHANGED, checkCommunity)

    return () => {
      Global.removeEventListener(EVENT.COMMUNITY_CHANGED, checkCommunity)
    }
  }, [])

  return community
}

export default useCurCommunity
