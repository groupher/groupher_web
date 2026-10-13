import * as article from './article'
import * as comment from './comment'
import * as community from './community'
import { invalidate, invalidateExact, markStale } from './executor'
import * as viewer from './viewer'

export { invalidate, invalidateExact, markStale }
export * from './types'

export const QueryInvalidation = {
  article,
  comment,
  community,
  viewer,
} as const
