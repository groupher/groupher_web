import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TAccount } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAccount = (): TAccount => {
  const { store } = useContext(MobXProviderContext)

  return store.account.accountInfo
}

export default useAccount
