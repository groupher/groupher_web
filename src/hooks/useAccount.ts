import { useContext } from 'react'

import type { TAccount } from '@/spec'
import { StoreContext } from '@/stores2'
/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAccount = (): TAccount => {
  const { account } = useContext(StoreContext)

  return account.accountInfo
}

export default useAccount
