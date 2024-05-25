import C11N from '@/const/c11n'
import { T } from '@/mobx'

import { Community /* PagedCommunities */ } from './Community'
import { pagiFields } from './helper/common'

const PagedCommunities = T.model('pagedCommunities', {
  entries: T.opt(T.array(Community), []),
  totalCount: T.opt(T.number, 0),
})

const ContributeRecord = T.model('ContributeRecord', {
  date: T.string,
  count: T.number,
})

const Contributes = T.model('Contributes', {
  records: T.opt(T.array(ContributeRecord), []),
  startDate: T.maybeNull(T.string),
  endDate: T.maybeNull(T.string),
  totalCount: T.maybeNull(T.number),
})

const GithubProfile = T.model('GithubProfile', {
  login: T.string,
  htmlUrl: T.string,
})

export const Achievement = T.model('Achievement', {
  reputation: T.opt(T.number, 0),
  articlesUpvotesCount: T.opt(T.number, 0),
  articlesCollectsCount: T.opt(T.number, 0),
  donateMember: T.opt(T.bool, false),
  seniorMember: T.opt(T.bool, false),
  sponsorMember: T.opt(T.bool, false),
})

const Customization = T.model('Customization', {
  bannerLayout: T.opt(
    T.enum('bannerLayout', [C11N.CLASSIC, C11N.SIMPLE]),
    // C11N.CLASSIC,
    C11N.SIMPLE,
  ),
  contentDivider: T.opt(T.bool, false),
  markViewed: T.opt(T.bool, true),
  displayDensity: T.opt(T.enum('displayDensity', ['20', '25', '30']), '20'),
  // theme
  // ...
})

const UserSocial = T.model('UserSocial', {
  github: T.maybeNull(T.string),
  twitter: T.maybeNull(T.string),
  blog: T.maybeNull(T.string),
  company: T.maybeNull(T.string),
})

const UserMeta = T.model('UserMeta', {
  isMaker: T.opt(T.bool, false),
  publishedBlogsCount: T.opt(T.number, 0),
  publishedJobsCount: T.opt(T.number, 0),
  publishedPostsCount: T.opt(T.number, 0),
  publishedRadarsCount: T.opt(T.number, 0),
  publishedWorksCount: T.maybeNull(T.number),
  publishedMeetupsCount: T.opt(T.number, 0),
})

export const User = T.model('User', {
  // identifier is desiged to be immutable, this id would be updated when login
  id: T.maybeNull(T.string),
  meta: T.opt(UserMeta, {}),
  login: T.maybeNull(T.string),
  nickname: T.maybeNull(T.string),
  bio: T.maybeNull(T.string),
  shortbio: T.maybeNull(T.string),
  avatar: T.maybeNull(T.string),
  views: T.opt(T.number, 0),
  email: T.maybeNull(T.string),
  location: T.maybeNull(T.string),
  geoCity: T.maybeNull(T.string),
  sex: T.maybeNull(T.string),
  // social
  social: T.maybeNull(UserSocial),
  fromGithub: T.opt(T.bool, false),
  /* fromWeixin: T.opt(T.bool, false), */
  /* subscribedCommunities: T.opt(pagedCommunities, {}), */
  subscribedCommunities: T.maybeNull(PagedCommunities),
  subscribedCommunitiesCount: T.maybeNull(T.number),
  contributes: T.opt(Contributes, {}),
  githubProfile: T.maybeNull(GithubProfile),
  // cmsPassportString: T.opt(T.string, '{}'),

  followingsCount: T.maybeNull(T.number),
  followersCount: T.maybeNull(T.number),

  achievement: T.maybeNull(Achievement),
  editableCommunities: T.maybeNull(PagedCommunities),

  insertedAt: T.opt(T.string, ''),
  updatedAt: T.opt(T.string, ''),

  viewerHasFollowed: T.opt(T.bool, false),
  customization: T.opt(Customization, {}),
})

export const EmptyAchievement = {
  achievement: {
    reputation: 0,
    articlesUpvotesCount: 0,
    articlesCollectsCount: 0,
    donateMember: false,
    seniorMember: false,
    sponsorMember: false,
  },
}

export const EmptyUser = {
  id: '',
  nickname: '',
  login: '',
  bio: '',
  avatar: '',
  fromGithub: false,
  fromWeixin: false,
  subscribedCommunities: {},
  contributes: {},
  githubProfile: null,
  // cmsPassportString: '{}',
  ...EmptyAchievement,
}

export const PagedUsers = T.model('PagedUsers', {
  entries: T.opt(T.array(User), []),
  ...pagiFields(),
})
