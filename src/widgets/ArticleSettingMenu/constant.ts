import type { TSubMenu } from './spec'

export const SUB_MENU_TYPE = {
  EDIT: 'edit',
  SLUG: 'slug',
  CATEGORY: 'category',
  STATE: 'state',
  TAGS: 'tags',
  PIN: 'pin',
  LOCK: 'lock',
  MERGE: 'merge',
  ARCHEVE: 'archeve',
  DELETE: 'delete',
} as Record<Uppercase<TSubMenu>, TSubMenu>

export const holder = 1
