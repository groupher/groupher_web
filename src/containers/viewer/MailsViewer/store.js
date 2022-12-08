/*
 * MailsViewer store
 *
 */

import { T, getParent, markStates, toJS } from '@/utils/mobx'
import { PagedMentionMessages, emptyPagi } from '@/model'

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
    get root() {
      return getParent(self)
    },
    get pagedMentionsData() {
      return toJS(self.pagedMentions)
    },
  }))
  .actions((self) => ({
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default MailsViewer
