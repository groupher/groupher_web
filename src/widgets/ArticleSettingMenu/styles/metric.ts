import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

export const getSubMenuWidth = (subType: TSubMenu): string => {
  switch (subType) {
    case SUB_MENU_TYPE.EDIT: {
      return '280px'
    }
    case SUB_MENU_TYPE.CATEGORY:
    case SUB_MENU_TYPE.STATE: {
      return '200px'
    }
    case SUB_MENU_TYPE.SLUG: {
      return '240px'
    }
    case SUB_MENU_TYPE.TAG: {
      return '200px'
    }
    default: {
      return '140px'
    }
  }
}

export const holder = 1
