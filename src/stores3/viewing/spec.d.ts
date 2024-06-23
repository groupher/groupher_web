import type { TCommunity, TUser, TPost, TChangelog, TThread, TArticle, TMetric, TTag } from '@/spec'

export type TInit = {
  metric?: TMetric
  community?: TCommunity
  user?: TUser
  post?: TPost
  changelog?: TChangelog
  thread?: TThread
  viewingThread?: TThread
  activeThread?: TThread

  tags?: TTag[]
}

export type TStore = TInit & {
  // views
  communityDigestInView: boolean

  // actions
  updateViewingCommunity: (args: TCommunity) => void
  commit: (patch: Partial<TStore>) => void
}
