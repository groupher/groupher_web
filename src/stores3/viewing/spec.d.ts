import type { TCommunity, TUser, TPost, TChangelog, TThread, TArticle, TMetric } from '@/spec'

export type TInit = {
  metric?: TMetric
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
  communityDigestInView: boolean

  // actions
  updateViewingCommunity: (args: TCommunity) => void
  commit: (patch: Partial<TStore>) => void
}
