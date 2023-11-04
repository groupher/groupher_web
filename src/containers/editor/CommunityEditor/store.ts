/*
 * CommunityEditor store
 *
 */

import { pick, values, isEmpty } from 'ramda'

import type { TRootStore, TRoute, TAccount } from '@/spec'
import { T, getParent, markStates, Instance, useMobxContext } from '@/mobx'

import type {
  TSelectTypeStatus,
  TSetupDomainStatus,
  TSetupInfoStatus,
  TSetupExtraStatus,
  TFinishedStatus,
  TValidState,
} from './spec'
import { STEP, COMMUNITY_TYPE } from './constant'

const CommunityEditor = T.model('CommunityEditorStore', {
  step: T.opt(T.enum(values(STEP)), STEP.SELECT_TYPE),
  communityType: T.maybeNull(T.enum(values(COMMUNITY_TYPE))),
  // if community exist / has pending apply
  checking: T.opt(T.bool, false),
  submitting: T.opt(T.bool, false),
  isOfficalValid: T.opt(T.bool, false),

  communityExist: T.opt(T.bool, false),
  hasPendingApply: T.opt(T.bool, false),

  //
  slug: T.opt(T.string, ''),
  logo: T.maybeNull(T.string),
  title: T.opt(T.string, ''),
  homepage: T.opt(T.string, ''),
  extraInfo: T.opt(T.string, ''),

  city: T.opt(T.string, ''),
  source: T.opt(T.string, ''),

  desc: T.opt(T.string, ''),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get accountInfo(): TAccount {
      const root = getParent(self) as TRootStore
      return root.accountInfo
    },
    get curRoute(): TRoute {
      const root = getParent(self) as TRootStore
      return root.curRoute
    },
    get applyMsg(): string {
      const { homepage, extraInfo } = self

      return `${homepage}\n${extraInfo}`
    },
    get selectTypeStatus(): TSelectTypeStatus {
      const { communityType } = self

      return { communityType }
    },
    get setupDomainStatus(): TSetupDomainStatus {
      const { slug } = self

      return { slug }
    },
    get setupInfoStatus(): TSetupInfoStatus {
      return pick(['slug', 'title', 'desc', 'logo'], self)
    },
    get setupExtraStatus(): TSetupExtraStatus {
      return pick(['homepage', 'extraInfo', 'city', 'source'], self)
    },
    get finishedStatus(): TFinishedStatus {
      return pick(['slug', 'title', 'desc', 'logo'], self)
    },
    get isCommunityTypeValid(): boolean {
      const slf = self as TStore
      if (!slf.isLogin) return false

      return !slf.hasPendingApply
    },
    get isRawValid(): boolean {
      if (self.communityExist) return false

      const rule = /^[0-9a-zA-Z-_]+$/
      return rule.test(self.slug)
    },
    get isTitleValid(): boolean {
      return !isEmpty(self.slug)
    },
    get isDescValid(): boolean {
      return !isEmpty(self.desc)
    },
    get isLogoValid(): boolean {
      // return self.logo && !isEmpty(self.logo)
      return true
    },
    get validState(): TValidState {
      const slf = self as TStore

      return pick(
        [
          'isOfficalValid',
          'isCommunityTypeValid',
          'isRawValid',
          'isTitleValid',
          'isDescValid',
          'isLogoValid',
          'checking',
          'communityExist',
          'hasPendingApply',
          'isLogin',
          'submitting',
        ],
        slf,
      )
    },
  }))
  .actions((self) => ({
    updateEditing(sobj): void {
      const slf = self as TStore
      slf.mark(sobj)
    },
    authWarning(options): void {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    markRoute(query): void {
      const root = getParent(self) as TRootStore
      root.markRoute(query)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof CommunityEditor>
export const useStore = (): TStore => useMobxContext().store.communityEditor

export default CommunityEditor
