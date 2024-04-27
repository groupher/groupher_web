import { useContext, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'

import OAUTH from '@/constant/oauth'
import type { TAccount, TSimpleUser } from '@/spec'
import { debounce } from '@/helper'

import BStore from '@/utils/bstore'

let isLinkClickListenerAdded = false

const useSyncAccount = (): TAccount => {
  const { store } = useContext(MobXProviderContext)

  const syncAccountInfo = debounce(() => {
    console.log('## syncAccountInfo ..... account')

    const user = BStore.cookie.get(OAUTH.USER_KEY)
    const token = BStore.cookie.get(OAUTH.TOKEN_KEY)
    if (user) {
      const parsedUser = JSON.parse(user) as TSimpleUser

      if (!store.account.accountInfo.isLogin && parsedUser.login) {
        console.log('## real setting')
        store.account.setSession(parsedUser, token)
      }
    }
  }, 500)

  const handleLinkClick = (event) => {
    // 检查事件的目标是否为<a>标签
    if (event.target.tagName === 'A') {
      console.log('## --> 链接被点击了', event.target.href)
      syncAccountInfo()
    }
  }

  useEffect(() => {
    syncAccountInfo()
    if (!isLinkClickListenerAdded) {
      document.addEventListener('click', handleLinkClick)
      isLinkClickListenerAdded = true
    }
    return () => {
      document.removeEventListener('click', handleLinkClick)
      isLinkClickListenerAdded = false
    }
  }, [])

  return store.account.accountInfo
}

export default useSyncAccount
