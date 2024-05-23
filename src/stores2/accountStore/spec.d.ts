import type { TAccount, TCommunity, TUser } from '@/spec'

export type TStore = {
  user: TUser | null
  isLogin: boolean
  userSubscribedCommunities: TCommunity[] | null

  // views
  readonly accountInfo: TAccount
  // readonly themeData: TThemeMap
  // actions
  setSession: (user: TUser, token: string) => void
}
