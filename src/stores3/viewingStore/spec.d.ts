import type { TCommunity, TUser, TPost, TChangelog, TThread, TArticle } from '@/spec'

export type TInit = {
  community?: TCommunity
  user?: TUser
  post?: TPost
  changelog?: TChangelog
  thread?: TThread
  viewingThread?: TThread
  activeThread?: TThread
}

export type TStore = TInit & {
  // views
  viewingArticle: TArticle

  // actions
  updateViewingCommunity: (args: TCommunity) => void
}
