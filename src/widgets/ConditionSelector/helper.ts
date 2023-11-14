import type { TConditionMode } from '@/spec'
import { CONDITION_MODE } from '@/constant/mode'
import { POST_STATE_MENU_ITEMS, POST_CAT_MENU_ITEMS } from '@/constant/menu'

import type { TMenuItem } from './spec'

export const getMenuItems = (mode: TConditionMode): TMenuItem[] => {
  switch (mode) {
    case CONDITION_MODE.STATE: {
      return POST_STATE_MENU_ITEMS
    }

    case CONDITION_MODE.CAT: {
      return POST_CAT_MENU_ITEMS
    }

    default: {
      return []
    }
  }
}

export const getTitle = (mode: TConditionMode): string => {
  switch (mode) {
    case CONDITION_MODE.STATE: {
      return '状态'
    }

    case CONDITION_MODE.CAT: {
      return '类别'
    }

    default: {
      return '??'
    }
  }
}
