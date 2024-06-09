import type { TAccount } from '@/spec'

import useStoreTree from '@/hooks/useStoreTree'

const useAccount = (): TAccount => {
  const store = useStoreTree('account')

  return store.accountInfo
}

export default useAccount
