import { DSB_CHANGELOG_ROUTE, DSB_ROUTE } from '~/const/route'

import type { TThreadMenuConfig } from '../spec'

export const CHANGELOG_MENU_ITEMS = [
  {
    icon: 'analysis',
    title: 'dsb.menu.changelog.analysis',
    slug: DSB_CHANGELOG_ROUTE.ANALYSIS,
    path: DSB_CHANGELOG_ROUTE.ANALYSIS,
  },
  {
    icon: 'layout',
    title: 'dsb.menu.changelog.layout',
    slug: DSB_CHANGELOG_ROUTE.LAYOUT,
    path: DSB_CHANGELOG_ROUTE.LAYOUT,
  },
  {
    icon: 'content',
    title: 'dsb.menu.changelog.content',
    slug: DSB_CHANGELOG_ROUTE.CONTENT,
    path: DSB_CHANGELOG_ROUTE.CONTENT,
  },
  {
    icon: 'behavior',
    title: 'dsb.menu.changelog.behavior',
    slug: DSB_CHANGELOG_ROUTE.BEHAVIOR,
    path: DSB_CHANGELOG_ROUTE.BEHAVIOR,
  },
] as const

export const CHANGELOG_MENU_CONFIG = {
  baseRoute: DSB_ROUTE.CHANGELOG,
  defaultSlug: DSB_CHANGELOG_ROUTE.CONTENT,
  entryPath: `${DSB_ROUTE.CHANGELOG}/${DSB_CHANGELOG_ROUTE.CONTENT}`,
  entrySlug: DSB_CHANGELOG_ROUTE.CONTENT,
  items: CHANGELOG_MENU_ITEMS,
  scope: 'changelog',
} satisfies TThreadMenuConfig
