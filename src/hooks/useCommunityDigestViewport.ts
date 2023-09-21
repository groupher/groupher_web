import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

// import type { TAvatarLayout } from '@/spec'

type TRet = {
  enterView: () => void
  leaveView: () => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useCommunityDigestViewport = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    enterView: (): void => store.mark({ communityDigestInView: true }),
    leaveView: (): void => store.mark({ communityDigestInView: false }),
  }
}

export default useCommunityDigestViewport
