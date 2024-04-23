import { useContext, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'

import OAUTH from '@/constant/oauth'
import type { TAccount, TSimpleUser } from '@/spec'

import BStore from '@/utils/bstore'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAccount = (): TAccount => {
  const { store } = useContext(MobXProviderContext)

  useEffect(() => {
    const user = BStore.cookie.get(OAUTH.USER_KEY)
    const token = BStore.cookie.get(OAUTH.TOKEN_KEY)
    const parsedUser = JSON.parse(user) as TSimpleUser

    if (!store.account.accountInfo.isLogin && parsedUser.login) {
      console.log('## real setting')
      store.account.setSession(parsedUser, token)
    }
  }, [])

  // if (store === null) {
  //   throw new Error('Store cannot be null, please add a context provider')
  // }

  return store.account.accountInfo
}

export default useAccount
