import { T } from '@/mobx'

export const SimpleUser = T.model('SimpleUser', {
  login: T.maybeNull(T.string),
  nickname: T.maybeNull(T.string),
  bio: T.maybeNull(T.string),
  shortbio: T.maybeNull(T.string),
  avatar: T.maybeNull(T.string),
})

export const holder = 1
