import type { TDashboardPath, TNonCommunityPath } from '@/spec'

export const NON_COMMUNITY_ROUTE = {
  APPLY_COMMUNITY: 'apply_community',
} as Record<Uppercase<TNonCommunityPath>, TNonCommunityPath>

export const DASHBOARD_ROUTE = {
  DASHBOARD: 'dashboard',
  // basic-info
  INFO: 'info',
  UI: 'ui',
  LAYOUT: 'layout',
  THREADS: 'threads',
  ALIAS: 'alias',
  DOMAIN: 'domain',
  // analysis
  // --
  // contents
  TAGS: 'tags',
  POST: 'post',
  KANBAN: 'kanban',
  CHANGELOG: 'changelog',
  HELP: 'help',
  BLACKHOUSE: 'blackhouse',
  // integrates
  THIRD_PART: 'third_part',
  ADMINS: 'admins',
  WIDGETS: 'widgets',
} as Record<Uppercase<TDashboardPath>, TDashboardPath>

export const ROUTE = {
  // NOTE: the lower-case is MUST
  HOME: 'home',

  POST: 'post',
  HELP: 'help',
  CHANGELOG: 'changelog',
  KANBAN: 'kanban',
  ABOUT: 'about',
  USER: 'user',

  ...NON_COMMUNITY_ROUTE,

  DASHBOARD: {
    ...DASHBOARD_ROUTE,
  },
}
