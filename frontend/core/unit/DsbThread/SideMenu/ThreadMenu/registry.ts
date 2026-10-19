import { DSB_ROUTE } from '~/const/route'

import { MENU_VIEW } from '../../constant'
import { CHANGELOG_MENU_CONFIG } from './Changelog/constant'
import { DOC_MENU_CONFIG } from './Doc/constant'
import { KANBAN_MENU_CONFIG } from './Kanban/constant'
import { POST_MENU_CONFIG } from './Post/constant'
import type { TThreadMenuConfig, TThreadMenuView } from './spec'

export const THREAD_MENU_ROUTE_VIEW = {
  [DSB_ROUTE.DOC]: MENU_VIEW.DOC,
  [DSB_ROUTE.POST]: MENU_VIEW.POST,
  [DSB_ROUTE.KANBAN]: MENU_VIEW.KANBAN,
  [DSB_ROUTE.CHANGELOG]: MENU_VIEW.CHANGELOG,
} as const

export const THREAD_MENU_CONFIG = {
  [MENU_VIEW.DOC]: DOC_MENU_CONFIG,
  [MENU_VIEW.POST]: POST_MENU_CONFIG,
  [MENU_VIEW.KANBAN]: KANBAN_MENU_CONFIG,
  [MENU_VIEW.CHANGELOG]: CHANGELOG_MENU_CONFIG,
} satisfies Record<TThreadMenuView, TThreadMenuConfig>

/** Narrows a route-derived menu value to a registered thread menu view. */
export const isThreadMenuView = (view: string): view is TThreadMenuView =>
  view in THREAD_MENU_CONFIG
