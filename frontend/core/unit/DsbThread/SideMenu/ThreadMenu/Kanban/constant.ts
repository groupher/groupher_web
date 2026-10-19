import { DSB_KANBAN_ROUTE, DSB_ROUTE } from '~/const/route'

import type { TThreadMenuConfig } from '../spec'

export const KANBAN_MENU_ITEMS = [
  {
    icon: 'analysis',
    title: 'dsb.menu.kanban.analysis',
    slug: DSB_KANBAN_ROUTE.ANALYSIS,
    path: DSB_KANBAN_ROUTE.ANALYSIS,
  },
  {
    icon: 'layout',
    title: 'dsb.menu.kanban.layout',
    slug: DSB_KANBAN_ROUTE.LAYOUT,
    path: DSB_KANBAN_ROUTE.LAYOUT,
  },
  {
    icon: 'content',
    title: 'dsb.menu.kanban.content',
    slug: DSB_KANBAN_ROUTE.CONTENT,
    path: DSB_KANBAN_ROUTE.CONTENT,
  },
  {
    icon: 'behavior',
    title: 'dsb.menu.kanban.behavior',
    slug: DSB_KANBAN_ROUTE.BEHAVIOR,
    path: DSB_KANBAN_ROUTE.BEHAVIOR,
  },
] as const

export const KANBAN_MENU_CONFIG = {
  baseRoute: DSB_ROUTE.KANBAN,
  defaultSlug: DSB_KANBAN_ROUTE.CONTENT,
  entryPath: `${DSB_ROUTE.KANBAN}/${DSB_KANBAN_ROUTE.CONTENT}`,
  entrySlug: DSB_KANBAN_ROUTE.CONTENT,
  items: KANBAN_MENU_ITEMS,
  scope: 'kanban',
} satisfies TThreadMenuConfig
