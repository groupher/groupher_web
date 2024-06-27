import { T } from '~/mobx'

import { pagiFields } from './helper/common'

// avoid cicle import
const SimpleUser = T.model('SimpleUser', {
  id: T.maybeNull(T.string),
  nickname: T.maybeNull(T.string),
  bio: T.maybeNull(T.string),
  avatar: T.maybeNull(T.string),
})

export const MailStatus = T.model('MailStatus', {
  hasMail: T.opt(T.bool, false),
  mentionCount: T.opt(T.number, 0),
  notificationCount: T.opt(T.number, 0),
  totalCount: T.opt(T.number, 0),
})

export const MentionMsg = T.model('MentionMsg', {
  id: T.maybeNull(T.string),
  fromUser: SimpleUser,
  sourceTitle: T.string,
  sourceId: T.string,
  sourcePreview: T.maybeNull(T.string),
  sourceType: T.maybeNull(T.string),

  parentId: T.maybeNull(T.string),
  parentType: T.maybeNull(T.string),
  floor: T.maybeNull(T.number),

  community: T.maybeNull(T.string),
  read: T.opt(T.bool, false),
})

export const PagedMentionMessages = T.model('PagedMentionMessages', {
  entries: T.opt(T.array(MentionMsg), []),
  ...pagiFields(),
})
