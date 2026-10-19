import { DSB_POST_ROUTE, DSB_ROUTE } from '~/const/route'

import type { TThreadMenuConfig } from '../spec'

export const POST_MENU_ITEMS = [
  {
    icon: 'analysis',
    title: 'dsb.menu.post.analysis',
    slug: DSB_POST_ROUTE.ANALYSIS,
    path: DSB_POST_ROUTE.ANALYSIS,
  },
  {
    icon: 'layout',
    title: 'dsb.menu.post.layout',
    slug: DSB_POST_ROUTE.LAYOUT,
    path: DSB_POST_ROUTE.LAYOUT,
  },
  {
    icon: 'content',
    title: 'dsb.menu.post.content',
    slug: DSB_POST_ROUTE.CONTENT,
    path: DSB_POST_ROUTE.CONTENT,
  },
  {
    icon: 'behavior',
    title: 'dsb.menu.post.behavior',
    slug: DSB_POST_ROUTE.BEHAVIOR,
    path: DSB_POST_ROUTE.BEHAVIOR,
  },
  {
    icon: 'trash',
    title: 'dsb.menu.post.trash',
    slug: DSB_POST_ROUTE.TRASH,
    path: DSB_POST_ROUTE.TRASH,
  },
] as const

export const POST_MENU_CONFIG = {
  baseRoute: DSB_ROUTE.POST,
  defaultSlug: DSB_POST_ROUTE.CONTENT,
  entryPath: `${DSB_ROUTE.POST}/${DSB_POST_ROUTE.CONTENT}`,
  entrySlug: DSB_POST_ROUTE.CONTENT,
  items: POST_MENU_ITEMS,
  scope: 'post',
} satisfies TThreadMenuConfig
