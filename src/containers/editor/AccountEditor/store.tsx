/*
 * AccountEditorStore store
 *
 */

import { reduce, keys, merge, pick, startsWith } from 'ramda'

import type { TRootStore, TSubmitState, TUser } from '@/spec'
import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'

import type { TEditData } from './spec'
import { SEX } from './constant'

const safeMap = (obj) => {
  return reduce(
    merge,
    {},
    keys(obj).map((key) => {
      if (key === 'fromGithub') {
        return {
          fromGithub: obj[key] || false,
        }
      }
      return {
        [key]: obj[key] || '',
      }
    }),
  )
}

const AccountEditorStore = T.model('AccountEditorStore', {
  avatar: T.opt(T.string, ''),
  login: T.opt(T.string, ''),
  fromGithub: T.opt(T.bool, false),
  nickname: T.opt(T.string, ''),
  shortbio: T.opt(T.string, ''),
  bio: T.opt(T.string, ''),
  sex: T.opt(T.string, SEX.DUDE),
  location: T.opt(T.string, ''),
  company: T.opt(T.string, ''),

  // social
  github: T.opt(T.string, ''),
  twitter: T.opt(T.string, ''),
  email: T.opt(T.string, ''),
  blog: T.opt(T.string, ''),

  publishing: T.opt(T.bool, false),
  publishDone: T.opt(T.bool, false),
})
  .views((self) => ({
    get editData(): TEditData {
      const profile = pick(
        ['avatar', 'nickname', 'shortbio', 'bio', 'sex', 'location', 'email'],
        self,
      )
      const social = pick(['github', 'twitter', 'company', 'blog'], self)

      return {
        profile,
        social,
      }
    },
    get viewingUser(): TUser {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.user)
    },
    get isReady(): boolean {
      return true
    },
    get submitState(): TSubmitState {
      const slf = self as TStore
      return pick(['publishing', 'publishDone', 'isReady'], slf)
    },
  }))
  .actions((self) => ({
    loadUser(user: TUser): void {
      const { social, ...rest } = user
      const slf = self as TStore

      slf.mark({ ...safeMap(social), ...safeMap(rest) })

      if (social.github && startsWith('https://github.com/', social.github)) {
        self.github = social.github.slice(19)
      }
    },
    updateAccount(): void {
      const slf = self as TStore
      const root = getParent(self) as TRootStore

      const user = {
        ...slf.editData.profile,
        social: slf.editData.social,
      }

      root.account.updateAccount(user)
      root.updateViewingIfNeed('user', user)
    },

    updateEditing(sobj): void {
      const slf = self as TStore
      slf.mark(sobj)
    },

    reset(): void {
      self.publishing = false
      self.publishDone = false
    },

    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof AccountEditorStore>
export default AccountEditorStore
