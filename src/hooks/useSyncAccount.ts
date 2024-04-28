import { useContext, useEffect, useState } from 'react'
import { MobXProviderContext } from 'mobx-react'

import OAUTH from '@/constant/oauth'
import type { TAccount, TSimpleUser } from '@/spec'
import { debounce } from '@/helper'

import BStore from '@/utils/bstore'

const useSyncAccount = (): TAccount => {
  const { store } = useContext(MobXProviderContext)
  const [isLinkClickListenerAdded, setIsLinkClickListenerAdded] = useState(false)

  const syncAccountInfo = debounce(() => {
    const user = BStore.cookie.get(OAUTH.USER_KEY)
    const token = BStore.cookie.get(OAUTH.TOKEN_KEY)

    if (user) {
      const parsedUser = JSON.parse(user) as TSimpleUser

      if (!store.account.accountInfo.isLogin && parsedUser.login) {
        store.account.setSession(parsedUser, token)
      }
    }
  }, 500)

  /**
   * this is ugly workaround for syncing account info when user click on Link
   * cuz in next 13+, the route listen events is removed
   */
  const handleLinkClick = (event) => {
    // 检查事件的目标是否为<a>标签
    if (event.target.tagName === 'A') {
      syncAccountInfo()
    }
  }

  useEffect(() => {
    syncAccountInfo()
    if (!isLinkClickListenerAdded) {
      document.addEventListener('click', handleLinkClick)
      setIsLinkClickListenerAdded(true)
    }
    return () => {
      document.removeEventListener('click', handleLinkClick)
      setIsLinkClickListenerAdded(false)
    }
  }, [])

  return store.account.accountInfo
}

export default useSyncAccount
