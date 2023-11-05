/*
 * MailsViewer store
 *
 */

import type { TID, TUser, TPagi } from '@/spec'

import { T, markStates, toJS, Instance, useMobxContext } from '@/mobx'
import { PagedMentionMessages, emptyPagi } from '@/model'

type TMention = {
  id: TID
  fromUser: TUser
  sourceTitle: string
  sourceId: string
  floor: number
  read: boolean
}

type TPagedMentions = {
  entries: TMention[]
} & TPagi

const MailsViewer = T.model('MailsViewer', {
  pagedMentions: T.opt(PagedMentionMessages, emptyPagi),
  readState: T.opt(T.bool, false),
  activeRaw: T.opt(
    T.enum('notifications', ['notifications', 'mentions', 'sys_notifications']),
    'mentions',
  ),
  loading: T.opt(T.bool, false),
})
  .views((self) => ({
    get pagedMentionsData(): TPagedMentions {
      return toJS(self.pagedMentions)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof MailsViewer>
export const useStore = (): TStore => useMobxContext().store.mailsViewer

export default MailsViewer
