import type {
  TDashboardPath,
  TNonCommunityPath,
  TDashboardLayoutRoute,
  TDashboardBaseInfoRoute,
} from '@/spec'

export const NON_COMMUNITY_ROUTE = {
  APPLY_COMMUNITY: 'apply_community',
} as Record<Uppercase<TNonCommunityPath>, TNonCommunityPath>

export const DASHBOARD_ROUTE = {
  DASHBOARD: 'dashboard',
  // basic-info
  INFO: 'info',
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
  HEADER: 'header',
  FOOTER: 'footer',
  BLACKHOUSE: 'blackhouse',
  // integrates
  THIRD_PART: 'third_part',
  ADMINS: 'admins',
  WIDGETS: 'widgets',
} as Record<Uppercase<TDashboardPath>, TDashboardPath>

export const DASHBOARD_BASEINFO_ROUTE = {
  BASIC: 'basic',
  SEO: 'seo',
} as Record<Uppercase<TDashboardBaseInfoRoute>, TDashboardBaseInfoRoute>

export const DASHBOARD_LAYOUT_ROUTE = {
  GLOBAL: 'global',
  POST: 'post',
  KANBAN: 'kanban',
  CHANGELOG: 'changelog',
  HELP: 'help',
  ABOUT: 'about',
} as Record<Uppercase<TDashboardLayoutRoute>, TDashboardLayoutRoute>

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
