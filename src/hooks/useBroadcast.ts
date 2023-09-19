import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick } from 'ramda'

import type { TBroadcastConfig } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useBroadcast = (): TBroadcastConfig => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  // @ts-ignore
  return pick(
    [
      'broadcastLayout',
      'broadcastBg',
      'broadcastEnable',
      'broadcastArticleLayout',
      'broadcastArticleBg',
      'broadcastArticleEnable',
    ],
    store.dashboardThread,
  )
}

export default useBroadcast
