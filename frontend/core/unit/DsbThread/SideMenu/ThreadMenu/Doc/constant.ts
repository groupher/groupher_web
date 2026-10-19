import { DSB_DOC_LAYOUT_ROUTE, DSB_DOC_ROUTE, DSB_ROUTE } from '~/const/route'

import type { TThreadMenuConfig } from '../spec'

export const DOC_MENU_ITEMS = [
  {
    icon: 'analysis',
    title: 'dsb.menu.doc.analysis',
    slug: DSB_DOC_ROUTE.ANALYSIS,
    path: DSB_DOC_ROUTE.ANALYSIS,
  },
  {
    icon: 'layout',
    title: 'dsb.menu.doc.layout',
    slug: DSB_DOC_ROUTE.LAYOUT,
    path: `${DSB_DOC_ROUTE.LAYOUT}/${DSB_DOC_LAYOUT_ROUTE.COVER}`,
  },
  {
    icon: 'cover',
    title: 'dsb.menu.doc.cover',
    slug: DSB_DOC_ROUTE.COVER,
    path: DSB_DOC_ROUTE.COVER,
  },
  {
    icon: 'editor',
    title: 'dsb.menu.doc.editor',
    slug: DSB_DOC_ROUTE.EDITOR,
    path: DSB_DOC_ROUTE.EDITOR,
  },
  { icon: 'faq', title: 'dsb.menu.doc.faq', slug: DSB_DOC_ROUTE.FAQ, path: DSB_DOC_ROUTE.FAQ },
  {
    icon: 'gitSync',
    title: 'dsb.menu.doc.git_sync',
    slug: DSB_DOC_ROUTE.GIT_SYNC,
    path: DSB_DOC_ROUTE.GIT_SYNC,
  },
  {
    icon: 'secureDomain',
    title: 'dsb.menu.doc.domain',
    slug: DSB_DOC_ROUTE.DOMAIN,
    path: DSB_DOC_ROUTE.DOMAIN,
  },
  {
    icon: 'import',
    title: 'dsb.menu.doc.import',
    slug: DSB_DOC_ROUTE.IMPORT,
    path: DSB_DOC_ROUTE.IMPORT,
  },
  {
    icon: 'backup',
    title: 'dsb.menu.doc.backup',
    slug: DSB_DOC_ROUTE.BACKUP,
    path: DSB_DOC_ROUTE.BACKUP,
  },
] as const

export const DOC_MENU_CONFIG = {
  baseRoute: DSB_ROUTE.DOC,
  defaultSlug: DSB_DOC_ROUTE.LAYOUT,
  entryPath: `${DSB_ROUTE.DOC}/${DSB_DOC_ROUTE.EDITOR}`,
  entrySlug: DSB_DOC_ROUTE.EDITOR,
  items: DOC_MENU_ITEMS,
  scope: 'doc',
} satisfies TThreadMenuConfig
