import type { TAccount } from '@/spec'

import useSubStore from '@/hooks/useSubStore'

const useAccount = (): TAccount => {
  const store = useSubStore('account')

  return store.accountInfo
}

export default useAccount
