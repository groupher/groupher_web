import type { TChangeMode, TConditionMode } from '@/spec'

export const CHANGE_MODE = {
  CREATE: 'create',
  UPDATE: 'update',
} as Record<Uppercase<TChangeMode>, TChangeMode>

export const COMMUNITY_STATUS = {
  NORMAL: 0,
  PENDING: 1,
}

export const CONDITION_MODE = {
  STATE: 'state',
  CAT: 'cat',
  ARTICLE: 'article',
  TAG: 'tag',
} as Record<Uppercase<TConditionMode>, TConditionMode>
