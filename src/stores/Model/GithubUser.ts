import { T } from '@/utils/mobx'

export const GithubUser = T.model('GithubUser', {
  githubId: T.maybeNull(T.string),
  avatar: T.string,
  nickname: T.string,
  htmlUrl: T.string,
  bio: T.maybeNull(T.string),
  company: T.maybeNull(T.string),
  location: T.maybeNull(T.string),
})

export const holder = 1
