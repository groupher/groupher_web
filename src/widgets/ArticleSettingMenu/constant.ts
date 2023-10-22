import type { TSubMenu } from './spec'

export const SUB_MENU_TYPE = {
  SLUG: 'slug',
  CATEGORY: 'category',
  STATE: 'state',
  TAG: 'tag',
  PIN: 'pin',
  LOCK: 'lock',
  MERGE: 'merge',
  ARCHEVE: 'archeve',
  DELETE: 'delete',
} as Record<Uppercase<TSubMenu>, TSubMenu>

export const holder = 1
