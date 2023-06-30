/*
 * ViewingStore store
 *
 */

import { values, merge, includes } from 'ramda'

import type { TRootStore, TUser, TArticle, TArticleMeta, TThread, TAccount } from '@/spec'

import { ARTICLE_THREAD, THREAD } from '@/constant/thread'

import { T, getParent, Instance, markStates } from '@/utils/mobx'
import { viewingChanged } from '@/utils/signal'
import { User, Community, Post, Changelog } from '@/model'

const ViewingStore = T.model('ViewingStore', {
  user: T.opt(User, {}),
  community: T.opt(Community, {}),
  post: T.opt(Post, {}),
  changelog: T.opt(Changelog, {}),
  // repo: T.opt(Repo, {}),
  activeThread: T.opt(T.enum('activeThread', values(THREAD)), THREAD.POST),
  // for drawer usage
  viewingThread: T.maybeNull(T.enum('viewingThread', values(ARTICLE_THREAD))),
})
  .views((self) => ({
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.accountInfo
    },
    get isSelfViewing(): boolean {
      const root = getParent(self) as TRootStore
      const { isLogin } = root.accountInfo
      if (!isLogin) return false

      const { id: accountId } = root.accountInfo
      const { id: userId } = self.user
      return accountId === userId
    },
    get currentThread(): TThread {
      return self.viewingThread || self.activeThread
    },
    get viewingArticle(): TArticle {
      const curThread = self.viewingThread || self.activeThread

      if (includes(curThread, values(ARTICLE_THREAD))) {
        return self[curThread]
      }
      return {}
    },
  }))
  .actions((self) => ({
    setViewing(sobj): void {
      const { mark, viewingArticle } = self as TStore

      mark(sobj)
      viewingChanged(viewingArticle)
    },
    changeCommunity(slug): void {
      self.community.slug = slug
    },
    setCurThread(thread: TThread): void {
      self.activeThread = thread
    },
    resetViewing(): void {
      const { mark, viewingThread } = self as TStore
      mark({ [viewingThread]: {}, viewingThread: null })
      viewingChanged(null)
    },
    updateUpvote(viewerHasUpvoted: boolean): void {
      const { currentThread } = self as TStore

      if (viewerHasUpvoted) {
        self[currentThread].upvotesCount += 1
        self[currentThread].viewerHasUpvoted = true
      } else {
        self[currentThread].upvotesCount -= 1
        self[currentThread].viewerHasUpvoted = false
      }
    },
    updateUpvoteCount(count: number, meta?: TArticleMeta): void {
      const { currentThread } = self as TStore
      if (meta) {
        self[currentThread].meta.latestUpvotedUsers = meta.latestUpvotedUsers
      }

      self[currentThread].upvotesCount = count
    },
    updateViewingIfNeed(type, sobj): void {
      const { updateViewingUser } = self as TStore

      switch (type) {
        case 'user': {
          if (self.user.id !== self.accountInfo.id) return
          updateViewingUser(sobj)
          break
        }
        default:
          break
      }
    },
    updateViewingUser(sobj: TUser): void {
      const user = merge(self.user, sobj)
      const { mark } = self as TStore

      return mark({ user })
    },
    syncArticle(item: TArticle): void {
      const root = getParent(self) as TRootStore
      root.articlesThread.updateArticle(item)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ViewingStore>
export default ViewingStore
