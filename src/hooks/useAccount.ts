import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TAccount } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAccount = (): TAccount => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return store.account.accountInfo
}

export default useAccount
