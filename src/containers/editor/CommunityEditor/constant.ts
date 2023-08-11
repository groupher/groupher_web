import type { TCommunityType, TStep } from './spec'

// export const TRANS = {
//   PUBLIC: '公共',
//   CITY: '城市',
//   WORKS: '作品',
//   TEAM: '团队',
// }

export const STEP = {
  SELECT_TYPE: 'SELECT_TYPE',
  SETUP_DOMAIN: 'SETUP_DOMAIN',
  SETUP_INFO: 'SETUP_INFO',
  FINISHED: 'FINISHED',
} as Record<Uppercase<TStep>, Uppercase<TStep>>

export const COMMUNITY_TYPE = {
  WEB: 'WEB',
  CLIENT: 'CLIENT',
  HARDWARE: 'HARDWARE',
  GAME: 'GAME',
} as Record<Uppercase<TCommunityType>, Uppercase<TCommunityType>>
