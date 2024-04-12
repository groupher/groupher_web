import { useMemo } from 'react'
import { useSession as useNextSession } from 'next-auth/react'

import type { TAccount } from '@/spec'

const useSession = (): TAccount | null => {
  const { data, status } = useNextSession()
  // console.log('## useSession status ----> ', status)

  // const userName = data ? data.user?.name : ''

  // 使用 useMemo 来缓存 user 对象
  // 只有当 data.user 改变时，缓存的数据才会更新
  const user = useMemo(() => {
    if (!data || !data.user || status !== 'authenticated') {
      // 这里返回 null 表示没有用户数据
      return null
    }
    // 这里确保如果 data.user 没有变化，返回的还是同一个对象引用
    // console.log('## exec useSession ----> ', data.user.name)
    return data.user as TAccount
  }, [status, data]) // 依赖项设为 data.user

  return user
}

export default useSession
