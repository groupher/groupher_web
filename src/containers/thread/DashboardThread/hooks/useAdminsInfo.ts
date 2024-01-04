import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TModerator, TUser } from '@/spec'
import { toJS } from '@/mobx'
import { sortByIndex } from '@/helper'

type TRet = {
  moderators: TModerator[]
  activeModerator: TUser | null
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAdminsInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { moderators, activeModerator } = store.dashboardThread

  // @ts-ignore
  const sortedModerators = sortByIndex(
    toJS(moderators),
    'passportItemCount',
  ).reverse() as TModerator[]

  return {
    moderators: sortedModerators,
    activeModerator: toJS(activeModerator),
  }
}

export default useAdminsInfo
