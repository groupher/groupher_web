/*
 * MailBox store
 *
 */

import type { TRootStore } from '@/spec'

import { T, getParent, markStates, Instance, toJS } from '@/utils/mobx'
import { MailStatus, PagedMentionMessages, emptyPagi } from '@/model'

const MailBox = T.model('MailBox', {
  panelVisiable: T.opt(T.bool, false),
  mailStatus: T.opt(MailStatus, {}),
  pagedMentions: T.opt(PagedMentionMessages, emptyPagi),
  activeRaw: T.opt(
    T.enum('notifications', ['notifications', 'mentions', 'sys_notifications']),
    'mentions',
  ),
  loading: T.opt(T.bool, false),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get mailStatusData() {
      return toJS(self.mailStatus)
    },
    get pagedMentionsData() {
      return toJS(self.pagedMentions)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof MailBox>
export default MailBox
