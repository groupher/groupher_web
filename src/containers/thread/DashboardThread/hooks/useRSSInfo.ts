import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import useHelper from './useHelper'

type TRet = {
  rssFeedType: string
  rssFeedCount: number
  saving: boolean
  isTouched: boolean
}

const useRSSInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { rssFeedType, rssFeedCount, saving } = store.dashboardThread

  return {
    rssFeedType,
    rssFeedCount,
    saving,
    isTouched: isChanged('rssFeedType') || isChanged('rssFeedCount'),
  }
}

export default useRSSInfo
