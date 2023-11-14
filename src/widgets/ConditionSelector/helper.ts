import { POST_STATE_MENU_ITEMS, POST_CAT_MENU_ITEMS } from '@/constant/menu'

import type { TMode, TMenuItem } from './spec'

export const getMenuItems = (mode: TMode): TMenuItem[] => {
  switch (mode) {
    case 'state': {
      return POST_STATE_MENU_ITEMS
    }

    case 'category': {
      return POST_CAT_MENU_ITEMS
    }

    default: {
      return []
    }
  }
}

export const holder = 1
