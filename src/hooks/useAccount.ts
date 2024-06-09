import { useContext } from 'react'
import { useSnapshot } from 'valtio'

import type { TAccount } from '@/spec'
import { StoreContext } from '@/stores3'

/**
 * TODO:
 */
// const useStoreTree = (part: ) => {
// }

const useAccount = (): TAccount => {
  const root = useContext(StoreContext)
  const { account } = useSnapshot(root)

  return account.accountInfo
}

export default useAccount
