import { find } from 'ramda'

import type { TConditionMode } from '@/spec'
import { CONDITION_MODE } from '@/constant/mode'
import { POST_STATE_MENU_ITEMS, POST_CAT_MENU_ITEMS, POST_SORT_MENU_ITEMS } from '@/constant/menu'

import type { TMenuItem, TActiveCondition } from './spec'

export const getMenuItems = (mode: TConditionMode): TMenuItem[] => {
  switch (mode) {
    case CONDITION_MODE.STATE: {
      return POST_STATE_MENU_ITEMS
    }

    case CONDITION_MODE.CAT: {
      return POST_CAT_MENU_ITEMS
    }

    case CONDITION_MODE.SORT: {
      return POST_SORT_MENU_ITEMS
    }

    default: {
      return []
    }
  }
}

export const getActiveMenuItem = (items: TMenuItem[], active: TActiveCondition): TMenuItem => {
  return find((item) => item.key === active, items)
}

export const getTitle = (mode: TConditionMode): string => {
  switch (mode) {
    case CONDITION_MODE.STATE: {
      return '状态'
    }

    case CONDITION_MODE.CAT: {
      return '类别'
    }

    case CONDITION_MODE.SORT: {
      return '排序'
    }

    default: {
      return '??'
    }
  }
}
